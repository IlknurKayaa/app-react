import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import AppStyles from '../styles/AppStyles';
const background = require("../assets/splash.jpg");
const Splash = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login');
    },3000);
    },[])

  return (
    <ImageBackground source={background} style={[AppStyles.imageContainer,{opacity:0.8}]}>
    <View style={styles.container}>
      <Text style={styles.logo}>PENStore</Text>
    </View>
    </ImageBackground>
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
        color:'#8b4513',
     },


});