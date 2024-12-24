@api
Feature: Book API Authorization for Admin Role

  Background: 
    Given the book database is empty
    And I authenticated as username "admin" and password "password"

  Scenario:Admin can successfully get all books
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    And the response should contain an empty list

  Scenario: Admin can successfully create a new book
    When I have created a book with title "Admin Book" and author "Admin Author"
    Then the response status code should be 201
    And the response should contain the created book details title "Admin Book" and author "Admin Author"

  Scenario: Admin can view specific book details
    Given I have created a book with title "Admin Book" and author "Admin Author"
    When I send a "GET" request to "/api/books/{stored-id}"
    Then the response status code should be 200

  Scenario: Admin can update existing book
    Given I have created a book with title "Admin Book" and author "Admin Author"
    When I send a "PUT" request to "/api/books/{stored-id}" with updated details:
      """
      {
        "id": "{stored-id}",
        "title": "Updated Admin Book",
        "author": "Updated Admin Author"
      }
      """
    Then the response status code should be 200

  Scenario: Admin can not delete a book
    Given I have created a book with title "Admin Book" and author "Admin Author"
    When I send a "DELETE" request to "/api/books/{stored-id}"
    Then the response status code should be 403