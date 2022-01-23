const axios = require('axios');
const {expect} = require('chai');

describe('Verify Users API', async () => {
  let response;

  before(async () => {
    response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );
  });

  it('Status code of response is 200 OK', async () => {
    expect(response.status).equals(200);
  });

  it('Content-Type header is present', async () => {
    expect(response.headers).to.have.any.keys('content-type');
  });

  it('Content-Type header is application/json', async () => {
    expect(response.headers['content-type']).equals('application/json; charset=utf-8');
  });

  it('The content of the response body is the array of 10 users', async () => {
    expect(response.data).to.be.an('array');
    expect(response.data.length).equals(10);
  });
});
