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

app.listen(3001, () => {
    console.log("Servidor Front-End Rodando!")
})