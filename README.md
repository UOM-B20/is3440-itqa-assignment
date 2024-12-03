# IS3440 - ITQA

## HOW TO TEST

### PREREQUISITES

- Node.js installed on your machine
- Java installed on your machine
- Clone the repository to your local machine

### UI TESTING

### API TESTING

- Create a feature file in the `features/api` directory to define the test scenarios.
- Write the test scenarios using Gherkin syntax in `steps/api`.
- Run the tests using the following command:

  ```bash
  npx cucumber-js tests/features/api/<feature_file_name>.feature
  ```

## API TEST CASES

**Member 1**: [@kingmalitha]

1. **Authentication Test - Unauthenticated Access**

   - Attempt to access any endpoint without providing credentials
   - Verify the system returns a 401 Unauthorized status code

2. **Authorization Test - User Attempting Delete**

   - Use a regular user account to attempt deleting a book
   - Verify the system returns a 403 Forbidden status code

3. **Positive Test - Create Book (User)**
   - Create a new book with valid title and author using regular user credentials
   - Verify the book is created successfully with status code 201

**Member 2**:

1. **Positive Test - Create Book (Admin)**

   - Create a new book with valid title and author using admin credentials
   - Verify the book is created successfully with status code 201
   - Check that the returned book object matches the input data

2. **Positive Test - Update Book (Admin)**

   - Create a book and then update its title and/or author using admin credentials
   - Verify the book is updated successfully with status code 200
   - Confirm the updated book details are correct

3. **Positive Test - Delete Book (Admin)**
   - Create a book and then delete it using admin credentials
   - Verify the book is deleted successfully with status code 200
   - Attempt to retrieve the deleted book and confirm it no longer exists

**Member 3**:

1. **Positive Test - Get All Books**

   - Verify that an authenticated admin user can successfully retrieve the list of all books
   - Ensure the response contains the correct status code (200)

2. **Positive Test - Get Book by Existing ID**

   - Create a book and then retrieve it by its ID
   - Verify the returned book details match the created book
   - Confirm the response status code is 200

3. **Boundary Test - Create Book with Minimum Required Information**
   - Create a book with the minimum required fields (title and author)
   - Verify the book is created successfully
   - Check that the book can be retrieved and has the correct details

**Member 4**:

1. **Negative Test - Create Book with Missing Title**

   - Attempt to create a book without a title
   - Verify the system returns a 400 Bad Request status code
   - Check the error message indicates the title is missing

2. **Negative Test - Create Book with Missing Author**
   - Attempt to create a book without an author
   - Verify the system returns a 400 Bad Request status code
   - Check the error message indicates the author is missing

**Member 5**:

1. **Negative Test - Update Non-Existent Book**

   - Attempt to update a book with an ID that does not exist
   - Verify the system returns a 404 Not Found status code

2. **Negative Test - Delete Non-Existent Book**
   - Attempt to delete a book with an ID that does not exist
   - Verify the system returns a 404 Not Found status code

**Member 6**:

1. **Boundary Test - Create Book with Maximum Allowed Length**

   - Create a book with title and author at the maximum allowed character length
   - Verify the book is created successfully
   - Confirm the returned book details match the input

2. **Consistency Test - Multiple Book Operations**
   - Create multiple books in sequence
   - Retrieve all books and verify the total number matches the number of books created
   - Update and delete some books
   - Confirm the book list reflects the changes accurately
