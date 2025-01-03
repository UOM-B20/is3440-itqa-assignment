@ui
Feature: Remove product from cart

  Background:
    Given I am on the home page
    And I have no products in the cart

  Scenario: Remove Product from Cart
    Given I navigate to "Products" page
    And I have following products in the cart:
      | id | quantity |
      |  1 |        1 |
      |  2 |        1 |
    When I click the Cart button
    Then I remove product with id "1" from the cart
    Then I should not see product with id "1" in the cart

  Scenario: Remove all products from cart
    Given I navigate to "Products" page
    And I have following products in the cart:
      | id | quantity |
      |  1 |        1 |
      |  2 |        1 |
    When I click the Cart button
    Then I remove product with id "1" from the cart
    And I remove product with id "2" from the cart
    Then I have no products in the cart
