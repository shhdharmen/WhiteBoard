export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt) {
    return { jwt: user.jwt };
  } else {
    return {};
  }
}

export function authHeaderWithJSON() {
  // return authorization header with jwt jwt
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt) {
    return { jwt: user.jwt, "Content-Type": "application/json" };
  } else {
    return { "Content-Type": "application/json" };
  }
}

export function headerJSON() {
  return { "Content-Type": "application/json" };
}
