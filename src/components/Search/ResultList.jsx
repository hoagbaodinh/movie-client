import { Fragment, useEffect, useRef, useState } from "react";

import "./ResultList.css";
import MoviesDetails from "../Movies/MoviesDetails";
import MovieCard from "../Movies/MovieCard";
const token = "RYoOcWM4JW";

export default function ResultList(props) {
  //Tạo state
  const [isShowingDetail, setIsShowingDetail] = useState(false);
  const [movieIsShowing, setMovieIsShowing] = useState([]);
  const [moviesState, setMoviesState] = useState([]);
  // Tạo ref
  const myRef = useRef(null);

  // Lấy dữ liệu Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/movies/search", {
          method: "POST",
          body: JSON.stringify({
            keywords: props.keywords,
            genre: props.genre,
            type: props.type,
            language: props.language,
            year: props.year,
            page: props.page,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        // Báo lỗi nếu req failed
        if (!res.ok) throw new Error(data.message);
        // Set movies
        setMoviesState(data.results);
        props.onGetTotalPages(data.totalPages);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchMovies();
  }, [
    props.keywords,
    props.genre,
    props.type,
    props.language,
    props.year,
    props.page,
  ]);

  // Hàm lấy movie đang được người dùng click
  const getMovieIsShowing = (movie) => {
    setMovieIsShowing(movie);
  };
  // Click handler
  const clickHandler = () => {
    // Bỏ show detail khi người dùng click
    setIsShowingDetail(false);
    // Tự động scroll tới phần thông tin
    myRef.current.scrollIntoView();
  };

  return (
    <div className="container">
      <div className="movieList resultMovieList">
        <div className={isShowingDetail ? "detailSearchHeight" : ""}>
          <h1 className="movieTitle" ref={myRef}>
            {props.heading}{" "}
          </h1>
          {/* Hiện Phần Detail khi người dùng click vào phim */}
          {isShowingDetail && (
            <div className="movieDetailContainer resultMovieDetailContainer">
              <MoviesDetails movie={movieIsShowing} />
            </div>
          )}
        </div>
        {/* Render các phim đã tìm thấy */}
        <div className="row movieListContent" onClick={clickHandler}>
          {moviesState.length === 0 && props.isTouched ? (
            <p>No result found !</p>
          ) : (
            moviesState.map((movie) => (
              <Fragment key={movie.id}>
                <MovieCard
                  position="poster"
                  movie={movie}
                  onShowingDetail={setIsShowingDetail}
                  onGetMovie={getMovieIsShowing}
                />
              </Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
