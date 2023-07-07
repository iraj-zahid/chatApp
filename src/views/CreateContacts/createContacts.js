import Searchbar from "../../components/Searchbar/searchbar";
// import Signup from "../../views/Signup/signup"
// import Login from "../../views/Login/login";
// import PublishAd from "../../views/publishAd/publishAd";
// import {useSelector, useDispatch} from "react-redux"
// import {changingOfTheme} from "../../store/actions/CounterAction/counteraction";
// import Footer from "../../Components/Footer/footer"
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, Button, TouchableOpacity } from 'react-native';


import { useState } from "react"

function CreateContacts() {
  const navigation = useNavigation();

 
  return (
    <>

    <TouchableOpacity onPress={()=>{navigation.navigate("Whatsapp")}} style={{width:200,height:50, backgroundColor:"#0090BC", flexDirection:"row",alignItems:"center", justifyContent:"center", borderRadius:10}}>
    <Image
    style={{width:60, height:60}}
    source={require("../../../assets/Assets/images/icons/add.png")}
    resizeMode="contain"
  />
        <Text style={{fontSize:15,fontWeight:700,color:"white",}}>Create Contacts</Text></TouchableOpacity>
    </>
  )
}
export default CreateContacts
const styles = StyleSheet.create({
    
});
