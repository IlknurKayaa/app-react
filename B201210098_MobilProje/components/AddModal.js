import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import AppStyles from '../styles/AppStyles';
import styles from '../styles/style';
import * as ImagePicker from 'expo-image-picker';
import { storage,getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage fonksiyonlarını ekledik

export default function AddModal(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const openImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Galeri izni reddedildi!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Result URI:', result.uri);

      if (!result.cancelled && result.uri) {
        setImageUrl(result.uri);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!imageUrl) {
        alert('Lütfen bir resim seçin.');
        return;
      }

      // Resmi Firebase Storage'a yükleme
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const imageName = `item_${Date.now()}`;
      const storage = getStorage(); // Storage fonksiyonlarını almak için
      const storageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(storageRef, blob);
      const imageUrlInStorage = await getDownloadURL(storageRef);

      props.addItem(name, price, imageUrlInStorage);
      setName("");
      setPrice("");
      setImageUrl(null); // Resim URL'sini sıfırla
      props.onClose(); // Modalı kapat
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={AppStyles.input}
        placeholder='Name'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={AppStyles.input}
        placeholder='Price'
        value={price}
        onChangeText={setPrice}
      />
            <TouchableOpacity style={styles.uploadBtn} onPress={openImagePicker}>
        <Text style={{ color: '#fff' }}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn} onPress={handleAddItem}>
        <Text style={{ color: '#fff' }}>OK</Text>
      </TouchableOpacity>

      {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} />}
    </View>
  );
}
