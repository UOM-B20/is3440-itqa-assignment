@ui
Feature: Verify Product Quantity in Cart

  Background:
    Given I am on the home page
    And I have no products in the cart

  Scenario: Verify one quantity of product in cart
    Given I navigate to "Products" page
    When I add product with id "1" to cart
    And I select "view cart" in the cart modal
    Then I should see the product with id "1" in the cart
    And I should see the product quantity as "1" for product id:"1" in the cart

  Scenario: Verify multiple quantity of products in cart
    Given I navigate to "Products" page
    When I add following products to cart
      | id | quantity |
      |  1 |        1 |
      |  2 |        2 |
      |  3 |        3 |
    Then I click the Cart button
    Then I should see the following products in the cart and validate totals:
      | id | quantity |
      |  1 |        1 |
      |  2 |        2 |
      |  3 |        3 |
