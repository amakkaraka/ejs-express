const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact, cekDuplikat, addContact} = require('./utils/contacts');
// const morgan = require('morgan');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash') 
const port = 3000

app.set('view engine', 'ejs');
app.use(expressLayouts);
// app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

//konfigurasi data flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized:true

}));
app.use(flash());


const siswa=[
{
    nama: 'awal',
    kelas:'1'
},
{
    nama: 'iffah',
    kelas:'2'
},
{
    nama: 'kautrsar',
    kelas:'3'
}
];
//built in midleware
app.use(express.static('public'))

// midlewarw time

// app.use((req,res,next)=>{
// console.log('time:', Date.now())
// next();
// });
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
    const contacts = loadContact();
res.render('contact', {
layout: 'layouts/main-layout',
nama: 'awal', 
title:'contact',
contacts,
msg: req.flash('msg'),
});
})
//halaman form tambah data contact
app.get('/contact/add', (req,res) => {
    res.render('add-contact',{
        title: 'form data contat',
        layout: 'layouts/main-layout'
    })
})
//proses data contact
app.post('/contact',[
    body('nama').custom((value)=>{
     const duplikat = cekDuplikat(value);
     if(duplikat){
         throw new Error('nama contact sudah ada');
         
     }
     return true;
    }),
    check('email','Email salah').isEmail(),
    check('nohp','no hp salah').isMobilePhone('id-ID')
], (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //  return res.status(400).json({ errors: errors.array() });
        res.render('add-contact',{
            title: "form data contact",
            layout: "layouts/main-layout",
            errors: errors.array(),
        })
    } else {

        addContact(req.body);
        //kirimkan flash
        req.flash('msg', 'Data berhasil ditambahkan')
        res.redirect('/contact');
    }
    
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
res.render('detail', {
layout: 'layouts/main-layout',
nama: 'awal', 
title:'Halaman Detail',
contact,
});
})

app.use((req,res)=>{
    res.status('404');
    res.send('<h1>404 not found</h1>');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})