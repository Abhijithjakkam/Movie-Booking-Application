function getCookie(cookieName) {
  let val = "";
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    if (key.trim() == cookieName) {
      val = value;
      return;
    }
  });
  return val;
}
function getAuthToken() {
  let user = null;
  if (decodeURIComponent(decodeURIComponent(getCookie("authToken")))) {
    user = JSON.parse(
      decodeURIComponent(decodeURIComponent(getCookie("authToken")))
    );
  }
  return user;
}

function signIn() {
  window.location.href = "https://localhost:3000/api/auth/google";
}

function signOut() {
  document.cookie =
    "authToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
  window.location.reload();
}

export { getAuthToken, signIn, signOut };
