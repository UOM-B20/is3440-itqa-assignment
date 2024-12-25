@api
Feature: Book Creation API Operations

  Background: 
    Given the book database is empty

  # Admin Book Creation Tests
  @admin
  Scenario: Admin successfully creates a new book with valid data
    Given I am authenticated with username "admin" and password "password"
    When I have created a book with following details:
      | title      | author       |
      | Admin Book | Admin Author |
    Then the response status code should be 201
    And the book details should match:
      | title      | author       |
      | Admin Book | Admin Author |

  @admin
  Scenario: Admin fails to create a duplicate book
    Given I am authenticated with username "admin" and password "password"
    And I have created a book with following details:
      | title      | author       |
      | Admin Book | Admin Author |
    When I have created a book with following details:
      | title      | author       |
      | Admin Book | Admin Author |
    Then the response status code should be 409

  @admin @invalid-data
  Scenario Outline: Admin fails to create a book with invalid data
    Given I am authenticated with username "admin" and password "password"
    When I create a book with invalid data:
      | title   | author   |
      | <title> | <author> |
    Then the response status code should be 400
    Examples:
      | title      | author       |
      |            | Admin Author | # Missing title
      | Admin Book |              | # Missing author
      |            |              | # Empty request

  # User Book Creation Tests
  @user
  Scenario: User successfully creates a new book with valid data
    Given I am authenticated with username "user" and password "password"
    When I have created a book with following details:
      | title     | author      |
      | User Book | User Author |
    Then the response status code should be 201
    And the book details should match:
      | title     | author      |
      | User Book | User Author |

  @user
  Scenario: User fails to create a duplicate book
    Given I am authenticated with username "user" and password "password"
    And I have created a book with following details:
      | title     | author      |
      | User Book | User Author |
    When I have created a book with following details:
      | title     | author      |
      | User Book | User Author |
    Then the response status code should be 409

  @user @invalid-data
  Scenario Outline: User fails to create a book with invalid data
    Given I am authenticated with username "user" and password "password"
    When I create a book with invalid data:
      | title   | author   |
      | <title> | <author> |
    Then the response status code should be 400
    Examples:
      | title     | author      |
      |           | User Author | # Missing title
      | User Book |             | # Missing author
      |           |             | # Empty request