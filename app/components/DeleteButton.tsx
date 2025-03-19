import React from "react";
import Image from "next/image";
import deleteBtnImage from "../../public/delete-icon.png";

interface DeleteButtonProps {
  taskGroupIndex: number;
  handleClick: (taskGroupIndex: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const { taskGroupIndex, handleClick } = props;
  return (
    <div>
      <button
        className="cursor-pointer"
        onClick={() => handleClick(taskGroupIndex)}
      >
        <Image width="20" height="20" src={deleteBtnImage} alt="delete btn" />
      </button>
    </div>
  );
};

export default DeleteButton;
