// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView, Platform } from 'react-native';
// import { loginUser } from "../../config/firebase";
// import * as ImagePicker from 'expo-image-picker';
// import { useNavigation } from '@react-navigation/native';


// function Login() {
//   const navigation = useNavigation();
//   const [ttrue, setTtrue] = useState({
//     nameTrue: false,
//     emailTrue: false,
//     passwordTrue: false,
//     phoneTrue: false,
//   });
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
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
  
// const [errMsge, setErrMsge] = useState(false)
  
//   const loginBtnFunction = async () => {
//     const loginUserRes = await loginUser(loginData.email,
//         loginData.password,)
//     if (loginUserRes.status === "error") {
//       setErrMsge(true)
//         console.log(loginUserRes)
//     } else {
//         navigation.navigate('Dashboard');

//     }

// }


//   const back = () => {
//     setTtrue((prevState) => ({
//       ...prevState,
//       nameTrue: false,
//       emailTrue: false,
//       passwordTrue: false,
//       phoneTrue: false,
//     }));
//   };
  

  

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//     <View style={styles.container}>
//       <Text style={styles.title}>ACCESS TO YOUR ACCOUNT</Text>
//       <View style={styles.form}>
        
//         <Text style={styles.label}>Email</Text>
//         <TextInput
//                     textContentType="none"

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
        
//         <Text style={{color:"red", marginTop:10}}>{errMsge?"*Invalid Credentials":""}</Text>
       
//         <Button style={styles.button} onPress={loginBtnFunction} title="Login" />
//       </View>
//     </View>
//     </KeyboardAvoidingView>
//   );
// }

// export default Login;

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
//     marginBottom: 150,
//     borderRadius: 5,
//     paddingHorizontal: 20,
//     // alignItems:"center",
//     justifyContent:"center"
//   },
//   label: {
//     marginBottom: 5,
//     fontSize:19,
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
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { loginUser } from "../../config/firebase";
import { useNavigation } from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();
  const [inputFocus, setInputFocus] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(false);

  const handleEmailChange = (text) => {
    setLoginData((prevState) => ({
      ...prevState,
      email: text,
    }));
  };

  const handlePasswordChange = (text) => {
    setLoginData((prevState) => ({
      ...prevState,
      password: text,
    }));
  };

  const handleLogin = async () => {
    const loginUserRes = await loginUser(loginData.email, loginData.password);
    if (loginUserRes.status === "error") {
      setErrorMessage(true);
      console.log(loginUserRes);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.title}>ACCESS TO YOUR ACCOUNT</Text>

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
          autoCompleteType="password"
          secureTextEntry
          onChangeText={handlePasswordChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Enter password"
        />

        {errorMessage && <Text style={styles.errorMessage}>*Invalid Credentials</Text>}

        <Button style={styles.button} onPress={handleLogin} title="Login" />

      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5, // Required for Android
    borderRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#075E54',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#075E54',
    marginBottom: 5,
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
});
