import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/style';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AppStyles from '../styles/AppStyles';
import AddModal from '../components/AddModal';

const Add = () => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState(null); // Yeni state

  const addItem = async (name, price, imageUrl) => {
    try {
      let itemToSave = {
        name: name,
        price: price,
        imageUrl: imageUrl,
      };
      const docRef = await addDoc(collection(db, 'items'), itemToSave);

      itemToSave.id = docRef.id;

      let updatedItems = [...items];
      updatedItems.push(itemToSave);

      setItems(updatedItems);
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Item</Text>
        </View>
        <AddModal
          onClose={() => setModalVisible(false)}
          addItem={addItem}
          customImageUrl={customImageUrl} 
          setCustomImageUrl={setCustomImageUrl} 
        />
      </View>
    </ScrollView>
  );
};

export default Add;
