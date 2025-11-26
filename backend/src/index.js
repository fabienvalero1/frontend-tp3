import express from "express";
import cors from "cors";
import { getUsers, getUserById } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = Math.max(parseInt(req.query.offset) || 0, 0);
    const { rows, total } = getUsers(limit, offset);
    res.json({ data: rows, total });
});

app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const user = getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ data: user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
});
