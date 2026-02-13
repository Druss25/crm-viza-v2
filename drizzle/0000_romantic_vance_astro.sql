CREATE TABLE `crm_account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `crm_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	CONSTRAINT `crm_session_id` PRIMARY KEY(`id`),
	CONSTRAINT `crm_session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `crm_user` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_user_id` PRIMARY KEY(`id`),
	CONSTRAINT `crm_user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `crm_verification` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_connects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contract_id` int NOT NULL,
	`full_address` varchar(100),
	`country` varchar(25) NOT NULL DEFAULT 'Казахстан',
	`city` varchar(25) NOT NULL DEFAULT 'Байконур',
	`street` varchar(25),
	`building` varchar(25),
	`flat` varchar(255),
	`tariff_id` int NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_connects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_contracts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`org_id` int NOT NULL,
	`reg_number` varchar(255) NOT NULL,
	`reg_date` timestamp(3) NOT NULL,
	`start_date` timestamp(3) NOT NULL,
	`end_date` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_contracts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_tariffs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` text,
	`price` decimal(10,2) NOT NULL DEFAULT '0.00',
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_tariffs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crm_org_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`org_id` int NOT NULL,
	`kpp` varchar(25),
	`ogrn` varchar(25),
	`phone` varchar(50),
	`email` varchar(255),
	`ur_address` varchar(255),
	`fact_address` varchar(255),
	`post_address` varchar(255),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_org_details_id` PRIMARY KEY(`id`),
	CONSTRAINT `crm_org_details_org_id_unique` UNIQUE(`org_id`)
);
--> statement-breakpoint
CREATE TABLE `crm_organizations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`full_name` varchar(255),
	`inn` varchar(25),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `crm_organizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `crm_account` ADD CONSTRAINT `crm_account_user_id_crm_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `crm_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `crm_session` ADD CONSTRAINT `crm_session_user_id_crm_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `crm_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `crm_connects` ADD CONSTRAINT `crm_connects_contract_id_crm_contracts_id_fk` FOREIGN KEY (`contract_id`) REFERENCES `crm_contracts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `crm_connects` ADD CONSTRAINT `crm_connects_tariff_id_crm_tariffs_id_fk` FOREIGN KEY (`tariff_id`) REFERENCES `crm_tariffs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `crm_contracts` ADD CONSTRAINT `crm_contracts_org_id_crm_organizations_id_fk` FOREIGN KEY (`org_id`) REFERENCES `crm_organizations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `crm_org_details` ADD CONSTRAINT `crm_org_details_org_id_crm_organizations_id_fk` FOREIGN KEY (`org_id`) REFERENCES `crm_organizations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `crm_account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `crm_session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `crm_verification` (`identifier`);--> statement-breakpoint
CREATE INDEX `connect_contractId_idx` ON `crm_connects` (`contract_id`);--> statement-breakpoint
CREATE INDEX `connect_tariffId_idx` ON `crm_connects` (`tariff_id`);--> statement-breakpoint
CREATE INDEX `contract_orgId_idx` ON `crm_contracts` (`org_id`);