@api

Feature: Book Deletion Management

    Background:
        Given the book catalog is empty

    @authentication
    Scenario: Unauthenticated users cannot delete books
    Given I am an unauthenticated user
    When I attempt to remove book with ID 1 from catalog
    Then I should receive an unauthorized access error

    @authorization @admin
    @known-bug @bug-1 @temporary-workaround
    Scenario: Admin should be able to delete books (currently blocked)
    """
    Bug Details:
    ID: 1
    Status: Open
    Expected: Admin should be able to delete books (200)
    Actual: Permission denied (403)
    Impact: High - Blocks admin book management
    """
    Given I am authenticated as "admin"
    Given the following books exists in the catalog:
        | id | title | author |
        | 1  | Book1 | Author1|
    When I attempt to remove book with ID 1 from catalog
    Then I should receive a success message

    @authorization @user
    @known-bug @bug-3 @temporary-workaround
    Scenario: User should not be able to delete books (currently allowed)
    """
    Bug Details:
    ID: 3
    Status: Open
    Expected: User should be denied deletion (403)
    Actual: Operation succeeds (200)
    Impact: Critical - Security vulnerability
    """
    Given I am authenticated as "user"
    And the following books exists in the catalog:
        | id | title | author |
        | 1  | Book1 | Author1|
    When I attempt to remove book with ID 1 from catalog
    Then I should receive a forbidden access error






    












