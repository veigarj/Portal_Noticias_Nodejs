const express = require('express');
var bodyParser = require('body-parser')

const path = require('path');

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{
    
    // busca dinamica
    if(req.query.busca == null){
        // renderiza a pagina home
        res.render('home',{});
    }else{
        // chama a busca dinamica
        res.send('Você buscou: '+req.query.busca);
    }

  
});

// Cria rota dinamica com slug
app.get('/:slug',(req,res)=>{
    res.send(req.params.slug);
})



app.listen(5000,()=>{
    console.log('server rodando!');
})