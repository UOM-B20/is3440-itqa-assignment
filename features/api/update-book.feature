@api
Feature: Book Update Management

  Background:
    Given the book catalog is empty

  @authentication
  Scenario: Unauthenticated users cannot update books
    Given I am an unauthenticated user
    When I attempt to update book with ID 1 in catalog with following details:
      | title | author  |
      | Book2 | Author2 |
    Then I should receive an unauthorized access error

  @authorization @admin
  Scenario: Admin should be able to update books
    Given I am authenticated as "admin"
    Given the following books exists in the catalog:
      | id | title | author  |
      |  1 | Book1 | Author1 |
    When I attempt to update book with ID 1 in catalog with following details:
      | id | title | author  |
      |  1 | Book2 | Author2 |
    Then I should receive a success message

  @authorization @user
  Scenario: User should not be able to update books
    Given I am authenticated as "user"
    And the following books exists in the catalog:
      | id | title | author  |
      |  1 | Book1 | Author1 |
    When I attempt to update book with ID 1 in catalog with following details:
      | id | title | author  |
      |  1 | Book2 | Author2 |
    Then I should receive a forbidden access error
