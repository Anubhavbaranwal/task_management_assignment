
import dotenv from "dotenv";
import connectDB from "./db/index";
import { app } from "./app";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    // Handle errors for the app
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw error;
    });

    // Start the server
    app.listen(process.env.PORT || 8000, () => {
      console.log("MongoDB connected to " + (process.env.PORT || 8000));
    });
  })
  .catch((err: Error) => {
    console.log("MongoDB Connection failed ", err);
  });