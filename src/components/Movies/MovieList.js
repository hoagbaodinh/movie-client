import { Fragment, useEffect, useState } from "react";
import MovieCard from "../Movies/MovieCard";
import "./MovieList.css";
import MoviesDetails from "./MoviesDetails";
import useRequest from "../../hooks/useRequest";

export default function MovieList(props) {
  //Tạo state
  const [isShowingDetail, setIsShowingDetail] = useState(false);
  const [movieIsShowing, setMovieIsShowing] = useState([]);
  const [moviesState, setMoviesState] = useState([]);
  // Gọi hook fetch dữ liệu
  const { sendRequest: fetchData } = useRequest();

  // Hầm láy movie được click
  const getMovieIsShowing = (movie) => {
    setMovieIsShowing(movie);
  };
  // Lấy dữ liệu Movies
  useEffect(() => {
    fetchData(props.moviesURL, (data) => setMoviesState(data));
  }, []);

  return (
    <div className={`movieList ${isShowingDetail ? "detailHeight" : ""}`}>
      {props.position !== "vertical" && (
        <h1 className="movieTitle">{props.heading}</h1>
      )}

      <div
        className="row movieListContent"
        onClick={() => setIsShowingDetail(false)}
      >
        {moviesState.map((movie) => (
          <Fragment key={movie.id}>
            <MovieCard
              movie={movie}
              position={props.position}
              onShowingDetail={setIsShowingDetail}
              onGetMovie={getMovieIsShowing}
            />
          </Fragment>
        ))}{" "}
        {isShowingDetail && (
          <div className="movieDetailContainer">
            <MoviesDetails movie={movieIsShowing} />
          </div>
        )}
      </div>
    </div>
  );
}
