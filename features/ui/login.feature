@ui
Feature: AutoMationExercise Website Login

  Background:
    Given I navigate to the URL "http://automationexercise.com/login"

  Scenario: Login user with correct email and password
    When I enter email "itqatest@gmail.com"
    And I enter password "Test@1234"
    When I click the login button
    Then I should see "Logged in as test itqa user" in the header navigation near the user icon