import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Server } from "http";
import config from "./config";
import app from "./app";

let server: Server;
// const port = 3000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database connected");

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {}
}

main();

// GIfR0l9F3zooXU4V

// mongodb+srv://wasiuahmed410:<password>@cluster0.mrjk4dd.mongodb.net/?retryWrites=true&w=majority
