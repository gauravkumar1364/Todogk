import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { Trash2, Edit } from "lucide-react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    try {
      const todostring = localStorage.getItem("todos");
      return todostring ? JSON.parse(todostring) : [];
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handlechange = (e) => setTodo(e.target.value);

  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
  };

  const handledelete = (id) => {
    setTodos(todos.filter((items) => items.id !== id));
  };

  const handledit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    if (!editTodo) return;
    setTodo(editTodo.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#121212] text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="mt-3 flex justify-center items-center">
        <div className="w-[95vw] flex flex-col py-9 gap-4 
          bg-white dark:bg-[#1E1E1E] 
          border border-gray-200 dark:border-[#2C2C2C] 
          rounded-2xl shadow-md dark:shadow-black/50 mb-4">
          
          {/* Heading */}
          <div className="flex flex-col justify-center items-center mb-2">
            <div className="font-semibold text-4xl text-gray-900 dark:text-white">
              Manage your Tasks
            </div>
            <div className="font-light text-gray-500 dark:text-gray-400 mt-0.5">
              Stay organized, stay productive.
            </div>
          </div>

          {/* Input + Button */}
          <div className="flex justify-center gap-3">
            <input
              onChange={handlechange}
              value={todo}
              onKeyDown={(e) => {
                if (e.key === "Enter" && todo.trim().length > 0) handleadd();
              }}
              className="w-[80vw] h-10 p-2 rounded border 
              bg-gray-100 dark:bg-[#2C2C2C] 
              text-gray-900 dark:text-gray-200 
              border-gray-300 dark:border-gray-600 
              placeholder-gray-400 focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Add tasks"
            />
            <button
              onClick={handleadd}
              disabled={todo.length < 1}
              className="px-4 py-0.5 font-medium rounded-lg cursor-pointer 
              bg-blue-600 text-white hover:bg-blue-700 
              disabled:bg-blue-200 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {/* Progress */}
          <h2 className="text-2xl font-semibold mt-2 mx-15">
            Your todos
          </h2>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between w-[90%] text-gray-700 dark:text-gray-300">
              <p className="font-sans font-light">Progress</p>
              <p>
                {todos.filter((t) => t.iscompleted).length}/{todos.length}
              </p>
            </div>
            <div className="w-[90%] bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className="bg-green-400 dark:bg-cyan-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (todos.filter((t) => t.iscompleted).length / todos.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Todo list */}
          <div>
            {todos.length === 0 && (
              <div className="flex justify-center text-gray-500 dark:text-gray-400">
                No Todos to display
              </div>
            )}
            {todos.map((item) => (
              <div
                key={item.id}
                className="group flex justify-between items-center mt-2 
                border rounded-md w-[86vw] py-2 px-4 mx-auto 
                border-gray-200 dark:border-gray-600 
                hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                {/* Left side */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.iscompleted}
                    onChange={() =>
                      setTodos(
                        todos.map((t) =>
                          t.id === item.id
                            ? { ...t, iscompleted: !t.iscompleted }
                            : t
                        )
                      )
                    }
                    className="w-4 h-4 cursor-pointer accent-blue-600"
                  />
                  <p
                    className={`${
                      item.iscompleted
                        ? "line-through text-gray-400"
                        : "text-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {item.todo}
                  </p>
                </div>

                {/* Right side */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handledelete(item.id)}
                    className="p-2 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-500/20"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>

                  <button
                    onClick={() => handledit(item.id)}
                    className="py-1.5 px-4 rounded-lg cursor-pointer text-yellow-500 
                    hover:bg-yellow-100 dark:hover:bg-yellow-500/20"
                  >
                    <Edit />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
