import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../screens/Favorite";
import Pokemonscreen from "../screens/Pokemon";

const Stack = createNativeStackNavigator();

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="PokemonTab"
        component={Pokemonscreen}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}
