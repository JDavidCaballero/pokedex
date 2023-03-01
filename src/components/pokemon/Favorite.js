import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  addPokemonToFavorite,
  isPokemonAdded,
  removeFavoritePokemon,
} from "../../api/favorite";

export default function Favorite(props) {
  const { id } = props;

  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reload, setReload] = useState(false);
  const Icon = isFavorite ? FontAwesome : FontAwesome5;

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonAdded(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id, reload]);

  const onReloadCheckFavorite = () => {
    setReload((prev) => !prev);
  };

  const addFavorite = async () => {
    try {
      await addPokemonToFavorite(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async () => {
    try {
      await removeFavoritePokemon(id);
      onReloadCheckFavorite();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Icon
      name="heart"
      color="#fff"
      size={20}
      onPress={isFavorite ? removeFavorite : addFavorite}
      style={{ marginRight: 20 }}
    />
  );
}
