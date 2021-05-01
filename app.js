const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const port = 3000

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(morgan('dev'));
const siswa=[
{
    nama: 'awal',
    kelas:'1'
},
{
    nama: 'awal',
    kelas:'1'
},
{
    nama: 'awal',
    kelas:'1'
}
];
//built in midleware
app.use(express.static('public'))

// midlewarw time

app.use((req,res,next)=>{
console.log('time:', Date.now())
next();
});
app.get('/', (req, res) => {

//   res.sendFile('views/index.html', {root: __dirname});
res.render('index', {
layout: 'layouts/main-layout',
nama: 'awal', 
title:'home',
siswa,
});
})
app.get('/about', (req, res) => {

//   res.sendFile('views/index.html', {root: __dirname});
res.render('about', {
layout: 'layouts/main-layout',
nama: 'awal', 
title:'about',
siswa,
});
})
app.get('/contact', (req, res) => {

//   res.sendFile('views/index.html', {root: __dirname});
res.render('contact', {
layout: 'layouts/main-layout',
nama: 'awal', 
title:'contact',
siswa,
});
})

app.use((req,res)=>{
    res.status('404');
    res.send('<h1>404 not found</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})