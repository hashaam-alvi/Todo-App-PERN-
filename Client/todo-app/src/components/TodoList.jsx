import TodoItem from "./TodoItem";

export default function TodoList({ todos, refresh, openEditModal }) {
  return (
    <ol className="TodoList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          refresh={refresh}
          openEditModal={openEditModal}
        />
      ))}
    </ol>
  );
}
