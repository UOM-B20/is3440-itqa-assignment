@api
Feature: Book Creation API Operations

  Background: 
    Given the book database is empty

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
  @known-bug @bug-4
  Scenario: Admin fails to create a duplicate book
    """
    Bug Details:
    ID: 4
    Status: Open
    Expected: Should get a conflict response (409)
    Actual: Got a already Reported response (208)
    Impact: Medium - Incorrect status code affects API contract and client implementations.
    """
    Given I am authenticated with username "admin" and password "password"
    And I have created a book with following details:
      | title      | author       |
      | Admin Book | Admin Author |
    When I have created a book with following details:
      | title      | author       |
      | Admin Book | Admin Author |
    Then the response status code should be 409
    And the response message should be "Book Already Exists"

  @admin 
  @known-bug @bug-5
  Scenario Outline: Admin fails to create a book with invalid data
    """
    Bug Details:
    ID: 5
    Status: Open
    Expected: Admin should not be able to create a book with invalid data (400)
    Actual: Able to create a book with invalid data (201) for some cases.
    Impact: High - Allows creation of invalid data
    """
    Given I am authenticated with username "admin" and password "password"
    When I have created a book with following details:
      | title   | author   |
      | <title> | <author> |
    Then the response status code should be 400
    Examples:
      | title    | author      |
      | <omit>   | Author1     | # Missing title field
      | Book1    | <omit>      | # Missing author field
      | <omit>   | <omit>      | # Empty request (no fields)
      |          | Author2     | # Whitespace title 
      | Book2    |             | # Whitespace author 
      | null     | Author3     | # Null title
      | Book3    | null        | # Null author

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
  @known-bug @bug-6
  Scenario: User fails to create a duplicate book
    """
    Bug Details:
    ID: 6
    Status: Open
    Expected: Should get a conflict response (409)
    Actual: Got a already Reported response (208)
    Impact: Medium - Incorrect status code affects API contract and client implementations.
    """
    Given I am authenticated with username "user" and password "password"
    And I have created a book with following details:
      | title     | author      |
      | User Book | User Author |
    Then the response status code should be 201
    When I have created a book with following details:
      | title     | author      |
      | User Book | User Author |
    Then the response status code should be 409
    And the response message should be "Book Already Exists"


  @user
  @known-bug @bug-7
  Scenario Outline: User fails to create a book with invalid data
    """
    Bug Details:
    ID: 7
    Status: Open
    Expected: User should not be able to create a book with invalid data (400)
    Actual: Able to create a book with invalid data (201) for some cases
    Impact: High - Allows creation of invalid data
    """
    Given I am authenticated with username "user" and password "password"
    When I have created a book with following details:
      | title   | author   |
      | <title> | <author> |
    Then the response status code should be 400
    Examples:
      | title    | author      |
      | <omit>   | Author1     | # Missing title field
      | Book1    | <omit>      | # Missing author field
      | <omit>   | <omit>      | # Empty request (no fields)
      |          | Author2     | # Whitespace title 
      | Book2    |             | # Whitespace author 
      | null     | Author3     | # Null title
      | Book3    | null        | # Null author