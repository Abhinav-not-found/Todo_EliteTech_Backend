const express = require('express');
const router = express.Router();
const taskModel = require('../model/taskModel');

router.get('/', (req, res)=>{
    res.send('Hello world!');
})

//add task
router.post("/addTask",async(req, res)=>{
    const data = req.body
    try {
        const newTask = new taskModel(data)
        await newTask.save()
        return res.status(200).json(newTask);
    } catch (error) {
        return res.status(500).json(error);
    }
})

//get all tasks
router.get("/getTasks", async(req, res)=>{
    try {
        const items = await taskModel.find()
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json(error);
    }
})

//delete task
router.delete('/deleteTask/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const item = await taskModel.findByIdAndDelete(id)
        if(!item) return res.status(404).json({message: 'item not found in first list'});
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({message:'Server Side Error'})
    }
})

//edit task
router.put('/updateTask/:id',async(req,res)=>{
    const {id} = req.params
    const {task} = req.body
    try {
        const item = await taskModel.findByIdAndUpdate(id, {task}, {new: true})
        if(!item) return res.status(404).json({message: 'item not found'})
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({message:'Server Side Error'})
    }
})

module.exports = router