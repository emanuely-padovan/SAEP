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
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo)
);

CREATE TABLE IF NOT EXISTS usuario(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL,
);

-- Tabela cliente
INSERT INTO cliente (nome, cpf, email, telefone) VALUES
('João Silva', '', 'joao@gmail.com', '11987654321'),
('Maria Oliveira', '', 'maria@gmail.com', '11976543210'),
('Pedro Santos', '', 'pedro@gmail.com', '11965432109');


-- Tabela veiculo
INSERT INTO veiculo (marca, modelo, placa, ano, id_cliente) VALUES
('Toyota', 'Corolla', 'ABC1D23', 2022, 1),
('Honda', 'Civic', 'DEF4G56', 2021, 2),
('Volkswagen', 'Gol', 'GHI7J89', 2019, 3);


-- Tabela agendamento
INSERT INTO agendamento (id_veiculo, data_agendamento, servico) VALUES
(1, '2026-11-12 09:00:00', 'Troca de óleo'),
(2, '2026-11-13 14:30:00', 'Revisão completa'),
(3, '2026-11-14 10:00:00', 'Alinhamento e balanceamento');


-- Tabela usuario
INSERT INTO usuario (nome, email, senha) VALUES
('Carlos Mendes', 'carlos@mecanica.com', ''),
('Ana Costa', 'ana@mecanica.com', ''),
('Lucas Ferreira', 'lucas@mecanica.com', '');
