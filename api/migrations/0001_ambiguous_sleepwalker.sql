CREATE TABLE `leiding` (
	`persoonId` int unsigned NOT NULL,
	`ageGroup` varchar(255) NOT NULL,
	`imageUrl` varchar(255) NOT NULL,
	`beschrijving` text NOT NULL,
	CONSTRAINT `leiding_persoonId` PRIMARY KEY(`persoonId`)
);
--> statement-breakpoint
CREATE TABLE `leiding_kamp` (
	`leidingId` int unsigned NOT NULL,
	`kampId` int unsigned NOT NULL,
	CONSTRAINT `leiding_kamp_leidingId_kampId_pk` PRIMARY KEY(`leidingId`,`kampId`)
);
--> statement-breakpoint
CREATE TABLE `lid` (
	`persoonId` int unsigned NOT NULL,
	`ageGroup` varchar(255) NOT NULL,
	CONSTRAINT `lid_persoonId` PRIMARY KEY(`persoonId`)
);
--> statement-breakpoint
CREATE TABLE `lid_kamp` (
	`lidId` int unsigned NOT NULL,
	`kampId` int unsigned NOT NULL,
	CONSTRAINT `lid_kamp_lidId_kampId_pk` PRIMARY KEY(`lidId`,`kampId`)
);
--> statement-breakpoint
CREATE TABLE `persoon` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`voornaam` varchar(255) NOT NULL,
	`achternaam` varchar(255) NOT NULL,
	`geboorteDatum` date NOT NULL,
	`telefoon` varchar(50),
	`email` varchar(255) NOT NULL,
	CONSTRAINT `persoon_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `kampen` ADD `beschrijving` text NOT NULL;--> statement-breakpoint
ALTER TABLE `leiding` ADD CONSTRAINT `leiding_persoonId_persoon_id_fk` FOREIGN KEY (`persoonId`) REFERENCES `persoon`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leiding_kamp` ADD CONSTRAINT `leiding_kamp_leidingId_leiding_persoonId_fk` FOREIGN KEY (`leidingId`) REFERENCES `leiding`(`persoonId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `leiding_kamp` ADD CONSTRAINT `leiding_kamp_kampId_kampen_id_fk` FOREIGN KEY (`kampId`) REFERENCES `kampen`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lid` ADD CONSTRAINT `lid_persoonId_persoon_id_fk` FOREIGN KEY (`persoonId`) REFERENCES `persoon`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lid_kamp` ADD CONSTRAINT `lid_kamp_lidId_lid_persoonId_fk` FOREIGN KEY (`lidId`) REFERENCES `lid`(`persoonId`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lid_kamp` ADD CONSTRAINT `lid_kamp_kampId_kampen_id_fk` FOREIGN KEY (`kampId`) REFERENCES `kampen`(`id`) ON DELETE cascade ON UPDATE no action;
