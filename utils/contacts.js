const fs = require('fs');

const loadContact = ()=>{
    const fileBuffer =  fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}; 
// cari contct berdasarkan nama
const findContact = (nama)=>{
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
return contact;
};
//menimpa file contatcsj.son dg data baru
const saveContacts = (contacts) => {
fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

//Menambahakan data contact baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);


}

//cek nama duplikat

const cekDuplikat =(nama)=>{
const contacts = loadContact();
return contacts.find((contact) => contact.nama===nama);
}

module.exports = {loadContact, findContact , addContact, cekDuplikat}; 