Feature: Book API Authorization for User Role (User can only view all books, create a book, and delete a book)

  Background: 
    Given the book database is empty

  Scenario: User can get all books
    Given I authenticated as username "user" and password "password"
    When I send a "GET" request to "/api/books"
    Then the response status code should be 200

  Scenario: User can not view a individual book
    Given I authenticated as username "user" and password "password"
    Given the book database has a book with id 1
    When I send a "GET" request to "/api/books/1"
    Then the response status code should be 403

  Scenario: User can create a book
    Given I authenticated as username "user" and password "password"
    When I send a "POST" request to "/api/books" with the body:
      """
      {
        "title": "Title",
        "author": "Author"
      }
      """
    Then the response status code should be 201

  Scenario: User can not update a book
    Given I authenticated as username "user" and password "password"
    Given the book database has a book with id 1
    When I send a "PUT" request to "/api/books/1" with the body:
      """
      {
        "id": 1,
        "title": "New Title",
        "author": "New Author"
      }
      """
    Then the response status code should be 403

  Scenario: User can delete a book
    Given I authenticated as username "user" and password "password"
    Given the book database has a book with id 1
    When I send a "DELETE" request to "/api/books/1"
    Then the response status code should be 200

