import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { FAVORITE_STORAGE } from "../utils/Constants";

export async function addPokemonToFavorite(id) {
  try {
    const favorites = await getPokemonFavorite();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    throw error;
  }
}

export async function getPokemonFavorite() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response || "[]");
  } catch (error) {
    throw error;
  }
}

export async function isPokemonAdded(id) {
  try {
    const response = await getPokemonFavorite();
    return response.includes(id);
  } catch (error) {
    throw error;
  }
}

export async function removeFavoritePokemon(id) {
  try {
    const favorite = await getPokemonFavorite();
    const newFavorites = pull(favorite, id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    throw error;
  }
}
