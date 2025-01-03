@api
Feature: Delete Book Management

  Background:
    Given the book database is empty

  @authentication
  Scenario: Unauthenticated user fails to delete a book
    Given the book library database has following book:
      | title      | author       |
      | Admin Book | Admin Author |
    Given I am an unauthenticated user
    When I delete the book using stored id
    Then the response status code should be 401

  @authorization @admin @known-bug @bug-1 @temporary-workaround
  Scenario: Admin role can delete a book
    """
    Bug Details:
    Project: Book Management System
    Bug ID: BUG-001
    Status: Open
    Priority: High
    Severity: Blocker
    Component: API
    Summary: Admin unable to delete books
    Description: Admin users receive 403 Forbidden when attempting to delete books via API, despite having appropriate permissions. This prevents admins from managing book inventory. Expected response is 200 OK, but receiving 403 Forbidden.
    """

    Given the book library database has following book:
      | title      | author       |
      | Admin Book | Admin Author |
    And I am authenticated with username "admin" and password "password"
    When I delete the book using stored id
    Then the response should be successful

  @authorization @user @known-bug @bug-2
  Scenario: User should not be able to delete a book
    """
    Bug Details:
    Project: Book Management System
    Bug ID: BUG-002
    Status: Open
    Priority: High
    Severity: Critical
    Component: API
    Summary: Regular users able to delete books
    Description: Regular users are able to successfully delete books with 200 OK response, when they should be receiving 403 Forbidden. This represents a security vulnerability as only admin users should have deletion privileges.
    """

    Given the book library database has following book:
      | title     | author      |
      | User Book | User Author |
    And I am authenticated with username "user" and password "password"
    When I delete the book using stored id
    Then the response status code should be 403

  @functionalities
  Scenario: Delete a book that does not exist
  """
  Note: There is a bug in authorization, where admin users are unable to delete books. This bug is being tracked under BUG-001. The workaround is to use a user with delete permissions to test the delete functionality.
  """

    Given I am authenticated with username "user" and password "password"
    # initially the book database is empty, is there is no book with id:"999"
    When I try to delete the book with id:"999"
    Then the response status code should be 404

  @functionalities
  Scenario: Delete an existing book
  """
  Note: There is a bug in authorization, where admin users are unable to delete books. This bug is being tracked under BUG-001. The workaround is to use a user with delete permissions to test the delete functionality.
  """

    Given the book library database has following book:
      | title     | author      |
      | Test Book | Test Author |
    And I am authenticated with username "user" and password "password"
    When I delete the book using stored id
    Then the response should be successful

  @functionalities
  Scenario: Delete a book with invalid id
  """
  Note: There is a bug in authorization, where admin users are unable to delete books. This bug is being tracked under BUG-001. The workaround is to use a user with delete permissions to test the delete functionality.
  """

    Given the book library database has following book:
      | title     | author      |
      | Test Book | Test Author |
    And I am authenticated with username "user" and password "password"
    When I try to delete the book with id:"<invalid-id>"
    Then the response status code should be 400

    Examples:
      | invalid-id |
      | abc        |
      | $67        |
