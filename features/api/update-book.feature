@api
Feature: Book Update Management

  Background:
    Given the book database is empty

  @authentication
  Scenario: Unauthorized user tries to update a book
    Given the book library database has following book:
      | title      | author       |
      | Admin Book | Admin Author |
    Given I am an unauthenticated user
    When I try to update the book using "{stored-id}" with following details:
      | id          | title     | author     |
      | {stored-id} | New Title | New Author |
    Then the response status code should be 401

  @authorization @admin
  Scenario: Admin role users can update a book
    Given the book library database has following book:
      | title      | author       |
      | Admin Book | Admin Author |
    And I am authenticated with username "admin" and password "password"
    When I try to update the book using "{stored-id}" with following details:
      | id          | title     | author     |
      | {stored-id} | New Title | New Author |
    Then the response should be successful

  @authorization @user
  Scenario: Regular users should not be able to update a book
    Given the book library database has following book:
      | title     | author      |
      | User Book | User Author |
    And I am authenticated with username "user" and password "password"
    When I try to update the book using "{stored-id}" with following details:
      | id          | title     | author     |
      | {stored-id} | New Title | New Author |
    Then the response status code should be 403
    And the response message should be "User is not permitted."
