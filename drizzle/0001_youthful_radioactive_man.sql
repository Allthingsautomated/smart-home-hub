CREATE TABLE `labor_rates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientType` enum('residential','commercial') NOT NULL,
	`hourlyRate` decimal(10,2) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `labor_rates_id` PRIMARY KEY(`id`),
	CONSTRAINT `labor_rates_clientType_unique` UNIQUE(`clientType`)
);
--> statement-breakpoint
CREATE TABLE `pricing_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`systemType` enum('caseta','ra3','homeworks') NOT NULL,
	`productType` enum('hub','dimmer','keypad','remote') NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pricing_products_id` PRIMARY KEY(`id`)
);
