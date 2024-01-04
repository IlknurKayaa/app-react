import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import { signOut} from 'firebase/auth';

export default function ManageAccount({ navigation }) {
  let logout = () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    });
  }

  return (
    <View style={AppStyles.container}>
      <TouchableOpacity style={AppStyles.button} onPress={() => navigation.navigate("PasswordUpdate")}>
        <Text style={AppStyles.buttonText}> Update Password</Text>
        </TouchableOpacity>
      <TouchableOpacity style={AppStyles.button}onPress={() => navigation.navigate("DeleteUser")} >
        <Text style={AppStyles.buttonText}>Delete User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Wish List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Favorite</Text>
        </TouchableOpacity>
      <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Home</Text>
        </TouchableOpacity>
     <TouchableOpacity style={AppStyles.button} onPress={logout} >
        <Text style={AppStyles.buttonText}>Log Out</Text>
        </TouchableOpacity>
    </View>
  );
}