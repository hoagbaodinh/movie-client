import { useEffect, useState } from "react";

export default function MovieCard(props) {
  // Tạo State
  const [isClicked, setIsClicked] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // Đổi giá trị khi người dùng nhấp vào ảnh
    props.onShowingDetail(isClicked);
    // Lưu giá trị của movie hiện tại
    setMovie(props.movie);
  }, [isClicked]);
  //// Click handler
  const clickHandler = () => {
    setIsClicked((prevState) => !prevState);
    props.onGetMovie(movie);
  };
  return (
    <div className="movieImgContainer" onClick={clickHandler}>
      <img
        src={
          props.position === "poster"
            ? movie.poster_path &&
              `https://image.tmdb.org/t/p/original${movie.poster_path}`
            : movie.backdrop_path &&
              `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        }
        className={
          props.position === "poster" ? "movieImage" : "movieImageHorizontal"
        }
      />
    </div>
  );
}
