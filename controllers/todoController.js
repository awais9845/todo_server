import { Todo } from "../models/Todo.js";

// Create Todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "description is required",
      });
    }

    const todo = await Todo.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        completed,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete all todos

export const deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({});

    return res.status(200).json({
      message: "All todos deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete todos",
      error: error.message,
    });
  }
};
