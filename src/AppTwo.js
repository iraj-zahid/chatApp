import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Dashboard from "./views/Dashboard/dashboard"

// Import your React Native components here

// Replace BrowserRouter and Routes with React Navigation components

function AppTwo() {
const Stack = createNativeStackNavigator();

  // const [user, setUser] = useState(undefined);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);

  // console.log(user);

  // const reduxState2 = useSelector((state) => {
  //   return state.CounterReducer.valueTwo;
  // });

  // const dispatch = useDispatch();

  // const protectedRoute = (component) => {
  //   if (!user) {
  //     return component;
  //   } else {
  //     return <Dashboard />;
  //   }
  // };

  // const protectedPublishRoute = (comp) => {
  //   if (!user) {
  //     return <Login />;
  //   } else {
  //     return comp;
  //   }
  // };

  // const protectedProfileRoute = (comp) => {
  //   if (!user) {
  //     return <Login />;
  //   } else {
  //     return comp;
  //   }
  // };

  // const protectedAdDetailRoute = (comp) => {
  //   if (!user) {
  //     return <Login />;
  //   } else {
  //     return comp;
  //   }
  // };

  // const protectedFavouriteRoute = (comp) => {
  //   if (!user) {
  //     return <Login />;
  //   } else {
  //     return comp;
  //   }
  // };

  // const protectedCartRoute = (comp) => {
  //   if (reduxState2) {
  //     return comp;
  //   } else {
  //     return <Dashboard />;
  //   }
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
       
        {/* <Stack.Screen name="Signup" component={Signup} /> */}
        {/* <Stack.Screen name="Login" component={protectedRoute(Login)} /> */}
        {/* <Stack.Screen
          name="PublishAd"
          component={protectedPublishRoute(PublishAd)}
        /> */}
        {/* <Stack.Screen name="SearchItem" component={SearchItem} /> */}
        {/* <Stack.Screen
          name="Profile"
          component={protectedProfileRoute(Profile)}
        />
        <Stack.Screen
          name="DetailAd"
          component={protectedAdDetailRoute(DetailAd)}
        />
        <Stack.Screen
          name="FavouriteAds"
          component={protectedFavouriteRoute(FavouriteAds)}
        />
        <Stack.Screen name="Cart" component={protectedCartRoute(Cart)} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppTwo;
