@ui

Feature: Cart Product Quantity Verification

  Scenario: Add one product to cart and verify product quantity
    Given I navigate to the URL "http://automationexercise.com"
    When I click the Products button
    And I add the first product to the cart
    And I click View Cart
    Then I should see the quantity of the product as "1"

  Scenario: Add one more product to cart and verify product quantity
    Given I navigate to the URL "http://automationexercise.com"
    When I click the Products button
    And I add the first product to the cart
    And I click View Cart
    And I add the first product to the cart again
    And I click View Cart
    Then I should see the quantity of the product as "2"
