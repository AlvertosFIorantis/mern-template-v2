const mongoose = require("mongoose");
const app = require("./app");
// kano import to redis client
const { client } = require("./redis_config");

mongoose
  .connect("mongodb://localhost:27017/my_database", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected DB");
    // prin kano connect to app thelo na sindetho kai sto redis
    client.on("connect", () => {
      console.log("Redis client connected");
    });

    client.on("error", (error) => {
      console.log(error);
    });
    console.log("redis is working");
    // kai mono an to redis kai to mongo einai connected thelo na kano start to app
    console.log("app is running on port 5000");
    return app.listen(5000);
  })
  .catch((err) => {
    console.log("not connected");
    console.log(err);
  });

//SIMADIKO !!!!!!!!!!!!! na kano initialize to REDIS kai mongo database prin ksekiniso to app !!!

// prepei na kano  install kai to mongoDb ektos apo to mongoose
// GIA TO DB PREPEI NA TREKSO PROTA TO DOCKER CONTAINER ME :
// docker run -d -p 27017:27017 --name my-mongo mongo

// me to docker container ls vlepo pia containers trexo

// docker stop my-mongo

// sto contorlers folder exo tin logiki/methods pou ektelite otan pigeno se kapio route

// trexo ta test apla grafodas npm run test

// REDDIS getting a redis container similar to the one i have for mongo db

// docker run -d --name some-redis -p 6379:6379 redis

// an theolo na aferso to redis diagrafo to redis_config file kai meta edo pera vgazo to import statement kai ta 2 client.on episeis prepei na afereso kai olo to logic gia to redis prosto paron to exo tora mono sto getProjectsGroupByStatement, kai sto delete projects kai create project exo logic pou prepei na afereso

// PREPEI NA DO POS BORO NA KLINO TO CONNECTION sto mongose afto boro na to xrisimopiso adi gia to logic pou exo apo pano
// const mainServerFunction = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/my_database", {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//     });
//     console.log("connected DB");
//     client.on("connect", () => {
//       console.log("Redis client connected");
//     });

//     client.on("error", (error) => {
//       console.log(error);
//     });
//     console.log("redis is working");
//     // kai mono an to redis kai to mongo einai connected thelo na kano start to app
//     console.log("app is running on port 5000");
//     return app.listen(5000);
//   } catch (err) {
//     console.log("not connected");
//     console.log(err);
//   } finally {
//     // await mongoose.disconnect();
//     console.log("closing client");
//   }
// };

// mainServerFunction();
