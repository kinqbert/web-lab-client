import { Page } from "@playwright/test";

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("http://localhost:3000/register");
  }

  async register(name: string, email: string, password: string) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.fill('input[name="password_confirmation"]', password);
    await this.page.click('button[type="submit"]');
  }
}
