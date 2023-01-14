export function removeAllKeys() {
  localStorage.removeItem('user');
  localStorage.removeItem('token_user');
}

export function getToken() {
  return localStorage.getItem('token_user') ? JSON.parse(localStorage.getItem('token_user')!) : '';
}
