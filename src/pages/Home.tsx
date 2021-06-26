import React, { useState } from "react";
import { Alert } from "react-native";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return;

    const formattedTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    } as Task;

    setTasks((oldTaks) => [...oldTaks, formattedTask]);
  }

  function handleMarkTaskAsDone(id: number) {
    const formmatedTasks = tasks.map((task: Task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      } else {
        return task;
      }
    });

    setTasks(formmatedTasks);
  }

  function handleRemoveTask(id: number) {
    const filtredTaks = tasks.filter((task: Task) => task.id !== id);
    setTasks(filtredTaks);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
