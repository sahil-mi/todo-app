import React from "react";
import DisabledStarImage from "../../public/star-disabled-icon.png";
import EnabledStarImage from "../../public/star-active-icon.png";
import Image from "next/image";

interface StarButtonProps {
  taskGroupIndex: number;
  handleChange: (taskGroupIndex: number) => void;
  isStarred: boolean;
}

const StarButton: React.FC<StarButtonProps> = (props) => {
  const { isStarred, taskGroupIndex, handleChange } = props;
  return (
    <div>
      <button onClick={() => handleChange(taskGroupIndex)}>
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
