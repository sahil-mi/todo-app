import React from "react";

interface TaskTitleBoxProps {
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    taskGroupIndex: number
  ) => void;
  taskGroupIndex: number;
}

const TaskTitleBox: React.FC<TaskTitleBoxProps> = (props) => {
  const { value, handleChange, taskGroupIndex } = props;
  return (
    <div className="border-b border-b-[#3d3839] ">
      <input
        className="w-100 focus:outline-0 text-xl"
        type="text"
        value={value}
        onChange={(e) => handleChange(e, taskGroupIndex)}
      />
    </div>
  );
};

export default TaskTitleBox;
