CREATE DATABASE  IF NOT EXISTS `template_with_recruitment` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `template_with_recruitment`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: template_with_recruitment
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
-- Table structure for table `feedback_tbl`
--

DROP TABLE IF EXISTS `feedback_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_tbl` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `feedback_json` json NOT NULL,
  `status_id` int NOT NULL,
  `template_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`feedback_id`),
  KEY `fk_feedback_status` (`status_id`),
  KEY `fk_feedback_template` (`template_id`),
  CONSTRAINT `fk_feedback_status` FOREIGN KEY (`status_id`) REFERENCES `master_statuses` (`status_id`),
  CONSTRAINT `fk_feedback_template` FOREIGN KEY (`template_id`) REFERENCES `master_template` (`template_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_tbl`
--

LOCK TABLES `feedback_tbl` WRITE;
/*!40000 ALTER TABLE `feedback_tbl` DISABLE KEYS */;
INSERT INTO `feedback_tbl` VALUES (1,'{\"interviewer\": \"Ajit\", \"interviewDuration\": \"30\"}',1,1,'2024-12-20 06:17:10','2024-12-20 06:17:10',0),(2,'{\"templates\": [{\"sections\": [{\"criteria\": [{\"out_of\": 5, \"points\": 3, \"comments\": null, \"sub_criteria\": \"Project Understanding\"}], \"section_name\": \"Technical\"}, {\"criteria\": [{\"out_of\": 5, \"points\": 3, \"comments\": null, \"sub_criteria\": \"Communication skills\"}, {\"out_of\": 5, \"points\": 4, \"comments\": null, \"sub_criteria\": \"Confidence\"}], \"section_name\": \"Non Technical\"}, {\"criteria\": [], \"evaluation\": \"Good\", \"section_name\": \"How is candidate overall?\"}, {\"comments\": \"dfas\", \"criteria\": [], \"section_name\": \"Candidate Feedback\"}]}], \"interviewer\": \"Ajit\", \"interviewDate\": \"20-Dec-2024\", \"interviewMode\": \"Online\", \"interviewDuration\": \"30\"}',1,1,'2024-12-20 06:30:26','2024-12-20 06:30:26',0);
/*!40000 ALTER TABLE `feedback_tbl` ENABLE KEYS */;
UNLOCK TABLES;

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
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '123',
  `role_id` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`interviewer_id`),
  KEY `fk_interviewers_role` (`role_id`),
  CONSTRAINT `fk_interviewers_role` FOREIGN KEY (`role_id`) REFERENCES `master_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_interviewers`
--

LOCK TABLES `master_interviewers` WRITE;
/*!40000 ALTER TABLE `master_interviewers` DISABLE KEYS */;
INSERT INTO `master_interviewers` VALUES (1,'Rahul Sawant','2024-11-26 05:14:44','2024-11-26 05:14:44',0,'123',5),(6,'Sushil Shinde','2024-12-05 05:27:19','2024-12-05 05:27:19',0,'123',5),(7,'Esha Kadam','2024-12-05 05:27:26','2024-12-05 05:27:26',0,'123',5),(8,'Tarannum Syed','2024-12-05 05:27:32','2024-12-05 05:27:32',0,'123',5),(9,'Sayali Shinde','2024-12-05 05:27:38','2024-12-05 05:27:38',0,'123',5),(10,'Jai Bankar','2024-12-05 05:27:44','2024-12-05 05:27:44',0,'123',5),(11,'Pratik Kharde','2024-12-05 05:27:52','2024-12-05 05:27:52',0,'123',5),(12,'Prachi Siyona','2024-12-05 05:28:10','2024-12-05 05:28:10',0,'123',5),(13,'Amrish Pawar','2024-12-05 05:28:15','2024-12-05 05:28:15',0,'123',5),(14,'Adit Shinde','2024-12-05 05:28:23','2024-12-05 05:28:23',0,'123',5),(15,'Nilam Jadhav','2024-12-05 05:28:30','2024-12-05 05:28:30',0,'123',5),(16,'Kartik Shidodkar','2024-12-05 05:28:37','2024-12-05 05:28:37',0,'123',5),(17,'Atul Nehete','2024-12-05 05:28:42','2024-12-05 05:28:42',0,'123',5),(18,'Ira Mukadam','2024-12-05 05:28:48','2024-12-05 05:28:48',0,'123',5),(19,'Abhishek Bachav','2024-12-05 05:28:54','2024-12-05 05:28:54',0,'123',5),(20,'Ira & Abhishek','2024-12-05 05:29:01','2024-12-05 05:29:01',0,'123',5),(21,'Vishal Patil','2024-12-05 05:29:09','2024-12-05 05:29:09',0,'123',5),(22,'Siya Ahuja','2024-12-05 05:29:18','2024-12-05 05:29:18',0,'123',5),(23,'Amit Sangrulkar','2024-12-10 05:26:18','2024-12-10 05:26:18',0,'123',5),(25,'Ajit','2024-12-18 10:47:40','2024-12-18 10:47:40',0,'123',5);
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
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_positions`
--

LOCK TABLES `master_positions` WRITE;
/*!40000 ALTER TABLE `master_positions` DISABLE KEYS */;
INSERT INTO `master_positions` VALUES (1,'PowerApps Developer','2024-11-26 05:14:49','2024-11-26 05:14:49',0),(14,'Power BI Developer','2024-12-05 05:18:31','2024-12-05 05:18:31',0),(15,'Data Engineer','2024-12-05 05:18:42','2024-12-05 05:18:42',0),(16,'Power Automate Developer','2024-12-05 05:25:03','2024-12-05 05:25:03',0),(17,'Azure Data Engineer','2024-12-05 05:25:33','2024-12-05 05:25:33',0),(18,'Executive - Inside Sales','2024-12-05 05:25:40','2024-12-05 05:25:40',0),(19,'Business Development Manager','2024-12-05 05:25:59','2024-12-05 05:25:59',0),(20,'Data Science','2024-12-05 05:26:06','2024-12-05 05:26:06',0),(21,'Sr Executive Sales & Marketing','2024-12-05 05:26:13','2024-12-05 05:26:13',0),(22,'Azure Data Engineer','2024-12-05 05:26:18','2024-12-05 05:26:18',0),(23,'Business Analyst ','2024-12-05 05:26:24','2024-12-05 05:26:24',0),(24,'Power Platform Developer','2024-12-05 05:26:30','2024-12-05 05:26:30',0),(26,'web devv','2024-12-18 10:14:51','2024-12-18 10:14:51',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_role`
--

LOCK TABLES `master_role` WRITE;
/*!40000 ALTER TABLE `master_role` DISABLE KEYS */;
INSERT INTO `master_role` VALUES (1,'HR','2024-11-26 05:14:57','2024-11-26 05:14:57'),(2,'CEO','2024-11-26 05:14:57','2024-11-26 05:14:57'),(3,'Admin','2024-11-26 05:14:57','2024-11-26 05:14:57'),(4,'HrAdmin','2024-11-26 05:14:57','2024-11-26 05:14:57'),(5,'Interviewer','2024-12-18 12:06:28','2024-12-18 12:06:28');
/*!40000 ALTER TABLE `master_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_rounds`
--

DROP TABLE IF EXISTS `master_rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_rounds` (
  `round_id` int NOT NULL AUTO_INCREMENT,
  `round_number` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`round_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_rounds`
--

LOCK TABLES `master_rounds` WRITE;
/*!40000 ALTER TABLE `master_rounds` DISABLE KEYS */;
INSERT INTO `master_rounds` VALUES (1,'Screening Round 1','2024-12-17 07:56:50','2024-12-17 07:56:50',0),(2,'Round-1','2024-12-17 07:56:50','2024-12-17 07:56:50',0),(3,'Round-2','2024-12-17 07:56:50','2024-12-17 07:56:50',0),(4,'Round-3','2024-12-17 07:56:50','2024-12-17 07:56:50',0),(5,'Round-4','2024-12-17 07:56:50','2024-12-17 07:56:50',0),(6,'HR Round','2024-12-17 07:56:50','2024-12-17 07:56:50',0);
/*!40000 ALTER TABLE `master_rounds` ENABLE KEYS */;
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
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_statuses`
--

LOCK TABLES `master_statuses` WRITE;
/*!40000 ALTER TABLE `master_statuses` DISABLE KEYS */;
INSERT INTO `master_statuses` VALUES (1,'Selected','2024-11-26 05:15:07','2024-11-26 05:15:07',0),(2,'Rejected','2024-11-26 05:15:07','2024-11-26 05:15:07',0),(3,'Scheduled','2024-11-26 05:15:07','2024-12-10 13:23:53',0),(12,'On Hold','2024-12-03 05:09:18','2024-12-03 05:09:18',0),(13,'Final Selected','2024-12-03 05:09:18','2024-12-03 05:09:18',0),(14,'Interview Done, Result Awaited','2024-12-05 07:39:39','2024-12-05 07:39:39',0);
/*!40000 ALTER TABLE `master_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_template`
--

DROP TABLE IF EXISTS `master_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_template` (
  `template_id` int NOT NULL AUTO_INCREMENT,
  `template_json` json NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`template_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_template`
--

LOCK TABLES `master_template` WRITE;
/*!40000 ALTER TABLE `master_template` DISABLE KEYS */;
INSERT INTO `master_template` VALUES (1,'{\"sections\": [{\"criteria\": [{\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Project Understanding\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Azure\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"SQL\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"PBI\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Tableau\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"SAP\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Any other Technologies - RPA- ReactJs\"}], \"section_name\": \"Technical\"}, {\"criteria\": [{\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Communication skills\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Confidence\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Attitude\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Aptitude\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Logical & Analytical\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Consistency in Career\"}, {\"out_of\": 5, \"points\": null, \"comments\": null, \"sub_criteria\": \"Management Skills\"}], \"section_name\": \"Non Technical\"}, {\"criteria\": [], \"section_name\": \"How is candidate overall?\"}, {\"comments\": \"\", \"section_name\": \"Candidate Feedback\"}], \"template_id\": 1}',0,'2024-12-13 05:02:29','2024-12-13 05:05:32');
/*!40000 ALTER TABLE `master_template` ENABLE KEYS */;
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
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`candidate_id`),
  KEY `position_id` (`position_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `trans_candidates_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `master_positions` (`position_id`),
  CONSTRAINT `trans_candidates_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `trans_users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_candidates`
--

LOCK TABLES `trans_candidates` WRITE;
/*!40000 ALTER TABLE `trans_candidates` DISABLE KEYS */;
INSERT INTO `trans_candidates` VALUES (1,'Demo Candidate',1,1,'2024-12-03 18:53:31','2024-12-03 18:53:31',NULL,NULL,0),(2,'HARSH KALSKAR',16,21,'2024-12-06 09:19:15','2024-12-06 09:19:15',NULL,NULL,0),(3,'ROHAN BARGE',16,21,'2024-12-06 09:20:15','2024-12-06 09:20:15',NULL,NULL,0),(4,'SUYOG KULKARNI',24,21,'2024-12-06 09:22:18','2024-12-06 09:22:18',NULL,NULL,0),(5,'VIJAYSINH GAIKWAD',24,21,'2024-12-06 09:23:08','2024-12-06 09:23:08',NULL,NULL,0),(6,'KRISHNKANT SHARMA',1,21,'2024-12-06 09:24:10','2024-12-06 09:24:10',NULL,NULL,0),(7,'KANCHAN KOLEKAR',24,21,'2024-12-06 09:26:11','2024-12-06 09:26:11',NULL,NULL,0),(8,'PRATHMESH NAIK',24,19,'2024-12-06 09:30:45','2024-12-06 09:30:45',NULL,NULL,0),(9,'PRANJAL GHODAKE',20,19,'2024-12-06 09:35:06','2024-12-06 09:35:06',NULL,NULL,0),(11,'SHIVAM GHORPADE ',20,19,'2024-12-06 09:37:29','2024-12-06 09:37:29',NULL,NULL,0),(13,'ANITA KUMARI ',23,19,'2024-12-06 09:52:07','2024-12-06 09:52:07',NULL,NULL,0),(14,'SULATHANA SHAIK',23,19,'2024-12-06 09:54:24','2024-12-06 09:54:24',NULL,NULL,0),(15,'ASHUTOSH SOLANKAR',16,21,'2024-12-06 10:29:10','2024-12-06 10:29:10',NULL,NULL,0),(17,'ALFIYA BOHRA',14,19,'2024-12-06 13:12:55','2024-12-06 13:12:55',NULL,NULL,0),(18,'SHRIYA SANGRULAKAR ',1,19,'2024-12-09 05:59:03','2024-12-09 05:59:03',NULL,NULL,0),(19,'SHUBHAM LODHA ',23,19,'2024-12-09 06:16:17','2024-12-09 06:16:17',NULL,NULL,0),(20,'HASAN KHAN',23,19,'2024-12-09 06:27:15','2024-12-09 06:27:15',NULL,NULL,0),(21,'PAWAN GOSWAMI ',23,19,'2024-12-09 06:36:30','2024-12-09 06:36:30',NULL,NULL,0),(22,'PRATHAMESH KULKARNI',20,20,'2024-12-10 04:29:10','2024-12-10 04:29:10',NULL,NULL,0),(23,'SHIVANI KALAMBE',16,21,'2024-12-10 04:30:22','2024-12-10 04:30:22',NULL,NULL,0),(24,'MAHESH MADAN',20,19,'2024-12-10 04:30:31','2024-12-10 04:30:31',NULL,NULL,0),(25,'BHAVESH PHAND',1,21,'2024-12-10 04:31:09','2024-12-10 04:31:09',NULL,NULL,0),(26,'SMRUTISIKHA PANDA',24,19,'2024-12-10 04:32:35','2024-12-10 04:32:35',NULL,NULL,0),(27,'PRATHMESH NAIK',23,19,'2024-12-10 04:34:13','2024-12-10 04:34:13',NULL,NULL,0),(28,'SANKET PANDEY',20,20,'2024-12-10 04:36:56','2024-12-10 04:36:56',NULL,NULL,0),(29,'SAKSHI KAPOTE ',14,19,'2024-12-10 04:52:28','2024-12-10 04:52:28',NULL,NULL,0),(30,'PRANJAL GHODAKE',20,19,'2024-12-10 05:35:37','2024-12-10 05:35:37',NULL,NULL,0),(31,'SHIVAM GHORPADE',20,19,'2024-12-10 05:37:16','2024-12-10 05:37:16',NULL,NULL,0),(32,'RAJAT PATLE',23,19,'2024-12-10 05:56:47','2024-12-10 05:56:47',NULL,NULL,0),(33,'ONKAR KUDALE',23,19,'2024-12-10 10:43:15','2024-12-10 10:43:15',NULL,NULL,0),(36,'NEW 18-12',17,1,'2024-12-18 06:11:25','2024-12-18 06:11:25',NULL,NULL,0),(37,'NNNNN',17,22,'2024-12-18 06:39:04','2024-12-18 06:39:04',NULL,NULL,0),(38,'NEW CANDIDATE',17,1,'2024-12-18 10:31:09','2024-12-18 12:34:18',NULL,NULL,0),(39,'TESTING',23,1,'2024-12-19 07:19:40','2024-12-19 07:19:40',NULL,NULL,0),(40,'TESTING 2',19,1,'2024-12-19 09:50:48','2024-12-19 09:50:48',NULL,NULL,0),(41,'TESTING 3',23,1,'2024-12-19 13:42:36','2024-12-19 13:42:36',NULL,NULL,0),(42,'TESTING 4',17,1,'2024-12-20 04:25:03','2024-12-20 04:25:03',NULL,NULL,0);
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
  `interviewer_id` int NOT NULL,
  `interview_date` date NOT NULL,
  `status_id` int NOT NULL,
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `round_id` int DEFAULT NULL,
  `feedback_id` int DEFAULT NULL,
  PRIMARY KEY (`ir_id`),
  KEY `candidate_id` (`candidate_id`),
  KEY `interviewer_id` (`interviewer_id`),
  KEY `status_id` (`status_id`),
  KEY `trans_interview_rounds_ibfk_4` (`round_id`),
  KEY `fk_interview_feedback` (`feedback_id`),
  CONSTRAINT `fk_interview_feedback` FOREIGN KEY (`feedback_id`) REFERENCES `feedback_tbl` (`feedback_id`),
  CONSTRAINT `trans_interview_rounds_ibfk_1` FOREIGN KEY (`candidate_id`) REFERENCES `trans_candidates` (`candidate_id`) ON DELETE CASCADE,
  CONSTRAINT `trans_interview_rounds_ibfk_2` FOREIGN KEY (`interviewer_id`) REFERENCES `master_interviewers` (`interviewer_id`),
  CONSTRAINT `trans_interview_rounds_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `master_statuses` (`status_id`),
  CONSTRAINT `trans_interview_rounds_ibfk_4` FOREIGN KEY (`round_id`) REFERENCES `master_rounds` (`round_id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_interview_rounds`
--

LOCK TABLES `trans_interview_rounds` WRITE;
/*!40000 ALTER TABLE `trans_interview_rounds` DISABLE KEYS */;
INSERT INTO `trans_interview_rounds` VALUES (1,1,1,'2024-12-01',3,NULL,'2024-12-03 18:53:35','2024-12-17 07:48:41',0,1,NULL),(2,1,1,'2024-12-02',3,NULL,'2024-12-03 18:53:35','2024-12-17 07:49:32',0,2,NULL),(3,1,1,'2024-12-03',3,NULL,'2024-12-03 18:53:35','2024-12-17 07:49:37',0,3,NULL),(4,1,1,'2024-12-04',3,NULL,'2024-12-03 18:53:35','2024-12-17 07:49:39',0,4,NULL),(5,1,1,'2024-12-05',3,NULL,'2024-12-03 18:53:35','2024-12-17 07:49:41',0,5,NULL),(6,1,1,'2024-12-06',3,NULL,'2024-12-03 18:53:39','2024-12-17 07:49:44',0,6,NULL),(7,1,1,'2024-12-06',3,'','2024-12-05 05:20:48','2024-12-17 07:49:44',0,6,NULL),(8,1,1,'2024-12-06',1,'','2024-12-05 07:15:41','2024-12-17 07:49:44',1,6,NULL),(9,1,1,'2024-12-06',13,'','2024-12-05 07:39:54','2024-12-17 07:49:44',0,6,NULL),(10,2,6,'2024-12-07',3,'','2024-12-06 09:19:15','2024-12-17 07:49:39',0,4,NULL),(11,3,6,'2024-12-07',3,'','2024-12-06 09:20:15','2024-12-17 07:49:39',0,4,NULL),(12,4,6,'2024-12-07',3,'','2024-12-06 09:22:18','2024-12-17 07:49:39',0,4,NULL),(13,5,6,'2024-12-07',3,'','2024-12-06 09:23:08','2024-12-17 07:49:39',0,4,NULL),(14,6,6,'2024-12-07',3,'','2024-12-06 09:24:10','2024-12-17 07:49:39',0,4,NULL),(15,7,18,'2024-12-06',3,'Interviewer is Ira Mukadam and Durgesh Bhope.','2024-12-06 09:26:11','2024-12-17 07:49:37',0,3,NULL),(16,8,11,'2024-12-06',3,'Selected in Screening, R1 to be scheduled with Pratik and Durgesh.','2024-12-06 09:30:45','2024-12-17 07:48:41',0,1,NULL),(17,9,22,'2024-12-06',3,'S1 selected, Data Science, R1 to be planned ','2024-12-06 09:35:06','2024-12-17 07:48:41',0,1,NULL),(18,9,22,'2024-12-06',1,'test','2024-12-06 09:36:27','2024-12-17 07:48:41',0,1,NULL),(19,8,11,'2024-12-06',1,'test','2024-12-06 09:36:37','2024-12-17 07:48:41',0,1,NULL),(21,11,17,'2024-12-06',3,'S1 select ','2024-12-06 09:37:29','2024-12-17 07:48:41',0,1,NULL),(23,11,17,'2024-12-06',1,'test data\nfor Screening round recruiter name should be there ','2024-12-06 09:37:37','2024-12-17 07:48:41',0,1,NULL),(30,13,11,'2024-12-06',3,'High budget ','2024-12-06 09:52:07','2024-12-17 07:48:41',0,1,NULL),(31,13,11,'2024-12-06',2,'test data','2024-12-06 09:52:37','2024-12-17 07:48:41',0,1,NULL),(32,14,11,'2024-12-06',3,'BI profile, shared with team member ','2024-12-06 09:54:24','2024-12-17 07:48:41',0,1,NULL),(34,14,11,'2024-12-06',2,'','2024-12-06 09:54:36','2024-12-17 07:48:41',0,1,NULL),(36,14,11,'2024-12-06',2,'test \n','2024-12-06 09:54:38','2024-12-17 07:48:41',0,1,NULL),(37,15,6,'2024-12-06',3,'','2024-12-06 10:29:10','2024-12-17 07:49:39',0,4,NULL),(40,17,8,'2024-12-09',3,'Int-Ref: Pooja Ghule ','2024-12-06 13:12:55','2024-12-17 07:49:32',0,2,NULL),(41,18,9,'2024-12-12',3,'Python / Power App Internship for 6 months ','2024-12-09 05:59:03','2024-12-17 07:49:32',0,2,NULL),(42,19,11,'2024-12-10',3,'Delhi Position,Round 1 on 10th at 4:45 pm ','2024-12-09 06:16:17','2024-12-17 07:49:32',0,2,NULL),(43,20,11,'2024-12-11',3,'Rescheduled, BA -Delhi ','2024-12-09 06:27:15','2024-12-17 07:49:32',0,2,NULL),(44,21,11,'2024-12-12',3,'Int-Ref, Ashutosh, BA-Delhi','2024-12-09 06:36:30','2024-12-17 07:49:32',0,2,NULL),(45,17,8,'2024-12-09',2,'Bad performance, basics are not clear, only worked on Internal Projects ','2024-12-09 10:36:37','2024-12-17 07:49:32',0,2,NULL),(46,22,22,'2024-12-10',3,'','2024-12-10 04:29:10','2024-12-17 07:49:32',0,2,NULL),(47,23,13,'2024-12-10',3,'','2024-12-10 04:30:22','2024-12-17 07:49:32',0,2,NULL),(48,24,6,'2024-12-10',3,'Int-Ref: Jitendra Nene','2024-12-10 04:30:31','2024-12-17 07:49:37',0,3,NULL),(49,25,13,'2024-12-10',3,'','2024-12-10 04:31:09','2024-12-17 07:49:32',0,2,NULL),(50,26,6,'2024-12-10',3,'Ready for Fresher position, previous company could not verify but feedbacks are good  ','2024-12-10 04:32:35','2024-12-17 07:49:39',0,4,NULL),(51,27,13,'2024-12-11',3,'Combind interview for BA+RPA , Amrish + Durgesh','2024-12-10 04:34:13','2024-12-17 07:49:32',0,2,NULL),(52,28,22,'2024-12-09',3,'','2024-12-10 04:36:56','2024-12-17 07:49:32',0,2,NULL),(53,28,22,'2024-12-09',14,'','2024-12-10 04:37:07','2024-12-17 07:49:32',0,2,NULL),(54,28,22,'2024-12-09',14,'','2024-12-10 04:37:09','2024-12-17 07:49:32',0,2,NULL),(55,29,8,'2024-12-12',3,'Int-Ref : Primus','2024-12-10 04:52:28','2024-12-17 07:49:32',0,2,NULL),(56,30,23,'2024-12-11',3,'Int-Ref: Siya Ahuja','2024-12-10 05:35:37','2024-12-17 07:49:32',0,2,NULL),(57,31,23,'2024-12-12',3,'Referral: Vaishali Mandhare , Internship + Full time ','2024-12-10 05:37:16','2024-12-17 07:49:32',0,2,NULL),(58,32,13,'2024-12-11',3,'BA - Delhi ','2024-12-10 05:56:47','2024-12-17 07:49:32',0,2,NULL),(59,33,11,'2024-12-13',3,'BA Delhi','2024-12-10 10:43:15','2024-12-17 07:49:32',0,2,NULL),(67,36,9,'2024-12-18',3,'','2024-12-18 06:11:25','2024-12-18 06:11:25',0,1,NULL),(68,36,9,'2024-12-18',1,'','2024-12-18 06:11:30','2024-12-18 06:11:30',0,1,NULL),(69,36,1,'2024-12-19',3,'','2024-12-18 06:12:00','2024-12-18 06:12:00',0,2,NULL),(70,36,1,'2024-12-19',13,'','2024-12-18 06:12:17','2024-12-18 06:13:26',0,2,NULL),(71,37,15,'2024-12-18',3,'','2024-12-18 06:39:04','2024-12-18 06:39:04',0,1,NULL),(72,37,15,'2024-12-18',1,'','2024-12-18 09:05:06','2024-12-18 09:05:17',0,1,NULL),(73,38,9,'2024-12-18',3,'','2024-12-18 10:31:09','2024-12-18 10:31:09',0,1,NULL),(74,38,9,'2024-12-18',1,'','2024-12-18 12:31:25','2024-12-18 12:31:33',1,1,NULL),(75,38,9,'2024-12-19',3,'','2024-12-18 12:31:48','2024-12-18 12:31:48',0,1,NULL),(76,38,19,'2024-12-19',1,'','2024-12-18 12:32:05','2024-12-18 12:32:51',0,1,NULL),(77,39,25,'2024-12-19',3,'','2024-12-19 07:19:40','2024-12-19 07:19:40',0,1,NULL),(78,40,25,'2024-12-20',3,'','2024-12-19 09:50:48','2024-12-19 09:50:48',0,1,NULL),(79,40,25,'2024-12-20',1,'','2024-12-19 13:28:09','2024-12-19 13:28:09',0,1,NULL),(80,41,25,'2024-12-19',3,'','2024-12-19 13:42:36','2024-12-19 13:42:36',0,1,NULL),(81,41,25,'2024-12-19',1,'','2024-12-19 13:43:24','2024-12-19 13:43:24',0,1,NULL),(82,42,25,'2024-12-20',3,'','2024-12-20 04:25:03','2024-12-20 04:26:23',0,1,NULL);
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
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `trans_users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `master_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_users`
--

LOCK TABLES `trans_users` WRITE;
/*!40000 ALTER TABLE `trans_users` DISABLE KEYS */;
INSERT INTO `trans_users` VALUES (1,'Prachi','123',4,'2024-11-26 05:15:18','2024-12-03 05:14:37',NULL,NULL,0),(3,'Sushil','123',2,'2024-11-26 05:15:18','2024-12-18 10:04:54',NULL,NULL,0),(4,'Admin','777',3,'2024-11-26 05:15:18','2024-12-17 12:19:38',NULL,NULL,0),(19,'Ashwini','Rec-0109',1,'2024-12-04 03:33:29','2024-12-06 13:12:07',NULL,NULL,0),(20,'Shreyans','123',1,'2024-12-04 03:34:47','2024-12-04 03:34:47',NULL,NULL,0),(21,'Unmesh','123',1,'2024-12-04 03:35:15','2024-12-04 03:35:15',NULL,NULL,0),(22,'Sakshi','123',1,'2024-12-18 06:34:50','2024-12-18 06:35:04',NULL,NULL,0);
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

-- Dump completed on 2024-12-20 12:13:03
