@api
Feature: Book API Existing and Non-existent Book Retrieval

  Background:
    Given the book database is empty

  @authentication
  Scenario: Unauthenticated user can not retrieve books
    Given I am an unauthenticated user
    When I try to retrieve all books
    Then the response status code should be 401

  @authentication
  Scenario: Unauthenticated user can not retrieve a book
    Given the book library database has following book:
      | title     | author      |
      | Test Book | Test Author |
    Given I am an unauthenticated user
    When I try to retrieve the book with id:"{stored-id}"
    Then the response status code should be 401

  @authorization @admin
  Scenario: Admin can retrieve all books
    And I am authenticated with username "admin" and password "password"
    When I try to retrieve all books
    Then the response should be successful

  @authorization @admin
  Scenario: Admin can retrieve particular book
    Given the book library database has following book:
      | title     | author      |
      | Test Book | Test Author |
    And I am authenticated with username "admin" and password "password"
    When I try to retrieve the book with id:"{stored-id}"
    Then the response should be successful

  @authorization @user
  Scenario: User can retrieve all books
    Given I am authenticated with username "user" and password "password"
    When I try to retrieve all books
    Then the response should be successful

  @authorization @user @known-bug @bug-003
  Scenario: User can retrieve particular book
  """
    Bug Details:
    Project: Book Management System
    Bug ID: BUG-003
    Status: Open
    Priority: High
    Severity: Blocker
    Component: API
    Summary: User unable to retrieve books
    Description: Regular users are unable to retrieve books via API, despite having appropriate permissions. This prevents users from accessing book inventory. Expected response is 200 OK, but receiving 403 Forbidden.
  """

    Given the book library database has following book:
      | title     | author      |
      | Test Book | Test Author |
    And I am authenticated with username "user" and password "password"
    When I try to retrieve the book with id:"{stored-id}"
    Then the response should be successful

  Scenario: Admin can retrieve an existing book
    And I am authenticated with username "admin" and password "password"
    When I have created a book with following details:
      | title      | author       |
      | Admin Book | Admin Author |
    When I send a "GET" request to "/api/books/{stored-id}"
    Then the response status code should be 200
    And the book details should match:
      | title      | author       |
      | Admin Book | Admin Author |

  Scenario: Admin can not retrive non-existent book details
    And I am authenticated with username "admin" and password "password"
    When I send a "GET" request to "/api/books/999"
    And the response message should be "Book not found"

  Scenario: Admin can we view all books
    Given the book library database has following books:
      | title       | author        |
      | Test Book 1 | Test Author 1 |
      | Test Book 2 | Test Author 2 |
      | Test Book 3 | Test Author 3 |
      | Test Book 4 | Test Author 4 |
      | Test Book 5 | Test Author 5 |
    And I am authenticated with username "admin" and password "password"
    When I try to retrieve all books
    Then the response should be successful
    And the response should contain 5 records and book details should match:
      | title       | author        |
      | Test Book 1 | Test Author 1 |
      | Test Book 2 | Test Author 2 |
      | Test Book 3 | Test Author 3 |
      | Test Book 4 | Test Author 4 |
      | Test Book 5 | Test Author 5 |

  Scenario: User can view all books
    Given the book library database has following books:
      | title       | author        |
      | Test Book 1 | Test Author 1 |
      | Test Book 2 | Test Author 2 |
      | Test Book 3 | Test Author 3 |
      | Test Book 4 | Test Author 4 |
      | Test Book 5 | Test Author 5 |
    And I am authenticated with username "user" and password "password"
    When I try to retrieve all books
    Then the response should be successful
    And the response should contain 5 records and book details should match:
      | title       | author        |
      | Test Book 1 | Test Author 1 |
      | Test Book 2 | Test Author 2 |
      | Test Book 3 | Test Author 3 |
      | Test Book 4 | Test Author 4 |
      | Test Book 5 | Test Author 5 |
