import React from "react";

const Total: React.FC<{ total: number }> = ( { total }) => {
  return (
    <p>Number of exercies {total}</p>
  );
};

export default Total;