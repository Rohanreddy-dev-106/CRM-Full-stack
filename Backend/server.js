import server from "./index.js";
const PORT = Number(process.env.PORT) || 5000;

try {
    server.listen(PORT, () => {
        console.log(`Server is Up and Running at PORT ${PORT}`);
    });
} catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
}