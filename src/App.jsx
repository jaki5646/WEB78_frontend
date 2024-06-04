import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosAdd } from "react-icons/io";
import "./App.scss";
import Movie from "./components/Movie";
import Slider from "react-slick";
import axios from "axios";
import { PuffLoader } from "react-spinners";

function App() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const instance = axios.create({
    baseURL: "http://localhost:8080/",
  });

  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [isShown, setShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInfo = () => {
    console.log("hi");
  };

  const handleShow = () => {
    setShown(!isShown);
    !isShown &&
      setTimeout(() => {
        ref.current.focus();
      }, 1);
  };

  useEffect(() => {
    setLoading(true);
    instance.get("/item/get/all").then((e) => setData(e.data.data.data));
    setLoading(false);
    console.log(data);
  }, []);

  const Search = (input) => {
    setLoading(true);
    instance
      .get("item/get/film/" + input)
      .then((e) => setData(e.data.data.data));
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="header">
          <button className="nav-icon">
            <FaBars />
          </button>
          {isShown ? (
            <div className="middle-header input-header">
              <input
                ref={ref}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tên bộ phim"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    Search(input);
                  }
                }}
              />
            </div>
          ) : (
            <div className="logo middle-header">
              <p>Movie</p>
              <p className="special-logo">UI</p>
            </div>
          )}
          <button className="nav-icon" onClick={handleShow}>
            {isShown ? (
              <IoIosAdd style={{ transform: "rotate(45deg)" }} />
            ) : (
              <HiMagnifyingGlass />
            )}
          </button>
        </div>
        <div className="body">
          <h2 className="info">Most popular movies</h2>
          <div className="items">
            {loading ? (
              <PuffLoader
                color="orange"
                size={100}
                speedMultiplier={2}
                className="span-loader"
              />
            ) : data[0] ? (
              <Slider {...settings}>
                {data.map((e, i) => (
                  <Movie onClick={handleInfo} props={e} key={i} />
                ))}
              </Slider>
            ) : (
              <p>"Không có gì để xem"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
