  @ui
Feature: AutoMationExercise Website reviews a product

  Background:
    Given I navigate to the URL "https://automationexercise.com/products"
  
  Scenario: User reviews a product
    Given the user is on the homepage
    When the user clicks the products button
    And the user clicks "View Product"
    And the user enters their name "Pasinda"
    And the user enters their email "pasinda@gmail.com"
    And the user enters their review "Great product!"
    And the user clicks the submit button
    Then the user should see the message "Thank you for your review."