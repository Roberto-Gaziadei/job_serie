-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 22-Nov-2024 às 18:39
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `job_serie`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `serie`
--

DROP TABLE IF EXISTS `serie`;
CREATE TABLE IF NOT EXISTS `serie` (
  `id_serie` int NOT NULL AUTO_INCREMENT,
  `nome_serie` varchar(100) NOT NULL,
  `sinopse` varchar(255) NOT NULL,
  `autores` varchar(255) NOT NULL,
  PRIMARY KEY (`id_serie`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `serie`
--

INSERT INTO `serie` (`id_serie`, `nome_serie`, `sinopse`, `autores`) VALUES
(1, 'Stranger things', 'Um grupo de amigos se envolve em uma série de eventos sobrenaturais na pacata cidade de Hawkins. Eles enfrentam criaturas monstruosas, agências secretas do governo e se aventuram em dimensões paralelas.', 'Casca de bala'),
(11, 'Outer banks', 'O jovem John convoca seus melhores amigos para procurarem por um tesouro ligado ao desaparecimento de seu pai. Aos poucos, o grupo vai entrando em uma perigosa trama de segredos e perigos.', 'Grupo menos é mais');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
