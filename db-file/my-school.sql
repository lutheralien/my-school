-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2022 at 07:42 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my-school`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `blog_img` text NOT NULL,
  `title` text NOT NULL,
  `author` text NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `tag_name` text NOT NULL,
  `user_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`blog_id`, `content`, `blog_img`, `title`, `author`, `date_created`, `date_updated`, `tag_name`, `user_id`) VALUES
(10, '<p>Notice that the space in front of the&nbsp;<code>&quot;E&quot;</code>&nbsp;letter is not removed from the&nbsp;<code>newStr</code>&nbsp;variable. You need to add the space in the first argument when you want to remove it as well.</p>\r\n\r\n<p>The&nbsp;<code>replace()</code>&nbsp;method doesn&rsquo;t modify the original string, so you need to store the string returned by the method in a different string.</p>\r\n\r\n<p>The method only replaces the&nbsp;<em>first occurence</em>&nbsp;of the&nbsp;<code>searchString</code>&nbsp;parameter:</p>\r\n', 'FB_IMG_1660514475304.jpg', 'Syntax of substring( ) method', 'AlienX_Luther_alien', '2022-09-13 20:34:32', '0000-00-00 00:00:00', 'main', '77e55eba-2780-49de-b1ba-c72552915a26'),
(11, '<p>&nbsp;</p>\r\n\r\n<p><em>At that time, China, which had come under Communist rule in 1949</em> (after the Communist Party had emerged victorious in a protracted civil war against Chiang Kai-shek and his Kuomintang Party), <strong>had been deprived of China&rsquo;s seat at the United Nations by the USA and its allies.</strong></p>\r\n', 'FB_IMG_16560200584343143.jpg', 'This Aisha Huang saga is a disgrace to both China and Ghana', 'Hyper vision', '2022-09-13 22:51:42', '0000-00-00 00:00:00', '', '77e55eba-2780-49de-b1ba-c72552915a26'),
(12, '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quia. Reiciendis tempora consectetur alias iste ea perferendis doloribus? Quia illo culpa reiciendis libero dicta necessitatibus doloremque numquam aspernatur officia magni, autem ea sunt tenetur id facere voluptate quos sint, placeat ab nobis nemo porro. Tempore non vero id necessitatibus.</p>\r\n', 'FB_IMG_16560202803686115.jpg', 'random', 'Hyper vision5', '2022-09-14 00:06:44', '0000-00-00 00:00:00', '', '77e55eba-2780-49de-b1ba-c72552915a26');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(100) NOT NULL,
  `student_name` varchar(50) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(9) NOT NULL,
  `parent_name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `parent_mobile_number` int(12) NOT NULL,
  `student_image` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_modified` datetime NOT NULL,
  `student_class` varchar(50) NOT NULL,
  `old_school_fee` decimal(10,3) NOT NULL,
  `new_school_fee` decimal(10,3) NOT NULL,
  `payment_date` date DEFAULT NULL,
  `payee_name` varchar(50) NOT NULL,
  `payee_mobile_phone` int(13) NOT NULL,
  `user_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_name`, `school_name`, `dob`, `gender`, `parent_name`, `address`, `parent_mobile_number`, `student_image`, `date_added`, `date_modified`, `student_class`, `old_school_fee`, `new_school_fee`, `payment_date`, `payee_name`, `payee_mobile_phone`, `user_id`) VALUES
(28, ' Akosua Roseline Asare', 'Green Meadows Academy', '2007-06-08', 'Female', 'kwesi Asare', 'Dansoman', 244985136, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', '2022-07-08 21:30:32', '2022-08-06 19:14:31', '', '1000.000', '0.000', '2022-08-06', 'kwame joe', 556934756, 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(29, 'Kwame Sefa Mensah', 'Green Meadows Academy', '2008-02-13', 'Male', 'Edward Amponsah Mensah', 'Gbawe Mallam', 302228021, 'download (2).jpg', '2022-07-08 21:42:25', '2022-08-06 16:08:28', '', '100.000', '0.000', '2022-07-14', '', 0, 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(30, 'Sheila Bafoa Ansah', 'Green Meadows Academy', '2006-10-24', 'Female', 'Rebecca Bafoe Johnson', 'Dansoman Estate', 208180905, 'zahra-amiri-msgYbIh-1DA-unsplash.jpg', '2022-07-08 21:46:11', '2022-08-06 16:24:31', '', '2900.000', '0.000', '2022-08-06', 'kwame joe', 200568345, 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(31, 'Raphael marfo Bigby', 'Green Meadows Academy', '2006-07-05', 'Male', 'Keneth Marfo Bigby', 'Fadama Junction', 302761322, 'download (1).jpg', '2022-07-08 21:48:54', '2022-08-06 16:06:50', '', '35000.000', '0.000', '2022-08-06', 'kwame joe', 559467848, 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(32, 'Afua Gyabaa Rosemary', 'Green Meadows Academy', '2008-01-01', 'Female', 'Yvonne Gyabaa Doreen', 'Nyamekye', 244985136, 'gift-habeshaw-_kY9Q2hB5oY-unsplash.jpg', '2022-07-08 21:51:21', '2022-08-06 16:31:06', '', '0.000', '0.000', '2022-08-06', 'Natalie Mensah', 559456723, 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(33, 'Adjoa sarfo yayra', 'Coral Springs Grammar School', '2006-06-20', 'Female', 'Akwesi sarfo john', 'Nyanyano', 302662952, 'rajesh-rajput-3Nm1A9_0iJk-unsplash.jpg', '2022-07-09 06:53:59', '2022-07-09 07:03:37', '', '12800.000', '3100.000', '2022-07-21', 'alienx', 50748724, '45cbaf06-1b94-45e0-9203-693af9c38648'),
(34, 'Kwame osagyefoe johnson', 'Coral Springs Grammar School', '2007-05-22', 'Male', 'kwesi osagyefoe james', 'safari junction', 302761322, 'qasim-sadiq-MUlE4pw78Ec-unsplash.jpg', '2022-07-09 07:03:02', '2022-07-09 07:03:53', '', '2300.000', '2300.000', '2022-07-09', '', 0, '45cbaf06-1b94-45e0-9203-693af9c38648'),
(36, 'natan Kweku Mensah', 'Green Meadows Academy', '2022-07-14', 'Male', 'isaac Kwesi Mensah', 'Dodowa', 208283905, 'garrett-jackson-LhNkJMayglI-unsplash.jpg', '2022-07-13 08:51:50', '2022-08-06 16:16:51', '', '0.000', '0.000', '2022-08-06', 'kwame joe', 205678345, 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(40, 'Daniel', 'DANTH', '2022-07-22', 'Male', 'Kofi', 'Oyibi', 558448765, 'CBE77FF7-7F44-42EF-8D33-3FD8FA65C886.jpeg', '2022-07-21 10:44:36', '2022-07-21 11:17:20', '', '1500.000', '0.000', '2022-07-21', 'Daniel', 548448765, '017f5771-636b-4596-b1b2-2de2c93b0414'),
(41, 'wseh', 'CORAL SPRINGS GRAMMAR SCHOOL', '2022-07-28', 'Male', 'w', 'safari junction', 779467848, 'c53f896fe6484931b104697ca556c44c.png', '2022-07-28 00:01:00', '0000-00-00 00:00:00', 'Primary 4', '7.000', '0.000', NULL, '', 0, '45cbaf06-1b94-45e0-9203-693af9c38648');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(200) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `mobile_phone` int(12) DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `region` varchar(20) DEFAULT NULL,
  `municipality` varchar(50) DEFAULT NULL,
  `google_map_location` text DEFAULT NULL,
  `ghanapost_address` varchar(255) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  `school_website` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `fee_info` text DEFAULT NULL,
  `subjects_offered` text DEFAULT NULL,
  `courses_offered` text DEFAULT NULL,
  `mobile_phone_a` int(12) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `password`, `user_image`, `mobile_phone`, `registration_date`, `city`, `region`, `municipality`, `google_map_location`, `ghanapost_address`, `landmark`, `school_website`, `address`, `fee_info`, `subjects_offered`, `courses_offered`, `mobile_phone_a`, `last_login`) VALUES
('017f5771-636b-4596-b1b2-2de2c93b0414', 'Danth school ', 'danthkb1@gmail.com', '$2b$08$oSYpYohjdatcL5Iw1XmJ2.morgYElipg9WfP0Py.lnGydiJXsYZUG', '', 548448765, '2022-07-21 10:35:00', 'Accra', 'Greater Accra', 'Adenta', '', '', '', '', '', '', '', '', 0, '2022-07-21 10:37:39'),
('15b0cf2f-5d91-427b-95c8-902c12b249e2', 'ghana tech', 'tawiahmaxed200@gmail.com', '$2b$08$1MHteFddU0SZVPHNu5SUEu5tvUDHI8SpR7cDL1hbd71vudUIs/nFy', 'caroline-hernandez-uGg4MQ14Ua4-unsplash.jpg', 558399661, '2022-07-19 06:14:39', 'Cape Coast', 'Ashanti', 'Techimani', '', '', '', '', '', '', '', '', 0, '2022-07-19 06:15:09'),
('45cbaf06-1b94-45e0-9203-693af9c38648', 'Coral Springs Grammar School', 'coralspringsgrammarschool@gmail.com', '$2b$08$4QTBVkkBbuzZvgvDRARR2OaO6Oxx.l8dtrT6h1f3lbtsD1XOwfV0O', 'c53f896fe6484931b104697ca556c44c.png', 208180905, '2022-07-09 06:37:45', 'Cape Coast', 'Central', 'Komenda/Edina/Eguafo/Abirem', 'rkr', 'rk', 'r26', 'https://galaxy.edu.gh/', 'ej', '37', '26', '26', 7585845, '2022-08-09 16:26:27'),
('776b1b10-f77f-4c18-a037-cd17c62007a8', 'Accra Junior Basics', 'accrabasics@gmail.com', '$2b$08$8PFbS08fMJdtbT4ND8/U6eYhIM1wMPKXjml9qOZHh/MIMrdvk82Zq', 'blob3cd8ef7e-3fba-426b-9d2e-82f89e006a89', 208105247, '2022-08-04 07:29:45', 'Accra', 'Greater Accra', 'Ga East', '', '', '', '', '', '', '', '', 0, '2022-08-06 19:57:43'),
('77e55eba-2780-49de-b1ba-c72552915a26', 'Opana Senior High', 'opana@ropis.com', '$2b$08$U3fvzP068r1jtS23k8LjNOwVxRScsTcyUSab2iaLl5hupx2HKVKJq', 'blobf2798f3c-e80e-4ff5-962e-01eca5a20ac0', 209465756, '2022-09-12 07:49:56', 'Berekum', 'Oti', 'Effutu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-13 20:07:44'),
('c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4', 'Green Meadows Academy', 'greenmeadows@gmail.com', '$2b$08$KtpbiKZnxgjwQB2qTzdDxOPiIcYcRH8Wc6nTLLrc7Tzb7koo3.qz2', 'blobed594f58-4f89-4994-a577-efe5c958cfad', 208105213, '2022-07-08 17:11:46', 'Berekum', 'Central', 'Effutu', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15885.556824129828!2d-0.42194550000000003!3d5.50909945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfbaf8eb8fc741%3A0x7cd7d2a88986e083!2sApam%20Senior%20High%20School!5e0!3m2!1sen!2sgh!4v1659634187441!5m2!1sen!2sgh', 'AP 29', 'opposite Health Insurance Office', 'https://galaxy.edu.gh/', 'GHCJ+CGV, Apam', 'Fees is paid in terminal Installments nd is paid by bank note issue nd the school secetariat office', 'PHYSICS,\r\nCHEMISTRY,\r\nELECTIVE MATHS,\r\nBIOLOGY,\r\nLITERATURE IN ENGLISH,\r\nFRENCH,\r\nECONOMICS,\r\nGEOGRAPHY,\r\nHISTORY', 'Business,\r\nGeneral Arts,\r\nHome Econs,\r\nGeneral Science,\r\nVisual Arts', 550683956, '2022-09-04 23:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `user_facilities_image`
--

CREATE TABLE `user_facilities_image` (
  `img_id_f` int(100) NOT NULL,
  `img_1_f` varchar(200) NOT NULL,
  `img_2_f` varchar(200) NOT NULL,
  `img_3_f` varchar(200) NOT NULL,
  `img_4_f` varchar(200) NOT NULL,
  `img_5_f` varchar(200) NOT NULL,
  `img_6_f` varchar(200) NOT NULL,
  `img_7_f` varchar(200) NOT NULL,
  `img_8_f` varchar(200) NOT NULL,
  `img_9_f` varchar(200) NOT NULL,
  `img_10_f` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_facilities_image`
--

INSERT INTO `user_facilities_image` (`img_id_f`, `img_1_f`, `img_2_f`, `img_3_f`, `img_4_f`, `img_5_f`, `img_6_f`, `img_7_f`, `img_8_f`, `img_9_f`, `img_10_f`, `user_id`) VALUES
(37, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', 'download (1).jpg', 'download (2).jpg', 'download.jpg', 'gabriel-tovar-OttcZs3-Uv8-unsplash.jpg', 'gabriel-tovar-xF6HoP2oy74-unsplash.jpg', 'garrett-jackson-LhNkJMayglI-unsplash.jpg', 'gift-habeshaw-_kY9Q2hB5oY-unsplash.jpg', 'janko-ferlic-IVrtlceLSzs-unsplash.jpg', 'moses-vega-_YfoApRxd4I-unsplash.jpg', '45cbaf06-1b94-45e0-9203-693af9c38648'),
(38, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', 'download (1).jpg', 'download (2).jpg', 'download.jpg', 'gabriel-tovar-OttcZs3-Uv8-unsplash.jpg', 'gabriel-tovar-xF6HoP2oy74-unsplash.jpg', 'garrett-jackson-LhNkJMayglI-unsplash.jpg', 'gift-habeshaw-_kY9Q2hB5oY-unsplash.jpg', 'janko-ferlic-IVrtlceLSzs-unsplash.jpg', 'moses-vega-_YfoApRxd4I-unsplash.jpg', 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4');

-- --------------------------------------------------------

--
-- Table structure for table `user_social_activities_image`
--

CREATE TABLE `user_social_activities_image` (
  `img_id_s` int(100) NOT NULL,
  `img_1_s` varchar(200) NOT NULL,
  `img_2_s` varchar(200) NOT NULL,
  `img_3_s` varchar(200) NOT NULL,
  `img_4_s` varchar(200) NOT NULL,
  `img_5_s` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_social_activities_image`
--

INSERT INTO `user_social_activities_image` (`img_id_s`, `img_1_s`, `img_2_s`, `img_3_s`, `img_4_s`, `img_5_s`, `user_id`) VALUES
(9, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', 'download (1).jpg', 'download (2).jpg', 'download.jpg', 'gabriel-tovar-OttcZs3-Uv8-unsplash.jpg', 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(10, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', 'download (1).jpg', 'download (2).jpg', 'download.jpg', 'gabriel-tovar-OttcZs3-Uv8-unsplash.jpg', '776b1b10-f77f-4c18-a037-cd17c62007a8');

-- --------------------------------------------------------

--
-- Table structure for table `user_transport_system_images`
--

CREATE TABLE `user_transport_system_images` (
  `img_id_ts` int(100) NOT NULL,
  `img_1_ts` varchar(200) NOT NULL,
  `img_2_ts` varchar(200) NOT NULL,
  `img_3_ts` varchar(200) NOT NULL,
  `img_4_ts` varchar(200) NOT NULL,
  `img_5_ts` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_transport_system_images`
--

INSERT INTO `user_transport_system_images` (`img_id_ts`, `img_1_ts`, `img_2_ts`, `img_3_ts`, `img_4_ts`, `img_5_ts`, `user_id`) VALUES
(4, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', 'download (1).jpg', 'download (2).jpg', 'download.jpg', 'gabriel-tovar-OttcZs3-Uv8-unsplash.jpg', 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(5, 'qasim-sadiq-MUlE4pw78Ec-unsplash.jpg', 'rajesh-rajput-3Nm1A9_0iJk-unsplash.jpg', 'r-d-smith-k-f3PYgAPwQ-unsplash.jpg', 'terricks-noah-n9R0MN3XGvY-unsplash.jpg', 'zahra-amiri-msgYbIh-1DA-unsplash.jpg', '776b1b10-f77f-4c18-a037-cd17c62007a8');

-- --------------------------------------------------------

--
-- Table structure for table `user_uniforms_image`
--

CREATE TABLE `user_uniforms_image` (
  `img_id_u` int(100) NOT NULL,
  `img_1_u` varchar(200) NOT NULL,
  `img_2_u` varchar(200) NOT NULL,
  `img_3_u` varchar(200) NOT NULL,
  `img_4_u` varchar(200) NOT NULL,
  `img_5_u` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_uniforms_image`
--

INSERT INTO `user_uniforms_image` (`img_id_u`, `img_1_u`, `img_2_u`, `img_3_u`, `img_4_u`, `img_5_u`, `user_id`) VALUES
(10, 'caroline-hernandez-uGg4MQ14Ua4-unsplash (1).jpg', 'download (1).jpg', 'download (2).jpg', 'download.jpg', 'gabriel-tovar-OttcZs3-Uv8-unsplash.jpg', 'c3ebcf1f-da1d-4045-81ee-f62ea1d7c2d4'),
(11, 'gabriel-tovar-xF6HoP2oy74-unsplash.jpg', 'garrett-jackson-LhNkJMayglI-unsplash.jpg', 'gift-habeshaw-_kY9Q2hB5oY-unsplash.jpg', 'janko-ferlic-IVrtlceLSzs-unsplash.jpg', 'moses-vega-_YfoApRxd4I-unsplash.jpg', '776b1b10-f77f-4c18-a037-cd17c62007a8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_facilities_image`
--
ALTER TABLE `user_facilities_image`
  ADD PRIMARY KEY (`img_id_f`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_social_activities_image`
--
ALTER TABLE `user_social_activities_image`
  ADD PRIMARY KEY (`img_id_s`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_transport_system_images`
--
ALTER TABLE `user_transport_system_images`
  ADD PRIMARY KEY (`img_id_ts`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_uniforms_image`
--
ALTER TABLE `user_uniforms_image`
  ADD PRIMARY KEY (`img_id_u`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user_facilities_image`
--
ALTER TABLE `user_facilities_image`
  MODIFY `img_id_f` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user_social_activities_image`
--
ALTER TABLE `user_social_activities_image`
  MODIFY `img_id_s` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_transport_system_images`
--
ALTER TABLE `user_transport_system_images`
  MODIFY `img_id_ts` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_uniforms_image`
--
ALTER TABLE `user_uniforms_image`
  MODIFY `img_id_u` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_facilities_image`
--
ALTER TABLE `user_facilities_image`
  ADD CONSTRAINT `user_facilities_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_social_activities_image`
--
ALTER TABLE `user_social_activities_image`
  ADD CONSTRAINT `user_social_activities_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_transport_system_images`
--
ALTER TABLE `user_transport_system_images`
  ADD CONSTRAINT `user_transport_system_images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_uniforms_image`
--
ALTER TABLE `user_uniforms_image`
  ADD CONSTRAINT `user_uniforms_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
