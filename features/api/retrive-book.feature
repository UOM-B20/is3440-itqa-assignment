@api
Feature: Book API Existing and Non-existent Book Retrieval

    Background:
        Given the book database is empty
        And I am authenticated with username "admin" and password "password"

    Scenario: Admin can retrieve an existing book
        And I am authenticated with username "admin" and password "password"
        When I have created a book with following details:
            | title      | author       |
            | Admin Book | Admin Author |
        When I send a "GET" request to "/api/books/{stored-id}"
        Then the response status code should be 200

    Scenario: Admin can not retrive non-existent book details
        And I am authenticated with username "admin" and password "password"
        When I send a "GET" request to "/api/books/999"
        Then the response status code should be 404

    @user @non-existent-book
    @known-bug @bug-1
    Scenario: User can not retrive non-existent book details
        And I am authenticated with username "user" and password "password"
        When I send a "GET" request to "/api/books/999"
        Then the response status code should be 404