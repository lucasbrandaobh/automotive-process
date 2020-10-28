const repository = require('./repository');

const tasksController = (() => {
  const get = async (req, res) => {
    try {
      const tasks = await repository.find().toArray();
      res.json(tasks);
    } catch (error) {
      console.error('Error on get all tasks. %o', error);
      res.sendStatus(500);
    }
  };
  const getById = async (req, res) => {
    try {
      const { params } = req;
      const task = await repository.findOne({ _id: params.id });
      res.json(task);
    } catch (error) {
      console.error('Error on call getById task. %o', error);
      res.sendStatus(500);
    }
  };
  const post = async (req, res) => {
    const { body } = req;
    try {
      const resultInsert = await repository.insertOne(body);
      const taskInserted = resultInsert.ops[0];
      console.log('------------------------------------------------------------------');
      console.log('Task included successfully.');
      res.status(201).send(taskInserted);
    } catch (error) {
      console.error('Error on call post task. %o', error);
      res.sendStatus(500);
    }
  };
  const put = async (req, res) => {    
    const { body, params } = req;
    try {
      await repository.updateOne(body, params.id);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error on call put task. %o', error);
      res.sendStatus(500);
    }
  };
  const remove = async (req, res) => {
    try {
      const { params } = req;
      await repository.deleteOne(params.id);
      res.json();                                          
    } catch (error) {
      console.error('Error on call delete task. %o', error);
      res.sendStatus(500);
    }
  };
  return {
    get,
    getById,
    post,
    put,
    remove
  };
})();

module.exports = tasksController;
