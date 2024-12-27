Feature: Delete Book Operations

  Scenario: Non-existent Book Deletion
    Given I am an authenticated user
    When I attempt to delete a non-existing book with ID "9999"
    Then I should receive a "404 Not Found" error

  Scenario: Successful Book Deletion
    Given I am an authenticated user
    When I delete an existing book with ID "1"
    Then the book should no longer exist
    And I should receive a "200 OK" response

  Scenario: Admin Book Deletion Attempt
    Given I am an authenticated admin
    When I attempt to delete a book with ID "1"
    Then I should receive a "403 Forbidden" error