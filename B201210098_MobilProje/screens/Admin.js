import { View, Text ,SafeAreaView, TouchableOpacity,Image} from 'react-native'
import React, { useState } from 'react'
import AppStyles from '../styles/AppStyles';
import styles from '../styles/style';
import { auth } from "../firebase";
import { signOut} from 'firebase/auth';
import Items from '../tabs/Items';
import Add from '../tabs/Add';
import Delete from '../tabs/Delete';
import Update from '../tabs/Update';
import Setting from '../tabs/Setting';
export default function Admin({ navigation }) {
    let logout = () => {
        signOut(auth).then(() => {
          navigation.navigate("Login");
        });
      }
    const [selectedTab,setSelectedTab]=useState(0);
  return (
      <View style={styles.container}>
        {selectedTab == 0 ? (
        <Items />
      ) : selectedTab == 1 ? (
        <Add/>
      ) : selectedTab == 2 ? (
        <Delete />
      ): selectedTab == 3 ? (
        <Update />
      ) : selectedTab == 4 ? (
        <Setting/>
      ):(
        navigation.navigate("Login")
      )}

        <View style={styles.botView}>
          <TouchableOpacity style={styles.botTab}onPress={()=>{setSelectedTab(0)}}>
            <Image source={require('../assets/clipboard.png')} style={[styles.botTabImg, {tintColor: selectedTab==0 ? '#8b4513':'black'},]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.botTab}onPress={()=>{setSelectedTab(1)}}>
            <Image source={require('../assets/add.png')} style={[styles.botTabImg, {tintColor: selectedTab==1 ? '#8b4513':'black'},]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botTab}onPress={()=>{setSelectedTab(2)}}>
            <Image source={require('../assets/minus.png')} style={[styles.botTabImg, {tintColor: selectedTab==2 ? '#8b4513':'black'},]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botTab}onPress={()=>{setSelectedTab(3)}}>
            <Image source={require('../assets/refresh.png')} style={[styles.botTabImg, {tintColor: selectedTab==3 ? '#8b4513':'black'},{width:38,height:38}]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botTab}onPress={()=>{setSelectedTab(4)}}>
            <Image source={require('../assets/setting.png')} style={[styles.botTabImg, {tintColor: selectedTab==4 ? '#8b4513':'black'},]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botTab}onPress={()=>{setSelectedTab(5),logout()}}>
            <Image source={require('../assets/logout.png')} style={[styles.botTabImg, {tintColor: selectedTab==5 ? '#8b4513':'black'},]}/>
          </TouchableOpacity>
        </View>

      </View>


)
}