const request = require("supertest");
const app = require("../../app");

// na thimame na stelno valid passwords

// NOTE !!!!!!! ektos apo status codes pou vevea arki giati ta sosta status code erxode mono an to logic einai stost boor na tserako an kai ta data pou perno einai stin morfi pou thelo

it("Checking that i can create a project only for signin users , that is why i have 2 requests one to sing in and one to create a project", async () => {
  const FirstResponse = await request(app)
    //to proto route einai sot signup gia na fitakso user kai to defteor einai sto login
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    });
  expect(201);
  await request(app)
    .post("/api/projects/createproject")
    .set("Authorization", "Bearer " + FirstResponse.body.token)
    .send({
      projectCategory: "external-project",
      projectName: "Ena akoma project 6",
      projectStatus: "published",
    })
    .expect(201);
});

it("Checking that i can delete a project only for signin users , that is why i have 2 requests one to sing in and one to create a project", async () => {
  const FirstResponse = await request(app)
    //to proto route einai sot signup gia na fitakso user kai to defteor einai sto login
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    });

  // create a project so i can delete it
  const SecondResponse = await request(app)
    .post("/api/projects/createproject")
    .set("Authorization", "Bearer " + FirstResponse.body.token)
    .send({
      projectCategory: "external-project",
      projectName: "Ena akoma project 6",
      projectStatus: "published",
    });

  console.log("Second response.......", SecondResponse.body.project._id);
  await request(app)
    .get(`/api/projects/project/${SecondResponse.body.project._id}`)
    .set("Authorization", "Bearer " + FirstResponse.body.token)
    .send()
    .expect(200);
});

it("Checking that i can get all the projects only for signin users , that is why i have 2 requests one to sing in and one to create a project", async () => {
  const FirstResponse = await request(app)
    //to proto route einai sot signup gia na fitakso user kai to defteor einai sto login
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    });

  // create a project so i can delete it
  const SecondResponse = await request(app)
    .post("/api/projects/createproject")
    .set("Authorization", "Bearer " + FirstResponse.body.token)
    .send({
      projectCategory: "external-project",
      projectName: "Ena akoma project 6",
      projectStatus: "published",
    });

  await request(app)
    .get("/api/projects/myprojects")
    .set("Authorization", "Bearer " + FirstResponse.body.token)
    .send()
    .expect(200);
});
