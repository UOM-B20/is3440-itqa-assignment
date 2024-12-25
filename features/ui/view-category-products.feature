@ui

Feature: View Category Products

  Scenario: View products by category
    Given I navigate to the URL "https://automationexercise.com/"
    Then I verify that categories are visible on left side bar
    When I click on Women category
    And I click on Dress category link under Women category
    Then I verify that category page is displayed and confirm text Women - Dress Products
    When I click on Men category
    When I click on TSHIRTS sub-category link of MEN category
    Then I verify that user is navigated to TSHIRTS category page
