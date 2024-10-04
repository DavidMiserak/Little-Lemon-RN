import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  getImageUrl,
  getCategories,
  filterByQueryAndCategories,
} from '../database';
import Filters from '../components/Filters';

const Item = ({ name, description, price, image }) => {
  const imageURL = getImageUrl(image);

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemHeader}>{name}</Text>
        <Text style={styles.itemText}>{description}</Text>
        <Text style={styles.itemPrice}>${price} USD</Text>
      </View>
      <View>
        <Image
          style={styles.itemImage}
          alt={name}
          source={{ uri: imageURL }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};


const MenuPage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<string[]>(["mains", "starters", "desserts"]);
  const [filterSelections, setFilterSelections] = useState<boolean[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    // Fetch categories
    const uniqueCategories = getCategories();
    uniqueCategories.then((data) => {
      setCategories(data);
      if (categories.length !== filterSelections.length) {
        setFilterSelections(new Array(data.length).fill(false));
      }
    });

    const filterQuery = filterSelections.map((selected, index) => {
      return selected ? categories[index] : '';
    });

    const tempActiveCategories = filterQuery.filter((category) => category !== '');

    let activeCategories = categories;
    activeCategories = tempActiveCategories.length > 0 ? tempActiveCategories : categories;

    // Fetch menu items
    const menuItems = filterByQueryAndCategories(searchQuery, activeCategories);
    menuItems.then((data: any) => {
      setData(data);
    });

  }, [filterSelections, searchQuery]);

  const renderItem = ({ item }: any) => (
    <Item
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
    />
  );

  const handleFilterChange = async (index: number) => {
    const newSelections = [...filterSelections];
    newSelections[index] = !newSelections[index];
    setFilterSelections(newSelections);
  };

  const lookup = useCallback((q: any) => {
    setSearchQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text: any) => {
    setDebouncedSearchQuery(text);
    debouncedLookup(text);
  };

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
            source={require('../assets/images/hero-image.png')}
            resizeMode="contain"
          />
        </View>
      </View>
      <View>
        <Text style={styles.menuHeader}>Order for Delivery</Text>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearchChange}
        value={debouncedSearchQuery}
      />
      <Filters
        selections={filterSelections}
        sections={categories}
        onChange={handleFilterChange}
      />
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
