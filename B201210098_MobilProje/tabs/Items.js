import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import styles from '../styles/style';
const appStyles = {
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'column', 
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  rightMargin: {
    marginRight: 10,
  },
  leftMargin: {
    marginLeft: 10,
  },
  itemlist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemname: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
};

const Items = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadItemList = async () => {
      try {
        // Firestore verileri çek
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    };

    loadItemList();
  }, []); 

  const renderItem = ({ item }) => (
    <View style={appStyles.rowContainer}>
      <View style={appStyles.itemlist}>
        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />}
        <View style={{ flex: 1, marginLeft: 10 }}> 
          <Text style={appStyles.itemname}>{`Name: ${item.name}`}</Text>
          <Text style={[appStyles.itemname,{ color: '#777', fontSize: 14 }]}>{`Price: ${item.price}TL`}</Text>
        </View>
      </View>
    </View>
  );

  const showItemList = () => (
    <FlatList
    style={{marginBottom:150}}
      data={items}
      refreshing={isRefreshing}
      onRefresh={() => {
        loadItemList();
        setIsRefreshing(true);
      }}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );

  const showContent = () => (
    <View>
      {isLoading ? <ActivityIndicator size="large" /> : showItemList()}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>List Item</Text>
      </View>
      {showContent()}
    </View>
  );
};

export default Items;
