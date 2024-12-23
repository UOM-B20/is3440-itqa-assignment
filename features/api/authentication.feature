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

  Scenario: Accessing endpoints with valid authentication as user only has access to Get All Books and Create Book and Delete Book
    Given I have basic authentication credentials as user
    When I send a "<method>" request to "<endpoint>" with authentication
    Then the response status code should be 200

    Examples:
      | method | endpoint     |
      | GET    | /api/books   |
      | GET    | /api/books/1 |
      | POST   | /api/books   |
      | PUT    | /api/books/1 |
      | DELETE | /api/books/1 |