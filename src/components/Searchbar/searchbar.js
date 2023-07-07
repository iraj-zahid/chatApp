import { useState, useEffect } from 'react';
import React from 'react';
import * as Font from 'expo-font';
// import {getAdsDataAgain} from "../../config/firebase";
// import { useSelector, useDispatch } from "react-redux";
// import { increment } from "../../store/actions/CounterAction/counteraction";
import { StyleSheet, Text, View, ImageBackground, ScrollView, TextInput, Platform, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



function Searchbar(props) {
const navigation = useNavigation()
  //   const navigate = useNavigate();
  const [searchAdData, setSearchAdData] = useState("");

  const [toggle, setToggle] = useState(false)
  const getSearchAd = (event) => {
    setSearchAdData(event)
  }

  // const dispatch = useDispatch();

  //useSelector is to retrive data from store
  // const reduxState = useSelector((state) => state);
  // const reduxValue = useSelector((state) => state.CounterReducer.value);
const search = () => {
navigation.navigate("SearchItem")
}
  return (
    <>
      <View style={styles.searchBarBody} className="searchBarBody">
        <TextInput style={[styles.searchbarInputField, styles.shadowProp]} onChange={getSearchAd} type="text" placeholder="Discover ads" />
        <TouchableOpacity onPress={search}><View style={styles.searchBarSearchIconPic} >
          <Image
            source={require('../../../assets/Assets/images/icons/search.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </View></TouchableOpacity>
      </View>

    </>
  )
}
export default Searchbar
const styles = StyleSheet.create({
  searchBarBody: {
    width: 330,
    height: 50,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"

  },
  searchbarInputField: {
    width: 275,
    height: 35,
    fontSize: 12,
    paddingLeft: 15,
    border: "none",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchBarSearchIconPic: {
    width: 40,
    height: 35,
    backgroundColor: "#4e77ffc7",
    alignItems: "center",
    justifyContent: "center"
  }
});