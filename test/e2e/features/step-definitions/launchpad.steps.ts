
import { When, Then, Given, DataTable } from '@cucumber/cucumber';
import supertest from 'supertest';
import { expect } from 'vitest';

const request = supertest('http://localhost:3000'); 


Given('I send a GET request to {string}', async function (url: string) {
    this.response = await request.get(url);
  });

When('I send a GET request to {string}', async function (endpoint: string) {
    const response = await request.get(endpoint);
    this.response = response;
});

Then('the response status code should be {int}', function (statusCode: number) {
    expect(this.response.status).to.equal(statusCode);

});

Then('the response should be a successful response', function () {
    expect(this.response.ok).toBe(true);
});

Then('the response should contain a full list of launchpads', function () {
    const launchpads = this.response.body;
    expect(Array.isArray(launchpads)).toBe(true);
    expect(launchpads.length).toBeGreaterThan(0);
    
    launchpads.forEach((launchpad: any) => {
        expect(launchpad).toHaveProperty('id');
        expect(launchpad).toHaveProperty('name');
    });
});

