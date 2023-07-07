import {useState,useEffect} from "react";
import { useId } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getFirestore,serverTimestamp, doc, setDoc, collection, addDoc, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/firestore";



// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../config/firebase";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6fiswFWlgLRnw0-c-btyiPVm-kxnfkr0",
  authDomain: "bushes-9c55a.firebaseapp.com",
  projectId: "bushes-9c55a",
  storageBucket: "bushes-9c55a.appspot.com",
  messagingSenderId: "40639200502",
  appId: "1:40639200502:web:f9aff66714fe71efc280d7",
  measurementId: "G-H1VGCQS6TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app)
async function signupUser(name,email,password,phone,image){
 /** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};
  try {
    console.log(`fidebaseKaHai${email} ${password} ${name} ${phone}, ${image}`)
  let res;
  const createUserWithEmailAndPasswordRes = await createUserWithEmailAndPassword(auth, email, password)
  console.log(createUserWithEmailAndPasswordRes.user.uid)
  const id = createUserWithEmailAndPasswordRes.user.uid
  const urls =[]
  image.Id = id
  const imageRef = ref(storage, `profileAll/${Date.now()}`)
  console.log(urls)
           
  const uploadBytesRes = await uploadBytesResumable(imageRef, image, metadata)
  const getDownloadRes = await getDownloadURL(uploadBytesRes.ref);
  console.log( getDownloadRes);
  urls.push(getDownloadRes)
  

  const setDocRes = await setDoc(doc(db, "userData", id), {
    name:name,
    email:email,
    password:password,
    id:id,
    phone:phone,
    image:urls
  });
  const setDocThemeRes = await setDoc(doc(db, "themeValues", id), {
    theme:false,
    id:id,
  });
  const setDocNumbersRes = await setDoc(doc(db, "Numbers", phone), {
    number:phone
  });
  
  return {
    status: "success",
    // res,
  };
  } catch (error)  {   
    return {
      status: "error",
      error: error.message,
    };

  };

}
async function loginUser(email,password){
  try{
  const signInWithEmailAndPasswordRes = await signInWithEmailAndPassword(auth, email, password)
  console.log(signInWithEmailAndPasswordRes)
  const id = signInWithEmailAndPasswordRes.user.uid
  
  
  return {
    status: "success",
    
  };
  }
  catch (error)  {
    return {
      status: "error",
      error: error.message,
    }
  };


}
const getCurrUserData = async () => {
  try{
      const q = query(collection(db, "currentUser"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}

const adsData = async (adData,) => {
  
  /** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};
  const { category, title, description, price, images, id, uniqueId } = adData;
  console.log("images", images)
const urls = []
  try{
    for(let i=0; i < images.length; i++){
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response)
        }
        xhr.onerror = function() {
          reject(new TypeError("Ntework failed"))
        }
        xhr.responseType = "blob";
        xhr.open("GET", images[i], true);
        xhr.send(null)
      })
      const imageRef = ref(storage, `imagesAll/${Date.now()}`)
      console.log("tasveer",blobImage)
               
      const uploadBytesRes = await uploadBytesResumable(imageRef, blobImage, metadata)
      const getDownloadRes = await getDownloadURL(uploadBytesRes.ref);
      console.log( getDownloadRes);
      urls.push(getDownloadRes)
     }
     const setDocRes = await setDoc(doc(db, "adsData", uniqueId), {
      category:category,
      title:title,
      description:description,
      price:price,
      url: urls,
      id:id,
      uniqueId:uniqueId
      
    });
  //   const washingtonRef = doc(db, "themeValues", id);

  // // Set the "capital" field of the city 'DC'
  // await updateDoc(washingtonRef, {
  //   theme:true,
  //   id:id,
  // });

  }
  catch(err){
    return({
      err: err.message
    })
    console.log(err)
  }
}
const favouriteAdsData = async (favouriteAdData) => {
  const { category, title, description, favouriteUsrId, price, url, id, uniqueId } = favouriteAdData;
 console.log("favour=>", favouriteAdData, description, favouriteUsrId, )
try{
  const setDocRes = await setDoc(doc(db, "favouriteAdsData", favouriteAdData.folderId), {
    category:favouriteAdData.category,
    title:favouriteAdData.title,
    description:favouriteAdData.description,
    price:favouriteAdData.price,
    url:favouriteAdData.url,
    id:favouriteAdData.id,
    uniqueId:favouriteAdData.uniqueId,
    favouriteUsrId:favouriteAdData.favouriteUserId,
    folderId:favouriteAdData.folderId
  });
}
catch(err){
  console.log(err)

}
}
const AdToCart = async (favouriteAdData) => {
  const { category, title, description, favouriteUsrId, price, url, id, uniqueId } = favouriteAdData;
 
try{
  const setDocRes = await setDoc(doc(db, "AdToCart", favouriteAdData.uniqueId+favouriteAdData.favouriteUserId), {
    category:favouriteAdData.category,
    title:favouriteAdData.title,
    description:favouriteAdData.description,
    price:parseInt(favouriteAdData.price),
    url:favouriteAdData.url,
    id:favouriteAdData.id,
    uniqueId:favouriteAdData.uniqueId,
    favouriteUsrId:favouriteAdData.favouriteUserId,
    value:favouriteAdData.Value,
    number:favouriteAdData.number,
    folderId:favouriteAdData.uniqueId+favouriteAdData.favouriteUserId,
    actualPrice:parseInt(favouriteAdData.price)

  });
}
catch(err){
  console.log(err)

}
}
const getAdsData = async () => {
  try{
      const q = query(collection(db, "adsData"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
    
}
const getFavouriteData = async () => {
  try{
      const q = query(collection(db, "favouriteAdsData"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}
const getAdsDataAgain = async () => {
  try{
      const q = query(collection(db, "adsData"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}
const getProfileData = async () => {
  try{
      const q = query(collection(db, "userData"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
    console.log(arr)
  });
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}

async function logoutUser(){
  await signOut(auth)
}
async function ThemeWork(value, id){
 
  const washingtonRef = doc(db, "themeValues", id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    theme:!value,
    id:id,
  });
}
const getThemeData = async () => {
  try{
      const q = query(collection(db, "themeValues"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}
const getAdToCartData = async () => {
  try{
      const q = query(collection(db, "AdToCart"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}
async function upDateCart(favouriteAdData){
  const washingtonRef = doc(db, "AdToCart", favouriteAdData.uniqueId+favouriteAdData.favouriteUsrId);
const actualPrice = parseInt(favouriteAdData.actualPrice)
const price = parseInt(favouriteAdData.price)


  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    category:favouriteAdData.category,
    title:favouriteAdData.title,
    description:favouriteAdData.description,
    price:parseInt(favouriteAdData.price),
    url:favouriteAdData.url,
    id:favouriteAdData.id,
    uniqueId:favouriteAdData.uniqueId,
    favouriteUsrId:favouriteAdData.favouriteUsrId,
    value:favouriteAdData.value,
    number:favouriteAdData.number+1,
    folderId:favouriteAdData.folderId,
    actualPrice: actualPrice + price
  });
}
async function upDateCartTwo(favouriteAdData){
  const washingtonRef = doc(db, "AdToCart", favouriteAdData.uniqueId+favouriteAdData.favouriteUsrId);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    category:favouriteAdData.category,
    title:favouriteAdData.title,
    description:favouriteAdData.description,
    price:favouriteAdData.price,
    url:favouriteAdData.url,
    id:favouriteAdData.id,
    uniqueId:favouriteAdData.uniqueId,
    favouriteUsrId:favouriteAdData.favouriteUsrId,
    value:favouriteAdData.value,
    number:favouriteAdData.number-1,
    folderId:favouriteAdData.folderId,
    actualPrice:parseInt(favouriteAdData.actualPrice-favouriteAdData.price)

  });
}
const deleteCart = async (i) => {
  const deleteDocRes = await deleteDoc(doc(db,"AdToCart",i));
}
const CartValues = async () => {
  try{
      const q = query(collection(db, "CartValues"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
    
}
async function upDateCartData(user){
  const washingtonRef = doc(db, "CartValues", user);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    value:true,
    id:user
  });
}
async function upDateCartDataTwo(user){
  const washingtonRef = doc(db, "CartValues", user);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    value:false,
    id:user
  });
}
// Whatsapp app

const Contacts = async (name, contact, user) => {
  console.log(name);
  try {
    const contactCollection = collection(db, "Contact");
    const setDocRes = await addDoc(contactCollection, {
      name: name,
      contact: contact,
      id: user,
    });
    return { status: "success" };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
};


const getContacts = async () => {
  try{
      const q = query(collection(db, "Contact"));
  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  return {
    status: "success",
    data: arr,
  };
  }
  catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
      };
    }
}

const chatData = async (sender,chat,personId, user) => {
  const collectionRef = collection(db, "chat");
  await addDoc(collectionRef, {
    sender:sender,
    chat:chat,
    personId:personId,
    id:user,
    timestamp: serverTimestamp(),

  });

}
export { signupUser,upDateCartData, upDateCartDataTwo, CartValues, deleteCart,upDateCart,upDateCartTwo, getAdToCartData, AdToCart, db, getThemeData,ThemeWork,getFavouriteData,logoutUser,favouriteAdsData, loginUser, auth, app, storage, getCurrUserData, adsData, getAdsData, getAdsDataAgain, getProfileData,Contacts,getContacts , chatData};
