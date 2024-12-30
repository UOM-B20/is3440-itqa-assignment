@ui @known-bug @bug-1

Feature: Report Brand Navigation Bug

    Background:
        Given I navigate to the URL "https://automationexercise.com/"

    Scenario: Mismatch in brand page URL encoding
        When I click the Products button
        Then I verify that Brands are visible on left side bar
        When I click on "<brandName>" brand link
        Then I verify that user is navigated to "<brandName>" brand page and brand products are displayed

        Examples:
            | brandName          |
            | Polo               |
            | H&M                |
            | Madame             |
            | Mast & Harbour     |
            | Babyhug            |
            | Allen Solly Junior |
            | Kookie Kids        |
            | Biba               |
