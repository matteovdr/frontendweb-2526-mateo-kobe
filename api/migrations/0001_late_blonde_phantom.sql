CREATE TABLE `leiding` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`ageGroup` varchar(255) NOT NULL,
	`imageUrl` varchar(255) NOT NULL,
	`description` varchar(255),
	CONSTRAINT `leiding_id` PRIMARY KEY(`id`)
);
