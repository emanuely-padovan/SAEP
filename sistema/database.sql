CREATE DATABASE IF NOT EXISTS db_mecanica;
USE db_mecanica;

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
    id_veiculo INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    servico VARCHAR(100),
    FOREIGN KEY (id_veiculo) REFERENCES cliente(id_veiculo)
);

CREATE TABLE IF NOT EXISTS usuario(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL,
    papel ENUM('admin', 'cliente') DEFAULT 'cliente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);