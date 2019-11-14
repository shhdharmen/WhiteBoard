import { AsyncStorage } from "react-native";

export async function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(await AsyncStorage.getItem("user"));
  if (user && user.jwt) {
    return { "Authorization": "Bearer " + user.jwt };
  } else {
    return {};
  }
}

export async function authHeaderWithJSON() {
  // return authorization header with jwt jwt
  let user = JSON.parse(await AsyncStorage.getItem("user"));

  if (user && user.jwt) {
    return { "Authorization": "Bearer " + user.jwt, "Content-Type": "application/json" };
  } else {
    return { "Content-Type": "application/json" };
  }
}

export function headerJSON() {
  return { "Content-Type": "application/json" };
}
