// Importa o módulo express, que é usado para criar servidores e gerenciar rotas HTTP.
import express from 'express';

// Importa o módulo multer, usado para lidar com uploads de arquivos.
import multer from 'multer';

// Importa funções do arquivo 'postscontrollers.js' que serão usadas como controladores das rotas.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postscontrollers.js';

import cors from 'cors';

const corsOptions = {
    origin: "http://localhost:8000",
    optionSucessStatus: 200
};


// Configuração do armazenamento para o multer:
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos enviados serão armazenados.
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // O diretório "uploads/" será usado.
    },
    // Define o nome dos arquivos armazenados no servidor.
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Usa o nome original do arquivo enviado.
    }
});

// Cria uma instância do multer com a configuração de armazenamento definida acima.
const upload = multer({ storage: storage });

// Define as rotas e seus manipuladores para a aplicação Express.
const routes = (app) => {
    // Permite que o Express entenda o corpo das requisições no formato JSON.
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota GET para '/posts':
    // Quando uma requisição GET for feita para '/posts', a função 'listarPosts' será chamada.
    app.get('/posts', listarPosts);

    // Rota POST para '/posts':
    // Quando uma requisição POST for feita para '/posts', a função 'postarNovoPost' será chamada.
    app.post('/posts', postarNovoPost);

    // Rota POST para '/upload':
    // Quando uma requisição POST for feita para '/upload', o middleware 'upload.single' tratará o upload
    // de um único arquivo enviado sob o campo 'imagem'. Após isso, a função 'uploadImagem' será chamada.
    app.post('/upload', upload.single('imagem'), uploadImagem);

    app.put('/upload/:id', atualizarNovoPost);
};

// Exporta a função de rotas para que ela possa ser usada em outros arquivos do projeto.
export default routes;


/*
Resumo das funcionalidades:
Express: Gerencia rotas e manipula requisições/respostas HTTP.
Multer: Facilita o upload de arquivos, configurando o local de armazenamento e o nome do arquivo.
Controladores: Funções importadas para separar a lógica de negócio das rotas, mantendo o código organizado.
Rotas:
GET /posts: Retorna uma lista de posts.
POST /posts: Permite criar um novo post.
POST /upload: Faz o upload de uma imagem e chama a função para processá-la.
*/