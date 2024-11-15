"use client";

import {
  CheckCircle2Icon,
  ClipboardListIcon,
  EllipsisVerticalIcon,
  FlagTriangleRightIcon,
  Trash2Icon,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, useEffect } from "react";
import Header from "./Header";

export default function Overview() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

  const handleTaskAdd = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTasks(results);
  }, [searchQuery, tasks]);

  const handleSort = (option) => {
    setSortOption(option);

    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (option === "priority") {
        const priorityOrder = { high: 1, mid: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (option === "completion") {
        return a.isCompleted - b.isCompleted;
      }
      return 0;
    });

    setFilteredTasks(sortedTasks);
  };

  return (
    <>
      <Header
        onTaskAdd={handleTaskAdd}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="pt-6">
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="bg-transparent ring-white focus:ring-white focus:outline-0 mt-4 rounded-none"
        >
          <option className="bg-black focus:bg-white" value="default">
            Sort by
          </option>
          <option className="bg-black focus:bg-white" value="priority">
            Priority
          </option>
          <option className="bg-black focus:bg-white" value="completion">
            Completion Status
          </option>
        </select>
      </div>
      <section className="grid grid-cols-12 gap-6 py-8">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`lg:col-span-3 col-span-12 ring-1 ring-white p-4 space-y-4 ${
              task.priority === "high"
                ? "bg-purple-950"
                : task.priority === "mid"
                ? "bg-amber-950"
                : "bg-pink-950"
            }`}
          >
            <div className="flex items-center justify-between gap-6">
              <h3 className="text-xl font-bold">{task.title}</h3>
              <Menu>
                <MenuButton>
                  <EllipsisVerticalIcon size={20} />
                </MenuButton>
                <MenuItems
                  anchor="bottom"
                  className="bg-white text-black w-52 ring-1 ring-white divide-y-2 m-2"
                >
                  <MenuItem
                    className="w-full px-4 py-6 text-sm font-bold bg-green-900"
                    onClick={() => handleTaskCompletion(task.id)}
                  >
                    <button className="flex items-center gap-2 data-[focus]:bg-green-950 text-green-100">
                      <CheckCircle2Icon size={18} />
                      {task.isCompleted
                        ? "Mark as Incomplete"
                        : "Mark as Complete"}
                    </button>
                  </MenuItem>
                  <MenuItem
                    className="w-full px-4 py-6 text-sm font-bold bg-red-900"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <button className="flex items-center gap-2 data-[focus]:bg-red-950 text-red-100">
                      <Trash2Icon size={18} />
                      Delete Task
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <p className="text-white/80">{task.description}</p>
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col gap-0">
                <div className="flex items-center gap-4">
                  <ClipboardListIcon size={18} />
                  <h3
                    className={`${
                      task.isCompleted ? "text-green-500" : "text-white"
                    } font-bold`}
                  >
                    {task.isCompleted ? "Task Completed" : "Task Incomplete"}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <FlagTriangleRightIcon size={18} />
                  <h3
                    className={`text-${
                      task.priority === "high"
                        ? "purple"
                        : task.priority === "mid"
                        ? "amber"
                        : "pink"
                    }-500 font-bold drop-shadow-lg`}
                  >
                    <span className="uppercase">{task.priority}</span> Priority
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
