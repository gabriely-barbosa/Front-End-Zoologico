const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});


app.get('/categoria', (req, res) => {
    res.render('animal/cadastrarAnimal')
});


app.get('/listarAnimal', (req, res) => {

    const urlListarAnimal = 'http://localhost:3000/listarAnimal';

    axios.get(urlListarAnimal)
        .then((response) => {
            console.log(response.data);
            let animais = response.data;
            res.render('animal/listarAnimal', {animais});
        });
});

/* EDITAR */
app.get('/editarAnimal/:cod_Animal', (req, res) => {
    
    let {cod_Animal} = req.params;

    //res.send('teste');

    const urlListarAnimal = `http://localhost:3000/listarAnimalID/${cod_Animal}`;

     axios.get(urlListarAnimal)
         .then((response) => {
             let animal = response.data;
             console.log(animal.data)
             res.render('animal/editarAnimal', {animal});

         });
});

app.post('/editarAnimal', (req, res) => {

    let urlEditar = 'http://localhost:3000/alterarAnimal';

    axios.put(urlEditar, req.body)
        .then((response) => {
            res.redirect('/listarAnimal');
        });
});

app.get('/excluirAnimal/:cod_Animal', (req, res)=>{
    console.log(req.params);
 
     let {cod_Animal} = req.params;
 
     const urlExcluirAnimal = `http://localhost:3000/excluirAnimal/${cod_Animal}`;
 
     axios.delete(urlExcluirAnimal)
     .then((response)=>{
         res.redirect('/listarAnimal');
     });
     
 });
 


app.listen(3001, () => {
    console.log("Servidor Front-End Rodando! - http://localhost:3001")
})