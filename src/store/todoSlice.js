// store/todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ideas: [],
  inProgress: [],
  review: [],
  complete: [],
  selectedTask: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
  addTask: (state, action) => {
  state.ideas.push({
    ...action.payload,
    status: "ideas", // ✅ ADD THIS HERE
  });
},

moveTask: (state, action) => {
  const { to, task } = action.payload;

  // remove from all columns
  ["ideas", "inProgress", "review", "complete"].forEach((col) => {
    state[col] = state[col].filter((t) => t.id !== task.id);
  });

  // ✅ update status
  const updatedTask = { ...task, status: to };

  // add to new column
  state[to].push(updatedTask);

  // ✅ update selected task (important for UI)
  state.selectedTask = updatedTask;
},

updateTask: (state, action) => {
  const updated = action.payload;

  ["ideas", "inProgress", "review", "complete"].forEach((col) => {
    state[col] = state[col].map((t) =>
      t.id === updated.id ? updated : t
    );
  });

  // update selected task if open
  if (state.selectedTask?.id === updated.id) {
    state.selectedTask = updated;
  }
},

deleteTask: (state, action) => {
  const id = action.payload;

  ["ideas", "inProgress", "review", "complete"].forEach((col) => {
    state[col] = state[col].filter((t) => t.id !== id);
  });

  // close panel if deleted task was open
  if (state.selectedTask?.id === id) {
    state.selectedTask = null;
  }
},

      setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
  },
});

export const {
  addTask,
  moveTask,
  setSelectedTask,
  clearSelectedTask,
  updateTask, 
  deleteTask,
} = todoSlice.actions;

export default todoSlice.reducer;