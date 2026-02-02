CREATE TABLE `access_token` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(100) NOT NULL,
	`token_type` enum('USER','ADMIN','MODERATOR') NOT NULL,
	`name` varchar(50),
	`tokenable_id` int NOT NULL,
	`expires_at` timestamp NOT NULL,
	`last_used_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `access_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `access_token_token_unique` UNIQUE(`token`),
	CONSTRAINT `access_token_tokenable_id_unique` UNIQUE(`tokenable_id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`meal_id` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`theme` enum('DARK','LIGHT') NOT NULL DEFAULT 'LIGHT',
	`dietary_preferences` varchar(100),
	`measurement_unit` varchar(10),
	`notification` varchar(10),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `user_verifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(100) NOT NULL,
	`hash_verification_code` varchar(100) NOT NULL,
	`verification_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`verification_expires_at` timestamp,
	`type` varchar(255) NOT NULL DEFAULT 'email',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_verifications_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_verifications_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(100) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`role` enum('USER','ADMIN','MODERATOR') NOT NULL,
	`birthdate` varchar(255),
	`salt` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `access_token` ADD CONSTRAINT `access_token_tokenable_id_users_id_fk` FOREIGN KEY (`tokenable_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `settings` ADD CONSTRAINT `settings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;