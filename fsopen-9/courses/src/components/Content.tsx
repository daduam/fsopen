import React from "react";
import Part from "./Part";
import { CoursePart } from "../types";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, idx) => (
        <div key={idx}>
          <Part part={part} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Content;