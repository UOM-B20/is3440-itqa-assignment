@ui
Feature: Add Product to Cart

  Scenario: Add one product to cart and verify
    Given I navigate to the URL "http://automationexercise.com"
    When I click on the Products button
    And I add the first product to cart
    And I click ViewCart
    Then I should see the first product in the cart

  Scenario: Add more products to cart and verify
    Given I navigate to the URL "http://automationexercise.com"
    When I click on the Products button
    And I add the first product to cart
    And I add the second product to the cart
    And I add the third product to the cart
    And I click ViewCart
    Then I should see all products in the cart 










