import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import styles from '../styles/style';

const Wish = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, 'wishlist'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const wishlistData = [];

          for (const wishlistDoc of querySnapshot.docs) {
            const { productId } = wishlistDoc.data();

            try {
              const productDocRef = doc(db, 'items', productId);
              const productDocSnapshot = await getDoc(productDocRef);

              if (productDocSnapshot.exists()) {
                wishlistData.push({
                  id: wishlistDoc.id,
                  ...productDocSnapshot.data(),
                });
              } else {
                console.log(`Ürün bulunamadı: ${productId}`);
              }
            } catch (error) {
              console.error('Error fetching product:', error.message);
            }
          }

          setWishlist(wishlistData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error.message);
      }
    };

    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const removeFromWishlist = async (wishlistId) => {
    try {
      await deleteDoc(doc(db, 'wishlist', wishlistId));
      // After removing from Firestore, update the local state
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error('Error removing from wishlist:', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My WishList</Text>
      </View>
      <FlatList
      style={{width:'100%'}}
        data={wishlist}
        renderItem={({ item }) => (
          <View style={[styles.listItem,{backgroundColor:'#eed5b7'}]}>
            {console.log('item:', item)}
            <TouchableOpacity
              style={styles.removeIconContainer}
              onPress={() => removeFromWishlist(item.id)}
            >
               <Image source={require('../assets/trash.png')} style={{width:20,height:20, marginLeft:340}} />
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

export default Wish;
