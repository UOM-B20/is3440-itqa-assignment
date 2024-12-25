@ui

Feature: View and Cart Brand Products

  Scenario: View and add brand products to cart
    Given I navigate to the URL "https://automationexercise.com/"
    When I click the Products button
    Then I verify that Brands are visible on left side bar
    When I click on MADAME brand link
    Then I verify that user is navigated to brand page and brand products are displayed
    When I click on BIBA brand link
    Then I verify that user is navigated to that brand page and can see products