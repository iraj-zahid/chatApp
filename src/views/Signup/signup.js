// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, Platform } from 'react-native';
// import { signupUser } from '../../config/firebase';
// import { useNavigation } from '@react-navigation/native';
// import * as ImagePicker from 'expo-image-picker';



// function Signup() {
//   const navigation = useNavigation();
//   const [ttrue, setTtrue] = useState({
//     nameTrue: false,
//     emailTrue: false,
//     passwordTrue: false,
//     phoneTrue: false,
//   });
//   const [loginData, setLoginData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     image: '',
//   });

//   const emailStore = (event) => {
//     setLoginData((prevState) => ({
//       ...prevState,
//       email: event,
//     }));
//   };
//   const passwordStore = (event) => {
//     setLoginData((prevState) => ({
//       ...prevState,
//       password: event,
//     }));
//   };
//   const nameStore = (event) => {
//     setLoginData((prevState) => ({
//       ...prevState,
//       name: event,
//     }));
//   };
//   const phoneStore = (event) => {
//     setLoginData((prevState) => ({
//       ...prevState,
//       phone: event,
//     }));
//   };
//   const [errMsge, setErrMsge] = useState(false)

//   const signupSubmit = async () => {
//     const blobImage = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function() {
//         resolve(xhr.response)
//       }
//       xhr.onerror = function() {
//         reject(new TypeError("Ntework failed"))
//       }
//       xhr.responseType = "blob";
//       xhr.open("GET", loginData.image, true);
//       xhr.send(null)
//     })
//     console.log("click", loginData)

//     console.log(loginData);
//     const signupUserRes = await signupUser(
//       loginData.name,
//       loginData.email,
//       loginData.password,
//       loginData.phone,
//       blobImage
//     );
//     console.log(signupUserRes);

//     if (signupUserRes.status === 'error') {
//       console.log(signupUserRes.error);
//       setErrMsge(true)
//     } else {
//       //redirect
//       navigation.navigate('Dashboard');
//     }
//   };

//   const back = () => {
//     setTtrue((prevState) => ({
//       ...prevState,
//       nameTrue: false,
//       emailTrue: false,
//       passwordTrue: false,
//       phoneTrue: false,
//     }));
//   };
//   const adProfileImgFunction = (event) => {
//     setLoginData((prevState) => ({
//       ...prevState,
//       image: event.target.files,
//     }));
//     console.log(event.target.value);
//   };
//   const [imageUri, setImageUri] = useState(null);

//   // Function to handle image selection
//   const handleImageSelect = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       console.log('Permission to access camera roll is required!');
//       return;
//     }

//     const pickerResult = await ImagePicker.launchImageLibraryAsync();

//     if (!pickerResult.cancelled) {
//       const { uri, fileName, type } = pickerResult;
//       setImageUri(uri);
//       setLoginData((prevState) => ({
//         ...prevState,
//         image: uri,
//       }));
//     }
    
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//     <View style={styles.container}>
//       <Text style={styles.title}>REGISTER AN ACCOUNT</Text>
//       <View style={styles.form}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           autoCompleteType="off"
//           onClick={back}
//           onChangeText={nameStore}
//           placeholder="Enter name"
//         />
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           textContentType="none"
//           onPress={back}
//           onChangeText={emailStore}
//           placeholder="Enter email"
//         />
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           autoCompleteType="off"
//           placeholder="Enter password"
//           onPress={back}
//           onChangeText={passwordStore}
//         />
//         <Text style={styles.label}>Phone</Text>
//         <TextInput
//           autoCompleteType="off"
//           onPress={back}
//           onChangeText={phoneStore}
//           placeholder="Enter phone"
//         />
//         <Text style={styles.button}>Select profile picture</Text>
//         <Button onPress={handleImageSelect} style={{marginTop:10}} title="Select Image" />
//         {imageUri && (
//           <Image
//             source={{ uri: imageUri }}
//             style={styles.image}
//           />
//         )}
//         <Text style={{color:"red", marginTop:10}}>{errMsge?"*Invalid Credentials":""}</Text>

//         <Button style={styles.button} onPress={signupSubmit} title="Create an account" />
//       </View>
//     </View>
//     </KeyboardAvoidingView>
//   );
// }

// export default Signup;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   form: {
//     width: '80%',
//     flex: 1,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.5,
//     shadowRadius: 6,
//     elevation: 5, // Required for Android
//     marginBottom: 50,
//     borderRadius: 5,
//     paddingHorizontal: 20,
//     // alignContent:"center"
//   },
//   label: {
//     marginBottom: 5,
//   },
//   button: {
//     marginTop: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginVertical: 10,
//   },
// });


import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { signupUser } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

function Signup() {
  const navigation = useNavigation();
  const [inputFocus, setInputFocus] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleNameChange = (text) => {
    setSignupData((prevState) => ({
      ...prevState,
      name: text,
    }));
  };

  const handleEmailChange = (text) => {
    setSignupData((prevState) => ({
      ...prevState,
      email: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setSignupData((prevState) => ({
      ...prevState,
      password: text,
    }));
  };

  const handlePhoneChange = (text) => {
    setSignupData((prevState) => ({
      ...prevState,
      phone: text,
    }));
  };

  const handleSignup = async () => {
    const blobImage = await fetch(signupData.image).then((response) => response.blob());

    const signupUserRes = await signupUser(
      signupData.name,
      signupData.email,
      signupData.password,
      signupData.phone,
      blobImage
    );

    if (signupUserRes.status === 'error') {
      setErrorMessage(true);
      console.log(signupUserRes.error);
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  const handleInputBlur = () => {
    setInputFocus(false);
  };

  const handleImageSelect = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      const { uri } = pickerResult;
      setImageUri(uri);
      setSignupData((prevState) => ({
        ...prevState,
        image: uri,
      }));
    }
  };

  return (
    <ScrollView >

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      <View style={styles.form}>
        <Text style={styles.title}>REGISTER AN ACCOUNT</Text>

        <Text style={[styles.label, inputFocus && styles.labelFocused]}>Name</Text>
        <TextInput
          style={[styles.input, inputFocus && styles.inputFocused]}
          autoCompleteType="name"
          onChangeText={handleNameChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Enter name"
        />

        <Text style={[styles.label, inputFocus && styles.labelFocused]}>Email</Text>
        <TextInput
          style={[styles.input, inputFocus && styles.inputFocused]}
          autoCompleteType="email"
          onChangeText={handleEmailChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Enter email"
        />

        <Text style={[styles.label, inputFocus && styles.labelFocused]}>Password</Text>
        <TextInput
          style={[styles.input, inputFocus && styles.inputFocused]}
          secureTextEntry
          onChangeText={handlePasswordChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Enter password"
        />

        <Text style={[styles.label, inputFocus && styles.labelFocused]}>Phone</Text>
        <TextInput
          style={[styles.input, inputFocus && styles.inputFocused]}
          autoCompleteType="tel"
          onChangeText={handlePhoneChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Enter phone"
        />

        <Button onPress={handleImageSelect} title="Select Profile Picture" />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {errorMessage && <Text style={styles.errorMessage}>*Invalid Credentials</Text>}

        <Button style={styles.button} onPress={handleSignup} title="Create an account" />
      </View>

    </KeyboardAvoidingView>
    </ScrollView>

  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: '#075E54',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 40,
  width: "100%",
  },
  form: {
    width: '80%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5, // Required for Android
    marginBottom: 50,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#075E54',
  },
  labelFocused: {
    color: '#128C7E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#075E54',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#128C7E',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#075E54',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
