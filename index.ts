import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import path from 'path';
import apiAjotRouter from './routes/apiAjot';
import virhekasittelija, { Virhe } from './errors/virhekasittelija';

const app = express();
app.use(express.json());

app.use("/api/ajot", apiAjotRouter);

const port: number = Number(process.env.PORT) || 3005;

app.use(express.static(path.join(import.meta.dirname, "public")));


app.use((req: Request, res: Response, next: NextFunction) => {
    next(new Virhe(404, "Virheellinen reitti"))
});

app.use(virhekasittelija);

app.listen(port, () => {
    console.log(`Palvelin käynnistettiin osoitteeseen: http://localhost:${port}`);
});