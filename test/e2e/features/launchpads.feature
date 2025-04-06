Feature: Launchpad Management
  
  In order to manage launchpads
  As a user of the launchpad management system
  I want to be able to create, update, and delete launchpads



  Scenario: Get all launchpads
    Given I send a GET request to "/api/launchpads"
    Then the response status code should be 200
    And the response should be a sucessful response
    And the response should contain a full list of launchpads

  # Scenario: Get a launchpad by ID
  #   Given I have a launchpad with ID "12345"
  #   When I send a GET request to "/launchpads/12345"
  #   Then the response status code should be 200
  #   And the response should contain the launchpad with ID "12345"
  #   And the response should contain the launchpad name "Test Launchpad"

  # Scenario: Create a new launchpad
  #   When I send a Post request to "/api/launchpads" with:
  #     """
  #     {
  #         id: "pad-1",
  #         status: "active",
  #         name: "Test Pad",
  #         full_name: "Test Launch Pad",
  #         locality: "Test Locality",
  #         region: ["Test Region"],
  #         latitude: null,
  #         longitude: null,
  #         launch_attempts: null,
  #         launch_successes: null,
  #         rockets: [],
  #         launches: [],
  #         timezone: "UTC",
  #         details: "Test details",
  #         images: [],
  #     }
  #     """
  #   Then the response status code should be 201
  #   And the response should be a success
  #   And the response should contain the created launchpad

  # Scenario: Delete a launchpad
  #   Given I have a launchpad with ID "12345"
  #   When I send a DELETE request to "api/launchpads/12345"
  #   Then the response status code should be 204
  #   And the response should be a success
  #   And the launchpad with ID "12345" should no longer exist