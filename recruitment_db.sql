CREATE DATABASE  IF NOT EXISTS `recruitment_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `recruitment_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: recruitment_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `c_name` varchar(100) NOT NULL,
  `position_id` int NOT NULL,
  `u_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`c_id`),
  KEY `position_id` (`position_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`),
  CONSTRAINT `candidates_ibfk_2` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,'Abhishek Sutradharr',1,1,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(2,'Aastha Sangtani',2,2,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(3,'Mihir Jamgade',2,2,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(4,'Ayush Shrivastava',3,2,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(5,'Subodh Sanjay Mogarkar',3,3,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(6,'NEW DB',2,1,'2024-11-18 04:20:25','2024-11-18 04:20:25'),(7,'NEW DB 2',5,1,'2024-11-18 04:45:05','2024-11-18 05:39:44'),(8,'NEW DB 3',1,1,'2024-11-18 05:40:20','2024-11-18 05:40:20'),(9,'NEW DB-4',1,1,'2024-11-18 06:13:02','2024-11-18 07:59:28');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_rounds`
--

DROP TABLE IF EXISTS `interview_rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview_rounds` (
  `ir_id` int NOT NULL AUTO_INCREMENT,
  `c_id` int NOT NULL,
  `round_number` varchar(10) NOT NULL,
  `interviewer_id` int NOT NULL,
  `interview_date` date NOT NULL,
  `status_id` int NOT NULL,
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ir_id`),
  KEY `c_id` (`c_id`),
  KEY `interviewer_id` (`interviewer_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `interview_rounds_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `candidates` (`c_id`) ON DELETE CASCADE,
  CONSTRAINT `interview_rounds_ibfk_2` FOREIGN KEY (`interviewer_id`) REFERENCES `interviewers` (`interviewer_id`),
  CONSTRAINT `interview_rounds_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_rounds`
--

LOCK TABLES `interview_rounds` WRITE;
/*!40000 ALTER TABLE `interview_rounds` DISABLE KEYS */;
INSERT INTO `interview_rounds` VALUES (1,1,'1',1,'2024-09-24',1,'Rejected because...','2024-11-18 03:12:19','2024-11-18 03:12:19',0),(2,2,'1',1,'2024-10-01',2,'Waiting for R2','2024-11-18 03:12:19','2024-11-18 03:12:19',0),(3,3,'1',2,'2024-10-17',4,'','2024-11-18 03:12:19','2024-11-18 03:12:19',0),(4,4,'1',3,'2024-11-01',3,'Scheduled...','2024-11-18 03:12:19','2024-11-18 03:12:19',0),(5,5,'2',4,'2024-11-05',5,'Offered','2024-11-18 03:12:19','2024-11-18 03:12:19',0),(6,6,'1',3,'2024-11-19',4,'','2024-11-18 04:20:25','2024-11-18 04:20:25',0),(7,7,'1',3,'2024-11-19',2,'','2024-11-18 04:45:05','2024-11-18 04:45:05',0),(8,7,'2',3,'2024-11-22',1,'','2024-11-18 05:04:56','2024-11-18 06:47:28',1),(9,8,'1',1,'2024-11-21',4,'','2024-11-18 05:40:20','2024-11-18 05:40:20',0),(10,8,'2',4,'2024-11-22',1,'candidate is rejected because of wrong attitude','2024-11-18 05:42:03','2024-11-18 05:42:03',0),(11,8,'Hr Round',2,'2024-11-23',3,'candidate is rejected because of wrong attitude','2024-11-18 05:57:34','2024-11-18 06:36:19',1),(12,9,'Manager',3,'2024-11-19',5,'','2024-11-18 06:13:02','2024-11-18 06:50:57',1),(13,9,'1',3,'2024-11-19',4,'','2024-11-18 07:22:22','2024-11-18 07:25:52',1),(14,9,'2',5,'2024-11-20',2,'','2024-11-18 07:22:41','2024-11-18 07:24:09',1);
/*!40000 ALTER TABLE `interview_rounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviewers`
--

DROP TABLE IF EXISTS `interviewers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviewers` (
  `interviewer_id` int NOT NULL AUTO_INCREMENT,
  `interviewer_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`interviewer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviewers`
--

LOCK TABLES `interviewers` WRITE;
/*!40000 ALTER TABLE `interviewers` DISABLE KEYS */;
INSERT INTO `interviewers` VALUES (1,'Rahul Sawant','2024-11-18 03:12:19','2024-11-18 03:12:19'),(2,'Tarannum Syed','2024-11-18 03:12:19','2024-11-18 03:12:19'),(3,'Chaitanya Sir','2024-11-18 03:12:19','2024-11-18 03:12:19'),(4,'Sushil Sir','2024-11-18 03:12:19','2024-11-18 03:12:19'),(5,'New Interviewer','2024-11-18 03:12:19','2024-11-18 03:12:19');
/*!40000 ALTER TABLE `interviewers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'HR','2024-11-18 03:12:19','2024-11-18 03:12:19'),(2,'HR','2024-11-18 03:12:19','2024-11-18 03:12:19'),(3,'HR','2024-11-18 03:12:19','2024-11-18 03:12:19'),(4,'HR','2024-11-18 03:12:19','2024-11-18 03:12:19'),(5,'CEO','2024-11-18 03:12:19','2024-11-18 03:12:19');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `positions` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'PowerApps Developer','2024-11-18 03:12:19','2024-11-18 03:12:19'),(2,'Inside Sales','2024-11-18 03:12:19','2024-11-18 03:12:19'),(3,'Power BI Developer','2024-11-18 03:12:19','2024-11-18 03:12:19'),(4,'Web Developer','2024-11-18 03:12:19','2024-11-18 03:12:19'),(5,'Intern','2024-11-18 03:12:19','2024-11-18 03:12:19');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'Rejected','2024-11-18 03:12:19','2024-11-18 03:12:19'),(2,'Selected','2024-11-18 03:12:19','2024-11-18 03:12:19'),(3,'Scheduled','2024-11-18 03:12:19','2024-11-18 03:12:19'),(4,'Interview is Scheduled','2024-11-18 03:12:19','2024-11-18 03:12:19'),(5,'Offered','2024-11-18 03:12:19','2024-11-18 03:12:19');
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Prachi','123',1,'2024-11-18 03:12:19','2024-11-18 05:01:13'),(2,'Shreyansh','123',2,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(3,'Sakshi','123',3,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(4,'Siyona','123',4,'2024-11-18 03:12:19','2024-11-18 03:12:19'),(5,'Sushil','123',5,'2024-11-18 03:12:19','2024-11-18 07:45:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18 14:12:33
