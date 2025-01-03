@ui
Feature: Add Product to Cart

  Background:
    Given I am on the home page

  Scenario: Add one product to cart and verify
    When I navigate to "Products" page
    Then I should see a list of products
    And I add product with id "1" to cart
    And I select "view cart" in the cart modal
    Then I should see the product with id "1" in the cart

  Scenario: Add more products to cart and verify
    When I navigate to "Products" page
    Then I should see a list of products
    And I add product with id "1" to cart
    And I select "continue shopping" in the cart modal
    And I add product with id "2" to cart
    And I select "continue shopping" in the cart modal
    And I add product with id "3" to cart
    And I select "view cart" in the cart modal
    Then I should see the product with id "1" in the cart
    And I should see the product with id "2" in the cart
    And I should see the product with id "3" in the cart










