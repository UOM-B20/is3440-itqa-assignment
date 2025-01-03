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

  @functionalities
  Scenario: Update a book with valid data
    Given the book library database has following book:
      | title      | author       |
      | Admin Book | Admin Author |
    And I am authenticated with username "admin" and password "password"
    When I try to update the book using "{stored-id}" with following details:
      | id          | title     | author     |
      | {stored-id} | New Title | New Author |
    Then the response should be successful
    And the book details should match:
      | title     | author     |
      | New Title | New Author |

  @functionalities
  Scenario: Update a book with invalid data
    Given the book library database has following book:
      | title | author |
      | Book  | Author |
    And I am authenticated with username "admin" and password "password"
    When I try to update book with id:"{stored-id}" and verify response:
      | id          | title         | author         | status  | statusCode |
      | null        | Updated Title | Updated Author | failure |        400 |
      | {stored-id} | null          | null           | failure |        400 |
      | {stored-id} | null          | Updated Author | failure |        400 |
      | {stored-id} | Updated Title | null           | failure |        400 |
      | {stored-id} | Updated Title | Updated Author | success |        200 |
      | {stored-id} | Title         | Updated Author | success |        200 |
      | {stored-id} | Updated Title | Author         | success |        200 |
      | {stored-id} | Title         | Author         | success |        200 |

  @functionalities
  Scenario: Update a non existing book
    Given I am authenticated with username "admin" and password "password"
    When I try to update the book using "999" with following details:
      | id  | title     | author     |
      | 999 | New Title | New Author |
    Then the response status code should be 404
