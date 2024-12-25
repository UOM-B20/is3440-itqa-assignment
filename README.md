# IS3440 - ITQA

## PREREQUISITES

- Node.js installed on your machine
- Java installed on your machine

## HOW TO TEST (GENERAL)

- clone the repository to your local machine.
- run `npm install` to install the dependencies.
- make sure the prerequisites are installed on your machine.

### UI TESTING

### API TESTING

#### WRITING API TESTS

##### 1. Create Feature Files

Location: `features/api/*.feature`

```gherkin
@api
Feature: Create a Book
   Scenario: Create new book
      Given I am authenticated
      When I create a book
      Then it should succeed
```

##### 2. Define Step Definitions

Location: `features/step_definitions/api/`

File naming convention:

- `auth.steps.js` - Authentication steps
- `book.steps.js` - Book-related steps
- `common.steps.js` - Shared steps

##### 3. Running Tests

Single feature:

```bash
npx cucumber-js features/api/books.feature
```

All API tests:

```bash
npm run test:api
```

#### API TEST CASES

##### Test Case Assignment

| Index No | Name              | Test Case                      |
| -------- | ----------------- | ------------------------------ |
| 204017T  | Maitha Sandaruwan | Authentication & Authorization |
| 2        |                   | Create Book Operations         |
| 3        |                   | Update Book Operations         |
| 4        |                   | Get All Books                  |
| 5        |                   | Get Single Book                |
| 6        |                   | Delete Book Operations         |

##### 1: Authentication & Authorization (3 test cases)

1. **Basic Authentication Test**

   - Endpoint: All endpoints
   - Action: Attempt access without basic auth
   - Expected: 401 Unauthorized

2. **User Role Authorization**

   - Allowed: GET /api/books, POST /api/books, DELETE /api/books/1
   - Restricted: GET /api/books/1, PUT /api/books/1
   - Expected: 403 Forbidden for restricted actions

3. **Admin Role Authorization**
   - Allowed: GET /api/books, GET /api/books/1, POST /api/books, PUT /api/books/1
   - Restricted: DELETE /api/books/1
   - Expected: 403 Forbidden for delete action

##### 2: Create Book Operations (3 test cases)

1. **Successful Book Creation**

   - Test with both admin and user credentials
   - Verify response structure and status code

2. **Duplicate Book Prevention**

   - Create book with same name
   - Expected: Error response

3. **Invalid Creation Data**
   - Test cases:
     - Empty request body
     - Missing title
     - Missing author
   - Expected: Appropriate error responses

##### 3: Update Book Operations (3 test cases)

1. **Non-existent Book Update**

   - Attempt to update non-existing book
   - Expected: Not found error

2. **Successful Update**

   - Update with admin and user credentials
   - Verify updated data matches request

3. **Invalid Update Data**
   - Test cases:
     - Missing title
     - Missing author
     - Empty body

##### 4: Get All Books (2 test cases)

1. **Empty and Seeded Database**

   - Get all books with empty DB
   - Seed DB and verify results
   - Test with both user and admin

2. **Sequential ID Verification**
   - Create multiple books
   - Verify ID sequence (e.g., 4,5,6 or 8,9,10)

##### 5: Get Single Book (2 test cases)

1. **Non-existent Book Retrieval**

   - Test with both user and admin
   - Expected: Not found error

2. **Existing Book Retrieval**
   - Test with admin credentials
   - Verify response data structure

##### 6: Delete Book Operations (2 test cases)

1. **Non-existent Book Deletion**

   - Attempt to delete non-existing book
   - Expected: Not found error

2. **Successful Book Deletion**
   - Delete with user and admin credentials
   - Verify book no longer exists
   - Expected: Success for user, 403 for admin

#### API KNOWN BUGS

Here are some bugs that have been identified in the APIs. `@known-bug` tag is used to mark these scenarios. and the bug details are documented in below.
