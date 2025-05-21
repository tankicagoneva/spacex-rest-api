Feature: Launchpad Management

  # In order to manage launchpads
  # As a user of the launchpad management system
  # I want to be able to create, update, and delete launchpads



Scenario: Get all launchpads
    Given I have a request to "api/launchpads"
    When I send a GET request
    And the response should be a successful response
    And the response should contain a full list of launchpads

Scenario: Create a new launchpad
  When I send a POST request to "api/launchpads" with:
    """
    {
        "id": "5e9e4503f5090910d8566f66",
        "status": "active",
        "name": "Test Pad",
        "full_name": "Test Launch Pad",
        "locality": "Test Locality",
        "region": ["Test Region"],
        "latitude": 28.5,
        "longitude": -80.5,
        "launch_attempts": 0,
        "launch_successes": 0,
        "rockets": [],
        "launches": [],
        "timezone": "UTC",
        "details": "Test details",
        "images": { "large": "https://example.com/image.jpg" }
    }
    """
  And the response should be a success
  And the response should contain the created launchpad


Scenario: Get a launchpad by ID
  Given I have a launchpad with ID "5e9e4503f5090910d8566f66"
  When I send a GET request to "api/launchpads/5e9e4503f5090910d8566f66"
  Then the response status code should be 200
  And the response should contain the launchpad with ID "5e9e4503f5090910d8566f66"
  And the response should contain the launchpad name "Test Pad"



Scenario: Update a launchpad
  Given I have a launchpad with ID "5e9e4503f5090910d8566f66"
  When I send a PUT request to "api/launchpads/5e9e4503f5090910d8566f66" with:
    """
    {
        "status": "active",
        "details": "Updated info"
    }
    """
  Then the response status code should be 200
  And the response should be a success
  And the response should contain the updated launchpad with ID "5e9e4503f5090910d8566f66"
  And the launchpad details should be "Updated info"


Scenario: Delete a launchpad
  Given I have a launchpad with ID "5e9e4503f5090910d8566f66"
  When I send a DELETE request to "api/launchpads/5e9e4503f5090910d8566f66"
  And the response should be a success
