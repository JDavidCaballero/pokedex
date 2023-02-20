import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import getColorByPokemonType from "../utils/getColorByPokemon";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function PokemonCard(props) {
  const { pokemons } = props;
  const navigation = useNavigation();
  const pokemonColor = getColorByPokemonType(pokemons.type);
  const background = { backgroundColor: pokemonColor, ...styles.background };

  const goToPokemon = () => {
    //When the component is touched this may go to pokemon detail
    navigation.navigate("PokemonTab", { id: pokemons.id });
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={background}>
            <Text style={styles.number}>
              #{`${pokemons.order}`.padStart(2, 0)}
            </Text>
            <Text style={styles.name}>{capitalize(pokemons.name)}</Text>
            <Image source={{ uri: pokemons.image }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  background: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    height: 90,
    width: 90,
  },
  name: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  number: {
    color: "#FFF",
    fontWeight: "bold",
    position: "absolute",
    right: 10,
    top: 14,
    fontSize: 11,
  },
});
