import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import styles from '../styles/style';
import AppStyles from '../styles/AppStyles';

const Delete = () => {
  const [name, setName] = useState('');

  const deleteItem = async (itemName) => {
    try {
      // Veriyi adı ile ara
      const q = query(collection(db, 'items'), where('name', '==', itemName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        // İlk bulunan belgeyi sil
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(db, 'items', docToDelete.id));
        console.log('Item deleted successfully.');
      } else {
        console.log('No matching item found to delete.');
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Delete Item</Text>
      </View>
      <TextInput 
        style={AppStyles.input} 
        placeholder='Name'
        value={name}
        onChangeText={setName} />
      <TouchableOpacity 
        style={styles.uploadBtn} 
        onPress={() => {
          deleteItem(name);
        }}>
        <Text style={{color:'#fff'}}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Delete;