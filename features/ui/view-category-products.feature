@ui

Feature: View Category Products

  Background:
    Given I am on the home page

  Scenario: View products by category
    When I verify that "category" section are visible on left side bar
    When I click the category name sub categories should be visible
    When I click the subcategories we go the categories page
    Then I verify that category page is display and confirm text with category_name- subcategory_name
