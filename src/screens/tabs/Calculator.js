import React ,{useState,useEffect}from 'react'
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Touchable} from "react-native"
import ModalSelector from 'react-native-modal-selector'
import {Button } from 'react-native-paper'

export default function Calculator() {
  const [first,setFirst] = useState('0')
  const [second,setSecond] = useState('0')
  const [opt,setOpt] = useState({key: index++,  label: '+',opt:'addition'})
  const [result,setResutl] = useState(0) ;
  let index = 0;
  const data = [
      { key: index++,  label: '+',opt:'addition,' },
      { key: index++, label: '-',opt:'subtraction' },
      { key: index++, label: '*',opt:'multiplication.' },
     
  ];
  const sendToApi = ()=>{
    const data = { one: first,two:second,opt:opt.label };

    fetch('https://us-central1-nordstone-27416.cloudfunctions.net/app/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
       setResutl(data.data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  
 
 
   
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
          <View style={styles.calcView}>
             <TextInput
              style={styles.input}
              value={first}
              onChangeText={(text)=>{setFirst(text)}}
              keyboardType='numeric'
              placeholder='0'
             />
             <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    supportedOrientations={['landscape']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ setOpt(option)}}
                    optionContainerStyle={{
                      backgroundColor:'white'
                    }}
                    optionTextStyle={{
                      fontFamily:'Poppins-Bold',
                      fontSize:42
                    }}
                    cancelStyle={{
                      backgroundColor:'#9F37F3',
                      paddingVertical:8
                    }}
                    cancelTextStyle={{
                      fontFamily:'Poppins-Bold',
                      fontSize:20,
                      color:'white'
                    }}
                    >
                    <TouchableOpacity style={{marginHorizontal:24,width:50,height:50,borderRadius:25,backgroundColor:'lightblue',justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontFamily:'Poppins-Bold',fontSize:22}}>{opt.label}</Text>
                    </TouchableOpacity>

                </ModalSelector>
             <TextInput
               style={styles.input}
               value={second}
               onChangeText={(text)=>{setSecond(text)}}
               keyboardType='numeric'
               placeholder='0'
              />
          </View>
          <Button  
                mode="contained"
                onPress={sendToApi}
                style={{width:'80%',borderRadius:32,marginHorizontal:'10%',backgroundColor:'#9F37F3',marginTop:24}}
                contentStyle={{paddingVertical:6}}
                uppercase={false}
                labelStyle={{fontFamily:'Poppins-Bold'}}
                disabled={first.trim().length==0||second.trim().length==0}
                
           >
             Calculate
           </Button>
           <View >
             <Text style={{fontFamily:'Poppins-Bold',fontSize:20,marginTop:16,textAlign:'center'}}>Result</Text>
             <Text style={{fontFamily:'Poppins-Bold',fontSize:48,marginTop:16,textAlign:'center'}}>{result}</Text>
           </View>
      </View>
    )
}
const styles = StyleSheet.create({
  calcView:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'  
  },
  input:{
    width:'30%',
    height:80,
    backgroundColor:'#F8F8F8',
    color:'black',
    textAlign:'center',
    fontFamily:'Poppins-Bold',
    paddingVertical:8,
    borderRadius:20,
    fontSize:18
  }
})
