import { test, expect } from '@playwright/test';

/**
 * Helper: đăng ký + đăng nhập
 */
async function registerAndLogin(
  page: any,
  email = 'bb@mail.com',
  password = '123456'
) {
  await page.goto('/register.html');
  await page.fill('#regEmail', email);
  await page.fill('#regPassword', password);
  await page.click('[data-testid="register-btn"]');

  await page.goto('/login.html');
  await page.fill('#loginEmail', email);
  await page.fill('#loginPassword', password);
  await page.click('[data-testid="login-btn"]');

  await page.waitForURL('**/index.html');
  await expect(page.getByTestId('home')).toBeVisible();
}

/* =================================================
   BLACK BOX – AUTH
================================================= */
test.describe('BLACK BOX – AUTH', () => {

  test('BB-AUTH-01: login hợp lệ → vào Home', async ({ page }) => {
    await registerAndLogin(page);
  });

  test('BB-AUTH-02: sai password → login fail', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#loginEmail', 'bb@mail.com');
    await page.fill('#loginPassword', '000000');
    await page.click('[data-testid="login-btn"]');
    await expect(page).toHaveURL(/login.html/);
  });

  test('BB-AUTH-03: chưa login truy cập Home → redirect login', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page).toHaveURL(/login.html/);
  });

  test('BB-AUTH-04: logout → redirect login', async ({ page }) => {
    await registerAndLogin(page);
    await page.click('#logout-btn');
    await expect(page).toHaveURL(/login.html/);
  });

  test('BB-AUTH-05: reload trang vẫn giữ session', async ({ page }) => {
    await registerAndLogin(page);
    await page.reload();
    await expect(page.getByTestId('home')).toBeVisible();
  });

  test('BB-AUTH-06: đã login truy cập login.html → redirect home', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('/login.html');
    await expect(page).toHaveURL(/index.html/);
  });

});

/* =================================================
   BLACK BOX – SHOP / CART
================================================= */
test.describe('BLACK BOX – SHOP / CART', () => {

 test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('isAuth', 'true');
    localStorage.setItem(
      'user',
      JSON.stringify({ email: 'bb@mail.com', password: '123456' })
    );
    // ❌ TUYỆT ĐỐI KHÔNG removeItem('cart') ở đây
  });

  await page.goto('/index.html');
});


  test('BB-SHOP-01: thêm 1 sản phẩm vào giỏ', async ({ page }) => {
   await page.click('[data-testid="add-1"]');
await expect(page).toHaveURL(/cart/);
await expect(page.getByText('Áo thun nam')).toBeVisible();
    });

  test('BB-SHOP-02: quay lại home và thêm sản phẩm khác', async ({ page }) => {
    await page.click('[data-testid="add-1"]');
   await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Áo thun nam')).toBeVisible();
     await page.click('text=Trang chủ');
  await page.click('[data-testid="add-2"]');
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByText('Giày sneaker')).toBeVisible();
  });

  test('BB-SHOP-03: thêm sản phẩm thứ 3 vào giỏ', async ({ page }) => {
    await page.click('[data-testid="add-3"]');
    await expect(page).toHaveURL(/cart/);
    await expect(page.getByText('Balo du lịch')).toBeVisible();
  });

  test('BB-SHOP-04: reload trang cart vẫn còn sản phẩm', async ({ page }) => {
    await page.click('[data-testid="add-1"]');
    await expect(page).toHaveURL(/cart/);
    await page.reload();
    await expect(page.getByText('Áo thun nam')).toBeVisible();
  });

  test('BB-SHOP-05: checkout thành công', async ({ page }) => {
    await page.click('[data-testid="add-1"]');
    await expect(page).toHaveURL(/cart/);

    // handle alert checkout
    page.once('dialog', dialog => dialog.accept());

    await page.click('[data-testid="checkout-btn"]');
  });

  test('BB-SHOP-06: checkout xong → giỏ hàng rỗng', async ({ page }) => {
    await page.click('[data-testid="add-1"]');
    await expect(page).toHaveURL(/cart/);

    page.once('dialog', dialog => dialog.accept());
    await page.click('[data-testid="checkout-btn"]');

    await page.reload();
    await expect(page.getByText('Áo thun nam')).not.toBeVisible();
  });



  test('BB-AUTH-07: logout khi đang có sản phẩm trong giỏ', async ({ page }) => {
    await page.click('[data-testid="add-1"]');
    await page.click('#logout-btn');
    await expect(page).toHaveURL(/login/);

  });

});
