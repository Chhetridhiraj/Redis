var redis = require("redis");

function testCache() {

    // Connect to the Azure Cache for Redis over the TLS port using the key.
    var cacheConnection = redis.createClient(6380, 'sagar-redis.redis.cache.windows.net', 
        {auth_pass: 'fXffYrhlgdivjrIuiQfIe1B0pW3RlsZ7Mkx8XMlvmrA=', tls: {servername: 'sagar-redis.redis.cache.windows.net'}});
        
    // Perform cache operations using the cache connection object...

    cacheConnection.set('name','sagar')
   cacheConnection.get('name', (err, value) => {
       console.log(value)
   });

    cacheConnection.hmset('info',{
        firstname: 'sagar',
        lastname: 'gc',
        city: 'butwal',
    });
    cacheConnection.hgetall('info', (err, value) => {
        console.log(value)
    })

    const cars = ['toyoto','honda','suzuki','ulto'];
    const multi = cacheConnection.multi();
    for(let i=0; i<cars.length; i++){
         multi.rpush("cars",cars[i])
    }
    multi.exec()
    cacheConnection.lrange('cars', 0, -1, (err,value)=>{
        value.forEach(elemeent => {
         console.log(elemeent)   
        });
    })

    cacheConnection.sadd("location","butwal")
    cacheConnection.smembers("location",(err,value)=>{
        console.log(value)
    })

      
}

testCache();