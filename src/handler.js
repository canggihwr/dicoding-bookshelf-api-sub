const { nanoid } = require('nanoid');
const books = require('./books');

function addBook(newBookData) {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = newBookData;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const timestamp = new Date().toString();

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: timestamp,
    updatedAt: timestamp,
  };

  books.push(newBook);

  return id;
}

const addHandler = (request, h) => {
  const newBookData = request.payload;

  if (!newBookData.name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (newBookData.pageCount < newBookData.readPage) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const bookId = addBook(newBookData);

  if (bookId) {
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId,
        },
      })
      .code(201);
  }

  return h
    .response({
      status: 'fail',
      message: 'Gagal menambahkan buku.',
    })
    .code(500);
};

const getHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = [...books];

  if (name) {
    const lowercase = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(lowercase));
  }

  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
  }

  const showBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h
    .response({
      status: 'success',
      data: {
        books: showBooks,
      },
    })
    .code(200);
};

const getDetailHandler = (request, h) => {
  const { bookId } = request.params;

  const bookDetail = books.find((book) => book.id === bookId);

  if (bookDetail) {
    return h
      .response({
        status: 'success',
        data: { book: bookDetail },
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

const editHandler = (request, h) => {
  const updatedData = request.payload;
  const { bookId } = request.params;

  const bookToUpdate = books.find((book) => book.id === bookId);

  if (!updatedData.name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (updatedData.pageCount < updatedData.readPage) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  if (!bookToUpdate) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }

  Object.entries(updatedData).forEach(([key, value]) => {
    bookToUpdate[key] = value;
  });

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

const deleteHandler = (request, h) => {
  const { bookId } = request.params;

  const bookIdToDelete = books.findIndex((book) => book.id === bookId);

  if (bookIdToDelete !== -1) {
    books.splice(bookIdToDelete, 1);
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
};

module.exports = {
  addHandler,
  getHandler,
  getDetailHandler,
  editHandler,
  deleteHandler,
};
