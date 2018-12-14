export function getToken(str) {
  const tokenString =
    typeof str === 'undefined' ? localStorage.getItem('recovery-buss-web-token'): str;
    return tokenString;
}

export function setToken(token) {
  if(token){
    return localStorage.setItem('recovery-buss-web-token', token);
  }
}
