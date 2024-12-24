@api
Feature: Library API Authentication

  Scenario: Accessing endpoints without authentication
    When I send a "<method>" request to "<endpoint>" without authentication
    Then the response status code should be 401

    Examples:
      | method | endpoint     | 
      | GET    | /api/books   |
      | GET    | /api/books/1 |
      | POST   | /api/books   |
      | PUT    | /api/books/1 |
      | DELETE | /api/books/1 |
