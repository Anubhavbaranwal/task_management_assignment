// task-management-backend/src/models/task.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    userId: mongoose.Types.ObjectId;
    createdAt: Date; 
    updatedAt: Date; 
}

const TaskSchema: Schema = new Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
        trim: true, 
    },
    description: { 
        type: String, 
        required: false, 
        trim: true, 
    },
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending' 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required'] 
    }
}, { 
    timestamps: true
});

// Create an index on userId for faster queries
TaskSchema.index({ userId: 1 });

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;