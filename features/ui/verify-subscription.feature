@ui
Feature: Verify Subscription in Home Page

  Scenario: Subscribe to the newsletter
    Given I open the browser
    And I navigate to the 'http://automationexercise.com'
    Then home page should be visible
    When I scroll to bottom of the page
    Then I should see the text 'SUBSCRIPTION'
    When I enter my email address 'test@example.com' and click the arrow button
    Then I should see the success message 'You have been successfully subscribed!'