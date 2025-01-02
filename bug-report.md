# BUG REPORTS

## TEMPLATE

| Field         | Value                                      |
| ------------- | ------------------------------------------ |
| Project       | [Project Name]                             |
| Bug ID        | [Unique Identifier - e.g., BUG-001]        |
| Date Reported | [Date of Report]                           |
| Reported by   | [Reporter Name]                            |
| Assigned to   | [Developer/Tester - Optional]              |
| Status        | [New, Open, In Progress, Resolved, Closed] |
| Priority      | [High, Medium, Low]                        |
| Severity      | [Blocker, Critical, Major, Minor]          |
| Component     | [UI, API]                                  |
| Summary       | [Concise description of the bug]           |
| Description   | [Detailed description of the bug]          |

## BUGS

### BUG-001

| Field         | Value                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                                                                                                          |
| Bug ID        | BUG-001                                                                                                                                                                                                                         |
| Date Reported | 2024-03-20                                                                                                                                                                                                                      |
| Status        | Open                                                                                                                                                                                                                            |
| Priority      | High                                                                                                                                                                                                                            |
| Severity      | Blocker                                                                                                                                                                                                                         |
| Component     | API                                                                                                                                                                                                                             |
| Summary       | Admin unable to delete books                                                                                                                                                                                                    |
| Description   | Admin users receive 403 Forbidden when attempting to delete books via API, despite having appropriate permissions. This prevents admins from managing book inventory. Expected response is 200 OK, but receiving 403 Forbidden. |

### BUG-002

| Field         | Value                                                                                                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                                                                                               |
| Bug ID        | BUG-002                                                                                                                                                                                                              |
| Date Reported | 2024-03-20                                                                                                                                                                                                           |
| Status        | Open                                                                                                                                                                                                                 |
| Priority      | High                                                                                                                                                                                                                 |
| Severity      | Critical                                                                                                                                                                                                             |
| Component     | API                                                                                                                                                                                                                  |
| Summary       | Regular users able to delete books                                                                                                                                                                                   |
| Description   | Regular users are able to successfully delete books with 200 OK response, when they should be receiving 403 Forbidden. This represents a security vulnerability as only admin users should have deletion privileges. |

### BUG-003

| Field         | Value                                                                                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                                                                                            |
| Bug ID        | BUG-003                                                                                                                                                                                                           |
| Date Reported | 2024-03-20                                                                                                                                                                                                        |
| Status        | Open                                                                                                                                                                                                              |
| Priority      | High                                                                                                                                                                                                              |
| Severity      | Major                                                                                                                                                                                                             |
| Component     | API                                                                                                                                                                                                               |
| Summary       | Regular users unable to retrieve book details                                                                                                                                                                     |
| Description   | Regular users receive 403 Forbidden when attempting to view individual book details, despite having valid authentication. According to requirements, all authenticated users should be able to view book details. |

### BUG-004

| Field         | Value                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                             |
| Bug ID        | BUG-004                                                                                                                                            |
| Date Reported | 2024-12-26                                                                                                                                         |
| Status        | Open                                                                                                                                               |
| Priority      | Medium                                                                                                                                             |
| Severity      | Minor                                                                                                                                              |
| Component     | API                                                                                                                                                |
| Summary       | Duplicate Book Creation (Admin)                                                                                                                    |
| Description   | When admin attempts to create a duplicate book with existing book details, API returns 208 Already Reported instead of the expected 409 Conflict. Location: features/api/create-book.feature 

### BUG-005

| Field         | Value                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                          |
| Bug ID        | BUG-005                                                                                                                                         |
| Date Reported | 2024-12-26                                                                                                                                      |
| Status        | Open                                                                                                                                            |
| Priority      | High                                                                                                                                            |
| Severity      | Critical                                                                                                                                        |
| Component     | API                                                                                                                                             |
| Summary       | Invalid Book Creation (Admin)                                                                                                                   |
| Description   | Admin can create books with invalid data. API returns 201 Created instead of 400 Bad Request. Location: features/api/create-book.feature

### BUG-006

| Field         | Value                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                             |
| Bug ID        | BUG-006                                                                                                                                            |
| Date Reported | 2024-12-26                                                                                                                                         |
| Status        | Open                                                                                                                                               |
| Priority      | Medium                                                                                                                                             |
| Severity      | Minor                                                                                                                                              |
| Component     | API                                                                                                                                                |
| Summary       | Duplicate Book Creation (User)                                                                                                                     |
| Description   | When user attempts to create a duplicate book, API returns 208 Already Reported instead of the expected 409 Conflict. Location: features/api/create-book.feature

### BUG-007

| Field         | Value                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project       | Book Management System                                                                                                                          |
| Bug ID        | BUG-007                                                                                                                                         |
| Date Reported | 2024-12-26                                                                                                                                      |
| Status        | Open                                                                                                                                            |
| Priority      | High                                                                                                                                            |
| Severity      | Critical                                                                                                                                        |
| Component     | API                                                                                                                                             |
| Summary       | Invalid Book Creation (User)                                                                                                                    |
| Description   | User can create books with invalid data. API returns 201 Created instead of 400 Bad Request. Location: features/api/create-book.feature