-- CreateTable
CREATE TABLE `Ajo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paivamaara` DATETIME(3) NOT NULL,
    `lahtopaikka` VARCHAR(191) NOT NULL,
    `maaranpaa` VARCHAR(191) NOT NULL,
    `kilometrit` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
