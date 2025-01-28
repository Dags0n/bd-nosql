const express = require('express')
const redis = require('redis')

const url = 'redis://localhost:6379';

const cache = redis.createClient({url})
//cache.connect();

const app = express()
const port = 3020

//cache.connect();

cache.on('connect', () => {
  console.log('Redis is ready');
});
 
cache.on('error', (e) => {
  console.log('Redis error', e);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/ler', (req, res) => {
  cache.get('sorteio:last:megasena', (err, reply) => {
    if (err){
      res.send('ERROR')
    }else{
      res.send(reply)
    }
  })
})

app.get('/escrever', (req, res) => {
  cache.set('sorteio:last:megasena', '1,2,3,4,5,6', function (err, reply){
    if (err){
      res.send('ERROR')
    }else{
      res.send('OK')
    }
  })
})

app.get('/lerfatorial', (req, res) => {
  cache.get('fatorial:last:fatorial', (err, reply) => {
    if (err){
      res.send('ERROR')
    }
    
    cache.ttl('fatorial:last:fatorial', function (err, ttl) {
      if (err) {
        console.error('Erro ao obter TTL:', err);
        return res.status(500).send('Erro ao obter TTL');
      }
      res.send({ reply: reply, ttl: ttl });
    });
  })
})

app.get('/fatorial/:numero', (req, res) => {
  let numero = req.params.numero
  let fatorial = 1
  for (let i = 1; i <= numero; i++) {
    fatorial = fatorial * i
  }
  cache.set('fatorial:last:fatorial', fatorial, 'EX', 60, function (err, reply) {
    if (err){
      res.send('ERROR')
    }else{
      res.send('OK')
    }
  })
})