Feature: Cart Functionality

  Scenario: Add product to cart and verify

    Given I navigate to the home page

    When I click the cart button
    Then I should see the cart is empty
    When I search for "Men Tshirt"
    Then I should see the search result with "Men Tshirt"
    When I add the product to the cart
    Then I should see a confirmation message
    And I should be able to view the cart

  Scenario: Search for a non-existent product

    Given I navigate to the home page
    
    When I search for "Men Top"
    Then I should not see any search results
    And there should be no error message displayed