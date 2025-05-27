import {
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const Banners = ({ banners }) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.bannerContainer}
    >
      {banners.map((banner, index) => (
        <Image
          key={index}
          source={{ uri: banner }}
          style={styles.bannerImage}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 15,
  },
  bannerImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default Banners;
