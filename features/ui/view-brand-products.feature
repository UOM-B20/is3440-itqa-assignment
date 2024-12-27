@ui
Feature: View Brand Products

    Background:
        Given I am on the home page

    Scenario: View products by brand
        When I verify that "brands" section are visible on left side bar
        When I click on random brand name
        Then I verify that user is navigated to brand page and brand products are displayed
        And  I verify that items count near the brand name is correct match with the products displayed
