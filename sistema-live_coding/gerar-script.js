require('dotenv').config();

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function criptografarCpf(texto) {
    const chave = Buffer.from(process.env.CRIPTO_CHAVE, 'utf8');
    const iv = Buffer.from(process.env.CRIPTO_IV, 'utf8');
    const cifra = crypto.createCipheriv('aes-256-cbc', chave, iv);
    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex');
}

const senha1 = bcrypt.hashSync('senha', 10);
const senha2 = bcrypt.hashSync('1234', 10);
const senha3 = bcrypt.hashSync('0608', 10);

const cpf1 = criptografarCpf('12345678901');
const cpf2 = criptografarCpf('09876543210');
const cpf3 = criptografarCpf('10293847561');


function sql(valor) {
    if (valor === null || valor === undefined) {
        return 'NULL';
    }
    return `'${String(valor).replace(/'/g, "''")}'`;
}

const script = `
CREATE DATABASE IF NOT EXISTS oficina;
USE oficina;

CREATE TABLE IF NOT EXISTS cliente(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    telefone CHAR(11)
);

CREATE TABLE IF NOT EXISTS veiculo(
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(100) NOT NULL,
    ano YEAR,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE IF NOT EXISTS agendamento(
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_veiculo INT,
    data_agendamento DATETIME NOT NULL,
    servico VARCHAR(100),
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo)
);

CREATE TABLE IF NOT EXISTS usuario(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL
);

INSERT INTO cliente (nome, cpf, email, telefone) VALUES
('João Silva', ${sql(cpf1)}, 'joao@gmail.com', '11987654321'),
('Maria Oliveira', ${sql(cpf2)}, 'maria@gmail.com', '11976543210'),
('Pedro Santos', ${sql(cpf3)}, 'pedro@gmail.com', '11965432109');

INSERT INTO veiculo (marca, modelo, placa, ano, id_cliente) VALUES
('Toyota', 'Corolla', 'ABC1D23', 2022, 1),
('Honda', 'Civic', 'DEF4G56', 2021, 2),
('Volkswagen', 'Gol', 'GHI7J89', 2019, 3);

INSERT INTO agendamento (id_veiculo, data_agendamento, servico) VALUES
(1, '2026-11-12 09:00:00', 'Troca de óleo'),
(2, '2026-11-13 14:30:00', 'Revisão completa'),
(3, '2026-11-14 10:00:00', 'Alinhamento e balanceamento');

INSERT INTO usuario (nome, email, senha) VALUES
('Carlos Mendes', 'carlos@mecanica.com', ${sql(senha1)}),
('Ana Costa', 'ana@mecanica.com', ${sql(senha2)}),
('Lucas Ferreira', 'lucas@mecanica.com', ${sql(senha3)});
`;

const caminho_saida = path.join(__dirname, 'database', 'script.sql');
fs.writeFileSync(caminho_saida, script, 'utf8');
console.log(`Arquivo gerado em: ${caminho_saida}`);
