import React from "react";

interface AddNewTaskItemProps {
  taskGroupIndex: number;
  handleClick: (taskGroupIndex: number) => void;
}

const AddNewTaskItem: React.FC<AddNewTaskItemProps> = ({
  handleClick,
  taskGroupIndex,
}) => {
  return (
    <div>
      <button
        className="text-[#a8c7fa] font-semibold cursor-pointer"
        onClick={() => handleClick(taskGroupIndex)}
      >
        <span className="text-white text-lg">+</span> Add new
      </button>
    </div>
  );
};

export default AddNewTaskItem;
