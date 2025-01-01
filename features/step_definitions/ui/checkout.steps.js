const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const SELECTORS = {
  login: {
    link: 'a[href="/login"]',
    email: '[data-qa="login-email"]',
    password: '[data-qa="login-password"]',
    button: '[data-qa="login-button"]',
    logoutLink: 'a[href="/logout"]',
  },
  cart: {
    productsTab: "li:has(i.material-icons.card_travel)",
    addToCartButton: (id) => `a[data-product-id="${id}"].add-to-cart`,
    modalCloseButton: 'button.btn-success[data-dismiss="modal"]',
    viewCartLink: '.modal-body a[href="/view_cart"]',
    checkoutButton: "a.btn.btn-default.check_out",
  },
  checkout: {
    productTotal: (id) => `#product-${id} .cart_total_price`,
    finalTotal: "tr:last-child .cart_total_price",
    placeOrderButton: 'a.check_out[href="/payment"]',
  },
  payment: {
    nameOnCard: '[data-qa="name-on-card"]',
    cardNumber: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    expiryMonth: '[data-qa="expiry-month"]',
    expiryYear: '[data-qa="expiry-year"]',
    payButton: '[data-qa="pay-button"]',
    orderPlaced: '[data-qa="order-placed"]',
    downloadInvoice: 'a.btn.check_out:has-text("Download Invoice")',
    continueButton: '[data-qa="continue-button"]',
  },
};

const extractAmount = (text) => parseInt(text.replace("Rs. ", ""));

const waitForNavigation = async (page, callback) => {
  await Promise.all([page.waitForNavigation(), callback()]);
};

Given("I navigate to the automation exercise website", async function () {
  await this.page.goto(this.UI_BASE_URL);
});

Given(
  "I am logged in as {string} with password {string}",
  async function (username, password) {
    await this.page.locator(SELECTORS.login.link).click();
    await this.page.locator(SELECTORS.login.email).fill(username);
    await this.page.locator(SELECTORS.login.password).fill(password);
    await this.page.locator(SELECTORS.login.button).click();
    await expect(this.page.locator(SELECTORS.login.logoutLink)).toBeVisible({
      timeout: 10000,
    });
  }
);

Given("I have added products to my cart", async function () {
  await this.page.locator(SELECTORS.cart.productsTab).click();

  await this.page.hover(SELECTORS.cart.addToCartButton("1"));
  await this.page.click(SELECTORS.cart.addToCartButton("1"));
  await this.page.locator(SELECTORS.cart.modalCloseButton).click();

  await this.page.hover(SELECTORS.cart.addToCartButton("2"));
  await this.page.click(SELECTORS.cart.addToCartButton("2"));
  await this.page.locator(SELECTORS.cart.viewCartLink).click();
});

When("I proceed to checkout", async function () {
  const checkoutBtn = await this.page.locator(SELECTORS.cart.checkoutButton);
  await checkoutBtn.waitFor({ state: "visible" });
  await waitForNavigation(this.page, () => checkoutBtn.click());
  expect(this.page.url()).toContain("/checkout");
});

Then(
  "I should see my cart items and verify the total amount",
  async function () {
    const getProductTotal = async (id) => {
      const total = await this.page
        .locator(SELECTORS.checkout.productTotal(id))
        .textContent();
      return extractAmount(total);
    };

    const product1Total = await getProductTotal(1);
    const product2Total = await getProductTotal(2);
    const finalTotalText = await this.page
      .locator(SELECTORS.checkout.finalTotal)
      .textContent();
    const finalTotal = extractAmount(finalTotalText);
    expect(product1Total + product2Total).toBe(finalTotal);
  }
);

When("I proceed to payment", async function () {
  await this.page.locator(SELECTORS.checkout.placeOrderButton).click();
  expect(this.page.url()).toContain("/payment");
});

When("I enter the following payment details:", async function (dataTable) {
  const cardDetails = dataTable.rowsHash();
  const fillPaymentField = async (selector, value) => {
    await this.page.locator(selector).fill(value);
  };

  await fillPaymentField(SELECTORS.payment.nameOnCard, cardDetails["name"]);
  await fillPaymentField(
    SELECTORS.payment.cardNumber,
    cardDetails["card number"]
  );
  await fillPaymentField(SELECTORS.payment.cvc, cardDetails["cvc"]);
  await fillPaymentField(
    SELECTORS.payment.expiryMonth,
    cardDetails["expiry month"]
  );
  await fillPaymentField(
    SELECTORS.payment.expiryYear,
    cardDetails["expiry year"]
  );
});

When("I confirm the payment", async function () {
  await this.page.locator(SELECTORS.payment.payButton).click();
});

Then("I should see the order confirmation", async function () {
  await this.page.waitForURL(/.*\/payment_done\/\d+/);
  const orderPlaced = await this.page.locator(SELECTORS.payment.orderPlaced);
  await expect(orderPlaced).toBeVisible();
  await expect(orderPlaced).toContainText("Order Placed!");
});

Then("I should be able to download the invoice", async function () {
  const invoiceButton = await this.page.locator(
    SELECTORS.payment.downloadInvoice
  );
  await expect(invoiceButton).toBeVisible();
  await invoiceButton.click();
  await this.page.waitForTimeout(2000);
});

Then("I should be navigated back to the homepage", async function () {
  const continueButton = await this.page.locator(
    SELECTORS.payment.continueButton
  );
  await expect(continueButton).toBeVisible();
  await continueButton.click();
  const currentUrl = this.page.url().replace(/\/$/, "");
  const expectedUrl = this.UI_BASE_URL.replace(/\/$/, "");
  await expect(currentUrl).toBe(expectedUrl);
});
