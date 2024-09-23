import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MyReqData } from '../../data/MyReqData';
import AllRequests from '../../components/AllRequests';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 20,
  },  
});
 
export default function OtherRequests() {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();
 
  return (    
    <SafeAreaView style={styles.container}>            
     
           
      <AllRequests data={MyReqData}/>      
            
    
    </SafeAreaView>
  )
}