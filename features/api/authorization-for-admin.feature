@api
Feature: Book API Authorization for Admin Role

  Background: 
    Given the book database is empty
    And I am authenticated with username "admin" and password "password"

  Scenario:Admin can successfully get all books
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    And the books list should be empty

  Scenario: Admin can successfully create a new book
    Given the book database is empty
    And I am authenticated with username "admin" and password "password"
    When I create a new book with title "Admin Book" and author "Admin Author"
    Then the response status code for creating a book should be 201
    And the book details should match:
      | title       | author      |
      | Admin Book  | Admin Author |
    And the created book should be present in the book list

  Scenario: Admin can view specific book details
    Given I have created a book with following details:
      | title       | author      |
      | Admin Book  | Admin Author |
    When I send a "GET" request to "/api/books/{stored-id}"
    Then the response status code should be 200

  Scenario: Admin can update existing book
    Given I have created a book with following details:
      | title       | author      |
      | Admin Book  | Admin Author |
    When I update the book with:
      """
      {
        "id": "{stored-id}",
        "title": "Updated Admin Book",
        "author": "Updated Admin Author"
      }
      """
    Then the response status code should be 200

  Scenario: Admin can not delete a book
    Given I have created a book with following details:
      | title       | author      |
      | Admin Book  | Admin Author |  
    When I send a "DELETE" request to "/api/books/{stored-id}"
    Then the response status code should be 403