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
