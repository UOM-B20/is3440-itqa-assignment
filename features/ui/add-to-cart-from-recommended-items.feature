@ui
Feature: AutoMationExercise Website Add to cart from Recommended item

  Background:
    Given I navigate to the URL "http://automationexercise.com"

Feature: Add to Cart from Recommended Items

  Scenario: User adds a recommended item to the cart
    Given the user is on the homepage
    When the user goes to Recommended Items
    And the user clicks the "Add to cart" button for the item with product id "2"
    Then the user should see the popup message "Added! Your product has been added to cart."