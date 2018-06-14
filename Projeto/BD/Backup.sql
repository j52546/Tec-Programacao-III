-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: astrasoftware
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.31-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cabpedcomp`
--

DROP TABLE IF EXISTS `cabpedcomp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabpedcomp` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `NOMEFORNEC` varchar(45) NOT NULL,
  `TOTAL_PED` float DEFAULT NULL,
  `CADFORNEC_COD` int(11) DEFAULT NULL,
  PRIMARY KEY (`COD`),
  KEY `FK1_CADFORNEC_COD` (`CADFORNEC_COD`),
  CONSTRAINT `FK1_CADFORNEC_COD` FOREIGN KEY (`CADFORNEC_COD`) REFERENCES `cadfornec1` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cabpedven`
--

DROP TABLE IF EXISTS `cabpedven`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cabpedven` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `CADCLIN1_COD` int(11) NOT NULL,
  `NOMECLI` varchar(45) NOT NULL,
  `TOTAL_PED` float NOT NULL,
  PRIMARY KEY (`COD`),
  KEY `fk_CABPED_CADCLIN1_idx` (`CADCLIN1_COD`),
  CONSTRAINT `fk_CABPED_CADCLIN1` FOREIGN KEY (`CADCLIN1_COD`) REFERENCES `cadclin1` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cadclin1`
--

DROP TABLE IF EXISTS `cadclin1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cadclin1` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) NOT NULL COMMENT 'NOME DO CLIENTE',
  `PESSOA` varchar(1) NOT NULL COMMENT 'DISPONIBILIZAR APENSA "J" OU "F" PARA PESSOA FISICA OU JURIDICA',
  `DOCIND` varchar(20) NOT NULL COMMENT 'CNPJ OU CPF',
  `email` varchar(50) DEFAULT NULL,
  `TEL` varchar(16) NOT NULL,
  `END` text NOT NULL,
  `CIDADE` varchar(45) NOT NULL,
  `ESTADO` varchar(45) NOT NULL,
  `CEP` varchar(9) NOT NULL,
  PRIMARY KEY (`COD`,`DOCIND`),
  UNIQUE KEY `DOCIND` (`DOCIND`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cadfornec1`
--

DROP TABLE IF EXISTS `cadfornec1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cadfornec1` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(45) DEFAULT NULL,
  `PESSOA` varchar(1) DEFAULT NULL,
  `EMAIL` varchar(20) NOT NULL,
  `DOCIND` varchar(20) NOT NULL,
  `TEL` varchar(16) DEFAULT NULL,
  `END` varchar(45) DEFAULT NULL,
  `CIDADE` varchar(45) DEFAULT NULL,
  `ESTADO` varchar(45) DEFAULT NULL,
  `CEP` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`COD`,`DOCIND`),
  UNIQUE KEY `DOCIND` (`DOCIND`,`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cadprod1`
--

DROP TABLE IF EXISTS `cadprod1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cadprod1` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(45) NOT NULL,
  `DESCR` text NOT NULL,
  `SALDO` int(11) NOT NULL,
  `PRECO` float NOT NULL,
  PRIMARY KEY (`COD`),
  UNIQUE KEY `NOME` (`NOME`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `caduser1`
--

DROP TABLE IF EXISTS `caduser1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caduser1` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) NOT NULL COMMENT 'NOME DO CLIENTE',
  `DOCIND` varchar(14) NOT NULL COMMENT 'CNPJ OU CPF',
  `TEL` varchar(16) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `PERMITION` tinyint(4) NOT NULL DEFAULT '0',
  `EMAIL` varchar(45) NOT NULL,
  `ROLE` varchar(45) NOT NULL,
  PRIMARY KEY (`COD`,`DOCIND`),
  UNIQUE KEY `EMAIL_UNIQUE` (`EMAIL`),
  UNIQUE KEY `DOCIND_UNIQUE` (`DOCIND`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conpagar`
--

DROP TABLE IF EXISTS `conpagar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conpagar` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATVENCIM` date NOT NULL,
  `VALOR` float NOT NULL,
  `PAGO` tinyint(4) DEFAULT '0',
  `DATPAGAMENTO` date DEFAULT NULL,
  `CABPEDCOMP_COD` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_CONPAGAR_CABPEDCOMP1_idx` (`CABPEDCOMP_COD`),
  CONSTRAINT `fk_CONPAGA_CABPEDCOMP1` FOREIGN KEY (`CABPEDCOMP_COD`) REFERENCES `cabpedcomp` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conrec`
--

DROP TABLE IF EXISTS `conrec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conrec` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATVENCIM` date NOT NULL,
  `VALOR` float NOT NULL,
  `DATA_PED` date NOT NULL,
  `RECEBIDO` tinyint(4) NOT NULL DEFAULT '0',
  `CABPEDVEN_COD` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_CONREC_CABPEDVEN1_idx` (`CABPEDVEN_COD`),
  CONSTRAINT `fk_CONREC_CABPEDVEN1` FOREIGN KEY (`CABPEDVEN_COD`) REFERENCES `cabpedven` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itepedcomp`
--

DROP TABLE IF EXISTS `itepedcomp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itepedcomp` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `QTD` int(11) DEFAULT NULL,
  `PREC` float DEFAULT NULL,
  `TOTAL` float DEFAULT NULL,
  `CABPEDCOMP_COD` int(11) NOT NULL,
  `CADPROD1_COD` int(11) NOT NULL,
  PRIMARY KEY (`COD`),
  KEY `fk_ITEPEDCOMP_CABPEDCOMP1_idx` (`CABPEDCOMP_COD`),
  KEY `fk_ITEPEDCOMP_CADPROD11_idx` (`CADPROD1_COD`),
  CONSTRAINT `fk_ITEPEDCOMP_CABPEDCOMP1` FOREIGN KEY (`CABPEDCOMP_COD`) REFERENCES `cabpedcomp` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ITEPEDCOMP_CADPROD11` FOREIGN KEY (`CADPROD1_COD`) REFERENCES `cadprod1` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `itepedven`
--

DROP TABLE IF EXISTS `itepedven`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itepedven` (
  `COD` int(11) NOT NULL AUTO_INCREMENT,
  `CABPED_COD` int(11) NOT NULL,
  `CADPROD1_COD` int(11) NOT NULL,
  `QTD` int(11) DEFAULT NULL,
  `PREC` float DEFAULT NULL,
  `TOTAL` float DEFAULT NULL,
  PRIMARY KEY (`COD`),
  KEY `fk_ITEPED_CABPED1_idx` (`CABPED_COD`),
  KEY `fk_ITEPED_CADPROD11_idx` (`CADPROD1_COD`),
  CONSTRAINT `fk_ITEPED_CABPED1` FOREIGN KEY (`CABPED_COD`) REFERENCES `cabpedven` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ITEPED_CADPROD11` FOREIGN KEY (`CADPROD1_COD`) REFERENCES `cadprod1` (`COD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-22 17:35:06
