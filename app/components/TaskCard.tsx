"use client";
import React, { useState } from "react";
import TaskTitleBox from "./TaskTitleBox";
import TaskItem from "./TaskItem";

const TaskCard = () => {
  const tasksData = [
    {
      title: "Task Group 1", // Represents the name of the task group
      items: [
        { description: "Task 1", isDone: false }, // Represents individual tasks with a description
        { description: "Task 2", isDone: false },
        { description: "Task 3", isDone: true },
      ],
    },
    {
      title: "Task Group 2",
      items: [
        { description: "Task 1", isDone: true },
        { description: "Task 2", isDone: true },
        { description: "Task 3", isDone: false },
      ],
    },
    {
      title: "Task Group 3",
      items: [
        { description: "Task 1", isDone: false },
        { description: "Task 2", isDone: false },
        { description: "Task 3", isDone: false },
      ],
    },
  ];

  const [tasks, setTasks] = useState([...tasksData]);

  const handleTaskTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskGroupIndex: number
  ) => {
    if (e) {
      const { value } = e.target;
      const newTasks = [...tasks];
      newTasks[taskGroupIndex].title = value;
      setTasks(newTasks);
    }
  };

  const handleTaskDescriptionUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskGroupIndex: number,
    taskItemIndex: number
  ) => {
    const { value } = e.target;
    const newTasks = [...tasks];
    newTasks[taskGroupIndex].items[taskItemIndex].description = value;
    setTasks(newTasks);
  };

  const handleTaskCompletionToggle = (
    taskGroupIndex: number,
    taskItemIndex: number
  ) => {
    const newTasks = [...tasks];
    const value = newTasks[taskGroupIndex].items[taskItemIndex].isDone;
    newTasks[taskGroupIndex].items[taskItemIndex].isDone = !value;
    setTasks(newTasks);
  };

  console.log(tasks, "~~~tasks");

  return (
    <div className=" w-full flex justify-center mt-10">
      <div className="flex flex-col w-3/6 gap-5">
        {tasks.map((taskGroup, taskGroupIndex) => (
          <React.Fragment key={taskGroupIndex}>
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="bg-[#211d1e] rounded-xl p-5"
            >
              <div className="flex items-center p-1 ">
                <TaskTitleBox
                  value={taskGroup.title}
                  handleChange={handleTaskTitleChange}
                  taskGroupIndex={taskGroupIndex}
                />
              </div>
              <ul>
                {taskGroup.items.map((taskItem, taskItemIndex) => (
                  <React.Fragment key={taskItemIndex}>
                    <li className="p-3">
                      <div>
                        <TaskItem
                          description={taskItem.description}
                          isDone={taskItem.isDone}
                          handleChange={handleTaskDescriptionUpdate}
                          handleToggle={handleTaskCompletionToggle}
                          taskGroupIndex={taskGroupIndex}
                          taskItemIndex={taskItemIndex}
                        />
                      </div>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
