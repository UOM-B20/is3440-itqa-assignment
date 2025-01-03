@ui
Feature: AutomationExercise Website Product Search
  Background:
    Given I navigate to the URL "https://automationexercise.com/products"

  Scenario: User searches for a product
    Given the user is on the search product discovery homepage
    When the user enters "Blue Top" into the search bar
    And the user clicks the search button
    Then the user should see search results for "Blue Top"