const express =require('express')
var app = express()
var redis = require("redis");
var bluebird = require("bluebird");


var cacheConnection = redis.createClient(6380, 'sagar-redis.redis.cache.windows.net', 
{auth_pass: 'fXffYrhlgdivjrIuiQfIe1B0pW3RlsZ7Mkx8XMlvmrA=', tls: {servername: 'sagar-redis.redis.cache.windows.net'}});

app.get('/a',(req,res)=>{
  const name= cacheConnection.get('name', (err, value) => {
    return res.send(value)
})
})
app.get('/b',async(req,res)=>{
  const car=  cacheConnection.hgetall('info', (err, value) => {
    return res.send(value)
})
})

app.get('/c',async(req,res)=>{
const info=cacheConnection.lrange('cars', 0, -1, (err,value)=>{
  value.forEach(elemeent => {  
    return res.send(value) 
  })
})
});
app.get('/d',(req,res)=>{
  cacheConnection.smembers("location",(err,value)=>{
    return res.send(value)
})

});
const PORT = process.env.PORT||3000
app.listen(PORT,(req,res)=>{
  console.log("server is started")
})
