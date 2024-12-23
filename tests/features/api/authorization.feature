@api
Feature: Book API Authorization

    Background: 
    Given I am authenticated as "user" with password "password"

    Scenario: Regular user can view books (all books)
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    And the response should contain book details:
      """
     []
      """

    Scenario: Regular user cannot delete books
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    When I send a "DELETE" request to "/api/books/1"
    Then the response status code should be 403

    Scenario: Regular user cannot update books
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200
    When I send a "PUT" request to "/api/books/1" with body:
      """
      {
        "id": 1,
        "title": "Updated Book",
        "author": "Updated Author"
      }
      """
    Then the response status code should be 403

