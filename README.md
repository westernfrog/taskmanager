# Task Manager

This application is a simple task manager built using **Next.js** and **React**, providing users with functionality to add, search, delete, mark tasks as complete or incomplete, and sort tasks. This readme will guide you through understanding the application, setting it up, and the key design assumptions made during development.

## Table of Contents

1. [Features](#features)
2. [Setup and Launch](#setup-and-launch)
3. [Development Assumptions](#development-assumptions)
4. [Screenshots](#screenshots)

## Features

The Task Manager application offers the following functionalities:

- **Add Task**: Users can create new tasks with attributes such as title, description, priority, and completion status.
- **Search and Filter**: Users can search for tasks based on their title.
- **Task Completion**: Users can mark tasks as complete or incomplete.
- **Delete Task**: Unwanted tasks can be deleted.
- **Sort Tasks**: Users can sort tasks based on priority and completion status (implementation provided in the sorting functionality).

## Setup and Launch

Follow these steps to set up and run the project:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install Dependencies**:
   Install the required packages using npm or yarn.

   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the development server.

   ```bash
   npm run dev
   ```

4. **Access the Application**:
   The application will be available at `http://localhost:3000`.

5. **Saving Data**:
   Tasks are stored in `localStorage` so that they persist across page reloads, though they will be cleared when the user clears browser data.

## Development Assumptions

The following assumptions were made during the development of this task manager:

1. **Task Attributes**: Each task has a title, description, priority (high, medium, or low), and completion status.
2. **Local Storage**: All tasks are stored locally in the browser using `localStorage`. This makes it easy to retain tasks between sessions on the same device.
3. **No Backend**: Since this is a simple task manager application, no backend is required. All data is handled client-side.
4. **Sorting Criteria**: Tasks can be sorted based on priority (high to low) and completion status.

## Screenshots
![image](https://github.com/user-attachments/assets/25744ed1-92e2-41e3-8e9e-798787422909)

![image](https://github.com/user-attachments/assets/f8e1f2b5-8fd0-4b64-96a6-54b9c9ce4eb5)

