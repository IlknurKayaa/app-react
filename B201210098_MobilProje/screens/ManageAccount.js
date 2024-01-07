import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import { signOut} from 'firebase/auth';
import styles from '../styles/style';
export default function ManageAccount({ navigation }) {
  let logout = () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    });
  }

  return (
    <View style={AppStyles.container}>
      <TouchableOpacity style={styles.uploadBtn} onPress={() => navigation.navigate("PasswordUpdate")}>
        <Text style={{color:'#fff'}}> Update Password</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn}onPress={() => navigation.navigate("DeleteUser")} >
        <Text style={{color:'#fff'}}>Delete User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => navigation.navigate("Wish")} >
        <Text style={{color:'#fff'}}>Wish List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadBtn} onPress={() => navigation.navigate("Favorite")} >
        <Text style={{color:'#fff'}}>Favorite</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn} onPress={() => navigation.pop()} >
        <Text style={{color:'#fff'}}>Home</Text>
        </TouchableOpacity>
     <TouchableOpacity style={styles.uploadBtn} onPress={logout} >
        <Text style={{color:'#fff'}}>Log Out</Text>
        </TouchableOpacity>
    </View>
  );
}