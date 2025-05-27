import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HeaderCategoryFoodHome = ({ foods, user }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.categoryHeader}>
      <Text style={styles.categoryHeaderText}>Danh mục</Text>
      <TouchableOpacity>
        <Text
          style={styles.categoryHeaderSeeAll}
          onPress={() => navigation.navigate("Category", { foods, user })}
        >
          Xem tất cả
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 15,
  },
  categoryHeaderText: {
    fontWeight: "bold",
  },
  categoryHeaderSeeAll: {
    color: "orange",
  },
});

export default HeaderCategoryFoodHome;
