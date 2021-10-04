import React,{useContext,useState} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image} from "react-native"
import { Context as AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';

import { TextInput ,Button,HelperText} from 'react-native-paper';
import auth from "@react-native-firebase/auth"

const {width,height}  = Dimensions.get('screen')

export default function Signin(props) {
     const [email,setEmail] = useState('')
     const emailHasEror = ()=>{
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email.trim().length!=0 && !re.test(email);
    }
    const onSendEamil = async ()=>{
      try {
       await  auth().sendPasswordResetEmail(email)
       alert('check you email')
       setTimeout(()=>{
           props.navigation.navigate('SignIn')
       },1500)
      } catch (error) {
        console.log(error)
      }
     
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
             <Image source={require('../../assets/images/sign.png')} style={styles.image}/>
             <View style={styles.signupView}>
               <TouchableOpacity onPress={()=>{props.navigation.navigate('SignUp')}}>
                 <Icon name='swapleft' color='black' size={32}/>
              </TouchableOpacity>
              
               <Text style={{fontSize:18,fontFamily:'Poppins-Bold'}}>Sign Up</Text>
             </View>
        </View>
        <View style={styles.inputView}>
          <Text style={{fontSize:32,textAlign:'center',marginVertical:12,fontFamily:'Poppins-Bold'}}> Reset Password </Text>
          <TextInput
          onChangeText={(text)=>{setEmail(text)}}
          label="Email"
          style={{width:'90%',marginHorizontal:width*5/100,backgroundColor:'white',marginBottom:12,fontFamily:'Poppins-Regular'}}
          />
          {emailHasEror()&&  <HelperText style={{fontFamily:'Poppins-Regular'}} type="error" visible={emailHasEror()}>
            Email address is invalid!
          </HelperText>}
         <Button  
           mode="contained"
           onPress={() => onSendEamil()}
           style={{width:'90%',marginHorizontal:width*5/100,borderRadius:32,backgroundColor:'#9F37F3'}}
           contentStyle={{paddingVertical:10}}
           uppercase={false}
           labelStyle={{fontFamily:'Poppins-Bold'}}
           disabled={(email.trim().length==0)||( emailHasEror())}
           >
           Login
        </Button>
       
        </View>
         
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },
  imageView:{
    height:height*30/100,
    position:'relative'

  },
  inputView:{
    height:height*70/100,
    backgroundColor:'#F8F8F8',
    borderTopLeftRadius:32,
    borderTopRightRadius:32,
    
  },
  image:{
    width:width*90/100,
    height:'100%',
    position:'absolute',
    top:'15%',
    
  },
  SignView:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:32
  },
  
  signupView:{

    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:16,
    marginTop:32
  },
})
