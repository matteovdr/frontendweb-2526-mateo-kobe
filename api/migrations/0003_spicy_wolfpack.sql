ALTER TABLE `persoon` ADD `password_hash` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `persoon` ADD CONSTRAINT `idx_persoon_email_unique` UNIQUE(`email`);