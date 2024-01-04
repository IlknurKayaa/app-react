import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';
import { applyActionCode } from 'firebase/auth';

export default function AddModal(props) {
  let [category, setCategory] = React.useState("");
  let [name, setName] = React.useState("");
  let [price, setPrice] = React.useState("");
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Item</Text>
      <TextInput 
          style={AppStyles.input} 
          placeholder='Category'
          value={category}
          onChangeText={setCategory} />
        <TextInput 
          style={AppStyles.input} 
          placeholder='Name'
          value={name}
          onChangeText={setName} />
         <TextInput 
          style={AppStyles.input} 
          placeholder='Price'
          value={price}
          onChangeText={setPrice} />
      <View>
        <TouchableOpacity style={AppStyles.button} onPress={props.onClose} >
            <Text style={AppStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        <TouchableOpacity style={AppStyles.button} onPress={() => {
          props.addItem(category);
          setCategory("");
          props.addItem(name);
          setName("");
          props.addItem(price);
          setPrice("");
        }} >
            <Text style={AppStyles.buttonText}>OK</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}