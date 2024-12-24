@api
Feature: Book API Authorization for User Role

  Background: 
    Given the book database is empty
    And I authenticated as username "user" and password "password"

  Scenario: User can perform allowed operations
    # First verify GET all works
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    And the response should contain an empty list

    # Create a book and verify
    When I create a new book with title "Test Book" and author "Test Author"
    Then the response status code should be 201
    And the response should contain the created book details title "Test Book" and author "Test Author"
    And I store the created book ID

    # Try to view the specific book (should fail)
    When I send a "GET" request to "/api/books/{stored-id}"
    Then the response status code should be 403

    # Try to update the book (should fail)
    When I send a "PUT" request to "/api/books/{stored-id}" with updated details
    ```
    {
      "id": "{stored-id}",
      "title": "Updated Test Book",
      "author": "Updated Test Author"
    }
    ```
    Then the response status code should be 403
    
    # Finally delete the book
    When I send a "DELETE" request to "/api/books/{stored-id}"
    Then the response status code should be 200