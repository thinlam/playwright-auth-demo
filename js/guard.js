import { isAuthenticated, logoutUser } from "./auth.service.js";

// js/guard.js
if (window.location.pathname.includes('login')) {
  // cho phép vào login
} else {
  const isAuth = localStorage.getItem('isAuth');
  if (!isAuth) {
    window.location.href = 'login.html';
  }
}
