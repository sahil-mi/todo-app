"use client";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
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
      _id: null,
      title: "Task Group",
      items: [{ _id: null, description: " ", isDone: false }],
      isStarred: false,
    },
  ];

  const [tasks, setTasks] = useState([...tasksData]);
  const [menuOption, setMenuOptions] = useState(0);

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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
    //call update api
    updateTask(taskGroupIndex);
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
    //call update api
    updateTask(taskGroupIndex);
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
    //call update api
    updateTask(taskGroupIndex);
  };

  // Add new task inside a group
  const addNewTaskItem = (taskGroupIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskGroupIndex].items.push({
      _id: null,
      description: "",
      isDone: false,
    });
    setTasks(newTasks);

    //call update api
    updateTask(taskGroupIndex);
  };

  // change star status
  const handleStartStatusChange = (taskGroupIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskGroupIndex].isStarred = !newTasks[taskGroupIndex].isStarred;
    setTasks(newTasks);

    //call update api
    updateTask(taskGroupIndex);
  };

  //Delete task group
  const handleDeleteTaskGroup = (taskGroupIndex: number) => {
    if (confirm("Are you sure you want to delete this task group?")) {
      const newTasks = [...tasks];
      newTasks.splice(taskGroupIndex, 1);
      setTasks(newTasks);

      //call delete api
      deleteTaskGroup(taskGroupIndex);
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

    //call update api
    updateTask(taskGroupIndex);
  };

  // add new group
  const addNewTaskGroup = async () => {
    const newTasks = [...tasks];
    const data = {
      _id: null,
      title: "Task Group",
      items: [{ _id: null, description: " ", isDone: false }],
      isStarred: false,
    };
    //call create api
    const todo = await createTask(data);
    if (todo) {
      newTasks.unshift(todo);
      setTasks(newTasks);
    }
  };

  //----------apis---------------
  const fetchTasks = async () => {
    const isStarred = menuOption === 1 ? "true" : null;
    let apiURL = "/api/todo";
    const queryParams = new URLSearchParams();

    if (isStarred) {
      queryParams.append("isStarred", isStarred);
    }
    if (search) {
      queryParams.append("search", search);
    }

    try {
      const res = await fetch((apiURL += `?${queryParams.toString()}`), {
        method: "GET",
      });
      const data = await res.json();
      console.log(data, "data");
      setTasks(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const createTask = async (payload: {
    _id: null;
    title: string;
    items: { _id: null; description: string; isDone: boolean }[];
    isStarred: boolean;
  }) => {
    try {
      const res = await fetch(`/api/todo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data.todo;
      console.log(data, "data");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateTask = useDebouncedCallback(async (taskGroupIndex: number) => {
    try {
      console.log(tasks[taskGroupIndex], "<====");

      const id = tasks[taskGroupIndex]._id;
      const res = await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks[taskGroupIndex]),
      });
      const data = await res.json();
      console.log(data, "data");
    } catch (error) {
      console.log(error, "error");
    }
  }, 300);

  const deleteTaskGroup = async (taskGroupIndex: number) => {
    try {
      const id = tasks[taskGroupIndex]._id;
      const res = await fetch(`/api/todo/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks[taskGroupIndex]),
      });

      const data = await res.json();
      console.log(data, "data");
    } catch (error) {
      console.log(error, "error");
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, [menuOption, search]);

  console.log(tasks, "~~~tasks");

  return (
    <>
      {/* navbar */}
      <SideNavbar
        menuOption={menuOption}
        setMenuOptions={setMenuOptions}
        addNewTaskGroup={addNewTaskGroup}
      />
      {/* other part */}
      <div className=" w-full flex justify-center mt-10 h-screen overflow-hidden">
        <div className="flex flex-col w-3/6 gap-5 h-screen overflow-scroll">
          {/* search */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 rounded-xl bg-[#211d1e] focus:outline-0 "
              onChange={handleSearch}
            />
          </div>
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
