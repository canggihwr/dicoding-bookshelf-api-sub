const {
  addHandler,
  getHandler,
  getDetailHandler,
  editHandler,
  deleteHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDetailHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteHandler,
  },
];

module.exports = routes;
