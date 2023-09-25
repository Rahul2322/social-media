const { updateUser, deleteUser, getUser, followUser, followingUser , friendsList} = require('../controllers/user');

const route = require('express').Router();

route.put("/:id",updateUser);
route.delete("/:id",deleteUser);
route.get("/",getUser);
route.put("/follower/:id",followUser);
route.put("/following/:id",followingUser)
route.get("/friends/:userId",friendsList)








module.exports = route
