import { StyleSheet, View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function NotLoged() {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <Text style={styles.text}>Log In to see your favorite pokemons</Text>
      <Button
        title="Go to Log In"
        onPress={() => navigation.navigate("Account")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    marginVertical: 50,
    paddingHorizontal: 40,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 30,
  },
});
