import { test, expect } from '@jest/globals';

import {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated
} from "../../js/auth.service.js";

function mockStorage() {
  return {
    data: {},
    setItem(k, v) { this.data[k] = v; },
    getItem(k) { return this.data[k] || null; },
    removeItem(k) { delete this.data[k]; }
  };
}

test("WB-01 login fail khi chưa có user", () => {
  const storage = mockStorage();
  expect(loginUser("a", "b", storage)).toBe(false);
});

test("WB-02 login success", () => {
  const storage = mockStorage();
  registerUser("a@mail.com", "123", storage);
  expect(loginUser("a@mail.com", "123", storage)).toBe(true);
});

test("WB-03 login fail sai password", () => {
  const storage = mockStorage();
  registerUser("a@mail.com", "123", storage);
  expect(loginUser("a@mail.com", "000", storage)).toBe(false);
});

test("WB-04 logout path", () => {
  const storage = mockStorage();
  registerUser("a", "b", storage);
  loginUser("a", "b", storage);
  logoutUser(storage);
  expect(isAuthenticated(storage)).toBe(false);
});
