import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isStarred: { type: Boolean, default: false },
  items: [
    {
      description: { type: String, required: true },
      isDone: { type: Boolean, default: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
export default Todo;
