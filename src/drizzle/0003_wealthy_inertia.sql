ALTER TABLE `favorites` MODIFY COLUMN `meal_type` enum('breakfast','lunch','dinner','');--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;