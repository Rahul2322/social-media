const { addPost, postUpdate, postDelete, getPost, likeDislike, timeLinePost,getUserPost } = require('../controllers/post');

const route = require('express').Router();

route.post('/',addPost);
route.put('/:id',postUpdate);
route.delete('/:id',postDelete);
route.get('/:id',getPost);
route.put('/:id/like',likeDislike);
route.get('/timeline/:id',timeLinePost);
route.get('/profile/:username',getUserPost);

module.exports = route