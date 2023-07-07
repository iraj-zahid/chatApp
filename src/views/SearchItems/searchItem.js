// import { View } from "react-native";
// import "./searchItem.css"
// import {useState,useEffect} from "react";
// import { StyleSheet, FlatList, Text, View, ImageBackground, ScrollView, TextInput, Platform, Image } from 'react-native';

// // import {getAdsDataAgain} from "../../config/firebase";
// // import Navbar from "../../Components/Navbar/navbar";
// // import NavbarTwo from "../../Components/NavbarTwo/navbar"
// // import { useParams } from "react-router-dom";
// // import { IoIosPricetags } from 'react-icons/io';
// // import { BsFacebook } from 'react-icons/bs';
// // import { BsTwitter } from 'react-icons/bs';
// // import { BsInstagram } from 'react-icons/bs';
// // import { BsYoutube } from 'react-icons/bs';
// // import {useSelector, useDispatch} from "react-redux";
// // import {changingOfTheme} from "../../store/actions/CounterAction/counteraction";





// function SearchItem(props){
// //   const reduxState = useSelector((state) => {return state.CounterReducer.value})
// //   const navigate = useNavigate()
// //     const [adsDdata, setAdsdata] = useState([])
// //     const getAdDataAgain = async () => {
// //         //firebase function call for user data
// //         const res = await getAdsDataAgain();
// //         setAdsdata(res.data);
// //       };
    
// //       useEffect(() => {
// //         getAdDataAgain();
// //       }, []);
// //       const params = useParams();
// //       const paramss = params.name
    
// //     const filterData = adsDdata.filter((ad) => {
        
// //            return ad.title.toLowerCase().includes(paramss)
        
// //       }) ; 
// //       console.log("filterData==>",filterData)
//     return (
//         <>
//         <View className={reduxState?"SearchItem-main-body":"SearchItem-main-bodyTwo"}>
//           <View className={reduxState?"searchItem-Navbar":"searchItem-NavbarTwo"}>
//           <NavbarTwo/> 
//           </View>
//           <View className="searchItem-body">
//           <View className="searchItem-sidebar">
//           <nav class="sidebar-nav">
//     <View>
      
//       <li><a href="#">About Us</a></li>
//       <li><a href="#">Our Services</a></li>
//       <li><a href="#">Contact Us</a></li>
//     </View>
//   </nav>
//   <View class="sidebar-text">
//     <h2>Who We Are</h2>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation Viewlamco.</p>
//   </View>
//   <View class="sidebar-social">
//     <h2>Follow Us</h2>
//     <View>
//       <li><a href="#"><BsFacebook/></a></li>
//       <li><a href="#"><BsTwitter/></a></li>
//       <li><a href="#"><BsInstagram/></a></li>
//       <li><a href="#"><BsYoutube/></a></li>
//     </View>
//   </View>
//           </View>
//           <View className={reduxState?"searchItems-wrapper-box":"searchItems-wrapper-boxTwo"}>
//             <h1 className={reduxState?"h2-recentSearch":"h2-recentSearchTwo"}>Recent searches: {paramss}</h1>
//             {filterData.map((searchAds) => {
//               return <>
//               <View onClick={() => {navigate(`/adDetail/${searchAds.uniqueId}`);}} className={reduxState?"searchItem-View":"searchItem-ViewTwo"}>
//                 <View className="img-searchItem">
//                   <img className="img-searchItem-image" src={searchAds.url}/>
//                 </View>
//                 <View>
//                 <View className="title-searchItem">{searchAds.title}</View>
//                 <View className="category-searchItem">{searchAds.category}</View>
//                 <View className="description-searchItem">{searchAds.description}</View>
//                 <View className="price-searchItem"><IoIosPricetags style={{color:"#4e77ffc7"}}/>{searchAds.price}</View>
//                 </View>
//               </View>
//               </>
//             })}
//           </View>
//           </View>
//         </View>
//         </>
//     )
// }
// export default SearchItem
