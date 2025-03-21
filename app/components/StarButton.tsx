import React from "react";
import DisabledStarImage from "../../public/star-disabled-icon.png";
import EnabledStarImage from "../../public/star-active-icon.png";
import Image from "next/image";

interface StarButtonProps {
  taskGroupIndex: number;
  handleClick: (taskGroupIndex: number) => void;
  isStarred: boolean;
}

const StarButton: React.FC<StarButtonProps> = (props) => {
  const { isStarred, taskGroupIndex, handleClick } = props;
  return (
    <div>
      <button
        className="cursor-pointer"
        onClick={() => handleClick(taskGroupIndex)}
      >
        <Image
          width="20"
          height="20"
          src={isStarred ? EnabledStarImage : DisabledStarImage}
          alt={isStarred ? "Star Enabled" : "Star Disabled"}
        />
      </button>
    </div>
  );
};

export default StarButton;
