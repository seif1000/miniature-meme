import React,{useContext,useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Image} from "react-native"
import { Context as AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';

import { TextInput ,Button,HelperText} from 'react-native-paper';

const {width,height}  = Dimensions.get('screen')

export default function Signin(props) {
    const {state,signin,clearErrorMessage} = useContext(AuthContext)
    const [email,setEamil] = useState('') ;
    const [password,setPassword] = useState('') ;
   
    const emailHasEror = ()=>{
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email.trim().length!=0 && !re.test(email);
    }
    const passwordHasEror = ()=>{
      const re =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ ;
      return password.trim().length!=0 && !re.test(password);
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
             <Image source={require('../../assets/images/sign.png')} style={styles.image}/>
             <View style={styles.signupView}>
               <TouchableOpacity onPress={()=>{
                 clearErrorMessage()
                 props.navigation.navigate('SignUp')
                 }}>
                 <Icon name='swapleft' color='black' size={32}/>
              </TouchableOpacity>
              
               <Text style={{fontSize:18,fontFamily:'Poppins-Bold'}}>Sign Up</Text>
             </View>
        </View>
        <View style={styles.inputView}>
          <Text style={{fontSize:32,textAlign:'center',marginVertical:20,fontFamily:'Poppins-Bold'}}> Sign In </Text>
        {emailHasEror()&&  <HelperText style={{fontFamily:'Poppins-Regular'}} type="error" visible={emailHasEror()}>
            Email address is invalid!
          </HelperText>}
         
          <TextInput
            
             onChangeText={(text)=>{
               setEamil(text)
               clearErrorMessage()
              }}
            label="Email"
            style={{width:'90%',marginHorizontal:width*5/100,backgroundColor:'white',marginBottom:8,fontFamily:'Poppins-Regular'}}
          />
         
          
         {/* {passwordHasEror()&& <HelperText style={{fontFamily:'Poppins-Regular'}} type="error" visible={passwordHasEror()}>
             password must containe at least 8 characters with number,upper and lowercase .
          </HelperText>} */}
          <View style={{width:'90%',marginBottom:12}}>
            <TextInput
              secureTextEntry
              label="Password"
              style={{width:'100%',marginHorizontal:width*5/100,backgroundColor:'white',marginBottom:4}}
              onChangeText={(text)=>{
                setPassword(text)
                clearErrorMessage()
              }}
             
            />
            
            <Text onPress={()=>{props.navigation.navigate('Forget')}} style={{textAlign:'right',marginRight:-16,color:'#9F37F3',fontFamily:'Poppins-Medium'}}>Forget Password ?</Text>
          </View>
         
          
         <Button  
           mode="contained"
           onPress={() =>{signin(email,password)}}
           style={{width:'90%',marginHorizontal:width*5/100,borderRadius:32,backgroundColor:'#9F37F3'}}
           contentStyle={{paddingVertical:10}}
           uppercase={false}
           labelStyle={{fontFamily:'Poppins-Bold'}}
           disabled={(password.trim().length==0||email.trim().length==0)||( emailHasEror())}
           >
           Login
        </Button>
        <Text style={{fontFamily:'Poppins-Regular',marginLeft:16,color:'red',textAlign:'center',marginTop:6}}>{state.errorMessage}</Text>
        <View style={styles.SignView}>
          <Text style={{fontFamily:'Poppins-Regular'}}>you do not have Account?</Text>
          <TouchableOpacity onPress={()=>{
            clearErrorMessage()
            props.navigation.navigate('SignUp')
            }}>
            <Text style={{marginLeft:6,color:'#9F37F3',fontFamily:'Poppins-Medium'}}>Signup</Text>
          </TouchableOpacity>
        </View>
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
