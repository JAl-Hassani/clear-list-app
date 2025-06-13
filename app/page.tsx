"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, MoreVertical, CheckCircle2, Circle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
// 1. Remove the ThemeToggle import:
// Remove: import { ThemeToggle } from "@/components/theme-toggle"

interface Task {
  id: string
  text: string
  completed: boolean
  priority: "high" | "low" | "none"
  createdAt: number
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("clearlist-tasks")
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (e) {
        console.error("Failed to parse saved tasks", e)
      }
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("clearlist-tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() === "") return

    const newTaskObj: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      priority: "none",
      createdAt: Date.now(),
    }

    setTasks([...tasks, newTaskObj])
    setNewTask("")
  }

  const toggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  }

  const startEditing = (task: Task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = () => {
    if (editText.trim() === "") return

    setTasks(tasks.map((task) => (task.id === editingId ? { ...task, text: editText } : task)))
    setEditingId(null)
  }

  const cyclePriority = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const priorities: Array<"high" | "low" | "none"> = ["none", "high", "low"]
          const currentIndex = priorities.indexOf(task.priority)
          const nextPriority = priorities[(currentIndex + 1) % priorities.length]
          return { ...task, priority: nextPriority }
        }
        return task
      }),
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveEdit()
    } else if (e.key === "Escape") {
      setEditingId(null)
    }
  }

  return (
    // 3. Remove all dark mode classes from the main container:
    // Change: className="min-h-screen bg-gray-50 dark:bg-gray-900"
    // To: className="min-h-screen bg-gray-50"
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-4">
        {/* 2. Update the header section to remove the theme toggle and center the title properly: */}
        {/* Replace the header section with: */}
        {/* \`\`\`tsx */}
        {/* <header className="mb-8 text-center"> */}
        {/*  <h1 className="text-3xl font-bold text-red-500 mt-8">ClearList</h1> */}
        {/*  <p className="text-gray-500 mt-2">Simple, focused task management</p> */}
        {/* </header> */}
        {/* \`\`\` */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-500 mt-8">ClearList</h1>
          <p className="text-gray-500 mt-2">Simple, focused task management</p>
        </header>

        {/* 4. Remove dark mode classes from the input card: */}
        {/* Change: className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6" */}
        {/* To: className="bg-white rounded-xl shadow-md p-4 mb-6" */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              aria-label="New task input"
            />
            <Button
              onClick={addTask}
              size="icon"
              className="bg-red-500 hover:bg-red-600 text-white rounded-full"
              aria-label="Add task"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 5. Remove dark mode classes from the tasks container: */}
        {/* Change: className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden" */}
        {/* To: className="bg-white rounded-xl shadow-md overflow-hidden" */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <h2 className="text-lg font-medium p-4 border-b">My Tasks</h2>

          {/* 6. Remove dark mode classes from the empty state text: */}
          {/* Change: className="p-8 text-center text-gray-500 dark:text-gray-400" */}
          {/* To: className="p-8 text-center text-gray-500" */}
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No tasks yet. Add one to get started!</div>
          ) : (
            <ul className="divide-y">
              {tasks.map((task) => (
                // 7. Remove dark mode classes from task hover states:
                // Change: className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                // To: className="p-4 hover:bg-gray-50 transition-colors"
                <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="flex-shrink-0"
                      aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </button>

                    {editingId === task.id ? (
                      <Input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleEditKeyDown}
                        onBlur={saveEdit}
                        autoFocus
                        className="flex-1"
                      />
                    ) : (
                      <span
                        className={cn("flex-1 cursor-pointer", task.completed && "line-through text-gray-400")}
                        onClick={() => startEditing(task)}
                      >
                        {task.text}
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {task.priority !== "none" && (
                        <Badge
                          className={cn(
                            task.priority === "high"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100",
                          )}
                          onClick={() => cyclePriority(task.id)}
                        >
                          {task.priority}
                        </Badge>
                      )}

                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => cyclePriority(task.id)}
                          className="h-8 w-8 text-gray-500"
                          aria-label="Change priority"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          className="h-8 w-8 text-gray-500 hover:text-red-500"
                          aria-label="Delete task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 8. Remove dark mode classes from the footer: */}
        {/* Change: className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400" */}
        {/* To: className="mt-8 text-center text-sm text-gray-500" */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>ClearList v1.0 • Your tasks are saved locally</p>
        </footer>
      </div>
    </main>
  )
}
