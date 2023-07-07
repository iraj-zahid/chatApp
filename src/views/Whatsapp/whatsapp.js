import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth, getContacts, getProfileData } from "../../config/firebase";
import { useNavigation } from '@react-navigation/native';
import ContactForm from '../ContactForm/contactForm';


const Whatsapp = () => {
  const navigation = useNavigation();

    const [user, setUser] = useState()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid)
                // console.log(user)
            } else {
            }
        });
    }, []);
    // getting contact data
    const [contactData, setContactData] = useState([]);
    const getContactData = async () => {
        //firebase function call for user data
        const res = await getContacts();
        setContactData(res.data);
    };

    useEffect(() => {
        getContactData();
    }, []);
    // console.log(contactData)
    // getting Signup data
    const [getProfiledata, setgetProfiledata] = useState([]);
    const getProfileUserData = async () => {
        //firebase function call for user data
        const res = await getProfileData();
        setgetProfiledata(res.data);
    };

    useEffect(() => {
        getProfileUserData();
    }, []);
    // console.log("signup",getProfiledata)
    // filteration
    const filterContact = contactData.filter(item => {
        if (item.id == user) {
            return item
        }
    });

    const filterContacts = filterContact.map(item => {
        const filterObj = getProfiledata.filter(obj => {
            if (obj.phone === item.contact) {
                return obj
            }
        });
        return filterObj 
    });
    console.log("music", filterContacts)
    console.log("musihc", filterContact)
const filterName  = getProfiledata.filter(obj => {
    if(obj.id == user){
        return obj.name
    }
})
console.log("name",filterName)
const ContactFormFunc = () => {
    if(user){
        navigation.navigate("ContactForm")
    }
    else{
        navigation.navigate("Login")

    }
}
    return (
        <View style={styles.container}>
             <View style={styles.header}>
      <Text style={styles.title}>Contacts</Text>
      <TouchableOpacity onPress={ContactFormFunc} style={{marginLeft:128,marginTop:2}}>
      <Image
    style={{width:80, height:80}}
    source={require("../../../assets/Assets/images/icons/addTwo.png")}
    resizeMode="contain"
  />
      </TouchableOpacity>
    </View>
    
            <ScrollView style={{ width: "100%" }}>
                {filterContacts.map((item) => {
                    console.log("item",item)
                    return item.map((e) => {
                        return (
                            <>
                                <TouchableOpacity onPress={() => {navigation.navigate("Chat", { chatPerson: e, name:filterName })}} style={styles.contactItem}>
                                    <Image resizeMode="contain" source={{ uri: e.image[0] }} style={styles.profileImage} />
                                    <Text style={styles.name}>{e.name}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    })
                   
                })}

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 0,
        marginTop: 0

    },
    contactItem: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5,
        backgroundColor: 'grey',
        backgroundColor: '#F5F5F5',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        paddingVertical: 9
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#075E54', // Dark green color
        height: 90,
        width:"100%",
        // justifyContent: 'center',
        paddingHorizontal: 0,
        paddingTop:15,
        flexDirection:"row"
      },
      title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
        marginLeft:40,
        marginTop:30
      },
      button: {
        backgroundColor: '#007AFF', // Blue color
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      buttonText: {
        color: '#FFFFFF', // White color
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default Whatsapp;
