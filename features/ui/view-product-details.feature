@ui

Feature: View Product Details

  Scenario: View details of a product
    Given I navigate to the URL "https://automationexercise.com/"
    When I click the Products button
    Then I should see a list of products
    When I click on the View Product button for the first product
    Then I should see the product details displayed