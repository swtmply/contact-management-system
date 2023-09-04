import { test, expect } from "@playwright/test";

// Create a test that creates a new contact filling out the form and checks if the new contact is visible
// the form contains the following fields: name, email, phone, address
test("should create a new contact", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Add New Contact").click();

  await page.getByLabel("Name").fill("John Doe");

  await page.getByLabel("Email").fill("john.doe@example.com");

  await page.getByLabel("Phone").fill("12345678901");

  await page.getByLabel("Address").fill("123 Main Street");

  await page.getByText("Submit").click();

  await page.getByText("John Doe").click();

  await expect(page).toHaveURL(/contact/i);

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "John Doe"
  );
});

// Create a test that clicks the edit button and checks if the form is visible and changes the name of the contact
test("should click edit contact button from the table", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("table-edit-button").click();

  await page.getByLabel("Name").fill("John Allen");

  await page.getByText("Submit").click();

  await page.getByText("John Allen").click();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "John Allen"
  );
});

test("should navigate to the contact page", async ({ page }) => {
  await page.goto("/");

  await page.getByText("John Allen").click();

  await expect(page).toHaveURL(/contact/i);

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "John Allen"
  );
});

// Create a test that clicks Edit Contact Button and checks if the form is visible
test("should click edit contact button and check if form is visible", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByText("John Allen").click();

  await page.getByText("Edit Contact").click();

  await page.getByLabel("Name").fill("John Doe");

  await page.getByText("Submit").click();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "John Doe"
  );
});

// Create a test that clicks the delete button and checks if the table is empty
test("should delete contact", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("table-delete-button").click();

  await page.getByRole("button", { name: "Delete Record" }).click();

  await expect(page.getByTestId("table-empty")).toHaveText("No data found.");
});
