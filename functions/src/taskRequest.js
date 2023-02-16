import dbConnect from "./dbConnect.js"
import { FieldValue } from "firebase-admin/firestore"

export   function getAllTasks(req, res) {
    const db =  dbConnect()
    // sortBy using FieldValue
    db.collection('tasks').orderBy('createdAt', 'desc').get()
        .then(collection => {
            const tasks = collection.docs.map(doc => ({taskId: doc.id, ...doc.data() }))
            res.send(tasks)
        })
        .catch(err => res.status(500).json({ error: err.message}))
}

export  function addTask (req, res) {
    const { tasks } = req.body
    const newTask = {tasks, createdAt: FieldValue.serverTimestamp()}
    const db =  dbConnect() 
    db.collection('tasks').add(newTask)

    // here we are sending the newTask back to getAllTasks and it will send back the new task and all other tasks
    .then(() => getAllTasks(req, res))
    .catch(err => res.status(500).send({ error: err.message }))
}

export  function deleteTask(req, res) {
    const { taskId } = req.params
    const db =  dbConnect()

    db.collection('tasks').doc(taskId).delete()
        .then(() => getAllTasks(req, res))
        .catch(err => res.status(500).send({ error: err.message }))
}


export  function updateTask(req, res) {
    const { done } = req.body
    const { taskId } = req.params

    const db =  dbConnect()
    db.collection('tasks').doc(taskId).update({ done })
        // here we are sending the updatedTasks back to getAllTasks and it will send back the update task and all other tasks
        .then(() => getAllTasks(req, res))
        .catch(err => res.status(500).send({ error: err.message }))
}


