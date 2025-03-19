import React from "react";

interface TaskItemProps {
  description: string;
  isDone: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    taskGroupIndex: number,
    taskItemIndex: number
  ) => void;
  handleToggle: (taskGroupIndex: number, taskItemIndex: number) => void;
  taskGroupIndex: number;
  taskItemIndex: number;
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const {
    description,
    isDone,
    handleChange,
    handleToggle,
    taskGroupIndex,
    taskItemIndex,
  } = props;
  return (
    <div className="flex">
      <div>
        <input
          className="appearance-none h-[20px] w-[20px]   checked:bg-sky-700 border-2 border-bg-[#3d3839] rounded-2xl "
          type="checkbox"
          checked={isDone}
          onChange={() => handleToggle(taskGroupIndex, taskItemIndex)}
        />
      </div>
      <div className="pl-5 ">
        <input
          className="w-100 border-b border-b-[#3d3839] focus:outline-0 "
          type="text"
          value={description}
          onChange={(e) => handleChange(e, taskGroupIndex, taskItemIndex)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
