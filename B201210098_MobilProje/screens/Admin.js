import { View, Text ,SafeAreaView, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';
import { auth } from "../firebase";
import { signOut} from 'firebase/auth';
export default function Admin({ navigation }) {
    let logout = () => {
        signOut(auth).then(() => {
          navigation.navigate("Login");
        });
      }
    
  return (
    <SafeAreaView>
       <View>
       <TouchableOpacity style={AppStyles.button} onPress={() => navigation.navigate("PasswordUpdate")}>
        <Text style={AppStyles.buttonText}> Update Password</Text>
        </TouchableOpacity>
      <TouchableOpacity style={AppStyles.button}onPress={() => navigation.navigate("DeleteUser")} >
        <Text style={AppStyles.buttonText}>Delete User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => navigation.navigate("AddItem")} >
        <Text style={AppStyles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Delete Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Update Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Item List</Text>
        </TouchableOpacity>
      <TouchableOpacity style={AppStyles.button} onPress={() => navigation.pop()} >
        <Text style={AppStyles.buttonText}>Home</Text>
        </TouchableOpacity>
     <TouchableOpacity style={AppStyles.button} onPress={logout} >
        <Text style={AppStyles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

     
      </SafeAreaView>
)
}