import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { logoutUser } from './src/config/firebase';
import React, { useState, useEffect } from 'react';
import Dashboard from './src/views/Dashboard/dashboard';
import Signup from './src/views/Signup/signup';
import Login from "./src/views/Login/login";
import SearchItem from"./src/views/SearchItem/searchItem";
import ContactForm from "./src/views/ContactForm/contactForm";
import Whatsapp from "./src/views/Whatsapp/whatsapp";
import Chat from "./src/views/Chat/chat"
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen options={{ headerShown: false }} name="All Contacts" component={DashboardStack} />
        <Drawer.Screen name="Signup" component={Signup} />
        <Drawer.Screen name="Logout" component={Logout} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
function Logout() {
  useEffect(() => {
    performLogout();
  }, []);

  const performLogout = async () => {
    await logoutUser();
  };

  return (
    <Dashboard/>
  );
}

const DashboardStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen 
      name="Dashboard"
      component={Whatsapp}
      options={{ headerShown: false }}
      
       />
       <Stack.Screen 
      name="Signup"
      component={Signup}
       />
       <Stack.Screen 
       name="Login"
       component={Login}
        />
         
        
        
          <Stack.Screen 
        
        name="SearchItem" 
        options={{ headerShown: false }}
        component={SearchItem}
         />
         <Stack.Screen 
        
        name="ContactForm" 
        options={{ headerShown: false }}
        component={ContactForm}
         />
         <Stack.Screen 
        
        name="Whatsapp" 
        options={{ headerShown: false }}
        component={Whatsapp}
         />
                  <Stack.Screen 
        
        name="Chat" 
        options={{ headerShown: false }}
        component={Chat}
         />
      {/* Add more screens to the stack navigator */}
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <>
      <Text>Home</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
