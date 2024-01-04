import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Admin from '../screens/Admin';
import ManageAccount from '../screens/ManageAccount';
import PasswordUpdate from '../screens/PasswordUpdate';
import DeleteUser from '../screens/DeleteUser';
import AddItem from '../screens/AddItem';
const Stack=createStackNavigator()
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Splash} name='Splash' options ={{headerShown:false}}/>
        <Stack.Screen component={Login} name='Login' options ={{headerShown:false}}/>
        <Stack.Screen component={SignUp} name='SignUp' options ={{headerShown:false}}/>
        <Stack.Screen component={Admin} name='Admin' options ={{headerShown:false}}/>
        <Stack.Screen component={Home} name='Home' options ={{headerShown:false}}/>
        <Stack.Screen component={ManageAccount} name='ManageAccount' options ={{headerShown:false}}/>
        <Stack.Screen component={PasswordUpdate} name='PasswordUpdate' options ={{headerShown:false}}/>
        <Stack.Screen component={DeleteUser} name='DeleteUser' options ={{headerShown:false}}/>
        <Stack.Screen component={AddItem} name='AddItem' options ={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator