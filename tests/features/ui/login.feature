@ui
Feature: Sauce Demo Login

  Background:
    Given I am on the login page

  Scenario: Successful login
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be on the inventory page
    And I should see the products list

  Scenario: Failed login
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."