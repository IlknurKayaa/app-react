import { View, Text ,StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
     <Text style={styles.title}>Login</Text>
     <TextInput style = {styles.input}placeholder='E-mail'></TextInput>
     <TextInput style = {styles.input}placeholder='Password'></TextInput>
     <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}> Login</Text>
     </TouchableOpacity>
     <View className="sign">
     <Text style={styles.sign}>Don't have an account?
     <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signText}>Sign Up</Text>
     </TouchableOpacity>
     </Text>
     </View>
    
    </View>

    
  )
}

export default Login
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    title:{
        fontSize:30,
        fontWeight:'800',
        color:'blue',
        marginTop:100,
        alignSelf:'center'
    },
    input:{
        paddingLeft:20,
        height:50,
        alignSelf:'center',
        borderWidth:1,
        borderColor:'gray',
        borderRadius:20,
        marginTop:30,
        width:'90%',
    },
    loginButton:{
        backgroundColor:'skyblue',
        marginTop:50,
        width:200,
        height:45,
        alignSelf:'center',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        fontSize:18,
        fontWeight:'400',
        color:'blue',

    },
    signText:{
       color:'blue',
    },
    sign:{
        marginTop:20,
        alignSelf:'center',
    }
});