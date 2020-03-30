import React from "react";
import "./Home.css";

export default function Home(props) {
  console.log(props.isAuthenticated)
  return (
    <div className="Home">
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple music collab app</p>
      </div>
    </div>
  );
}