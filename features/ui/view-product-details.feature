@ui

Feature: View Product Details

  Background:
    Given I am on the home page

  Scenario: View details of a product
    When I navigate to "Products" page
    Then I should see a list of products
    When I click View Product button for a random product in the page
    Then I should see the product details for the selected product