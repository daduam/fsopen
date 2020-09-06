import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  let data = null;

  switch (part.name) {
    case "Fundamentals":
      data = (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>{part.exerciseCount} exercies</p>
        </div>
      );
      break;

    case "Using props to pass data":
      data = (
        <div>
          <h3>{part.name}</h3>
          <p>{part.exerciseCount} exercies</p>
          <p>{part.groupProjectCount} group projects</p>
        </div>
      );
      break;

    case "Deeper type usage":
      data = (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>{part.exerciseCount} exercises</p>
          <p>view <a href={part.exerciseSubmissionLink}>submission</a></p>
        </div>
      );
      break;

    case "Typescript":
      data = (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>{part.exerciseCount} exercies</p>
          <p>comments: {part.comment}</p>
        </div>
      );
      break;

    default:
      return assertNever(part);
  }

  return data;
}

export default Part;