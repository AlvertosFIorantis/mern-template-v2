const redis = require("redis");
// kano import to prmisify package pou einai built in sto node giati to redis package den kanei supprot apo defalut ta async away
const { promisify } = require("util");

const client = redis.createClient(6379);
// to redis trexei by default sto port locall host  127.0. 0.1

// tora thelo na kano ta kapia apo ta comands pou exei to redis na doulevoun me async away

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);

// sto redis den boro na kano store tipota alo apo string opote an thelo na kano store kati san rray of objects prepe ian xrisimopisop tin apo kato logiki
// x = JSON.stringify([
//   { x: 5, y: 6 },
//   { x: 52, y: 62 },
// ]);
// y = JSON.parse(x);
// console.log(x);
// console.log(y);
// peristoera edo https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

module.exports = {
  get,
  set,
  del,
  client,
};
