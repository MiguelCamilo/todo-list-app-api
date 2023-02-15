import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { getAllTasks, addTask, updateTask, deleteTask } from "./src/taskRequest.js"

const app = express()
app.use(cors())
app.use(express.json())

app.post('/tasks', addTask)

app.get('/tasks', getAllTasks)

app.patch('/tasks/:taskId', updateTask)

app.delete('/tasks/:taskId', deleteTask)


export const api = functions.https.onRequest(app)