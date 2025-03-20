"use client";
import React, { useState } from "react";
import TaskTitleBox from "./TaskTitleBox";
import TaskItem from "./TaskItem";
import AddNewTaskItem from "./AddNewTaskItem";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import SideNavbar from "./SideNavbar";

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
    {
      title: "Task Group 4",
      items: [
        { description: "Task 1", isDone: false },
        { description: "Task 2", isDone: false },
        { description: "Task 3", isDone: false },
      ],
      isStarred: false,
    },
    {
      title: "Task Group 5",
      items: [
        { description: "Task 1", isDone: false },
        { description: "Task 2", isDone: false },
        { description: "Task 3", isDone: false },
      ],
      isStarred: false,
    },
  ];

  const [tasks, setTasks] = useState([]);

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
  //Delete task group
  const handleDeleteTaskGroup = (taskGroupIndex: number) => {
    if (confirm("Are you sure you want to delete this task group?")) {
      const newTasks = [...tasks];
      newTasks.splice(taskGroupIndex, 1);
      setTasks(newTasks);
    }
  };

  const handleRemoveTaskItem = (
    taskGroupIndex: number,
    taskItemIndex: number
  ) => {
    const newTasks = [...tasks];
    const value = newTasks[taskGroupIndex].items[taskItemIndex].description;
    if (value) {
      if (confirm("Are you sure you want to delete this task?")) {
        newTasks[taskGroupIndex].items.splice(taskItemIndex, 1);
      }
    } else {
      newTasks[taskGroupIndex].items.splice(taskItemIndex, 1);
    }
    setTasks(newTasks);
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/todo", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data, "data");
      setTasks(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks, "~~~tasks");

  return (
    <>
      {/* navbar */}
      <SideNavbar />
      {/* other part */}
      <div className=" w-full flex justify-center mt-10 h-screen overflow-hidden">
        <div className="flex flex-col w-3/6 gap-5 h-screen overflow-scroll">
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
                  <div className="flex gap-2">
                    <StarButton
                      taskGroupIndex={taskGroupIndex}
                      isStarred={taskGroup.isStarred}
                      handleClick={handleStartStatusChange}
                    />
                    <DeleteButton
                      taskGroupIndex={taskGroupIndex}
                      handleClick={handleDeleteTaskGroup}
                    />
                  </div>
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
                            handleRemove={handleRemoveTaskItem}
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
    </>
  );
};

export default TaskCard;
