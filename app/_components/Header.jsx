"use client";

import { CircleCheckBigIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle, Select } from "@headlessui/react";
import { useState } from "react";

export default function Header({ onTaskAdd, searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.desc.value;
    const priority = event.target.priority.value;
    const isCompleted = false;

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      isCompleted,
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    existingTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    onTaskAdd(newTask);
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky inset-x-0 top-0">
        <div className="flex items-center justify-between gap-8">
          <nav>
            <Link
              href="/"
              className="flex items-center lg:gap-4 gap-2 lg:text-xl text-base font-bold"
            >
              <CircleCheckBigIcon size={28} className="stroke-green-500" />
            </Link>
          </nav>
          <form className="flex flex-1 items-center gap-2 lg:w-96 w-fit border-1 border-b">
            <SearchIcon className="flex-shrink-0" size={20} />
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full ring-0 border-0 placeholder-white focus:outline-0 focus:ring-0"
              placeholder="Search Tasks"
            />
          </form>
          <div className="flex items-center lg:gap-10 gap-6">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 lg:px-8 px-4 py-2 ring-1 ring-white font-bold bg-indigo-950 hover:bg-white hover:text-black transition-all duration-300 ease-in-out lg:text-base text-sm"
            >
              <span>
                <PlusIcon size={20} />
              </span>
              <span className="lg:block hidde">Add Task</span>
            </button>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/60">
                <DialogPanel
                  transition
                  className="min-w-7xl lg:w-[30%] space-y-4 border bg-[#171717] p-4"
                >
                  <DialogTitle className="font-bold text-lg flex items-center gap-2">
                    <CircleCheckBigIcon size={20} className="text-green-500" />
                    Task Management
                  </DialogTitle>
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className="space-y-6 py-4"
                  >
                    <div className="border-1 border-b ring-white mb-2">
                      <label htmlFor="title" className="font-bold">
                        Task Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="bg-transparent w-full ring-0 border-0 placeholder-white focus:outline-0 focus:ring-0 px-0 py-1 text-sm"
                      />
                    </div>
                    <div className="border-1 border-b ring-white mb-2">
                      <label htmlFor="desc" className="font-bold">
                        Task Description
                      </label>
                      <textarea
                        name="desc"
                        className="bg-transparent w-full ring-0 border-0 placeholder-white focus:outline-0 focus:ring-0 px-0 py-1 text-sm"
                      />
                    </div>
                    <div className="pb-4">
                      <label htmlFor="priority" className="font-bold">
                        Task Priority
                      </label>
                      <Select
                        name="priority"
                        aria-label="Project status"
                        className="w-full bg-transparent ring-white focus:ring-white focus:outline-0 mt-4 rounded-none"
                      >
                        <option
                          className="bg-black focus:bg-white"
                          value="high"
                        >
                          High Priority
                        </option>
                        <option className="bg-black focus:bg-white" value="mid">
                          Mid Priority
                        </option>
                        <option className="bg-black focus:bg-white" value="low">
                          Low Priority
                        </option>
                      </Select>
                    </div>
                    <button
                      type="submit"
                      className="block w-full ring-1 ring-white py-2 hover:bg-white hover:text-[#171717] transition duration-300 ease-in-out"
                    >
                      Save
                    </button>
                  </form>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </div>
      </header>
    </>
  );
}
