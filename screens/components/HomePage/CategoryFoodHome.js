import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { URLServer } from "../../../api/apiConfig";

const CategoryFoodHome = ({ foodsType, user }) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
    >
      {foodsType.map((foodType, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryButton}
          onPress={() => navigation.navigate("Category", { foodType, user })}
        >
          <Image
            source={{ uri: `${URLServer}/images${foodType.EncodeAnh}` }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>{foodType.Loai}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    width: 100,
    height: 100,
    // shadowColor: "orange",
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 1,
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 8,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryText: {
    color: "#333",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default CategoryFoodHome;
