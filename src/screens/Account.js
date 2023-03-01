import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/UserData";
import useAuth from "../hooks/useAuth";
import { getLogedState } from "../api/loginPersistence";

export default function Account() {
  const { auth } = useAuth();

  checkLogedState();

  if (checkLogedState() == "logedIn") {
    console.log(checkLogedState() + "entre");
    return (
      <View>
        <UserData />
      </View>
    );
  } else {
    console.log(checkLogedState() + "entre2");

    return <View>{auth ? <UserData /> : <LoginForm />}</View>;
  }

  async function checkLogedState() {
    const response = await getLogedState();
    console.log("Me trajo en account" + response);
    return response;
  }
}
