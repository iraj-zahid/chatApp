// import Navbar from "../../Components/Navbar/navbar";
import Searchbar from "../../components/Searchbar/searchbar";
// import Signup from "../../views/Signup/signup"
// import Login from "../../views/Login/login";
// import PublishAd from "../../views/publishAd/publishAd";
// import {useSelector, useDispatch} from "react-redux"
// import {changingOfTheme} from "../../store/actions/CounterAction/counteraction";
// import Footer from "../../Components/Footer/footer"
import { useNavigation } from '@react-navigation/native';
import CreateContacts from "../CreateContacts/createContacts"
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, Button, TouchableOpacity } from 'react-native';


import { useState } from "react"

function Dashboard() {
  const navigation = useNavigation();

 
  return (
    <>

      
       
          
          <View style={{alignItems:"center", justifyContent:"center",width:"100%",height:"100%"}}>
            <CreateContacts/>
          </View>





    </>
  )
}
export default Dashboard
const styles = StyleSheet.create({
 
});
