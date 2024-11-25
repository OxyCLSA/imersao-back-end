// Importa funções do modelo 'postsmodel.js' para manipular dados relacionados aos posts.
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsmodel.js";

// Importa o módulo 'fs' (File System) para manipulação de arquivos no sistema.
import fs from 'fs';

import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts.
export async function listarPosts(req, res) {
    // Chama a função 'getTodosPosts' para obter todos os posts do banco de dados.
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
    res.status(200).json(posts);
};

// Função para criar um novo post com os dados enviados pelo cliente.
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição.
    const novoPost = req.body;

    try {
        // Chama a função 'criarPost' para inserir o novo post no banco de dados.
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 e o post criado no formato JSON.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, exibe-o no console.
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro do servidor) e uma mensagem de erro.
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    };
};

// Função para fazer o upload de uma imagem e criar um post associado.
export async function uploadImagem(req, res) {
    // Cria um novo post com informações padrão, incluindo o nome da imagem enviada.
    const novoPost = {
        descricao: '', // Descrição inicial vazia.
        imgUrl: req.file.originalname, // Usa o nome original do arquivo como URL da imagem.
        alt: '' // Texto alternativo inicial vazio.
    };

    try {
        // Chama a função 'criarPost' para inserir o novo post no banco de dados.
        const postCriado = await criarPost(novoPost);
        // Cria o caminho atualizado para a imagem usando o ID gerado pelo banco de dados.
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo no sistema de arquivos para usar o novo nome baseado no ID.
        fs.renameSync(req.file.path, imagemAtualizada);

        // Envia uma resposta HTTP com status 200 e o post criado no formato JSON.
        res.status(200).json(postCriado);
    } catch (erro) {
        // Caso ocorra um erro, exibe-o no console.
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro do servidor) e uma mensagem de erro.
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    };
};


export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`; // Corrigido a template string
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`); // Corrigido a template string
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt // Corrigido o typo de 'atl' para 'alt'
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ 'Erro': 'Falha na requisição' });
    }
}