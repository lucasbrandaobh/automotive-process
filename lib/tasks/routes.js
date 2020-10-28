const controllers = require('./controllers');
const { isAuthenticated } = require('../authorization/authorization-bearer-strategy');

const tasksRoutes = (router) => {
  router.get('/tasks', isAuthenticated, controllers.get);
  router.get('/tasks/:id', isAuthenticated, controllers.getById);
  router.post('/tasks', isAuthenticated, controllers.post);
  router.put('/tasks/:id', isAuthenticated, controllers.put);
  router.delete('/task/:id', isAuthenticated, controllers.remove);
};

module.exports = tasksRoutes;