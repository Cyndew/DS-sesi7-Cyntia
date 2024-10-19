test('PUT Update User', async ({ request }) => {
    const response = await request.put('https://reqres.in/api/users/2', {
      data: {
        name: 'John',
        job: 'senior developer'
      }
    });
    expect(response.status()).toBe(200);
    
    const json = await response.json();
  
    const ajv = new Ajv();
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        updatedAt: { type: 'string' }
      },
      required: ['name', 'job', 'updatedAt']
    };
    
    const validate = ajv.compile(schema);
    const valid = validate(json);
    
    expect(valid).toBeTruthy();
  });
  