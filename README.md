# IS3440 - ITQA

## PREREQUISITES

- Node.js installed on your machine
- Java installed on your machine

## HOW TO TEST (GENERAL)

- clone the repository to your local machine.
- run `npm install` to install the dependencies.
- make sure the prerequisites are installed on your machine.

### UI TESTING

#### UI TEST CASES

##### Test Case Assignment (UI)

| Index No | Name                | Test Case                     |
| -------- | ------------------- | ----------------------------- |
| 204084T  | Isiwarani Jayasekara| Product Catalog Viewing UI    |
| 2        |                     | Cart UI                       |
| 3        |                     | Search & Product Discovery UI |
| 204184B  | Sachin Samararathna | Checkout UI                   |
| 5        |                     | Forms UI                      |

##### 1. Product Catalog Viewing UI (3 test cases)

1. **View product details**
2. **View Category Products**
3. **View Brand Products**

##### 2. Cart UI (3 test cases)

1. **Add Products in Cart**
2. **Verify Product quantity in Cart**
3. **Remove Products From Cart**

##### 3. Search & Product Discovery UI (3 test cases)

1. **Search Product**
2. **Add review on product**
3. **Add to cart from Recommended items**

##### 4. Checkout UI (2 test cases)

1. **Do the checkout after login**
2. **Download the invoice**

##### 5. Forms UI (2 test cases)

1. **Contact Us Form**
2. **Verify Subscription newsletter**

##### 6. Navigation UI (2 test cases)

1. **Scroll Up using 'Arrow' button**
2. **Scroll Up without 'Arrow' button**

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

Single feature: (excluding known bugs)

```bash
npx cucumber-js features/api/books.feature --tags "not @known-bug"
```

All API tests:

```bash
npm run test:api
```

All API tests: (excluding known bugs)

```bash
npm run test:api:ci
```

#### API TEST CASES

##### Test Case Assignment (API)

| Index No | Name                | Test Case                      |
| -------- | ------------------- | ------------------------------ |
| 204017T  | Maitha Sandaruwan   | Authentication & Authorization |
| 204184B  | Sachin Samararathna | Create Book Operations         |
| 3        |                     | Update Book Operations         |
| 4        |                     | Get All Books                  |
| 204084T  | Isiwarani Jayasekara| Get Single Book                |
| 6        |                     | Delete Book Operations         |

##### 1: Authentication & Authorization (3 test cases)

1. **Basic Authentication Test**

   - Endpoint: All endpoints
   - Action: Attempt access without basic auth
   - Expected: 401 Unauthorized

2. **User Role Authorization**

   - Allowed: Only GET and POST operations
   - Restricted: PUT and DELETE operations
   - Expected: 403 Forbidden for restricted actions

3. **Admin Role Authorization**
   - Allowed: All operations (GET, POST, PUT, DELETE)

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

1. BUG-1: **Admin cannot delete book** (Authorization Bug)

   - **Issue**: Admin cannot delete books. According to docs, admins should be able to do `GET`, `POST`, `PUT` and `DELETE` operations. (all operations)
   - **Location**: features/api/authorization-for-admin.feature
   - **Expected**: 200 OK, book deleted
   - **Current**: 403 Forbidden
   - **Test**: `@known-bug @bug-1`

2. BUG-2: **User cannot view specific book** (Authorization Bug)

   - **Issue**: User cannot access individual book details. According to docs, users should be able to do `GET` and `POST` operations.
   - **Location**: features/api/authorization-for-user.feature
   - **Expected**: 200 OK (Users should be able view specific books)
   - **Current**: 403 Forbidden (Access granted incorrectly)
   - **Test**: `@known-bug @bug-2`

3. BUG-3: **User can delete books** (Authorization Bug)

   - **Issue**: Users can delete books. According to docs, users should be able to do `GET` and `POST` operations.
   - **Location**: authorization-for-user.feature
   - **Expected**: 403 Forbidden (Users shouldn't delete books)
   - **Current**: 200 OK (Delete allowed incorrectly)
   - **Test**: `@known-bug @bug-3`

4. BUG-4: **Duplicate Book Creation (Admin)** (Data Validation Bug)

   - **Issue**: Incorrect status code.
   - **Location**: features/api/books.feature
   - **Expected**: 409 Conflict (Duplicate book creation)
   - **Current**: 208 Already Reported (Incorrect status code)
   - **Test**: `@known-bug @bug-4`

5. BUG-5: **Invalid Book Creation (Admin)** (Data Validation Bug)

   - **Issue**: Admin can create books with invalid data.
   - **Location**: features/api/books.feature
   - **Expected**: 400 Bad Request (Invalid data)
   - **Current**: 201 Created (Incorrect status code)
   - **Test**: `@known-bug @bug-5`

6. BUG-6: **Duplicate Book Creation (User)** (Data Validation Bug)

   - **Issue**: Incorrect status code.
   - **Location**: features/api/books.feature
   - **Expected**: 409 Conflict (Duplicate book creation)
   - **Current**: 208 Already Reported (Incorrect status code)
   - **Test**: `@known-bug @bug-6`

7. BUG-5: **Invalid Book Creation (User)** (Data Validation Bug)

   - **Issue**: User can create books with invalid data.
   - **Location**: features/api/books.feature
   - **Expected**: 400 Bad Request (Invalid data)
   - **Current**: 201 Created (Incorrect status code)
   - **Test**: `@known-bug @bug-7`
