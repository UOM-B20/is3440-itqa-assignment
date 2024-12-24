@api
Feature: Book API Authorization for User Role

  Background: 
    Given the book database is empty
    And I am authenticated with username "user" and password "password"

  Scenario: User can successfully get all books
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    And the books list should be empty

  Scenario: User can successfully create a new book
    When I have created a book with following details:
      | title       | author      |
      | Test Book   | Test Author |
    Then the response status code should be 201
    And the book details should match:
      | title       | author      |
      | Test Book   | Test Author |

  Scenario: User cannot view specific book details
    Given I have created a book with following details:
      | title       | author      |
      | Test Book   | Test Author |
    When I send a "GET" request to "/api/books/{stored-id}"
    Then the response status code should be 403

  Scenario: User cannot update existing book
    Given I have created a book with following details:
      | title       | author      |
      | Test Book   | Test Author |
    When I update the book with:
      """
      {
        "id": "{stored-id}",
        "title": "Updated Test Book",
        "author": "Updated Test Author"
      }
      """
    Then the response status code should be 403

  Scenario: User can delete a book
    Given I have created a book with following details:
      | title       | author      |
      | Test Book   | Test Author | 
    When I send a "DELETE" request to "/api/books/{stored-id}"
    Then the response status code should be 200




