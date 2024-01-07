import { View, Text ,TextInput,Button, TouchableOpacity} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import { updatePassword, signInWithEmailAndPassword} from 'firebase/auth';
import styles from '../styles/style';
export default function PasswordUpdate({ navigation }) {
  let [newPassword, setNewPassword] = React.useState("");
  let [currentPassword, setCurrentPassword] = React.useState("");
  let [errorMessage, setErrorMessage] = React.useState("");
  let updateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword).then(() => {
          setNewPassword("");
          setErrorMessage("");
          setCurrentPassword("");
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.errorText}>{errorMessage}</Text>
      <TextInput 
          style={AppStyles.input} 
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword} />
      <TextInput 
          style={AppStyles.input} 
          placeholder='New Password'
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
      <TouchableOpacity style={styles.uploadBtn}onPress={() => {
        updateUserPassword();
        navigation.pop();
        }}>
            <Text style={{color:'#fff'}}>Update</Text>
            </TouchableOpacity>
    </View>
  );
}