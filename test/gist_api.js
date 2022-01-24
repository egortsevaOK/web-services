const axios = require('axios');
const {expect} = require('chai');
const envVariables = require('./../data/env.json');

describe('Verify Gists API', async () => {
  let response;

  it('List public gists', async () => {
    response = await axios.get(
        `${envVariables.baseUrl}/gists/public`,
        {
          headers: {
            'Authorization': envVariables.token,
          },
        },
    );
    expect(response.status).equals(200);
    expect(response.data).to.be.an('array');
  });

  it('Create a gist', async () => {
    response = await axios.post(
        `${envVariables.baseUrl}/gists`,
        {
          files: {
            'test1.txt': {
              'content': 'Example Content 1',
            },
            'test2.txt': {
              'content': 'Example Content 2',
            },
          },
        },
        {
          headers: {
            'Authorization': envVariables.token,
          },
        },
    );
    expect(response.status).equals(201);
  });

  it('Star a gist', async () => {
    response = await axios.put(
        `${envVariables.baseUrl}/gists/0901c5869cda98d809aa444271941f60/star`,
        {
          gist_id: '0901c5869cda98d809aa444271941f60',
        },
        {
          headers: {
            'Authorization': envVariables.token,
          },
        },
    );
    expect(response.status).equals(204);
  });

  it('Update a gist', async () => {
    response = await axios.patch(
        `${envVariables.baseUrl}/gists/dd9aeb17f170c1dd94fe9d2ec4a3e117`,
        {
          description: 'new description',
        },
        {
          headers: {
            'Authorization': envVariables.token,
          },
        },
    );
    expect(response.status).equals(200);
    expect(response.data.description).equals('new description');
  });

  it('Delete a gist', async () => {
    response = await axios.delete(
        `${envVariables.baseUrl}/gists/7271b0825134580e92e0bd2b3fd9f643`,
        {
          headers: {
            'Authorization': envVariables.token,
          },
        },
    );
    expect(response.status).equals(204);
  });
});
