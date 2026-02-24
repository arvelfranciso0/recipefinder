CREATE TABLE `access_token` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` text NOT NULL,
	`token_type` enum('USER','ADMIN','MODERATOR') NOT NULL,
	`name` varchar(50),
	`tokenable_id` int NOT NULL,
	`expires_at` timestamp NOT NULL,
	`last_used_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `access_token_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`meal_id` int NOT NULL,
	`meal_name` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meals` (
	`idMeal` int NOT NULL,
	`strMeal` varchar(255) NOT NULL,
	`strCategory` varchar(100),
	`strArea` varchar(100),
	`strInstructions` text,
	`strMealThumb` text,
	`strTags` text,
	`strYoutube` text,
	`strSource` text,
	`strMealAlternate` text,
	`strIngredient1` varchar(100),
	`strIngredient2` varchar(100),
	`strIngredient3` varchar(100),
	`strIngredient4` varchar(100),
	`strIngredient5` varchar(100),
	`strIngredient6` varchar(100),
	`strIngredient7` varchar(100),
	`strIngredient8` varchar(100),
	`strIngredient9` varchar(100),
	`strIngredient10` varchar(100),
	`strIngredient11` varchar(100),
	`strIngredient12` varchar(100),
	`strIngredient13` varchar(100),
	`strIngredient14` varchar(100),
	`strIngredient15` varchar(100),
	`strIngredient16` varchar(100),
	`strIngredient17` varchar(100),
	`strIngredient18` varchar(100),
	`strIngredient19` varchar(100),
	`strIngredient20` varchar(100),
	`strMeasure1` varchar(255),
	`strMeasure2` varchar(255),
	`strMeasure3` varchar(255),
	`strMeasure4` varchar(255),
	`strMeasure5` varchar(255),
	`strMeasure6` varchar(255),
	`strMeasure7` varchar(255),
	`strMeasure8` varchar(255),
	`strMeasure9` varchar(255),
	`strMeasure10` varchar(255),
	`strMeasure11` varchar(255),
	`strMeasure12` varchar(255),
	`strMeasure13` varchar(255),
	`strMeasure14` varchar(255),
	`strMeasure15` varchar(255),
	`strMeasure16` varchar(255),
	`strMeasure17` varchar(255),
	`strMeasure18` varchar(255),
	`strMeasure19` varchar(255),
	`strMeasure20` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `meals_idMeal` PRIMARY KEY(`idMeal`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`theme` enum('DARK','LIGHT','SYSTEM') NOT NULL DEFAULT 'LIGHT',
	`dietary_preferences` varchar(100),
	`measurement_unit` varchar(10),
	`notification` varchar(10),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `settings_user_id_unique` UNIQUE(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `user_verifications` (
	`id` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`user_id` int NOT NULL,
	`hash_verification_code` text NOT NULL,
	`salt` text NOT NULL,
	`verification_expires_at` timestamp,
	`last_used_at` timestamp,
	`type` enum('EMAIL','FORGOT_PASSWORD') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`reset_code_time` timestamp,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `user_verifications_id_unique` UNIQUE(`id`)
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
	`is_email_verified` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp DEFAULT null,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `access_token` ADD CONSTRAINT `access_token_tokenable_id_users_id_fk` FOREIGN KEY (`tokenable_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_meal_id_meals_idMeal_fk` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`idMeal`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `settings` ADD CONSTRAINT `settings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_verifications` ADD CONSTRAINT `user_verifications_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;