import { View, Text ,StyleSheet, TextInput,  Button, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import InlineTextButton from '../components/InlineTextButton';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function SignUp({ navigation }) {

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };

  let signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser);
        navigation.navigate("Home", { user: userCredential.user });
      })
      .catch((error) => {
        setValidationMessage(error.message);
      });
    }
  }

  return (
      <KeyboardAvoidingView 
        keyboardVerticalOffset={60}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
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
          onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)} />
        <TextInput  
          style={styles.input} 
          placeholder='Confirm Password'
          secureTextEntry={true} 
          value={confirmPassword} 
          onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)} />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={styles.sign}>Already have an account? </Text>
          <InlineTextButton text="Login" onPress={() => navigation.navigate("Login")} />
        </View>
        <Button title="Sign Up" onPress={signUp} />
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