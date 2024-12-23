@ui

Feature: Add Product to Cart

  Scenario: Add a product to the cart
    Given I navigate to the URL "http://automationexercise.com"
    When I click the Products button
    When I add first product to cart
    When I click Continue Shopping
    When I add second product to cart 
    When I click View Cart
    Then I should see both products in cart