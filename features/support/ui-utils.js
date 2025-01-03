const { expect } = require("@playwright/test");

class UIUtils {
  constructor() {
    this.UI_BASE_URL = "https://automationexercise.com";
  }

  capitalize(str) {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  encodeForUrl(brandName) {
    return brandName.replace(/\s/g, "%20");
  }

  async emptyCart(page) {
    // GO TO THE CART PAGE
    await page.goto(`${this.UI_BASE_URL}/view_cart`, {
      timeout: 60000,
    });

    // VERIFY URL IS CORRECT
    expect(page.url()).toContain("/view_cart");

    // WAIT FOR CART CONTAINER
    await page.waitForSelector("#cart_info", {
      state: "visible",
      timeout: 30000,
    });

    // CHECK IF CART IS EMPTY
    const emptyCart = await page.locator("#empty_cart");
    const isEmptyCartVisible = await emptyCart.isVisible();

    if (!isEmptyCartVisible) {
      // Get all delete buttons
      const deleteButtons = await page.locator(".cart_quantity_delete");
      const count = await deleteButtons.count();

      // Click each delete button and wait for item to be removed
      for (let i = 0; i < count; i++) {
        await page.locator(".cart_quantity_delete").first().click();
        // Wait for item removal animation/processing
        await page.waitForTimeout(1000);
      }

      // Verify cart is now empty
      await page.waitForSelector("#empty_cart", {
        state: "visible",
        timeout: 30000,
      });
      expect(await emptyCart.isVisible()).toBeTruthy();
    }
  }

  async addToCart(page, productId, quantity) {
    try {
      // Navigate to products page
      await page.goto(`${this.UI_BASE_URL}/products`, { timeout: 60000 });

      // Wait for products container
      await page.waitForSelector(".features_items", {
        state: "visible",
        timeout: 30000,
      });

      for (let i = 0; i < quantity; i++) {
                // Wait for add to cart button and verify it's clickable
                const addToCartButton = await page.waitForSelector(
                  `.productinfo a.btn.add-to-cart[data-product-id="${productId}"]`,
                  { state: "visible", timeout: 10000 }
                );
                // Click and wait for response
                await Promise.all([
                  page.waitForResponse(
                    (response) =>
                      response.url().includes("add_to_cart") &&
                      response.status() === 200
                  ),
                  addToCartButton.click(),
                ]);
                // Wait for modal to be visible (with show class)
                await page.waitForSelector("#cartModal.modal.show", {
                  state: "visible",
                  timeout: 10000,
                });
        // Click continue shopping button
        await page.click(".close-modal");

        // Wait for modal to disappear
        await page.waitForSelector("#cartModal", {
          state: "hidden",
          timeout: 10000,
        });
      }

      return true;
    } catch (error) {
      console.error(`Error adding product ${productId} to cart:`, error);
      throw error;
    }
  }

  async verifyProductInCart(page, productId, quantity) {
    // GO TO THE CART PAGE
    await page.goto(`${this.UI_BASE_URL}/view_cart`, {
      timeout: 60000,
    });

    // VERIFY URL IS CORRECT
    expect(page.url()).toContain("/view_cart");

    // WAIT FOR CART CONTAINER
    await page.waitForSelector("#cart_info", {
      state: "visible",
      timeout: 30000,
    });

    // VERIFY PRODUCT IS IN CART
    // Changed selector to match HTML structure
    const productRow = page.locator(`tr#product-${productId}`);
    const isProductVisible = await productRow.isVisible();

    expect(isProductVisible).toBeTruthy();

    // Verify product image
    const productImage = productRow.locator(".cart_product img");
    await expect(productImage).toBeVisible();
    const imgSrc = await productImage.getAttribute("src");
    expect(imgSrc).toBeTruthy();
    expect(imgSrc).toContain(`get_product_picture/${productId}`);

    // Verify description
    const productName = await productRow
      .locator(".cart_description h4 a")
      .innerText();
    expect(productName).toBeTruthy();
    const productCategory = await productRow
      .locator(".cart_description p")
      .innerText();
    expect(productCategory).toBeTruthy();

    // VERIFY QUANTITY
    const quantityText = await productRow
      .locator(".cart_quantity button")
      .innerText();
    const quantityValue = parseInt(quantityText, 10);

    expect(quantityValue).toEqual(quantity);

    // VERIFY PRICE AND TOTAL
    const price = await productRow.locator(".cart_price p").innerText();
    expect(price).toMatch(/Rs\.\s*\d+/);

    const total = await productRow
      .locator(".cart_total .cart_total_price")
      .innerText();
    expect(total).toMatch(/Rs\.\s*\d+/);

    // Validate total calculation
    const priceValue = Number(price.replace("Rs.", "").trim());
    const totalValue = Number(total.replace("Rs.", "").trim());
    const expectedTotal = priceValue * quantity;
    expect(totalValue).toBe(expectedTotal);
  }
}

module.exports = new UIUtils();
