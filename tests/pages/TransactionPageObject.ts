import { Page, expect } from "@playwright/test";

export class TransactionPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("http://localhost:3000/transactions");
  }

  async openForm() {
    await this.page.locator('button:has-text("Add transaction")').click();
  }

  async fillTransaction({
    category,
    description,
    amount,
  }: {
    category: string;
    description: string;
    amount: string;
  }) {
    await this.page.getByLabel("Category").fill(category);
    await this.page.getByLabel("Description").fill(description);
    await this.page.getByLabel("Amount").fill(amount);
  }

  async submit() {
    await this.page.getByRole("button", { name: /create/i }).click();
  }

  async expectTransaction(description: string, amount: string) {
    const row = this.page.locator("tr", {
      has: this.page.getByText(description),
    });

    const amountCell = row.locator("td.text-right");
    const amountText = await amountCell.textContent();

    expect(amountText).toBe(amount);
  }
}
