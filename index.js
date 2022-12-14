const express = require('express');
const knex = require('./knex/knex');
const bodyParser = require('body-parser');

const { serializeWithComments } = require('./utils')

const app = express();

app.use(bodyParser.json());

const port = 3000;


app.get('/', (req, res)=>{
    res.send('Hello World!')
});

app.post('/users', async (req, res, next)=>{

  try {
    const {
        name,
        age,
        location
      } = req.body;

    const [ user ] = await knex('users').insert({name, age, location},['id', 'name','age', 'location']);
    res.send({user});
  } catch(e){
    next(e);
  }
});

app.get('/art-works', async(req, res)=>{
    const artWorks = await knex.select('art_works.id', 'title', 'year', 'artist', 'comments.id as comment_id', 'comments.content', 'comments.name as comment_name', 'user_id', 'users.name')
    .from('art_works').leftJoin('comments', 'art_works.id', 'comments.art_id')
    .leftJoin('users', 'comments.user_id', 'users.id');
    const serialized = serializeWithComments(artWorks);
    console.log('dkdkdk', serialized)
    res.send({'art-works': serialized});
})

app.get('/users', async (req, res)=>{
    const users = await knex.select().from('users').catch((err)=>{
        console.log('Error fetching users', err)
    });
    res.send({ users })
});

app.get('/api/art/:artId', (req, res)=>{

});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})