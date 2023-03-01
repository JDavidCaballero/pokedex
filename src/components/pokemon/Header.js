import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { capitalize } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import getColorPokemonByType from "../../utils/getColorByPokemon";

export default function Header(props) {
  const { name, order, image, type } = props;
  const color = getColorPokemonByType(type);

  const screenBackground = [{ backgroundColor: color, ...styles.background }];

  return (
    <>
      <View style={screenBackground} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{capitalize(name)}</Text>
          <Text style={styles.order}>#{`${order}`.padStart(2, 0)}</Text>
        </View>

        <View style={styles.contentImg}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: 380,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomStartRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    right: 7,
  },
  order: {
    color: "#fff",
    fontWeight: "bold",
    right: 15,
  },
});
