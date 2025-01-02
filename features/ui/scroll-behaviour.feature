@ui
Feature: Scroll behaviour

  Background:
    Given I am on the home page

  @scroll
  Scenario: Scroll down and up manually
    When I scroll to the bottom of the page
    Then I should see the subscription form in the footer
    When I scroll to the top of the page
    And I should see the complete header
    Then I should see the website logo

  @scroll
  Scenario: Scroll up using scroll-up button
    When I scroll to the bottom of the page
    Then the scroll-up button should be visible
    When I click the scroll-up button
    Then I should see the complete header
    And I should see the website logo
    And the scroll-up button should be hidden

  @scroll
  Scenario: Scroll button visibility at different scroll positions
    When I scroll down <percentage>% of the page
    Then the scroll-up button should be <visibility>

    Examples:
      | percentage | visibility |
      |          0 | hidden     |
      |          2 | hidden     |
      |         20 | visible    |
      |         50 | visible    |
      |         80 | visible    |
