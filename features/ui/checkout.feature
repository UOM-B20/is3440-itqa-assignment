@ui
Feature: Checkout Process
  As a logged in user
  I want to complete the checkout process
  So that I can purchase products and download my invoice

  Background:
    Given I navigate to the automation exercise website
    And I am logged in as "itqatest@gmail.com" with password "Test@1234"
    And I have added products to my cart

  @checkout
  Scenario: Complete checkout process with valid payment details
    When I proceed to checkout
    Then I should see my cart items and verify the total amount
    When I proceed to payment
    And I enter the following payment details:
      | Field        | Value                |
      | name         | Test User            |
      | card number  | 4242424242424242     |
      | cvc          | 123                  |
      | expiry month | 12                   |
      | expiry year  | 2025                 |
    And I confirm the payment
    Then I should see the order confirmation
    And I should be able to download the invoice
    And I should be navigated back to the homepage