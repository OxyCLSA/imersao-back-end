import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida no ambiente.
// A função conectarAoBanco (definida em dbConfig.js) provavelmente retorna uma conexão com o banco.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados 'primeiro-projeto'.
    const db = conexao.db('primeiro-projeto');
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection('posts');
    // Executa uma consulta para encontrar todos os documentos na coleção e retorna um array com os resultados.
    return colecao.find().toArray();
};

export async function criarPost (novoPost) {    
    const db = conexao.db('primeiro-projeto');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost);
};

export async function atualizarPost (id, novoPost) {    
    const db = conexao.db('primeiro-projeto');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
};