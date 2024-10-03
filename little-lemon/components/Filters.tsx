import {
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const Filters = ({ sections }: any) => {
  return (
    <View style={styles.filterArea}>
      <ScrollView
        style={styles.filterArea}
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {sections.map((category: any) => (
          <Pressable
            key={category}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};
export default Filters;

const styles = StyleSheet.create({
  filterArea: {
    flexDirection: 'row',
    gap: 10,
    padding: 20,
  },
  filterButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#495E57',
    fontWeight: 'bold',
  },
});
