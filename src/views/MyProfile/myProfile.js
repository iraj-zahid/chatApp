import React from 'react';
import { getProfileData } from "../../config/firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import {getAdsData, getFavouriteData} from "../../config/firebase";
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';




function Profile() {
    
    const [getProfiledata, setgetProfiledata] = useState([]);
    const getProfileUserData = async () => {
        //firebase function call for user data
        const res = await getProfileData();
        setgetProfiledata(res.data);
    };

    useEffect(() => {
        getProfileUserData();
    }, []);
    console.log(getProfiledata)
    const [userData, setUserData] = useState()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user.uid)
                // console.log(user)
            } else {
            }
        });
    }, []);
   const filterProfile = getProfiledata.filter((profile) => {
        if (profile.id == userData) {
            return profile
        }
    })
    const [getAdsdata, setgetAdsdata] = useState([]);
    const getAdData = async () => {
        //firebase function call for user data
        const res = await getAdsData();
        setgetAdsdata(res.data);
      };
      console.log("finallym", getAdsdata)
    
      useEffect(() => {
        getAdData();
      }, []);
      const filterAdsData = getAdsdata.filter((ad) => {
        if(ad.id == userData){
            return ad
        }
      })
    console.log("finally", filterAdsData)

const aacha = () => {
    console.log("finally", filterAdsData)

}
const [slideNo, setSlideNo] = useState(0)
    // const [imgIndex, setImgIndex] = useState(filterAdDetailData[0].url.length)

    const nextSlide = () => {

        console.log("dekhlof",)

        if (slideNo === filterAdsData.length - 1) {
            setSlideNo(0)
        }
        else {
            setSlideNo(slideNo + 1)
        }
    }
    const prevSlide = () => {
        console.log(slideNo)

        if (slideNo === 0) {
            setSlideNo(filterAdsData.length - 1)
        }
        else {
            setSlideNo(slideNo - 1)
        }
    }
// favorite
const [favorite,setFavorite] = useState([])
const getFavouriteDataFunc = async () => {
  const getFavouriteDataRes = await getFavouriteData()
  setFavorite(getFavouriteDataRes.data)
}
useEffect(() => {
  getFavouriteDataFunc();
}, []);
const filterFavoriteData = favorite.filter((ad) => {
  if(ad.favouriteUsrId == userData){
    return ad
  }
})
console.log("likes", favorite)
const [slideNoTwo, setSlideNoTwo] = useState(0)
    // const [imgIndex, setImgIndex] = useState(filterAdDetailData[0].url.length)

    const nextSlideTwo = () => {

        console.log("dekhlof",)

        if (slideNoTwo === filterFavoriteData.length - 1) {
          setSlideNoTwo(0)
        }
        else {
          setSlideNoTwo(slideNoTwo + 1)
        }
    }
    const prevSlideTwo = () => {
        console.log(slideNo)

        if (slideNoTwo === 0) {
          setSlideNoTwo(filterFavoriteData.length - 1)
        }
        else {
          setSlideNoTwo(slideNoTwo - 1)
        }
    }

    return (
        <>
       <ScrollView>
        <View style={styles.container}>
      {filterProfile.map((i) => {
        return <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: i.image[0] }}
                                    resizeMode="contain"
        />
        <Text style={styles.username}>{i.name}</Text>
        <Text style={styles.bio}>{i.email}</Text>
      </View>
      })}
      <View style={styles.content}>
        {/* Other profile information */}
      </View>
    </View>
            {/* <div className="profile-main-div-body">

                <div className={reduxState?"profile-navbar":"profile-navbarTwo"}><div className={reduxState?"profile-opacity-down":"profile-opacity-downTwo"}><NavbarTwo /><div className="profile-header-image"></div></div></div>
                <div className={reduxState?"profile-user-data-div":"profile-user-data-divTwo"}>
                    
                    {filterProfile.map((i) => {
                        return <>
                       <div className="profile-frame"><img className="profile-frame-image" src={i.image[0]} /></div> 
                        <h3 className={reduxState?"profile-user-data-name":"profile-user-data-nameTwo"} title="userName">{i.name}</h3>
                        <p className={reduxState?"profile-user-data-email":"profile-user-data-emailTwo"} title={i.email}><MdEmail style={{color:"#3be2ff", marginTop:"3px", marginRight:"10px"}}/>{i.email}</p>
                        <p className={reduxState?"profile-user-data-phone":"profile-user-data-phoneTwo"} title={i.phone}><BiPhoneCall style={{color:"#3be2ff", marginTop:"3px", marginRight:"10px"}}/>{i.phone}</p>
                        </>
                    })}
                </div>
                <div className={reduxState?"my-ads-main-box":"my-ads-main-boxTwo"}>
          <h2 className={reduxState?"LATEST-LISTINGS ek_aur-class":"LATEST-LISTINGSTwo ek_aur-class"}><div className={reduxState?"latest-styling-line-column":"latest-styling-line-columnTwo"}></div><p className={reduxState?"latest-styling-line-p":"latest-styling-line-pTwo"}>MY All Ads</p></h2>
          <div className="all-profilead_here">
          {filterAdsData.map((elem) => {
            return <>
             <div className={reduxState?"Card-Ads":"Card-AdsTwo"} onClick={() => {navigate(`/adDetail/${elem.uniqueId}`);}}>
             <div className="ad_image"><img className="ad_image_actually" src={elem.url}/></div>
             <p className="ad_Product-Name">{elem.title}</p>
             <p className="ad_category-name">{elem.category}</p>
             <p className="ad-descriptions-products">{elem.description}</p>
             <p className="price-Ad"><IoIosPricetags style={{color:"#4e77ffc7"}}/>{elem.price}</p>
             </div>
            </>
           })}
          </div>
                </div>
            </div> */}
            
<View style={{alignItems:"center"}}><Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>MY All Ads</Text></View>
             <View style={styles.containerr}>
              
      {/* {filterAdsData.map((ad) => { */}
      <TouchableOpacity onPress={prevSlide}><Image
    style={{width:30,marginLeft:0,marginTop:130}}
    source={require("../../../assets/Assets/images/icons/prev.png")}
    resizeMode="contain"
  /></TouchableOpacity>
      <View style={styles.adCard} >
         <Image
    style={styles.adImage}
    source={{ uri:  filterAdsData.length>0 ? filterAdsData[slideNo].url[0]: "" }}
    resizeMode="contain"
  />
    <Text style={styles.adTitle}>{filterAdsData.length>0 ? filterAdsData[slideNo].title: ""}</Text>
  <Text style={styles.adDescription}>{filterAdsData.length>0 ? filterAdsData[slideNo].description: ""}</Text>

      </View>
      <TouchableOpacity onPress={nextSlide}>
      <Image
    style={{width:30,marginRight:10,marginTop:130}}
    source={require("../../../assets/Assets/images/icons/next.png")}
    resizeMode="contain"
  />
      </TouchableOpacity>

      {/* })}  */}

    </View>
    {/* favourite */}
    <View style={{alignItems:"center"}}><Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>My Favorite Ads</Text></View>
    <View style={styles.containerr}>
              
              {/* {filterAdsData.map((ad) => { */}
              <TouchableOpacity onPress={prevSlideTwo}><Image
            style={{width:30,marginLeft:0,marginTop:130}}
            source={require("../../../assets/Assets/images/icons/prev.png")}
            resizeMode="contain"
          /></TouchableOpacity>
              <View style={styles.adCard} >
                 <Image
            style={styles.adImage}
            source={{ uri:  filterFavoriteData.length>0 ? filterFavoriteData[slideNoTwo].url[0]: "" }}
            resizeMode="contain"
          />
            <Text style={styles.adTitle}>{filterFavoriteData.length>0 ? filterFavoriteData[slideNoTwo].title: ""}</Text>
          <Text style={styles.adDescription}>{filterFavoriteData.length>0 ? filterFavoriteData[slideNoTwo].description: ""}</Text>
        
              </View>
              <TouchableOpacity onPress={nextSlideTwo}>
              <Image
            style={{width:30,marginRight:10,marginTop:130}}
            source={require("../../../assets/Assets/images/icons/next.png")}
            resizeMode="contain"
          />
              </TouchableOpacity>
        
              {/* })}  */}
        
            </View>
       </ScrollView>
        </>
    )
}
export default Profile;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: '#f2f2f2',
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    bio: {
      fontSize: 16,
      color: '#888',
      marginTop: 5,
    },
    content: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    containerr: {
        // flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        flexDirection:"row",
        paddingLeft:30
      },
      adCard: {
        width:"72%",
        marginBottom: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
      },
      adImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
      },
      adTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      adDescription: {
        fontSize: 16,
        color: '#888',
      },
  });