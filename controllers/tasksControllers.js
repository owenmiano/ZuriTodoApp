const Task=require('../models/Task')

exports.example=(req,res)=>{
   res.send("Flight example")
    console.log("hiii world")
}
//Create new Task
exports.createTask= async(req,res)=>{
   const {title,description}=req.body
   if(!title || !description) return res.status(400).json({message:"Please fill all fields"})
   try {
      const newTasks= await Task.create({
          title:title,
          description:description
      })
      console.log(newTasks)

      res.status(201).json({message:`New task ${title} created!`})
   } catch (err) {
      res.status(500).json({'message':err.message})
   }
}

// Retrieve all Todo tasks
exports.fetchAllTasks=async(req,res)=>{
  try {
     const {page,perPage}=req.query;
     const options={
       page:parseInt(page,10) || 1,
       limit:parseInt(perPage,10) || 10
     } 
     const result=await Task.paginate({},options)
    return  res.status(200).json(result)
   //   return res.status(400).json({message:'No available tasks'})

  } catch (err) {
   res.status(500).json({'message':err.message})
  }
}

// Update a particular Todo task
exports.updateTask=async(req,res)=>{
   try {
      const found=await Task.findByIdAndUpdate(
         { _id: req.params.id },
         {$set :{title: req.body.title, description: req.body.description, timestamp:new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'})}},
      )
      if(found) return res.status(200).json({message:`Task of id: ${req.params.id} has been updated successfully`}) 
      return res.status(400).json({message:`Task of id: ${req.params.id} not found`})
   } catch (error) {
      res.status(500).json({'message':error})
   }
}

// Delete Todo task
exports.deleteTask=async(req,res)=>{
   try {
      const removedPost=await Task.findByIdAndDelete({_id:req.params.id})
      if(removedPost) {
         return res.status(200).json({message:`Task of id: ${req.params.id} has been deleted successfully`}) 
      }
      return res.status(400).json({message:`Task of id: ${req.params.id} not found`})
   } catch (error) {
      res.json({'message':error.message})
   }
}