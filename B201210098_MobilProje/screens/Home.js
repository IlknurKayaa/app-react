import { View, Text ,SafeAreaView, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles';

export default function Home({ navigation }) {
  return (
    <SafeAreaView>
       <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin]}>
       <TouchableOpacity
       onPress={() => navigation.navigate("ManageAccount")}>
         <Image
           source={require('../assets/account.png')}
            style={AppStyles.buttonImage}
           >
         </Image>
        </TouchableOpacity>
      </View>

     
      </SafeAreaView>
)
}

 
