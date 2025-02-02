// Imports
import express, { response } from "express";
import cors from "cors";
import db from "./database.js";

// ========== Setup ========== //

// Create Express app
const server = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
server.use(express.json()); // to parse JSON bodies
server.use(cors()); // Enable CORS for all routes

// ========== Routes ========== //

// Root route
server.get("/", async (req, res) => {
    // Check database connection
    const result = await db.ping();

    if (result) {
        res.send("Node.js REST API with Express.js - connected to database ✨");
    } else {
        res.status(500).send("Error connecting to database");
    }
});

// Start server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//7. Læs alle brugere (SELECT)

server.get("/users", async (req, res) => {
    // Get all users from database
    const query = "SELECT * FROM users"; // SQL query
    const [users] = await db.execute(query) // Execute query
    res.json(users); // Send result as JSON

});

//8. Læs én bruger (SELECT & WHERE)

server.get("/users/:id", async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const query = "SELECT * FROM users WHERE id = ?" // SQL query
    const values = [id]; // Values to pass into query
    const [users] = await db.query(query, values); // Execute query
    console.log(users); // Print result to console
    res.json(users[0]); // Send result as JSON
});

//9. Opret en bruger (INSERT INTO)

server.post("/users", async (req, res) => {
    const user = req.body; // Get user data from request body
    const query = "INSERT INTO users (name, mail, title, image) VALUES (?, ?, ?, ?);" // SQL query
    const values = [user.name, user.mail, user.title, user.image]; // Values to insert into query
    const [result] = await db.execute(query, values); // Execute query
    console.log(result); // Print respone to console
    res.json(result); // Send response as JSON    response.json(result); er det samme som res.json(result);


});

//10. Opdater en bruger (UPDATE)

server.put("/users", async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const user = req.body; // Get user data from request body
    console.log(user); // Print user data to console
    const query = "UPDATE users SET name = ?, mail = ?, title = ?, image = ? WHERE id =?"; // SQL query
    const values = [user.name, user.mail, user.title, user.image, id]; // Values to pass into query
    const [result] = await db.query(query, values); // Execute query
    console.log(result); // Print respone to console
    res.json(result); // Send result as JSON


});

//11. Slet en bruger (DELETE)

server.put("/users", async (req, res) => {
    const id = req.params.id; // Get id from URL params
    const query = "DELETE FROM users WHERE id =?"; // SQL query
    const values = [id]; // Values to pass into query
    const [result] = await db.query(query, values); // Execute query
    res.json(result); // Send result as JSON


});

