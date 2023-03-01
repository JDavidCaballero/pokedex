import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "../../utils/userdb";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),

    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (props) => {
      if (props.username != "" && props.password != "") {
        setError("");
        const { username, password } = props;

        if (username == user.username && password == user.password) {
          login(userDetails);

          ToastAndroid.show("correct credentials", ToastAndroid.SHORT);
        } else {
          setError("Wrong User or password ");
          ToastAndroid.show("Wrong credentials", ToastAndroid.SHORT);
        }
      } else {
        setError("Wrong User or password ");
        ToastAndroid.show(
          "You have to enter credentials to log in",
          ToastAndroid.SHORT
        );
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.error}>{formik.errors.username}</Text>
      <TextInput
        placeholder="User Name"
        style={styles.input}
        autoCapitalize={false}
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <Text style={styles.error}>{formik.errors.password}</Text>

      <TextInput
        placeholder="Password"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Text style={styles.error}>{error}</Text>
      <View style={styles.button}>
        <Button title="Log in" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("User is obligatory"),
    password: Yup.string().required("Password is obligatory"), //.max characters etc
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    marginLeft: 12,
    color: "#f00",
  },
  button: {
    marginHorizontal: 120,
  },
});
