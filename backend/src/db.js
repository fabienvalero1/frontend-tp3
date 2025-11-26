import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "data.db");
const db = new Database(dbPath);

export function init() {
    db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL
    )
  `).run();

    const { c } = db.prepare("SELECT COUNT(*) as c FROM users").get();
    if (c === 0) {
        const roles = ["user", "admin", "editor"];
        const insert = db.prepare("INSERT INTO users (name, email, role) VALUES (?, ?, ?)");
        const insertMany = db.transaction((rows) => {
            for (const r of rows) insert.run(r.name, r.email, r.role);
        });

        const rows = Array.from({ length: 50 }, () => ({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            role: roles[Math.floor(Math.random() * roles.length)]
        }));

        console.log("🧪 BDD vide → génération de 50 utilisateurs aléatoires…");
        insertMany(rows);
        console.log("✅ Génération terminée !");
    }
}

export function getUsers(limit = 20, offset = 0) {
    const stmt = db.prepare("SELECT id, name, email, role FROM users ORDER BY id LIMIT ? OFFSET ?");
    const rows = stmt.all(limit, offset);
    const { c: total } = db.prepare("SELECT COUNT(*) as c FROM users").get();
    return { rows, total };
}

export function getUserById(id) {
    return db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(id);
}

init();
