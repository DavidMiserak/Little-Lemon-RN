import {
  Pressable,
  Text,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const Filters = ({ onChange, sections, selections }: any) => {
  return (
    <View style={styles.filterArea}>
      <ScrollView
        style={styles.filterArea}
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {sections.map((category: any, index: any) => (
          <Pressable
            key={index}
            onPress={() => onChange(index)}
            style={
              selections[index]
                ? [styles.filterButton, styles.selectedFilterButton]
                : styles.filterButton
            }
          >
            <Text
              style={
                selections[index]
                  ? [styles.filterButtonText, styles.selectedFilterButtonText]
                  : styles.filterButtonText
              }
            >
              {category}</Text>
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
    padding: 5,
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
  selectedFilterButton: {
    backgroundColor: '#495E57',
  },
  selectedFilterButtonText: {
    color: '#EDEFEE',
  },
});
