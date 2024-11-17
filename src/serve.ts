import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import { route } from "./routes";


const app = express()
app.use(express.json())

app.use(route)

app.listen(3333)