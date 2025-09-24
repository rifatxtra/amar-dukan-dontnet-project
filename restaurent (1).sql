-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 24, 2025 at 12:39 PM
-- Server version: 8.0.42
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurent`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `Id` int NOT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`Id`, `Name`) VALUES
(1, 'Drinks'),
(2, 'Pizza'),
(3, 'Burger'),
(4, 'Snacks');

-- --------------------------------------------------------

--
-- Table structure for table `menuitems`
--

CREATE TABLE `menuitems` (
  `Id` int NOT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CategoryId` int NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Image` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menuitems`
--

INSERT INTO `menuitems` (`Id`, `Name`, `CategoryId`, `Price`, `Status`, `Image`) VALUES
(1, 'Pran Frooto Mango Fruit Drink', 1, 80.00, 1, NULL),
(2, 'Margherita Pizza', 2, 299.00, 1, NULL),
(3, 'Pepperoni Pizza', 2, 349.00, 1, NULL),
(4, 'Cheese Burger', 3, 199.00, 1, NULL),
(5, 'Chicken Burger', 3, 229.00, 1, NULL),
(6, 'Coca Cola', 1, 49.00, 1, NULL),
(7, 'Orange Juice', 1, 7.00, 1, NULL),
(9, 'j', 2, 9.00, 1, 'b086ebc1-d920-4b66-b766-237788b27a18.png'),
(10, 'MD. RASHEDUL ISLAM', 1, 1.00, 1, 'af4ee43e-f81b-46f1-9565-27f1bac45934.png');

-- --------------------------------------------------------

--
-- Table structure for table `optionmeta`
--

CREATE TABLE `optionmeta` (
  `Id` int NOT NULL,
  `OptionId` int NOT NULL,
  `MetaKey` varchar(255) NOT NULL,
  `MetaValue` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `optionmeta`
--

INSERT INTO `optionmeta` (`Id`, `OptionId`, `MetaKey`, `MetaValue`) VALUES
(1, 1, 'Half Litre', '40'),
(2, 1, '1 Litre', '80'),
(3, 2, 'Small', '350'),
(4, 2, 'Medium', '600'),
(5, 2, 'Large', '800'),
(6, 3, 'Spicy', '0'),
(7, 3, 'More Sauces', '0');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `option_name` text NOT NULL,
  `option_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `product_id`, `option_name`, `option_type`) VALUES
(1, 1, 'Please select a size', 'single'),
(2, 2, 'Please select a size', 'single'),
(3, 2, 'Please select desired addons', 'multiple');

-- --------------------------------------------------------

--
-- Table structure for table `ordermeta`
--

CREATE TABLE `ordermeta` (
  `Id` int NOT NULL,
  `OrderId` int NOT NULL,
  `ProductName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CategoryName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Quantity` int NOT NULL,
  `Price` decimal(6,2) NOT NULL,
  `SubTotal` decimal(6,2) NOT NULL,
  `OrderModelId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ordermeta`
--

INSERT INTO `ordermeta` (`Id`, `OrderId`, `ProductName`, `CategoryName`, `Quantity`, `Price`, `SubTotal`, `OrderModelId`) VALUES
(1, 1, 'Pepperoni Pizza', 'Pizza', 1, 349.00, 349.00, NULL),
(2, 2, 'Pepperoni Pizza', 'Pizza', 1, 349.00, 349.00, NULL),
(3, 3, 'Coca Cola', 'Drinks', 1, 49.00, 49.00, NULL),
(4, 3, 'Orange Juice', 'Drinks', 1, 79.00, 79.00, NULL),
(5, 4, 'Coca Cola', 'Drinks', 1, 49.00, 49.00, NULL),
(6, 4, 'Orange Juice', 'Drinks', 1, 79.00, 79.00, NULL),
(7, 5, 'Coca Cola', 'Drinks', 1, 49.00, 49.00, NULL),
(8, 5, 'Orange Juice', 'Drinks', 1, 79.00, 79.00, NULL),
(9, 6, 'Coca Cola', 'Drinks', 1, 49.00, 49.00, NULL),
(10, 8, 'Cheese Burger', 'Burger', 1, 199.00, 199.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Id` int NOT NULL,
  `UserId` int DEFAULT NULL,
  `Total` decimal(6,2) NOT NULL,
  `Status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TableNo` int NOT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Id`, `UserId`, `Total`, `Status`, `TableNo`, `CreatedAt`) VALUES
(1, 1, 349.00, 'Completed', 0, '2025-09-16 15:04:13.072625'),
(2, 1, 349.00, 'Cancelled', 0, '2025-09-16 15:28:31.685496'),
(3, 1, 128.00, 'Processing', 0, '2025-09-16 15:36:10.330817'),
(4, 1, 128.00, 'Processing', 0, '2025-09-16 15:38:11.746804'),
(5, 1, 128.00, 'Processing', 0, '2025-09-16 15:41:08.960296'),
(6, 1, 49.00, 'Processing', 0, '2025-09-18 20:32:40.072123'),
(7, 0, 0.00, 'string', 0, '2025-09-20 01:20:51.168976'),
(8, 1, 199.00, 'Processing', 2, '2025-09-24 18:38:48.029119');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `Id` int NOT NULL,
  `OrderId` int NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `Currency` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PaymentStatus` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PaymentMethod` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TransactionId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int NOT NULL,
  `Amardukan_Key` text NOT NULL,
  `Amardukan_Value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `Amardukan_Key`, `Amardukan_Value`) VALUES
(1, 'maintenance_mode', '0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int NOT NULL,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Role` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedAt` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Name`, `Email`, `Password`, `Role`, `CreatedAt`) VALUES
(1, 'Rashed', 'admin@example.com', 'Rifat104', 'admin', '2025-08-28 16:25:25.000000');

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20250828094303_InitialCreate', '9.0.8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `menuitems`
--
ALTER TABLE `menuitems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_MenuItems_CategoryId` (`CategoryId`);

--
-- Indexes for table `optionmeta`
--
ALTER TABLE `optionmeta`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `OptionId` (`OptionId`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordermeta`
--
ALTER TABLE `ordermeta`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_OrderMeta_OrderModelId` (`OrderModelId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menuitems`
--
ALTER TABLE `menuitems`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `optionmeta`
--
ALTER TABLE `optionmeta`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ordermeta`
--
ALTER TABLE `ordermeta`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `menuitems`
--
ALTER TABLE `menuitems`
  ADD CONSTRAINT `FK_MenuItems_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `optionmeta`
--
ALTER TABLE `optionmeta`
  ADD CONSTRAINT `optionmeta_ibfk_1` FOREIGN KEY (`OptionId`) REFERENCES `options` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ordermeta`
--
ALTER TABLE `ordermeta`
  ADD CONSTRAINT `FK_OrderMeta_Orders_OrderModelId` FOREIGN KEY (`OrderModelId`) REFERENCES `orders` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
