import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styles from '../styles/style';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, 'favorites'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const favoritesData = [];

          for (const favoritesDoc of querySnapshot.docs) {
            const { productId } = favoritesDoc.data();

            try {
              const productDocRef = doc(db, 'items', productId);
              const productDocSnapshot = await getDoc(productDocRef);

              if (productDocSnapshot.exists()) {
                favoritesData.push({
                  id: favoritesDoc.id,
                  ...productDocSnapshot.data(),
                });
              } else {
                console.log(`Ürün bulunamadı: ${productId}`);
              }
            } catch (error) {
              console.error('Error fetching product:', error.message);
            }
          }

          setFavorites(favoritesData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const removeFromFavorites = async (favoritesId) => {
    try {
      await deleteDoc(doc(db, 'favorites', favoritesId));
      // After removing from Firestore, update the local state
      setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== favoritesId));
    } catch (error) {
      console.error('Error removing from favorites:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favorites</Text>
      </View>
      <FlatList
        style={{ width: '100%' }}
        data={favorites}
        renderItem={({ item }) => (
          <View style={[styles.listItem,{backgroundColor:'#eed5b7'}]}>
            {console.log('item:', item)}
            <TouchableOpacity
              style={styles.removeIconContainer}
              onPress={() => removeFromFavorites(item.id)}
            >
              <Image source={require('../assets/trash.png')} style={{ width: 20, height: 20, marginLeft: 340 }} />
            </TouchableOpacity>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={{ width: 180, height: 100 }} />}
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} TL</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Favorites;
