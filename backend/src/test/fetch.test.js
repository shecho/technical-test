const fetch = require("node-fetch");
const faker = require("faker");

test("Fetch should retrieve all data", async () => {
  const data = await fetch(
    `https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=24&profession=&subjectAreaCode=&state=&provider=&name=`
  );
  expect(data).toBeGreaterThanOrEqual(1);
});

test("Fetch should retrieve filtered books", async () => {
  const name = faker.name.findName();
  const data = await fetch(
    `https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=24&profession=&subjectAreaCode=&state=&provider=&name=${name}`
  );
  expect(data).toBe(data instanceof Array);
});
