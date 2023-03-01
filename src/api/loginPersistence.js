import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGED_PERSISTENCE } from "../utils/Constants";

export async function loadLogin(isLogedIn) {
  try {
    var value = "";
    if (isLogedIn != undefined) {
      value = isLogedIn;
    } else {
      value = "false";
    }

    await AsyncStorage.setItem(LOGED_PERSISTENCE, JSON.stringify(value));
  } catch (error) {
    throw error;
  }
}

export async function getLogedState() {
  try {
    const response = await AsyncStorage.getItem(LOGED_PERSISTENCE);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
