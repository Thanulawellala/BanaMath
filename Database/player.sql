-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 08:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banamath`
--

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `PID` int(11) NOT NULL,
  `pname` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `score` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`PID`, `pname`, `password`, `score`) VALUES
(17, 'John', '$2y$10$1SQqTrO5BkoNlyBJgiC0j.NoEvV3r5j9luud/pB2K1cUOKhSHjrlO', 40),
(19, 'Ryan', '$2y$10$otHvkXZsPgPeZ03gzbfireN0sp.TJ.kgPE6ZqjJMOp/1NGQkSCPgC', 30),
(20, 'Alex', '$2y$10$eY/h52EAEKn8MjZ9yQj7neC3ahKE0MVvDLKsnaW50irbjBTOCL9WK', 25),
(21, 'Thanula', '$2y$10$N4ovz197fmevyJvP6PPGYOWe/cwR/mKHfs.GoL.P7fyND9gbHwMye', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`PID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
