import React ,{useContext,useState,useEffect} from 'react'
import {View,Text,TextInput,ActivityIndicator,FlatList} from "react-native"
import { Context as AuthContext } from '../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Button} from "react-native-paper"
import moment from "moment"


export default function TextScreen() {
   const {signout,state} = useContext(AuthContext)
   const [text, setText] = useState('');
   const [msgs,setMsgs] = useState([]) ;
   const [loading, setLoading] = useState(true)

   useEffect(() => {
    const subscriber = firestore()
    .collection('Users')
    .doc(state.user.uid)
    .collection('messages')
    .orderBy('time','desc')
    .onSnapshot(querySnapshot => {
      const messages = [];

      querySnapshot.forEach(documentSnapshot => {
      
        messages.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setMsgs(messages);
      setLoading(false);
    });

  // Unsubscribe from events when no longer in use
  return () => subscriber();
  }, []);

   const onSendMsg = ()=>{
    firestore()
    .collection('Users')
    .doc(state.user.uid)
    .collection('messages')
    .add({
      msg:text,
      time:new Date().getTime() 
    })
    .then(() => {
      setText('')
    })
    .catch(e=>console.log(e))
   }
   console.log(text)

    return (
      <View style={{flex:1,backgroundColor:'white'}}>
            <TextInput
              style={{marginVertical:16,width:'90%',backgroundColor:'#F8F8F8',marginHorizontal:'5%',borderRadius:10,fontFamily:'Poppins-Regular'}}
              multiline
              numberOfLines={6}
              placeholder='write a text'
              onChangeText={(text)=>{setText(text)}}
              value={text}
              
            />
              <Button  
                mode="contained"
                onPress={onSendMsg}
                style={{width:'30%',borderRadius:32,marginLeft:'5%',backgroundColor:'#9F37F3'}}
                contentStyle={{paddingVertical:6}}
                uppercase={false}
                labelStyle={{fontFamily:'Poppins-Bold'}}
                disabled={text.trim().length==0}
                
           >
            Send
        </Button>
        <>
        {
          loading
          ?
          <ActivityIndicator/>
          :
          <FlatList
            data={msgs}
            style={{marginTop:32}}
            renderItem={({ item }) => (
              <View style={{ width:'90%',marginHorizontal:'5%'}}>
                <View style={{width:'100%',paddingVertical:12,paddingHorizontal:8,backgroundColor:'#F8F8F8',marginVertical:8,borderRadius:20}}>
                  <Text style={{fontFamily:'Poppins-Medium'}}>{item.msg}</Text>
                </View>
                <Text style={{fontFamily:'Poppins-Bold',textAlign:'right',color:'#9F37F3'}}>{moment(item.time).fromNow()}</Text>
              </View>
            )}
        />
        }
        </>
       
      </View>
    )
}
