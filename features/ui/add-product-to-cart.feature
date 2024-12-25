@ui

Feature: Add Product to Cart

Scenario: Add one product to cart and verify
    Given I navigate to the home page
    When I click the Products button
    And I add the first product to the cart
    And I click View Cart
    Then I should see the first product in the cart

  Scenario: Add more products to cart and verify
    Given I navigate to the home page
    When I click the Products button
    And I add the first product to the cart
    And I click Continue Shopping
    And I add the second product to the cart
    And I add the third product to the cart
    And I click View Cart
    Then I should see all products in the cart








    

  Scenario: Add a product to the cart
    Given I navigate to the URL "http://automationexercise.com"
    When I click the Products button
    When I add first product to cart
    When I click Continue Shopping
    When I add second product to cart 
    When I click View Cart
    Then I should see both products in cart