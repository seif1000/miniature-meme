import React,{useRef,useState,useContext,useEffect} from 'react'
import {View,Text,StyleSheet,Dimensions, TouchableOpacity,Image} from "react-native"
import { Button } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from 'react-native-image-crop-picker';
import { Context as AuthContext } from '../../context/AuthContext';
import Icon from "react-native-vector-icons/FontAwesome"
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';



const {width,height} = Dimensions.get('screen')
export default function Photo() {
   const refRBSheet = useRef();
   const {state} = useContext(AuthContext)
   const [imageUri,setImageUri] = useState(null)
   const [image,setImage] = useState(null)

   useEffect(()=>{
      const subscriber = firestore()
      .collection('Users')
      .doc(state.user.uid)
      .onSnapshot(documentSnapshot => {
         if(documentSnapshot.data() && documentSnapshot.data().image){
            setImage(documentSnapshot.data().image)
         }
      });

    // Stop listening for updates when no longer required
     return () => subscriber();
   },[])
  
 
  
   const onPressButton = (type, options) => {
    if (type === 'capture') {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setImageUri(image.path)
      }).catch(e=>console.log(e))
  
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
          setImageUri(image.path)
      })
      .catch(e=>console.log(e))
    }
  }
  const uploadFile = async ()=>{
     const reference = storage().ref(`/images/${new Date().getTime()}`) ;
      try {
     
      const task =  reference.putFile(imageUri);

      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      });

      task.then(async() => {
        console.log('Image uploaded to the bucket!');
         const url = await reference.getDownloadURL()
         
        await firestore().collection('Users').doc(state.user.uid).update({image:url})
        setImageUri(null)
          
      });
      } catch (error) {
        console.log(error)
      }
      
  }

  
   
   

    return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.imageContainer}>
                {
                  imageUri
                  ?
                  <Image 
                    source={{uri:imageUri}}
                    style={styles.image}
                  />
                  :
                  image
                  ?
                  <Image 
                  source={{uri:image}}
                  style={styles.image}
                  />
                  :
                  <Image 
                  source={require('../../../assets/images/photos.png')}
                  style={styles.image}
                  />

                }
                
         </TouchableOpacity>
         <Button  
           mode="contained"
           onPress={()=>{uploadFile()}}
           style={{width:'90%',marginHorizontal:width*5/100,borderRadius:32,backgroundColor:'#9F37F3',marginTop:32}}
           contentStyle={{paddingVertical:10}}
           uppercase={false}
           labelStyle={{fontFamily:'Poppins-Bold'}}
          disabled={!imageUri}
           >
           Login
        </Button>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={height*20/100}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)"
            },
            draggableIcon: {
              backgroundColor: "white"
            }
          }}
      >
        <View style={styles.iconContainer}>
        {
         actions.map((item,i)=>{
           return(
             <TouchableOpacity key={i} onPress={() => onPressButton(item.type, item.options)} style={styles.touchIconStyle}>
               <Icon name={item.icon} size={32} color='white' />
            </TouchableOpacity>
              )
         })
        }
        </View>
       
       
      </RBSheet>
          

      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
    backgroundColor:'white'
  },
  imageContainer:{
    width:width*90/100,
    height:200
  },
  image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover'
  },
  touchIconStyle:{
      width:80,
      height:80,
      borderRadius:40,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'lightgray',
      marginRight:16
  },
  iconContainer:{
     justifyContent:'center',
     alignItems:'center',
     flexDirection:'row'
  }
})
const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    icon:'camera',
    options: {
     
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    icon:'photo',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  
];