const { getCollection, ObjectId } = require('../database');

const COLLECTION_NAME = 'tasks';

const tasksRepository = (() => {
  const find = (filter = {}, options = {}) => getCollection(COLLECTION_NAME).find(filter, options);
  const findOne = (filter = {}) => {
    if(filter._id) {
      filter._id = ObjectId(filter._id);
    }
    return getCollection(COLLECTION_NAME).findOne(filter);
  };
  const insertOne = (task) => getCollection(COLLECTION_NAME).insertOne(task);
  // const updateOne = (naoConformidade, id) => {
  //   if(id) {
  //     id = ObjectId(id);
  //   }
  //   const update = {
  //     $set: { ...naoConformidade }
  //   };
  //   return getCollection(COLLECTION_NAME).updateOne({ _id: id }, update);
  // };
  const deleteOne = (id) => {
    if(id) {
      id = ObjectId(id);
    }
    return getCollection(COLLECTION_NAME).deleteOne({ _id: id });
  };

  return {
    find,
    findOne,
    insertOne,
    // updateOne,
    deleteOne
  };
})();

module.exports = tasksRepository;
