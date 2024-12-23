@ui
Feature: Checkout Process

  Scenario: Complete checkout process with payment
    Given I have products in my cart
    When I click proceed to checkout
    Then I verify cart items and total
    When I place the order
    And I fill payment details:
      | name         | Itqa TestUser      |
      | card number  | 4242424242424242   |
      | cvc          | 123                |
      | expiry month | 12                 |
      | expiry year  | 2025               |
    And I confirm payment
    Then I should see order confirmation