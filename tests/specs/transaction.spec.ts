import { test } from "@playwright/test";
import { TransactionPage } from "../pages/TransactionPageObject";

test.describe("Transactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', "testuserlmao@email.com");
    await page.fill('input[name="password"]', "testuserlmao");
    await page.click('button[type="submit"]');

    await page.waitForURL("**/dashboard");
  });

  test("User can add a transaction", async ({ page }) => {
    const transactionPage = new TransactionPage(page);
    await transactionPage.goto();

    await transactionPage.openForm();

    const randomAmount = (Math.random() * 100000).toFixed(2);

    const data = {
      category: "test",
      description: `Test Transaction ${Date.now()}`,
      amount: randomAmount,
    };

    await transactionPage.fillTransaction(data);
    await transactionPage.submit();

    await transactionPage.expectTransaction(
      data.description,
      `+$${data.amount}`
    );
  });
});
