import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppStyles from '../styles/AppStyles';
import styles from '../styles/style';
import { collection, addDoc, getDocs, query, where, deleteDoc,doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
    };

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    const fetchWishlist = async () => {
      try {
        if (user) {
          // Firebase Firestore'dan wishlist verilerini çekme işlemi
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error.message);
      }
    };

    const fetchFavorites = async () => {
      try {
        if (user) {
          // Firebase Firestore'dan favorites verilerini çekme işlemi
        }
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    fetchUser();
    fetchProducts();
    fetchWishlist();
    fetchFavorites();
  }, [user]);

  const addToWishlist = async (product) => {
    try {
      if (user) {
        const wishlistRef = collection(db, 'wishlist');
  
        const q = query(wishlistRef, where('userId', '==', user.uid), where('productId', '==', product.id));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.size === 0) {
          const wishlistDocRef = await addDoc(wishlistRef, {
            userId: user.uid,
            productId: product.id,
          });
  
          setWishlist([...wishlist, { id: wishlistDocRef.id, productId: product.id }]);
        } else {
          const docToDelete = querySnapshot.docs[0];
          await deleteDoc(doc(wishlistRef, docToDelete.id));
  
          const updatedWishlist = wishlist.filter((item) => item.productId !== product.id);
          setWishlist(updatedWishlist);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error.message);
    }
  };
  
  const addToFavorites = async (product) => {
    try {
      if (user) {
        const favoritesRef = collection(db, 'favorites');
  
        const q = query(favoritesRef, where('userId', '==', user.uid), where('productId', '==', product.id));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.size === 0) {
          const favoritesDocRef = await addDoc(favoritesRef, {
            userId: user.uid,
            productId: product.id,
          });
  
          setFavorites([...favorites, { id: favoritesDocRef.id, productId: product.id }]);
        } else {
          const docToDelete = querySnapshot.docs[0];
          await deleteDoc(doc(favoritesRef, docToDelete.id));
  
          const updatedFavorites = favorites.filter((item) => item.productId !== product.id);
          setFavorites(updatedFavorites);
        }
      }
    } catch (error) {
      console.error('Error toggling favorites:', error.message);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { marginTop: 50, fontSize: 25, color: '#8b4513' }]}>PENStore</Text>
          <TouchableOpacity style={{ marginLeft: '85%', marginTop: -45 }} onPress={() => navigation.navigate('ManageAccount')}>
            <Image source={require('../assets/account.png')} style={AppStyles.buttonImage} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop:10 }}>
          {products.map((product, index) => (
            <View key={index} style={{ width: '48%', margin: '1%', padding: 10, backgroundColor: '#eed5b7',borderRadius:20 }}>
              {product.imageUrl && <Image source={{ uri: product.imageUrl }} style={{ width: '100%', height: 100 }} />}
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price} TL</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity onPress={() => addToWishlist(product)} style={{ flex: 1, marginRight: 2 }}>
                <Image key={wishlist.some((item) => item.productId === product.id) ? 'star' : 'favorite'} source={wishlist.some((item) => item.productId === product.id) ? require('../assets/star.png') : require('../assets/favorite.png')} style={styles.favwish} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => addToFavorites(product)} style={{ flex: 1, marginLeft: 2 }}>
                {favorites.some((item) => item.productId === product.id) ? (
                  <Image source={require('../assets/like.png')} style={styles.favwish} />
                ) : (
                 <Image source={require('../assets/love.png')} style={styles.favwish} />
                 )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
