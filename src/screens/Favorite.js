import { Text, View, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import { getPokemonFavorite } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { getPokemonDetailApi } from "../api/pokemon";
import PokemonList from "../components/PokemonList";
import { useFocusEffect } from "@react-navigation/native";
import NotLoged from "../components/NotLoged";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorite() {
  const [pokemons, setpokemons] = useState([]);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonFavorite();

          const pokemonsArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailApi(id);

            pokemonsArray.push({
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              type: pokemonDetails.types[0].type.name,
              order: pokemonDetails.order,
              image:
                pokemonDetails.sprites.other["official-artwork"].front_default,
            });
          }

          setpokemons(pokemonsArray);
        })();
      }
    }, [auth])
  );

  return !auth ? (
    <NotLoged />
  ) : (
    <SafeAreaView>
      <Text styles={styles.title}>Favorite Pokemons</Text>
      <PokemonList pokemons={pokemons} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
});
