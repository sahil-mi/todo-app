"use client";
import React, { useState } from "react";
import TaskTitleBox from "./TaskTitleBox";
import TaskItem from "./TaskItem";
import AddNewTaskItem from "./AddNewTaskItem";
import StarButton from "./StarButton";

const TaskCard = () => {
  // Initial tasks data
  const tasksData = [
    {
      title: "Task Group 1",
      items: [
        { description: "Task 1", isDone: false },
        { description: "Task 2", isDone: false },
        { description: "Task 3", isDone: true },
      ],
      isStarred: false,
    },
    {
      title: "Task Group 2",
      items: [
        { description: "Task 1", isDone: true },
        { description: "Task 2", isDone: true },
        { description: "Task 3", isDone: false },
      ],
      isStarred: false,
    },
    {
      title: "Task Group 3",
      items: [
        { description: "Task 1", isDone: false },
        { description: "Task 2", isDone: false },
        { description: "Task 3", isDone: false },
      ],
      isStarred: false,
    },
  ];

  const [tasks, setTasks] = useState([...tasksData]);

  // handle task title change
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

  // handle task description update
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

  // handle task completion toggle
  const handleTaskCompletionToggle = (
    taskGroupIndex: number,
    taskItemIndex: number
  ) => {
    const newTasks = [...tasks];
    const value = newTasks[taskGroupIndex].items[taskItemIndex].isDone;
    newTasks[taskGroupIndex].items[taskItemIndex].isDone = !value;
    setTasks(newTasks);
  };

  // Add new task inside a group
  const addNewTaskItem = (taskGroupIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskGroupIndex].items.push({ description: "", isDone: false });
    setTasks(newTasks);
  };

  // change star status
  const handleStartStatusChange = (taskGroupIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskGroupIndex].isStarred = !newTasks[taskGroupIndex].isStarred;
    setTasks(newTasks);
  };

  console.log(tasks, "~~~tasks");

  return (
    <div className=" w-full flex justify-center mt-10">
      <div className="flex flex-col w-3/6 gap-5">
        {/* Render task groups */}
        {tasks.map((taskGroup, taskGroupIndex) => (
          <React.Fragment key={taskGroupIndex}>
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="bg-[#211d1e] rounded-xl p-5"
            >
              <div className="flex justify-between items-center p-1 ">
                <TaskTitleBox
                  value={taskGroup.title}
                  handleChange={handleTaskTitleChange}
                  taskGroupIndex={taskGroupIndex}
                />
                <StarButton
                  taskGroupIndex={taskGroupIndex}
                  isStarred={taskGroup.isStarred}
                  handleChange={handleStartStatusChange}
                />
              </div>
              <ul>
                {/* Render tasks inside the group */}
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
              {/* Add new task inside a group btn */}
              <div className="flex items-center p-1">
                <AddNewTaskItem
                  taskGroupIndex={taskGroupIndex}
                  handleClick={addNewTaskItem}
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
