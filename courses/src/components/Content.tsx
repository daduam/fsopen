import React from "react";

interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<CoursePart> = ({ name, exerciseCount }) => {
  return (
    <p>{name} {exerciseCount}</p>
  );
};

export default Content;