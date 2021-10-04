import React,{useContext} from 'react'
import {View,Text,TouchableOpacity, Touchable} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from "./tabs/Notifications" ;
import Photo from "./tabs/Photo" ;
import TextScreen from "./tabs/Text"
import Icon from "react-native-vector-icons/AntDesign"
import Calculator from "./tabs/Calculator"
import { Context as AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Signup() {
    const {signout} = useContext(AuthContext)
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                  case 'Notification':
                      iconName='notifications-outline'
                    break;
                  case 'Photo':
                      iconName='image-outline'
                    break;
                  case 'Text':
                      iconName='text-outline'
                    break;
                  case 'Calculator':
                      iconName='calculator-outline'
                    break;
                                
                  default:
                      break;
              }
             
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#9F37F3',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel:false
          })}
        >
            <Tab.Screen  options={{headerTitleStyle:{fontFamily:'Poppins-Bold'},headerRight: () => (<TouchableOpacity style={{marginHorizontal:16}} onPress={signout}><Icon name='logout' size={32} color='#9F37F3'/></TouchableOpacity>)}} name="Notification" component={Notification} />
            <Tab.Screen options={{headerTitleStyle:{fontFamily:'Poppins-Bold'},headerRight: () => (<TouchableOpacity style={{marginHorizontal:16}} onPress={signout}><Icon name='logout' size={32} color='#9F37F3'/></TouchableOpacity>)}} name="Photo" component={Photo} />
            <Tab.Screen options={{headerTitleStyle:{fontFamily:'Poppins-Bold'},headerRight: () => (<TouchableOpacity style={{marginHorizontal:16}} onPress={signout}><Icon name='logout' size={32} color='#9F37F3'/></TouchableOpacity>)}} name="Text" component={TextScreen} />
            <Tab.Screen options={{headerTitleStyle:{fontFamily:'Poppins-Bold'},headerRight: () => (<TouchableOpacity style={{marginHorizontal:16}} onPress={signout}><Icon name='logout' size={32} color='#9F37F3'/></TouchableOpacity>)}} name="Calculator" component={Calculator} />
        </Tab.Navigator>
  
    )
}
