import express from "express";
import type { Request, Response, NextFunction } from "express";
import type { User } from "./models/user.js";
import { authMiddleware } from "./middleware/auth.js";
import { tokenMiddleware } from "./middleware/token.js";

const app = express();
const PORT = 3000;

app.use(express.json());

let users: User[] = [];

app.use(authMiddleware);
app.use(tokenMiddleware);

/* endpoints */

app.get("/users", (req: Request, res: Response) => {
    res.json(users);
});

app.post("/users", (req: Request, res: Response) => {
    const newUser: User = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        birthDate: req.body.birthDate
    };
    users.push(newUser);
    res.json(newUser);
});

app.put("/users/:email", (req: Request, res: Response) => {
    const email = req.params.email;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.name = req.body.name;
    user.password = req.body.password;
    user.birthDate = req.body.birthDate;

    res.json(user);
});

app.delete("/users/:email", (req: Request, res: Response) => {
    const email = req.params.email;
    users = users.filter(u => u.email !== email);
    res.json({ message: "Usuario eliminado" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});