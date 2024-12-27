  @ui
Feature: AutoMationExercise Website reviews a product

  Background:
    Given I navigate to the URL "https://automationexercise.com/products"

Feature: Search Product Discovery

  Scenario: User searches for a product
    Given the user is on the homepage
    When the user enters "Blue Top" into the search bar
    And the user clicks the search button
    Then the user should see search results for "Blue Top"

    