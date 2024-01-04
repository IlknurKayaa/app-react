import { View, Text ,TextInput,Button, TouchableOpacity} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import {  signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

export default function DeleteUser({ navigation }) {
  let [errorMessage, setErrorMessage] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let delUser = () => {
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          if (userCredential) {
            const user = userCredential.user;
  
            // Get all todos for user and delete
            deleteUser(user).then(() => {
              navigation.navigate("Login");
            }).catch((error) => {
              setErrorMessage(error.message);
            });
          } else {
            setErrorMessage("User authentication failed.");
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };
  

  return (
    <View style={AppStyles.container}>
    <Text style={AppStyles.errorText}>{errorMessage}</Text>
          <TextInput 
              style={[AppStyles.textInput, AppStyles.darkTextInput]} 
              placeholder='Current Password'
              value={currentPassword}
              secureTextEntry={true}
              onChangeText={setCurrentPassword} />
      <TouchableOpacity style={AppStyles.button}  onPress={delUser} >
        <Text style={AppStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
    </View>
  );
}