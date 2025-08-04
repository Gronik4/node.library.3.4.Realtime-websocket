module.exports = ((req, res)=> {
  const flag = req.query.flag;
  res.render('errors/404', {
    title: 404,
    message: 'В библиотеке нет книги с таким id или указанный url не верный.',
    flag: flag
  })
})
