import { useEffect, useState } from "react";
import "./Banner.css";
import useRequest from "../../hooks/useRequest";

const Banner = () => {
  // Tạo State
  const [moviesState, setMoviesState] = useState({});
  // Gọi hook fetch dữ liệu
  const { sendRequest: fetchData } = useRequest();

  // Lấy dữ liệu 1 movie bất kì trong netflix original
  useEffect(() => {
    fetchData("api/movies/trending", (data) => {
      let randomNum = Math.floor(Math.random() * data.length);

      setMoviesState(data[randomNum]);
    });
  }, []);
  // Hàm cắt chuỗi nếu chuỗi vượt quá num
  const truncStr = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else return str;
  };
  return (
    <>
      <section className="banner">
        <div className="bannerContainer">
          <div className="bannerImg">
            <img
              src={`https://image.tmdb.org/t/p/original${moviesState?.backdrop_path}`}
            />
          </div>
          <div className="bannerContent ">
            <div className="container ">
              <div className="bannerBox">
                <h2 className="bannerTitle">{moviesState.name}</h2>
                <button className="bannerButton">Play</button>
                <button className="bannerButton">My List</button>
                <p className="bannerDescription">
                  {truncStr(moviesState.overview, 200)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
