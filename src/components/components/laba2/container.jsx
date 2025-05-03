import React from "react";


function Container({ children }) {
  return (
    <div style={{ border: "2px solid black", padding: "10px", margin: "10px" }}>

      {children}
    </div>
  );
}

export default Container;
