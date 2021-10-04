import React,{useEffect,useState,useContext,useRef} from 'react'
import {View,Text,Button} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/Signup';
import Forget from "./src/screens/ForgetPassword"
import  Signin from './src/screens/Signin';
import Home from "./src/screens/Home"
import auth from '@react-native-firebase/auth';
import { Context as AuthContext } from './src/context/AuthContext';
import PushNotification from "react-native-push-notification";






const Stack = createNativeStackNavigator();



 
export default function App() {
  const {state,tryLocalSignin,signout} = useContext(AuthContext)
  const notificationListener = useRef();
  const responseListener = useRef();
 useEffect(()=>{
       tryLocalSignin()
 },[])


 useEffect(() => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
      
    },
  
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      if (notification.foreground) {
        PushNotification.localNotification({
          channelId: "channel-id",
          title:notification.title,
          message:notification.message,
          playSound:true
        });
        } 
  
      // process the notification
  
      // (required) Called when a remote is received or opened, or local notification is opened
     // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    senderID:"994814954506",
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  
    
}, []);

 if(state.initializing){
   return null
 }
 
  return (
    
        <NavigationContainer>
          <Stack.Navigator>
         
            {
              state.user
              ?
              <Stack.Screen name="Home" 
                component={Home}  
                options={{
                  headerShown:false,
                
                }} 

                />
              :
              <>
                <Stack.Screen name="SignIn" component={Signin} options={{headerShown:false}} />
              <Stack.Screen name="SignUp" component={Signup}   options={{headerShown:false}} />
              <Stack.Screen name="Forget" component={Forget} options={{headerShown:false}} />
              </>
            }
            
            

        </Stack.Navigator>     
          
      </NavigationContainer>
   
  )
}

