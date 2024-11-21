CREATE DATABASE  IF NOT EXISTS `recruitment_db2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `recruitment_db2`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: recruitment_db2
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
-- Table structure for table `master_interviewers`
--

DROP TABLE IF EXISTS `master_interviewers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_interviewers` (
  `interviewer_id` int NOT NULL AUTO_INCREMENT,
  `interviewer_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`interviewer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_interviewers`
--

LOCK TABLES `master_interviewers` WRITE;
/*!40000 ALTER TABLE `master_interviewers` DISABLE KEYS */;
INSERT INTO `master_interviewers` VALUES (1,'Rahul Sawant','2024-11-19 07:37:44','2024-11-19 07:37:44'),(2,'Tarannum Syed','2024-11-19 07:37:44','2024-11-19 07:37:44'),(3,'Chaitanya Sir','2024-11-19 07:37:44','2024-11-19 07:37:44'),(4,'Sushil Sir','2024-11-19 07:37:44','2024-11-19 07:37:44'),(5,'New Interviewer','2024-11-19 07:37:44','2024-11-19 07:37:44');
/*!40000 ALTER TABLE `master_interviewers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_positions`
--

DROP TABLE IF EXISTS `master_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_positions` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_positions`
--

LOCK TABLES `master_positions` WRITE;
/*!40000 ALTER TABLE `master_positions` DISABLE KEYS */;
INSERT INTO `master_positions` VALUES (1,'PowerApps Developer','2024-11-19 07:37:44','2024-11-19 07:37:44'),(2,'Inside Sales','2024-11-19 07:37:44','2024-11-19 07:37:44'),(3,'Power BI Developer','2024-11-19 07:37:44','2024-11-19 07:37:44'),(4,'Web Developer','2024-11-19 07:37:44','2024-11-19 07:37:44'),(5,'Intern','2024-11-19 07:37:44','2024-11-19 07:37:44');
/*!40000 ALTER TABLE `master_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_role`
--

DROP TABLE IF EXISTS `master_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_role`
--

LOCK TABLES `master_role` WRITE;
/*!40000 ALTER TABLE `master_role` DISABLE KEYS */;
INSERT INTO `master_role` VALUES (1,'HR','2024-11-19 07:37:44','2024-11-19 07:37:44'),(2,'CEO','2024-11-19 07:37:44','2024-11-19 07:37:44'),(3,'Admin','2024-11-19 09:26:25','2024-11-19 09:26:25'),(4,'HrAdmin','2024-11-20 04:50:52','2024-11-20 04:50:52');
/*!40000 ALTER TABLE `master_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_statuses`
--

DROP TABLE IF EXISTS `master_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_statuses` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_statuses`
--

LOCK TABLES `master_statuses` WRITE;
/*!40000 ALTER TABLE `master_statuses` DISABLE KEYS */;
INSERT INTO `master_statuses` VALUES (1,'Rejected','2024-11-19 07:37:44','2024-11-19 07:37:44'),(2,'Selected','2024-11-19 07:37:44','2024-11-19 07:37:44'),(3,'Scheduled','2024-11-19 07:37:44','2024-11-19 07:37:44'),(4,'Interview is Scheduled','2024-11-19 07:37:44','2024-11-19 07:37:44'),(5,'Offered','2024-11-19 07:37:44','2024-11-19 07:37:44');
/*!40000 ALTER TABLE `master_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_candidates`
--

DROP TABLE IF EXISTS `trans_candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_candidates` (
  `candidate_id` int NOT NULL AUTO_INCREMENT,
  `candidate_name` varchar(100) NOT NULL,
  `position_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`candidate_id`),
  KEY `position_id` (`position_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `trans_candidates_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `master_positions` (`position_id`),
  CONSTRAINT `trans_candidates_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `trans_users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_candidates`
--

LOCK TABLES `trans_candidates` WRITE;
/*!40000 ALTER TABLE `trans_candidates` DISABLE KEYS */;
INSERT INTO `trans_candidates` VALUES (1,'Abhishek Sutradharr',1,1,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(2,'Aastha Sangtani',2,2,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(3,'Mihir Jamgade',2,2,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(4,'Ayush Shrivastava',3,2,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(5,'Subodh Sanjay Mogarkar',3,3,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(6,'AJIT',5,1,'2024-11-19 08:16:20','2024-11-19 09:32:31'),(7,'NEW DEMO',2,1,'2024-11-20 04:31:38','2024-11-20 04:31:38');
/*!40000 ALTER TABLE `trans_candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_interview_rounds`
--

DROP TABLE IF EXISTS `trans_interview_rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_interview_rounds` (
  `ir_id` int NOT NULL AUTO_INCREMENT,
  `candidate_id` int NOT NULL,
  `round_number` varchar(10) NOT NULL,
  `interviewer_id` int NOT NULL,
  `interview_date` date NOT NULL,
  `status_id` int NOT NULL,
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ir_id`),
  KEY `candidate_id` (`candidate_id`),
  KEY `interviewer_id` (`interviewer_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `trans_interview_rounds_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `trans_candidates` (`candidate_id`) ON DELETE CASCADE,
  CONSTRAINT `trans_interview_rounds_ibfk_2` FOREIGN KEY (`interviewer_id`) REFERENCES `master_interviewers` (`interviewer_id`),
  CONSTRAINT `trans_interview_rounds_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `master_statuses` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_interview_rounds`
--

LOCK TABLES `trans_interview_rounds` WRITE;
/*!40000 ALTER TABLE `trans_interview_rounds` DISABLE KEYS */;
INSERT INTO `trans_interview_rounds` VALUES (1,1,'1',1,'2024-09-24',1,'Rejected because...','2024-11-19 07:37:44','2024-11-19 07:37:44',0),(2,2,'1',1,'2024-10-01',2,'Waiting for R2','2024-11-19 07:37:44','2024-11-19 07:37:44',0),(3,3,'1',2,'2024-10-17',4,'','2024-11-19 07:37:44','2024-11-19 07:37:44',0),(4,4,'1',3,'2024-11-01',3,'Scheduled...','2024-11-19 07:37:44','2024-11-19 07:37:44',0),(5,5,'2',4,'2024-11-05',5,'Offered','2024-11-19 07:37:44','2024-11-19 07:37:44',0),(6,6,'1',3,'2024-11-20',4,'','2024-11-19 08:16:20','2024-11-19 09:28:41',1),(7,6,'2',3,'2024-11-21',2,'','2024-11-19 09:27:50','2024-11-19 09:28:04',1),(8,6,'1',3,'2024-11-20',4,'','2024-11-19 10:19:29','2024-11-19 10:19:29',0),(9,6,'2',5,'2024-11-21',4,'','2024-11-19 10:19:42','2024-11-21 06:31:22',1),(10,6,'2',5,'2024-11-22',1,'Candidate is rejected because of bad attitude','2024-11-19 10:24:14','2024-11-21 06:31:22',1),(11,6,'2',5,'2024-11-20',2,'Promoted to next round','2024-11-20 04:26:36','2024-11-21 06:31:22',1),(12,7,'1',3,'2024-11-20',3,'first schedule','2024-11-20 04:31:38','2024-11-21 06:32:09',1),(13,7,'1',3,'2024-11-20',2,'Promoted to next round','2024-11-20 04:31:42','2024-11-21 06:32:09',1),(14,7,'2',5,'2024-11-21',5,'','2024-11-20 04:32:11','2024-11-20 04:40:07',1),(15,7,'2',5,'2024-11-20',1,'Candidate rejected','2024-11-20 04:32:23','2024-11-20 04:40:07',1),(16,6,'2',5,'2024-11-22',2,'Promoted to next round sdfsdgsadgsad','2024-11-20 04:34:35','2024-11-21 06:31:22',1),(17,7,'1',3,'2024-11-20',1,'Candidate rejected','2024-11-20 06:00:36','2024-11-21 06:32:09',1),(18,6,'2',5,'2024-11-23',2,'Promoted to next round sdfsdgsadgsadsadasfasf','2024-11-20 12:03:09','2024-11-21 06:31:22',1),(19,7,'1',5,'2024-11-22',4,'','2024-11-21 06:32:48','2024-11-21 06:33:51',1),(20,7,'1',5,'2024-11-21',2,'Promoted to next round','2024-11-21 06:33:02','2024-11-21 06:33:51',1),(21,7,'2',4,'2024-11-22',3,'','2024-11-21 06:33:23','2024-11-21 06:33:37',1),(22,7,'1',2,'2024-11-22',4,'','2024-11-21 06:40:07','2024-11-21 06:40:07',0),(23,7,'1',2,'2024-11-21',2,'Promoted to next round','2024-11-21 06:40:10','2024-11-21 06:40:23',1),(24,7,'1',2,'2024-11-21',2,'Promoted to next round','2024-11-21 06:40:34','2024-11-21 06:40:34',0),(25,7,'1',2,'2024-11-21',1,'Candidate rejected','2024-11-21 06:40:35','2024-11-21 06:40:50',1);
/*!40000 ALTER TABLE `trans_interview_rounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_users`
--

DROP TABLE IF EXISTS `trans_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `trans_users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `master_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_users`
--

LOCK TABLES `trans_users` WRITE;
/*!40000 ALTER TABLE `trans_users` DISABLE KEYS */;
INSERT INTO `trans_users` VALUES (1,'Prachi','123',4,'2024-11-19 07:37:44','2024-11-21 03:30:45'),(2,'Shreyansh','123',1,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(3,'Sakshi','123',1,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(4,'Siyona','123',1,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(5,'Sushil','123',2,'2024-11-19 07:37:44','2024-11-19 07:37:44'),(6,'Admin','123',3,'2024-11-19 09:26:34','2024-11-19 09:26:34');
/*!40000 ALTER TABLE `trans_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-21 13:18:00
