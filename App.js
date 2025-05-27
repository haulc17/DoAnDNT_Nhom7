import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import HomePage from "./screens/(tabs)/HomePage";
import ProductDetail from "./screens/(tabs)/ProductDetail";
import Login from "./screens/(tabs)/Login";
import Register from "./screens/(tabs)/Register";
import AccountSetting from "./screens/(tabs)/AccountSetting";
import Profile from "./screens/(tabs)/Profile";
import OrdersHistoryScreen from "./screens/(tabs)/OrdersHistoryScreen";
import OrderHistoryDetailScreen from "./screens/(tabs)/OrderHistoryDetailScreen";
import CartScreen from "./screens/(tabs)/CartScreen";
import OrderConfirmScreen from "./screens/(tabs)/OrderConfirmScreen";
import Category from "./screens/(tabs)/Cagetory";
import NetworkOverlay from './screens/(tabs)/NetworkOverlay';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          // else if (route.name === "Cart") iconName = "cart-outline";
          else if (route.name === "OrderHistory") iconName = "bag-check-outline";
          else if (route.name === "AccountSetting") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
      <Tab.Screen name="OrderHistory" component={OrdersHistoryScreen} />
      <Tab.Screen name="AccountSetting" component={AccountSetting} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NetworkOverlay /> 
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AccountSetting" component={AccountSetting} />
          <Stack.Screen name="OrdersHistoryScreen" component={OrdersHistoryScreen} />
          <Stack.Screen name="OrderHistoryDetailScreen" component={OrderHistoryDetailScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="OrderConfirmScreen" component={OrderConfirmScreen} />
          <Stack.Screen name="Category" component={Category} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
