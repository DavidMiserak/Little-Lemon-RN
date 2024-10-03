import { useEffect, useState } from 'react';
import {
  Image,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getImageUrl, getMenuItems, getCategories } from '../database';
import heroImage from '../assets/images/hero-image.png';
import Filters from '../components/Filters';

const Item = ({ name, description, price, image }: any) => {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemHeader}>{name}</Text>
        <Text style={styles.itemText}>{description}</Text>
        <Text style={styles.itemPrice}>${price} USD</Text>
      </View>
      <Image
        style={styles.itemImage}
        alt={name}
        source={{ uri: getImageUrl(image) }}
        resizeMode="contain"
      />
    </View>
  );
};

const MenuPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const menuItems = getMenuItems();
    menuItems.then((data) => {
      setData(data);
    });

    const uniqueCategories = getCategories();
    uniqueCategories.then((data) => {
      setCategories(data);
    });
  }, []);

  const renderItem = ({ item }: any) => (
    <Item
      key={item.name}
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroArea}>
        <View>
          <Text style={styles.heroHeader}>Little Lemon</Text>
          <Text style={styles.heroSubHeader}>Chicago</Text>
          <Text style={styles.heroText}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <View>
          <Image
            style={styles.heroImage}
            alt="Little Lemon Restaurant"
            source={heroImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View>
        <Text style={styles.menuHeader}>Order for Delivery</Text>
      </View>
      <Filters sections={categories} />
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroArea: {
    backgroundColor: '#495E57',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  heroHeader: {
    fontSize: 28,
    color: '#F4CE14',
  },
  heroSubHeader: {
    color: '#EDEFEE',
    fontSize: 16,
  },
  heroText: {
    fontSize: 12,
    color: '#EDEFEE',
    paddingTop: 20,
    width: 200,
  },
  heroImage: {
    width: 100,
    height: 151,
    borderRadius: 30,
  },
  menuHeader: {
    color: '#495E57',
    fontSize: 16,
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  itemHeader: {
    fontSize: 20,
    color: '#333333',
    paddingBottom: 10,
  },
  itemText: {
    color: '#666666',
    paddingBottom: 10,
    fontSize: 12,
    width: 200,
  },
  itemPrice: {
    color: '#666666',
    fontSize: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});
