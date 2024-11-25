import express from 'express';
import routes from './src/routes/postsRoutes.js';


// Cria uma instância do Express, que será o núcleo da nossa aplicação.
const app = express();
app.use(express.static('uploads'));
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log('Servidor ligado');
});


/* // Array de posts de exemplo, utilizado caso não haja dados no banco de dados.
const posts = [
    { id: 1, descricao: "Cidades iluminadas à noite", imagem: "https://source.unsplash.com/random/1920x1080/?city,night" },
    { id: 2, descricao: "Comida deliciosa e colorida", imagem: "https://source.unsplash.com/random/1920x1080/?food" },
    { id: 3, descricao: "Pôr do sol em um lago tranquilo", imagem: "https://source.unsplash.com/random/1920x1080/?sunset,lake" }
]; */



