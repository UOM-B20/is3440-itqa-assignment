@ui
Feature: Verify Product Quantity in Cart

  Scenario: Add one product to cart and verify product quantity
    Given I navigate to the URL "http://automationexercise.com"
    When I click on the Products button
    And I add the first product to the cart
    And I click View Cart
    Then I should see the product quantity as "1"

  Scenario: Add two products to cart and verify product quantity
    Given I navigate to the URL "http://automationexercise.com"
    When I click on the Products button
    And I add the first product to the cart
    And I add the second product to the cart 
    And I click View Cart
    Then I should see the product quantity as "2"

