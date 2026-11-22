import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "ajopaivakirja"
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.ajo.createMany({
        data: [
            {
                paivamaara: new Date("2026-11-10"),
                lahtopaikka: "Jyväskylä",
                maaranpaa: "Helsinki",
                kilometrit: 269
            },
            {
                paivamaara: new Date("2026-11-11"),
                lahtopaikka: "Jyväskylä",
                maaranpaa: "Tampere",
                kilometrit: 155
            },
            {
                paivamaara: new Date("2026-11-12"),
                lahtopaikka: "Helsinki",
                maaranpaa: "Turku",
                kilometrit: 168
            },
            {
                paivamaara: new Date("2026-11-13"),
                lahtopaikka: "Tampere",
                maaranpaa: "Oulu",
                kilometrit: 490
            },
            {
                paivamaara: new Date("2026-11-14"),
                lahtopaikka: "Jyväskylä",
                maaranpaa: "Kuopio",
                kilometrit: 146
            }
        ]
    });

    console.log("Viisi ajoa lisätty tietokantaan!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });