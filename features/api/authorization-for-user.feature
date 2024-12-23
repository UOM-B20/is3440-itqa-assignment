Feature: Book API Authorization for User Role

  Background: 
    Given the book database is empty
    And I have basic authentication credentials
      | username | password |
      | user     | password |

  Scenario: User can get all books
    Given I am authenticated as user
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200

  Scenario: User can create a new book
    Given I am authenticated as user
    When I send a "POST" request to "/api/books" with body:
      """
      {
        "title": "King Malitha3",
        "author": "Sandaruwan Malitha"
      }
      """
    Then the response status code should be 201
    And the response should contain:
      | id     | title         | author             |
      | {id}   | King Malitha3 | Sandaruwan Malitha |

  Scenario: User cannot get book details
    Given I am authenticated as user
    And a book exists with id "1"
    When I send a "GET" request to "/api/books/1"
    Then the response status code should be 403
    And the response should contain error for id "1"

  Scenario: User cannot update a book
    Given I am authenticated as user
    And a book exists with id "1"
    When I send a "PUT" request to "/api/books/1" with body:
      """
      {
        "id": 1,
        "title": "King Malitha4",
        "author": "Updated author"
      }
      """
    Then the response status code should be 403
    And the response should contain error for id "1"

  Scenario: User can delete a book
    Given I am authenticated as user
    And a book exists with id "1"
    When I send a "DELETE" request to "/api/books/1"
    Then the response status code should be 200