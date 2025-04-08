import { When, Then, Given, DataTable } from '@cucumber/cucumber'
import supertest from 'supertest'
import assert from 'assert'

const request = supertest('https://spacex-rest-api.netlify.app/')


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

