Feature: Remove product from cart

  Scenario: Remove product and verify cart functionality
    
    When I click on Products button
    And I add the first product to the cart
    And I click View Cart
    And I click the delete button for the product
    Then I should see the cart is empty

    When I click on Products button
    And I add the first product to the cart
    And I add the first product to the cart
    And I click View Cart
    Then I should see the quantity of the product as "2"
    When I click the delete button for the product
    Then I should see the cart is empty
