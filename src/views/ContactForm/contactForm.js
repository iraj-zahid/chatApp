import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {Contacts} from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigation } from '@react-navigation/native';

const ContactForm = () => {
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
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleContactNumberChange = (text) => {
    setContactNumber(text);
  };
  const ContactFunc = async () => {
    const ContactsRes = await Contacts(name,contactNumber,user)
    if (ContactsRes.status === "success") {
        console.log("done")
        navigation.navigate("Whatsapp")
      }
      else{
        console.log(ContactsRes.error)

      }
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Contact</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={handleContactNumberChange}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={ContactFunc}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    marginTop:100
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0090BC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 20,
    width:130
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ContactForm;
