import { test } from "@playwright/test";
import { RegisterPage } from "../pages/RegisterPage";

test("User can register with valid data", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  const random = Math.floor(Math.random() * 10000);
  const email = `testuser${random}@example.com`;
  const name = `user${random}`;

  await registerPage.register(name, email, "password123");

  await Promise.race([
    page.waitForURL(/.*dashboard|login/, { timeout: 7000 }),
    page.waitForSelector("h1:text('Dashboard')", { timeout: 7000 }),
  ]);
});
