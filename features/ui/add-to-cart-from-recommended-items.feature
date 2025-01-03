@ui
Feature: AutoMationExercise Website Add to cart from Recommended item
  Background:
    Given I navigate to the URL "http://automationexercise.com"
    
  Scenario: User adds a recommended item to the cart
    Given the user is on the homepage
    When the user goes to Recommended Items
    And the user clicks the "Add to cart" button for the item with product id "2"
    Then the user should see "Added!" in the modal title
   