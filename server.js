import app from "./src/app.js";          // 👈 note the .js extension
import connectDB from "./src/db/db.js";  // 👈 same here

connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});