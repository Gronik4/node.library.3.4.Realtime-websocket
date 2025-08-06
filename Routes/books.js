const express = require('express');
const router = express.Router();
const {nanoid} = require('nanoid');

const stor = require('../Utils/stor');
const Book = require('../Utils/Book');
const {fields, names} = require('../Utils/fields');

router.get('/', (req, res)=> {
  const {books} = stor;
  res.render('books/index', {
    title: 'Все книги',
    book: books
  })
});

router.get('/create', (req, res)=> {
  res.render('books/create', {
    title: 'Добавить в библиотеку новую книгу',
    book: {},
    fields: fields,
    names: names
  })
});

router.post('/create', (req, res)=> {
  const id  = nanoid(7);
  const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
  const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName, fileBook);
  stor.books.push(newBook); 
  res.render('books/index', {
    title: 'Все книги',
    book: stor.books,
  })
});

router.get('/:id', (req, res)=> {
  const{id} = req.params;
  const idx = stor.books.findIndex(el=> el.id === id);
  if(idx === -1) {
    res.redirect('/404?flag= error without get(/:id)');
  } else {
    res.render('books/view', {
      title: 'Все про книгу',
      book: stor.books[idx],
      fields: fields,
      names: names
    })
  }
});

router.get('/update/:id', (req,res)=> {
  const{id} = req.params;
  const idx = stor.books.findIndex(el=> el.id === id);
  if(idx === -1) {
    res.redirect('/404?flag= Without get(update/:id)');
  } else {
    res.render('books/update', {
      title: 'Изменить данные о книге',
      book: stor.books[idx],
      fields: fields,
      names: names
    })
  }
});
router.post('/update/:id', (req,res)=> {
  const{id} = req.params;
  const idx = stor.books.findIndex(el=> el.id === id);
  const {title, description, authors, favorite, fileCover, fileName, fileBoo} = req.body;
  if(idx === -1) {
    res.redirect('/404?flag= Without post(update/:id)');
  } else {
    const {books} = stor;
    books[idx] = {
      ...books[idx], title, description, authors, favorite, fileCover, fileName, fileBoo
    };
    res.redirect(`/book/${id}`)
  }
});

module.exports = router;
