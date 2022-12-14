const express = require('express');
const knex = require('./knex/knex');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const { serializeWithComments } = require('./utils')

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.post('/api/users', async (req, res, next)=>{
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

app.get('/api/users', async (req, res, next)=>{
    const users = await knex.select().from('users').catch((err)=>{
        next(err);
    });
    res.send({ users })
});

app.get('/api/art', async(req, res, next)=>{
    try {
        const artWorks = await knex.select('art_works.id', 'title', 'year', 'artist', 'comments.id as comment_id', 'comments.content', 'comments.name as comment_name', 'user_id', 'users.name')
        .from('art_works').leftJoin('comments', 'art_works.id', 'comments.art_id')
        .leftJoin('users', 'comments.user_id', 'users.id');
        const serialized = serializeWithComments(artWorks);
        res.send({'art': serialized});
    } catch (e) {
        next(e);
    }

});

app.get('/api/art/:artId', async (req, res, next)=>{
  const { artId } = req.params;
  try {
    const artWorks = await knex.select('art_works.id', 'title', 'year', 'artist', 'comments.id as comment_id', 'comments.content', 'comments.name as comment_name', 'user_id', 'users.name')
    .from('art_works').leftJoin('comments', 'art_works.id', 'comments.art_id')
    .leftJoin('users', 'comments.user_id', 'users.id').where('art_works.id', artId);
    const serialized = serializeWithComments(artWorks);
    res.send({'art': serialized[0]});
  } catch (e) {
    next(e);
  }
});

app.post('/api/art/:artId/comments', async(req, res, next)=>{
  const { artId } = req.params;
  const { userID, name, content } = req.body;

  try {
    const [ user ] = await knex.select('id', 'name').from('users').where('id', userID || 0);
    
    if (!name && !user) throw new Error('Either name or valid userID are required');

    const comments = await knex.select('name as commentName').from('comments').where('art_id', artId);
    
    if (!user  && comments.find(({ commentName })=> commentName === name )) {
        throw new Error(`Guest user ${name} is only allowed one comment`);
    }
    const comment = await knex('comments').insert({user_id: user ? user.id : null, content, name: user ? user.name : name, art_id : artId }, ['id', 'content', 'name'])
    res.send({ comment });
  } catch(e) {
    next(e);
  }
});

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})