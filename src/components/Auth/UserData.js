import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { getPokemonFavorite } from "../../api/favorite";

export default function UserData() {
  const { auth, logout } = useAuth();
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await getPokemonFavorite();
          setTotal(size(response));
        } catch (error) {
          setTotal(0);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text
          style={styles.title}
        >{`${auth.firstName} ${auth.lastName} `}</Text>
      </View>

      <View styles={styles.dataContent}>
        <ItemMenu
          title="Nombre"
          text={`${auth.firstName} ${auth.lastName}`}
        ></ItemMenu>
        <ItemMenu title="UserName" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total de favoritos" text={`${total} Pokemons`} />
      </View>

      <View style={styles.button}>
        <Button title="Log Out" onPress={logout} />
      </View>
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;

  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 50,
    backgroundColor: "	#00FFFF",
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
  button: {
    marginHorizontal: 120,
    paddingTop: 20,
  },
});
