export default function authHeader() {
  const userStr = localStorage.getItem('user');
  // const accessToken = localStorage.getItem('accessToken')
  let user = null;
  if (userStr) {
    user = JSON.parse(userStr)
  }

  if (user && user.idToken) {
    console.log(user)
    // return { Authorization: 'Bearer ' + user.idToken };


    return { 'Authorization': user.idToken, "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' }
  } else {
    return { 'Authorization': '', "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json' }
  }
}