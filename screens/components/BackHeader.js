import React, { useState, useCallback, } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { URLServer } from "../../api/apiConfig";
import { getNumberOfCart } from "../../api/apiCart";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BackHeader2 = ({ icon="chevron-back", title }) => {
  const navigation = useNavigation();

  return (

    <View style={styles.header}>
        <TouchableOpacity 
          onPress={ () => navigation.goBack() }
          style={styles.backButton}>
            <Ionicons name={icon ? icon: "chevron-back"} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const BackHeaderToHome = ({ icon="chevron-back", title }) => {
  const navigation = useNavigation();

  return (

    <View style={styles.header}>
        <TouchableOpacity 
          onPress={ () => navigation.navigate("HomePage") }
          style={styles.backButton}>
            <Ionicons name={icon ? icon: "chevron-back"} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const BackHeader = ({ icon="chevron-back", title }) => {
  const [numberOfCart, setNumberOfCart] = useState(0);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      };
      getUser();
      loadNumberOfCart();
    }, [])
  );

  const loadNumberOfCart = async () => {
    const numOfCart = await getNumberOfCart();
    setNumberOfCart(numOfCart);
  }


  return (

    <View style={styles.header}>
        <TouchableOpacity 
          onPress={ () => navigation.goBack() }
          style={styles.backButton}>
            <Ionicons name={icon ? icon: "chevron-back"} size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            user ? navigation.navigate("CartScreen") : navigation.navigate("Login")
          }
        >
          <Image
            source={{ uri: `${URLServer}/images/homePage/cartIcon.png` }}
            style={[styles.iconImage, {backgroundColor: "orange"}]}
          />
          <View style={styles.cartquantityContainer}>
            <Text style={styles.cartquantityText} >{numberOfCart}</Text> 
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "orange"},
    backButton: { padding: 5, },
    headerText: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "bold", color: "white" },
    iconImage: {
      width: 32,
      height: 32,
      backgroundColor: "white",
    },
    cartquantityContainer: {
      position: "absolute",
      top: -5,
      right: -5,
      backgroundColor: "white",
      borderRadius: 20,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    cartquantityText: {
      color: "orange",
    },
});

export { BackHeader2, BackHeaderToHome };
export default BackHeader;