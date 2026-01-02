import { registerUser, loginUser } from "./auth.service.js";

const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = registerUser(regEmail.value, regPassword.value);
    alert(ok ? "Register OK" : "Register FAIL");
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = loginUser(loginEmail.value, loginPassword.value);
    if (ok) window.location.href = "index.html";
    else alert("Login FAIL");
  });
  document.getElementById('logout-btn')?.addEventListener('click', () => {
  logoutUser();
  window.location.href = 'login.html';
});

}
