export function registerUser(email, password, storage = localStorage) {
  if (!email || !password) return false;
  storage.setItem("user", JSON.stringify({ email, password }));
  return true;
}

export function loginUser(email, password, storage = localStorage) {
  const userRaw = storage.getItem("user");
  if (!userRaw) return false;                 // Branch 1

  const user = JSON.parse(userRaw);

  if (email === user.email && password === user.password) { // Branch 2
    storage.setItem("isAuth", "true");
    return true;
  }

  return false;                               // Branch 3
}

export function logoutUser(storage = localStorage) {
  storage.removeItem("isAuth");
}

export function isAuthenticated(storage = localStorage) {
  return storage.getItem("isAuth") === "true";
}
document.getElementById('logout-btn')?.addEventListener('click', () => {
  logoutUser();
  window.location.href = 'login.html';
});