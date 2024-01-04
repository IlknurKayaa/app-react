import { View, Text ,StyleSheet, TextInput,  Button, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {

  if (auth.currentUser) {
    const currentUser=auth.currentUser;
    const email= currentUser.email;
    if(email == "ilkaya043@gmail.com"){
        navigation.navigate("Admin");
    }else{
        navigation.navigate("Home");
    }
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email=user.email;
        if(email == "ilkaya043@gmail.com"){
            navigation.navigate("Admin");
        }else{
            navigation.navigate("Home");
        }
      }
    });
  }

  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let login = () => {
    if (email !== "" && password !== "") {
        if(email == "ilkaya043@gmail.com" && password!== ""){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              navigation.navigate("Admin", { user: userCredential.user });
              setErrorMessage("");
              setEmail("");
              setPassword("");
            })
            .catch((error) => {
              setErrorMessage(error.message)
            });
        }
        else{
             signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
             navigation.navigate("Home", { user: userCredential.user });
             setErrorMessage("");
             setEmail("");
            setPassword("");
         })
            .catch((error) => {
             setErrorMessage(error.message)
         });
        }
    } 
    else {
      setErrorMessage("Please enter an email and password");
    }
  }


  return (
      <KeyboardAvoidingView 
        keyboardVerticalOffset={60}>
        <Text style={styles.title}>Login</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Email' 
          value={email}
          onChangeText={setEmail} />
        <TextInput 
          style={styles.input} 
          placeholder='Password' 
          secureTextEntry={true} 
          value={password} 
          onChangeText={setPassword} />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={styles.sign}>Don't have an account? </Text>
          <InlineTextButton text="Sign Up" onPress={() => navigation.navigate("SignUp")} />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={login} >
            <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
      </KeyboardAvoidingView>
  );

}

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