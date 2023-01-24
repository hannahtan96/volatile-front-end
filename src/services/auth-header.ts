export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) {
    user = JSON.parse(userStr)
  }

  if (user && user.idToken) {
    return { Authorization: 'Bearer ' + user.idToken };
  } else {
    return { Authorization: '' }
  }
}