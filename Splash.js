import { View, Text, StyleSheet , SafeAreaView} from 'react-native'
import React from 'react'
import { useEffect } from 'react'
const Splash = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login');
    },3000);
    },[])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ShOp</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
     logo:{
        fontSize:30,
        fontWeight:'800',
        color:'blue',
     },


});