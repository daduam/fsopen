import React from "react";

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <header>
      <h1>{name}</h1>
    </header>
  )
};

export default Header;