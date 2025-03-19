import React from "react";
import DisabledStarImage from "../../public/star-disabled-icon.png";
import EnabledStarImage from "../../public/star-active-icon.png";
import Image from "next/image";

const StarButton = () => {
  const [isStarred, setIsStarred] = React.useState(true);
  return (
    <div>
      <button onClick={() => setIsStarred(!isStarred)}>
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
