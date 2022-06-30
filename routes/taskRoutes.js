const express=require('express')
const router=express.Router();
const controller=require('../controllers/tasksControllers')

 
// create New Task
router.post('/newTask', controller.createTask)
// Retrieve all tasks
router.get('/fetchAllTasks', controller.fetchAllTasks)
// Update a particular Todo task
router.put('/updateTask/:id', controller.updateTask)
// Delete Todo task
router.delete('/deleteTask/:id', controller.deleteTask)


module.exports = router;