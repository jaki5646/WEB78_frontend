import React from "react";

const Movie = ({ props, onClick }) => {
  const handleClick = () => {
    onClick();
  }
  return (
    <div className="movie">
      <img
        src={props.image}
        alt="Movie image"
        className="movie-img"
        onClick={handleClick}
      />
      <div className="description">
        <h2>{props.name}</h2>
        <div className="timer">
          <p>{props.time}</p>
          <p>min</p>
          <p>{props.year}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
