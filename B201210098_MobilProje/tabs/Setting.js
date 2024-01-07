import { View, Text,ScrollView, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/style';
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";
import { signOut, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
function Setting({ navigation }) {
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
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
        <TextInput 
          style={[AppStyles.input]} 
          placeholder='Current Password'
          value={currentPassword}
          secureTextEntry={true}
          onChangeText={setCurrentPassword} />
      <TextInput 
          style={[AppStyles.input]} 
          placeholder='New Password'
          value={newPassword}
          secureTextEntry={true}
          onChangeText={setNewPassword} />
        <TouchableOpacity style={styles.uploadBtn}onPress={updateUserPassword}>
        <Text style={{color:'#fff'}}>Update</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn}onPress={delUser}>
        <Text style={{color:'#fff'}}>Delete</Text>
        </TouchableOpacity>









    </View>
    </ScrollView>
  )
}

export default Setting