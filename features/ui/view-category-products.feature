@ui

Feature: View Category Products

  Background:
    Given I navigate to the URL "https://automationexercise.com/"

  Scenario: View products by category
    Then I verify that categories are visible on left side bar
    When I click on "<categoryName>" category
    And I click on subcategory link under category with index "<index>"
    Then I verify that category page is displayed and confirm text "<categoryName>" - "<subCategoryName>" Products with "<index>" is displayed

    Examples:
      | categoryName | subCategoryName | index |
      | Women        | Dress           | 1     |
      | Women        | Tops            | 2     |
      | Women        | Saree           | 7     |
      | Men          | Tshirts         | 3     |
      | Men          | Jeans           | 6     |
      | Kids         | Dress           | 4     |
      | Kids         | Tops & Shirts   | 5     |






