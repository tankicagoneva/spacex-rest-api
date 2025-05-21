import { When, Then, Given, DataTable } from '@cucumber/cucumber'
import supertest from 'supertest'
import assert from 'assert'

const request = supertest('https://development--spacex-rest-api.netlify.app/')

let launchpadId: null = null  

Given('I have a request to {string}', async function (url: string) {
    this.url = url
})

When('I send a GET request', async function () {
    this.response = await request.get(this.url)
})

Then('the response status code should be {int}', function (statusCode: number) {
    assert.strictEqual(this.response.status, statusCode)
})

Then('the response should be a successful response', function () {
    assert.ok(this.response.ok)
})

Then('the response should contain a full list of launchpads', function () {
    const launchpads = this.response.body
    assert.ok(Array.isArray(launchpads))
    assert.ok(launchpads.length > 0)

    launchpads.forEach((launchpad: any) => {
        assert.ok('id' in launchpad)
        assert.ok('name' in launchpad)
    })
});


When('I send a POST request to {string} with:', async function (url: string, dataString: string) {
    try {
        const data = JSON.parse(dataString);
        this.data = data;
        this.response = await request.post(url).send(data);
         launchpadId = data.id  
    } catch (error) {
        throw error;
    }
});

Then('the response should be a success', function ()  {
    assert.ok(this.response.status >= 200 && this.response.status < 300);
})

Then('the response should contain the created launchpad', function () {
    const launchpad = this.response.body
    assert.ok(launchpad)
    assert.ok('id' in launchpad)
    assert.ok('name' in launchpad)
});



Given ('I have a launchpad with ID {string}', async function (id: string) {
    this.launchpadId = id
})

When ('I send a GET request to {string}', async function (url: string) {
    this.response = await request.get(`${url}`)
})


Then ('the response should contain the launchpad with ID {string}', function (id: string) {
    const launchpad = this.response.body
    assert.strictEqual(launchpad.id, id)
    assert.ok('id' in launchpad)
})

Then ('the response should contain the launchpad name {string}', function (name: string) {
    const launchpad = this.response.body
    assert.strictEqual(launchpad.name, name)
    assert.ok('name' in launchpad)
})


When ('I send a PUT request to {string} with:', async function (url: string, dataString: string) {
    try {
        const data = JSON.parse(dataString);
        this.data = data;
        this.response = await request.put(`${url}`).send(data);
    } catch (error) {
        throw error;
    }
});

Then ('the response should contain the updated launchpad with ID {string}', function (id: string)  {
    const launchpad = this.response.body
    assert.strictEqual(launchpad.id, id)
    assert.ok('id' in launchpad)
});

Then ('the launchpad details should be "Updated info"', function () {
    const launchpad = this.response.body
    assert.strictEqual(launchpad.details, "Updated info")
});

When ('I send a DELETE request to {string}', async function (url: string) {
    this.response = await request.delete(`api/launchpads/${launchpadId}`)  
})
