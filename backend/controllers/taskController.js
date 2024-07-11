import Task from "../models/taskSchema.js";

export const createTask = async (req,res) => {
    const { title, description } = req.body;

    const createdBy = req.user._id;

    if(!title || !description){
        return res.status(400).json({
            success: false,
            message: 'Please provide both title and description',
        })
    }

    const task = await Task.create({ title, description, createdBy});

    res.status(200).json({
        success: true,
        message: 'New task created successfully'
    });
};

export const getMyTasks = async (req,res) => {
    const tasks = await Task.find({ createdBy: req.user._id });

    if(!tasks || tasks.length === 0){
        return res.status(404).json({
            success: false,
            message: 'You have no tasks'
        })
    }

    res.status(200).json({
        success: true,
        tasks,
    });
};

export const deleteTask = async (req,res) => {
    const id = req.params.id;
    const toDeleteTask = await Task.findByIdAndDelete(id);
    if(!toDeleteTask){
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
    });
};

export const updateTask = async (req,res) => {
    const id = req.params.id;

    try {
        const updateT = await Task.findByIdAndUpdate(id, {$set:req.body}, {new: true});

        res.status(200).json({success:true, message:'Successfully updated', data:updateT});
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update'});
    }
}