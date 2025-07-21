import express, {Application} from "express";
import userRoutes from "./routes/usuarioRoutes";
import { AppDataSource } from "./dataBase/dataSource";

const app: Application = express();

app.use(express.json());
app.use("./api", userRoutes)

AppDataSource.initialize()
.then(() => {
    const app: Application = express();
    app.use(express.json());

    app.use('/api', userRoutes);

    app.listen(3000, () => console.log('Server rodando na porta 3000'));
})
.catch((error) => console.log(error));