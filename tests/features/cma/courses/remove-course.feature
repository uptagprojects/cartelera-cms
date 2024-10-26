Feature: Remove a course
    As an admin with course permissions
    I want to remove a course by their id
    Scenario: A valid course id
        When I send a DELETE request to "/api/cma/courses/5d16fd83-7b22-417e-8301-187036193946"
        Then the response status should be 202
        And the response content should be empty
