require('dotenv').config();

const fs = require('fs');
const path = require('path');

const express = require('express');
const mysql = require('mysql2/promise');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const mustache = require('mustache');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
});

app.use((req, res, next) => {
    const metodo = String(req.body?._method || '').toUpperCase();
    if(req.method === 'POST' && ['PUT', 'DELETE'].includes(metodo)) {
        req.method = metodo
    };
    next();
});

function mostrar(nome, dados = {}) {
    const arquivo = path.join(__dirname, 'paginas', `${nome}.html`);
    return mustache.render(fs.readFileSync(arquivo, 'utf8'), dados);
};

function criptografarTexto(texto) {
    const cifra = crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV);
    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex');
};

function descriptografar(texto) {
    const decifra = crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPTO_IV);
    return decifra.update(texto, 'hex', 'utf8') + decifra.final('utf8');
};

async function excluir(res, tabela, id, volta, motivo) {
    try {
        await db.query(`DELETE FROM ${tabela} WHERE id = ?`, [id]);
        res.redirect(volta)
    } catch (error) {
        if(error.code === 'ER?_ROW_ID_REFERENCED_2') {
            return res.status(409).send(`<p>Não foi possível excluir: ${motivo}.</p><p><a href="${volta}">Voltar</a></p>`);
        }
        console.error(error);
        res.status(500).send(`<p>Erro ao excluir.</p><p><a href="${volta}">Voltar</a></p>`);
    }
};

app.get('/', (req, res) => {
    res.send(mostrar('login'));
});

app.post('/login', async(req, res) => {
    // continua...
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Oficina TORQUE rodando em http://localhost:${port}`)
});