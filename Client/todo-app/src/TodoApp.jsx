import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddFromPosts from "./components/AddFromPosts";
import AddNewTodo from "./components/AddNewTodo";
import "./components/style.css";
("use client");
import { AnimatePresence, motion } from "framer-motion";
import {BASE_URL} from "./components/config"
import axios from "axios";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const openAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchTodos = async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    const data = await res.json();

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="TodoAppContainer">
      <h1 className="title">
        <span>PERN</span> Todo's
      </h1>

      <TodoList
        todos={todos}
        refresh={fetchTodos}
        openEditModal={openEditModal}
      />

      <AddFromPosts openAddModal={openAddModal} refresh={fetchTodos} />

      <AnimatePresence initial={false}>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={closeModal}
          >
            <div
              className="modal-content"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeModal} className="closeModal">
                x
              </button>
              <AddNewTodo
                refresh={fetchTodos}
                closeModal={closeModal}
                existingTodo={editingTodo}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
