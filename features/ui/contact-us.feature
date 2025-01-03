@ui
Feature: Contact Us Form
  Scenario: Submit a message using the Contact Us form
    Given I launch the browser
    And I navigate to 'http://automationexercise.com'
    Then the home page should be visible
    When I click on the 'Contact Us' button
    Then 'GET IN TOUCH' should be visible
    When I fill in the contact form with valid data
    And I upload a file
    And I click the 'Submit' button
    And I confirm the alert
    Then I should see the success message 'Success! Your details have been submitted successfully.'
    When I click on the 'Home' button
    Then I should be back on the home page