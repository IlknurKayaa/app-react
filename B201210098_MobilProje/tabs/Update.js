import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styles from '../styles/style';
import AppStyles from '../styles/AppStyles';

const Update = () => {
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const updateItem = async () => {
    try {
      // Veriyi adı ile ara
      const q = query(collection(db, 'items'), where('name', '==', name));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        // İlk bulunan belgeyi güncelle
        const docToUpdate = querySnapshot.docs[0];
        const itemRef = doc(db, 'items', docToUpdate.id);

        // Yeni adı ve yeni fiyatı kullanarak güncelleme yap
        await updateDoc(itemRef, {
          name: newName || docToUpdate.data().name, // Yeni ad veya eski ad
          price: newPrice || docToUpdate.data().price, // Yeni fiyat veya eski fiyat
        });

        console.log('Item updated successfully.');
      } else {
        console.log('No matching item found to update.');
      }
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Update Item</Text>
      </View>
      <TextInput 
        style={AppStyles.input} 
        placeholder='Current Name'
        value={name}
        onChangeText={setName} />
      <TextInput 
        style={AppStyles.input} 
        placeholder='New Name (leave empty to keep the current name)'
        value={newName}
        onChangeText={setNewName} />
      <TextInput 
        style={AppStyles.input} 
        placeholder='New Price (leave empty to keep the current price)'
        value={newPrice}
        onChangeText={setNewPrice} />
      <TouchableOpacity 
        style={styles.uploadBtn} 
        onPress={() => {
          updateItem();
        }}>
        <Text style={{color:'#fff'}}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Update;