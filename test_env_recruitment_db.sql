CREATE DATABASE  IF NOT EXISTS `test_env_recruitment_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test_env_recruitment_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: test_env_recruitment_db
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_interviewers`
--

LOCK TABLES `master_interviewers` WRITE;
/*!40000 ALTER TABLE `master_interviewers` DISABLE KEYS */;
INSERT INTO `master_interviewers` VALUES (1,'Rahul Sawant','2024-11-26 05:14:44','2024-11-26 05:14:44'),(6,'Sushil Shinde','2024-12-05 05:27:19','2024-12-05 05:27:19'),(7,'Esha Kadam','2024-12-05 05:27:26','2024-12-05 05:27:26'),(8,'Tarannum Syed','2024-12-05 05:27:32','2024-12-05 05:27:32'),(9,'Sayali Shinde','2024-12-05 05:27:38','2024-12-05 05:27:38'),(10,'Jai Bankar','2024-12-05 05:27:44','2024-12-05 05:27:44'),(11,'Pratik Kharde','2024-12-05 05:27:52','2024-12-05 05:27:52'),(12,'Prachi Siyona','2024-12-05 05:28:10','2024-12-05 05:28:10'),(13,'Amrish Pawar','2024-12-05 05:28:15','2024-12-05 05:28:15'),(14,'Adit Shinde','2024-12-05 05:28:23','2024-12-05 05:28:23'),(15,'Nilam Jadhav','2024-12-05 05:28:30','2024-12-05 05:28:30'),(16,'Kartik Shidodkar','2024-12-05 05:28:37','2024-12-05 05:28:37'),(17,'Atul Nehete','2024-12-05 05:28:42','2024-12-05 05:28:42'),(18,'Ira Mukadam','2024-12-05 05:28:48','2024-12-05 05:28:48'),(19,'Abhishek Bachav','2024-12-05 05:28:54','2024-12-05 05:28:54'),(20,'Ira & Abhishek','2024-12-05 05:29:01','2024-12-05 05:29:01'),(21,'Vishal Patil','2024-12-05 05:29:09','2024-12-05 05:29:09'),(22,'Siya Ahuja','2024-12-05 05:29:18','2024-12-05 05:29:18'),(23,'Amit Sangrulkar','2024-12-10 05:26:18','2024-12-10 05:26:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_positions`
--

LOCK TABLES `master_positions` WRITE;
/*!40000 ALTER TABLE `master_positions` DISABLE KEYS */;
INSERT INTO `master_positions` VALUES (1,'PowerApps Developer','2024-11-26 05:14:49','2024-11-26 05:14:49'),(14,'Power BI Developer','2024-12-05 05:18:31','2024-12-05 05:18:31'),(15,'Data Engineer','2024-12-05 05:18:42','2024-12-05 05:18:42'),(16,'Power Automate Developer','2024-12-05 05:25:03','2024-12-05 05:25:03'),(17,'Azure Data Engineer','2024-12-05 05:25:33','2024-12-05 05:25:33'),(18,'Executive - Inside Sales','2024-12-05 05:25:40','2024-12-05 05:25:40'),(19,'Business Development Manager','2024-12-05 05:25:59','2024-12-05 05:25:59'),(20,'Data Science','2024-12-05 05:26:06','2024-12-05 05:26:06'),(21,'Sr Executive Sales & Marketing','2024-12-05 05:26:13','2024-12-05 05:26:13'),(22,'Azure Data Engineer','2024-12-05 05:26:18','2024-12-05 05:26:18'),(23,'Business Analyst ','2024-12-05 05:26:24','2024-12-05 05:26:24'),(24,'Power Platform Developer','2024-12-05 05:26:30','2024-12-05 05:26:30'),(25,'Data Engineer- Banglore Location','2024-12-05 05:26:56','2024-12-05 05:26:56');
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
INSERT INTO `master_role` VALUES (1,'HR','2024-11-26 05:14:57','2024-11-26 05:14:57'),(2,'CEO','2024-11-26 05:14:57','2024-11-26 05:14:57'),(3,'Admin','2024-11-26 05:14:57','2024-11-26 05:14:57'),(4,'HrAdmin','2024-11-26 05:14:57','2024-11-26 05:14:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_statuses`
--

LOCK TABLES `master_statuses` WRITE;
/*!40000 ALTER TABLE `master_statuses` DISABLE KEYS */;
INSERT INTO `master_statuses` VALUES (1,'Selected','2024-11-26 05:15:07','2024-11-26 05:15:07'),(2,'Rejected','2024-11-26 05:15:07','2024-11-26 05:15:07'),(3,'Scheduled','2024-11-26 05:15:07','2024-12-10 13:23:53'),(12,'On Hold','2024-12-03 05:09:18','2024-12-03 05:09:18'),(13,'Final Selected','2024-12-03 05:09:18','2024-12-03 05:09:18'),(14,'Interview Done, Result Awaited','2024-12-05 07:39:39','2024-12-05 07:39:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_candidates`
--

LOCK TABLES `trans_candidates` WRITE;
/*!40000 ALTER TABLE `trans_candidates` DISABLE KEYS */;
INSERT INTO `trans_candidates` VALUES (1,'Demo Candidate',1,1,'2024-12-03 18:53:31','2024-12-03 18:53:31'),(2,'HARSH KALSKAR',16,21,'2024-12-06 09:19:15','2024-12-06 09:19:15'),(3,'ROHAN BARGE',16,21,'2024-12-06 09:20:15','2024-12-06 09:20:15'),(4,'SUYOG KULKARNI',24,21,'2024-12-06 09:22:18','2024-12-06 09:22:18'),(5,'VIJAYSINH GAIKWAD',24,21,'2024-12-06 09:23:08','2024-12-06 09:23:08'),(6,'KRISHNKANT SHARMA',1,21,'2024-12-06 09:24:10','2024-12-06 09:24:10'),(7,'KANCHAN KOLEKAR',24,21,'2024-12-06 09:26:11','2024-12-06 09:26:11'),(8,'PRATHMESH NAIK',24,19,'2024-12-06 09:30:45','2024-12-06 09:30:45'),(9,'PRANJAL GHODAKE',20,19,'2024-12-06 09:35:06','2024-12-06 09:35:06'),(10,'HAREESH NARAYANKAR',16,17,'2024-12-06 09:36:40','2024-12-06 09:36:40'),(11,'SHIVAM GHORPADE ',20,19,'2024-12-06 09:37:29','2024-12-06 09:37:29'),(12,'GAYATRI CHOPDE',14,17,'2024-12-06 09:46:19','2024-12-06 09:46:19'),(13,'ANITA KUMARI ',23,19,'2024-12-06 09:52:07','2024-12-06 09:52:07'),(14,'SULATHANA SHAIK',23,19,'2024-12-06 09:54:24','2024-12-06 09:54:24'),(15,'ASHUTOSH SOLANKAR',16,21,'2024-12-06 10:29:10','2024-12-06 10:29:10'),(16,'HAREESH NARAYANKAR',14,17,'2024-12-06 11:36:02','2024-12-06 11:36:02'),(17,'ALFIYA BOHRA',14,19,'2024-12-06 13:12:55','2024-12-06 13:12:55'),(18,'SHRIYA SANGRULAKAR ',1,19,'2024-12-09 05:59:03','2024-12-09 05:59:03'),(19,'SHUBHAM LODHA ',23,19,'2024-12-09 06:16:17','2024-12-09 06:16:17'),(20,'HASAN KHAN',23,19,'2024-12-09 06:27:15','2024-12-09 06:27:15'),(21,'PAWAN GOSWAMI ',23,19,'2024-12-09 06:36:30','2024-12-09 06:36:30'),(22,'PRATHAMESH KULKARNI',20,20,'2024-12-10 04:29:10','2024-12-10 04:29:10'),(23,'SHIVANI KALAMBE',16,21,'2024-12-10 04:30:22','2024-12-10 04:30:22'),(24,'MAHESH MADAN',20,19,'2024-12-10 04:30:31','2024-12-10 04:30:31'),(25,'BHAVESH PHAND',1,21,'2024-12-10 04:31:09','2024-12-10 04:31:09'),(26,'SMRUTISIKHA PANDA',24,19,'2024-12-10 04:32:35','2024-12-10 04:32:35'),(27,'PRATHMESH NAIK',23,19,'2024-12-10 04:34:13','2024-12-10 04:34:13'),(28,'SANKET PANDEY',20,20,'2024-12-10 04:36:56','2024-12-10 04:36:56'),(29,'SAKSHI KAPOTE ',14,19,'2024-12-10 04:52:28','2024-12-10 04:52:28'),(30,'PRANJAL GHODAKE',20,19,'2024-12-10 05:35:37','2024-12-10 05:35:37'),(31,'SHIVAM GHORPADE',20,19,'2024-12-10 05:37:16','2024-12-10 05:37:16'),(32,'RAJAT PATLE',23,19,'2024-12-10 05:56:47','2024-12-10 05:56:47'),(33,'ONKAR KUDALE',23,19,'2024-12-10 10:43:15','2024-12-10 10:43:15');
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
  `round_number` varchar(50) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_interview_rounds`
--

LOCK TABLES `trans_interview_rounds` WRITE;
/*!40000 ALTER TABLE `trans_interview_rounds` DISABLE KEYS */;
INSERT INTO `trans_interview_rounds` VALUES (1,1,'Screening Round 1',1,'2024-12-01',3,NULL,'2024-12-03 18:53:35','2024-12-03 18:53:35',0),(2,1,'Round-1',1,'2024-12-02',3,NULL,'2024-12-03 18:53:35','2024-12-03 18:53:35',0),(3,1,'Round-2',1,'2024-12-03',3,NULL,'2024-12-03 18:53:35','2024-12-03 18:53:35',0),(4,1,'Round-3',1,'2024-12-04',3,NULL,'2024-12-03 18:53:35','2024-12-03 18:53:35',0),(5,1,'Round-4',1,'2024-12-05',3,NULL,'2024-12-03 18:53:35','2024-12-03 18:53:35',0),(6,1,'HR Round',1,'2024-12-06',3,NULL,'2024-12-03 18:53:39','2024-12-03 18:53:39',0),(7,1,'HR Round',1,'2024-12-06',3,'','2024-12-05 05:20:48','2024-12-05 06:38:44',0),(8,1,'HR Round',1,'2024-12-06',1,'','2024-12-05 07:15:41','2024-12-05 07:15:53',1),(9,1,'HR Round',1,'2024-12-06',13,'','2024-12-05 07:39:54','2024-12-05 07:40:04',0),(10,2,'Round-3',6,'2024-12-07',3,'','2024-12-06 09:19:15','2024-12-06 09:19:15',0),(11,3,'Round-3',6,'2024-12-07',3,'','2024-12-06 09:20:15','2024-12-06 09:20:15',0),(12,4,'Round-3',6,'2024-12-07',3,'','2024-12-06 09:22:18','2024-12-06 09:22:18',0),(13,5,'Round-3',6,'2024-12-07',3,'','2024-12-06 09:23:08','2024-12-06 09:23:08',0),(14,6,'Round-3',6,'2024-12-07',3,'','2024-12-06 09:24:10','2024-12-06 09:24:10',0),(15,7,'Round-2',18,'2024-12-06',3,'Interviewer is Ira Mukadam and Durgesh Bhope.','2024-12-06 09:26:11','2024-12-06 09:26:11',0),(16,8,'Screening Round 1',11,'2024-12-06',3,'Selected in Screening, R1 to be scheduled with Pratik and Durgesh.','2024-12-06 09:30:45','2024-12-06 09:30:45',0),(17,9,'Screening Round 1',22,'2024-12-06',3,'S1 selected, Data Science, R1 to be planned ','2024-12-06 09:35:06','2024-12-06 09:35:06',0),(18,9,'Screening Round 1',22,'2024-12-06',1,'test','2024-12-06 09:36:27','2024-12-10 04:29:41',0),(19,8,'Screening Round 1',11,'2024-12-06',1,'test','2024-12-06 09:36:37','2024-12-10 04:29:53',0),(20,10,'Round-1',8,'2024-12-03',3,'\"\n 10th 87% 2015, 12th 2017 76%, BE 2021 7.42gpa Comp Sci. Hareesh has worked on Power Automate projects and was able to explain his project properly. He has keen interest in learning where he has completed 4 Microsoft Certification. Needs to be technically Evaluated.\"			\n			\n			\n ','2024-12-06 09:36:40','2024-12-06 09:37:11',0),(21,11,'Screening Round 1',17,'2024-12-06',3,'S1 select ','2024-12-06 09:37:29','2024-12-06 09:37:29',0),(22,10,'Round-1',8,'2024-12-03',1,'','2024-12-06 09:37:30','2024-12-06 09:37:30',0),(23,11,'Screening Round 1',17,'2024-12-06',1,'test data\nfor Screening round recruiter name should be there ','2024-12-06 09:37:37','2024-12-10 04:29:27',0),(24,12,'Round-1',8,'2024-11-19',3,'10th - 2013 -78.2%, Diploma 2016 - Comp Tech 72.80%,BE 2019 In Comp Engg 7.15 CGPA, CDAC - 2021 - 78.75%. Gayatri has good understanding of the projects which she has worked on. She has decent knowledge of Power Bi with very good attitude. 			\n			\n			\n','2024-12-06 09:46:19','2024-12-06 09:46:19',0),(25,12,'Round-1',8,'2024-11-19',1,'','2024-12-06 09:46:35','2024-12-06 09:46:35',0),(26,12,'Round-2',21,'2024-11-20',3,'The candidate has good understanding of Power BI.			\n			\n			\n','2024-12-06 09:47:42','2024-12-06 09:47:42',0),(27,12,'Round-2',21,'2024-11-20',1,'','2024-12-06 09:48:02','2024-12-06 09:48:02',0),(28,12,'Round-3',6,'2024-11-25',3,'Selected -From Sushil Sir on Mail','2024-12-06 09:50:27','2024-12-06 09:50:27',0),(29,12,'Round-3',6,'2024-11-25',1,'','2024-12-06 09:51:13','2024-12-06 09:51:13',0),(30,13,'Screening Round 1',11,'2024-12-06',3,'High budget ','2024-12-06 09:52:07','2024-12-06 09:52:07',0),(31,13,'Screening Round 1',11,'2024-12-06',2,'test data','2024-12-06 09:52:37','2024-12-10 04:29:13',0),(32,14,'Screening Round 1',11,'2024-12-06',3,'BI profile, shared with team member ','2024-12-06 09:54:24','2024-12-06 09:54:24',0),(33,12,'HR Round',12,'2024-11-30',3,'On hold -As her UAN Account is not created , She has the UAN Account Which is in here company trust.','2024-12-06 09:54:28','2024-12-06 09:54:28',0),(34,14,'Screening Round 1',11,'2024-12-06',2,'','2024-12-06 09:54:36','2024-12-06 09:54:36',0),(35,12,'HR Round',12,'2024-11-30',12,'','2024-12-06 09:54:38','2024-12-09 07:18:28',0),(36,14,'Screening Round 1',11,'2024-12-06',2,'test \n','2024-12-06 09:54:38','2024-12-10 04:28:54',0),(37,15,'Round-3',6,'2024-12-06',3,'','2024-12-06 10:29:10','2024-12-06 10:29:10',0),(38,16,'Round-1',9,'2024-12-06',3,'','2024-12-06 11:36:02','2024-12-06 11:36:02',0),(39,10,'Round-2',13,'2024-12-11',3,'ABC','2024-12-06 11:41:52','2024-12-06 11:41:52',0),(40,17,'Round-1',8,'2024-12-09',3,'Int-Ref: Pooja Ghule ','2024-12-06 13:12:55','2024-12-06 13:12:55',0),(41,18,'Round-1',9,'2024-12-12',3,'Python / Power App Internship for 6 months ','2024-12-09 05:59:03','2024-12-09 05:59:03',0),(42,19,'Round-1',11,'2024-12-10',3,'Delhi Position,Round 1 on 10th at 4:45 pm ','2024-12-09 06:16:17','2024-12-09 06:16:17',0),(43,20,'Round-1',11,'2024-12-11',3,'Rescheduled, BA -Delhi ','2024-12-09 06:27:15','2024-12-09 06:27:15',0),(44,21,'Round-1',11,'2024-12-12',3,'Int-Ref, Ashutosh, BA-Delhi','2024-12-09 06:36:30','2024-12-09 06:36:30',0),(45,17,'Round-1',8,'2024-12-09',2,'Bad performance, basics are not clear, only worked on Internal Projects ','2024-12-09 10:36:37','2024-12-09 10:36:37',0),(46,22,'Round-1',22,'2024-12-10',3,'','2024-12-10 04:29:10','2024-12-10 04:29:10',0),(47,23,'Round-1',13,'2024-12-10',3,'','2024-12-10 04:30:22','2024-12-10 04:30:22',0),(48,24,'Round-2',6,'2024-12-10',3,'Int-Ref: Jitendra Nene','2024-12-10 04:30:31','2024-12-10 04:30:31',0),(49,25,'Round-1',13,'2024-12-10',3,'','2024-12-10 04:31:09','2024-12-10 04:31:09',0),(50,26,'Round-3',6,'2024-12-10',3,'Ready for Fresher position, previous company could not verify but feedbacks are good  ','2024-12-10 04:32:35','2024-12-10 04:32:35',0),(51,27,'Round-1',13,'2024-12-11',3,'Combind interview for BA+RPA , Amrish + Durgesh','2024-12-10 04:34:13','2024-12-10 04:34:13',0),(52,28,'Round-1',22,'2024-12-09',3,'','2024-12-10 04:36:56','2024-12-10 04:36:56',0),(53,28,'Round-1',22,'2024-12-09',14,'','2024-12-10 04:37:07','2024-12-10 04:37:07',0),(54,28,'Round-1',22,'2024-12-09',14,'','2024-12-10 04:37:09','2024-12-10 04:37:09',0),(55,29,'Round-1',8,'2024-12-12',3,'Int-Ref : Primus','2024-12-10 04:52:28','2024-12-10 04:52:28',0),(56,30,'Round-1',23,'2024-12-11',3,'Int-Ref: Siya Ahuja','2024-12-10 05:35:37','2024-12-10 05:35:37',0),(57,31,'Round-1',23,'2024-12-12',3,'Referral: Vaishali Mandhare , Internship + Full time ','2024-12-10 05:37:16','2024-12-10 05:37:16',0),(58,32,'Round-1',13,'2024-12-11',3,'BA - Delhi ','2024-12-10 05:56:47','2024-12-10 05:56:47',0),(59,33,'Round-1',11,'2024-12-13',3,'BA Delhi','2024-12-10 10:43:15','2024-12-10 10:43:15',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_users`
--

LOCK TABLES `trans_users` WRITE;
/*!40000 ALTER TABLE `trans_users` DISABLE KEYS */;
INSERT INTO `trans_users` VALUES (1,'Prachi','123',4,'2024-11-26 05:15:18','2024-12-03 05:14:37'),(3,'Sushil','12345',2,'2024-11-26 05:15:18','2024-11-29 11:21:47'),(4,'Admin','123',3,'2024-11-26 05:15:18','2024-11-26 05:15:18'),(17,'Sakshi','123',1,'2024-11-29 11:39:30','2024-11-29 11:39:30'),(18,'Testing','777',4,'2024-12-03 18:10:34','2024-12-03 18:10:34'),(19,'Ashwini','Rec-0109',1,'2024-12-04 03:33:29','2024-12-06 13:12:07'),(20,'Shreyans','123',1,'2024-12-04 03:34:47','2024-12-04 03:34:47'),(21,'Unmesh','123',1,'2024-12-04 03:35:15','2024-12-04 03:35:15');
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

-- Dump completed on 2024-12-10 18:56:18
