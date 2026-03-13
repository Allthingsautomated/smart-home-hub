CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`featuredImage` varchar(500),
	`author` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`published` enum('true','false') NOT NULL DEFAULT 'false',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`s3Key` varchar(500) NOT NULL,
	`s3Url` varchar(500) NOT NULL,
	`contentType` varchar(100) NOT NULL,
	`fileSize` int NOT NULL,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photos_id` PRIMARY KEY(`id`),
	CONSTRAINT `photos_s3Key_unique` UNIQUE(`s3Key`)
);
--> statement-breakpoint
CREATE TABLE `platform_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`platform` enum('instagram','x','youtube') NOT NULL,
	`isEnabled` enum('true','false') NOT NULL DEFAULT 'true',
	`autoPost` enum('true','false') NOT NULL DEFAULT 'false',
	`hashtagTemplate` text,
	`contentTemplate` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `platform_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `social_media_credentials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`platform` enum('instagram','x','youtube') NOT NULL,
	`accountHandle` varchar(255),
	`credentialData` text NOT NULL,
	`isActive` enum('true','false') NOT NULL DEFAULT 'true',
	`connectedAt` timestamp NOT NULL DEFAULT (now()),
	`lastTokenRefresh` timestamp,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `social_media_credentials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `social_post_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blogPostId` int NOT NULL,
	`platform` enum('instagram','x','youtube') NOT NULL,
	`postId` varchar(500),
	`content` text,
	`imageUrl` varchar(500),
	`status` enum('pending','posted','failed') NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`scheduledAt` timestamp,
	`postedAt` timestamp,
	`views` int DEFAULT 0,
	`engagement` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `social_post_history_id` PRIMARY KEY(`id`)
);
