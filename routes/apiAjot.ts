
import express, { type Request, type Response, type Router } from 'express';
import { Virhe } from '../errors/virhekasittelija';
import { prisma } from '../lib/prisma';

const apiAjotRouter: Router = express.Router();

apiAjotRouter.use(express.json());


// GET: Haetaan kaikki ajot
apiAjotRouter.get("/", async (req: Request, res: Response) => {

    res.json(await prisma.ajo.findMany());

});


// GET: Haetaan yksittäinen ajo id:n perusteella
apiAjotRouter.get("/:id", async (req: Request, res: Response) => {

    const valinta = await prisma.ajo.count({
        where: { id: Number(req.params.id) }
    }) === 1;

    if (!valinta) {
        throw new Virhe(404, "Ajoa ei löytynyt");
    }

    res.json(await prisma.ajo.findUnique({
        where: {
            id: Number(req.params.id)
        }
    }));

});


// POST: Lisätään uusi ajo
apiAjotRouter.post("/", async (req: Request, res: Response) => {

    console.log("POST BODY:", req.body);

    const hyvaksyttyBody =
        typeof req.body.paivamaara === "string" &&
        !Number.isNaN(Date.parse(req.body.paivamaara)) &&
        req.body.lahtopaikka?.length > 0 &&
        req.body.maaranpaa?.length > 0 &&
        typeof req.body.kilometrit === "number" &&
        req.body.kilometrit >= 0;

    if (!hyvaksyttyBody) {
        throw new Virhe(400, "Virheellinen pyynnön body");
    }

    await prisma.ajo.create({
        data: {
            paivamaara: new Date(req.body.paivamaara),
            lahtopaikka: req.body.lahtopaikka,
            maaranpaa: req.body.maaranpaa,
            kilometrit: req.body.kilometrit
        }
    });

    res.json(await prisma.ajo.findMany());

});


// PUT: Muokataan olemassa olevaa ajoa
apiAjotRouter.put("/:id", async (req: Request, res: Response) => {

    const valinta = await prisma.ajo.count({
        where: { id: Number(req.params.id) }
    }) === 1;

    if (!valinta) {
        throw new Virhe(404, "Ajoa ei löytynyt");
    }

    const hyvaksyttyBody =
        typeof req.body.paivamaara === "string" &&
        !Number.isNaN(Date.parse(req.body.paivamaara)) &&
        req.body.lahtopaikka?.length > 0 &&
        req.body.maaranpaa?.length > 0 &&
        typeof req.body.kilometrit === "number" &&
        req.body.kilometrit >= 0;

    if (!hyvaksyttyBody) {
        throw new Virhe(400, "Virheellinen pyynnön body");
    }

    await prisma.ajo.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            paivamaara: new Date(req.body.paivamaara),
            lahtopaikka: req.body.lahtopaikka,
            maaranpaa: req.body.maaranpaa,
            kilometrit: req.body.kilometrit
        }
    });

    res.json(await prisma.ajo.findMany());

});


// DELETE: Poistetaan ajo id:n perusteella
apiAjotRouter.delete("/:id", async (req: Request, res: Response) => {

    const valinta = await prisma.ajo.count({
        where: { id: Number(req.params.id) }
    }) === 1;

    if (!valinta) {
        throw new Virhe(404, "Ajoa ei löytynyt");
    }

    await prisma.ajo.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.json(await prisma.ajo.findMany());

});

export default apiAjotRouter;
