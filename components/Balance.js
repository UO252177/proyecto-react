import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useAuth } from "../components/AuthContext";

export default function Balance() {
  const { user } = useAuth();

  return (
    <Card containerStyle={styles.balance}>
      <Text style={styles.stonks}>{user.balance}€</Text>
    </Card>
  );
}

export function BalanceLight() {
  const { user } = useAuth();

  return (
    <Card containerStyle={styles.balanceL}>
      <Text style={styles.stonksL}>{user.name} - {user.balance}€</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  balance: {
    backgroundColor: "darkslateblue",
    borderRadius: 30,
  },
  balanceL: {
    backgroundColor: "rgba(29, 29, 29, 0.8)",
    borderRadius: 30,
    borderColor: "rgba(29, 29, 29, 0.8)",
    elevation: 0
  },
  stonks: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#faf2d4",
  },
  stonksL: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.85)",
  },
});
