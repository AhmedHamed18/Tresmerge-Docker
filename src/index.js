const express = require ('express');
const mongoose = require ('mongoose');
const redis = require ('redis');
const {Client} = require('pg');

const PORT = process.env.PORT || 4000;
const app =express();

// connec to redis
const REDIS_HOST = 'redis'
const REDIS_PORT =6379;
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
  });
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', err => console.log('Redis Connected'));
redisClient.connect();

// connect db mongo
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
// const DB_HOST= '172.30.0.2';
const DB_HOST= 'mongo';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI)
.then(() => console.log("success"))
.catch((error) => console.log("error" , error));


// connect to postgres
const DB_USER_postgres = 'root';
const DB_PASSWORD_postgres = 'example';
const DB_PORT_postgres = 5432;
// const DB_HOST= '172.30.0.2';
const DB_HOST_postgres= 'postgres';

const URI_postgres = `postgresql://${DB_USER_postgres}:${DB_PASSWORD_postgres}@${DB_HOST_postgres}:${DB_PORT_postgres}`;

const client = new Client({
    connectionString : URI_postgres,
  })

client.connect()
.then(() => console.log("success to postgres"))
.catch((error) => console.log("error postgres: " , error));

//***************************************************************************************************************** */
app.get('/',(req,res)=>{
    redisClient.set("products","books");
    res.send('<h1>hello from docker ya wala , kalam 3aly 2wy</h1>')

});

app.get('/redisTest',async (req,res)=>{
    const products = await redisClient.get("products");
    res.send(`<h1>${products}</h1>`)

});

app.listen(PORT,()=>console.log(`app is running ya hamada on port : ${PORT}`));