import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';
import { auth, db } from "../firebase";

import { collection, addDoc} from "firebase/firestore"; 

import React from 'react';
import AddModal from '../components/AddModal';

export default function AddItem({ navigation }) {
    let [items, setItems] = React.useState([]);

    let addItem = async (category,name,price) => {
        let itemSave = {
          category: category,
          name: name,
          price:price
        };
        const docRef = await addDoc(collection(db, "items"), itemSave);
    
        itemSave.id = docRef.id;
    
        let updateditem = [...items];
        updateditem.push(itemSave);
    
        setItems(updateditem);
      };

 return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        >
        <AddModal 
          addItem={addItem} />
      </Modal>
    </SafeAreaView>
  )





}