import { useEffect, useState } from "react";
import "./MoviesDetails.css";

const token = "RYoOcWM4JW";
export default function MoviesDetails(props) {
  //Tạo state
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [movie, setMovie] = useState({});
  const [isContainVideo, setIsContainVideo] = useState(false);
  useEffect(() => {
    // Lấy dư liệu video của movie đã chọn
    const fetchVideo = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/movies/video", {
          method: "POST",
          body: JSON.stringify({ movieId: props.movie.id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        console.log(data);
        // Set trạng thái contain là true
        setIsContainVideo(true);
        // Set video vào state
        setMovieTrailer(data.results);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchVideo();
    // Set movie vào state
    setMovie(props.movie);
  }, []);
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="movieDetailTitle">{movie.title || movie.name}</h1>
        <div className="horizontalLine"></div>
        <h3 className="movieReleaseDate">{`Release Date: ${
          movie.release_date || movie.first_air_date
        }`}</h3>
        <h3 className="movieRating">{`Vote: ${movie.vote_average} /10`}</h3>
        <p className="movieOverview">{movie.overview}</p>
      </div>
      <div className="col-6">
        {/* Nếu movie có video thì get, nếu không lấy backdrop  */}
        {isContainVideo ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${movieTrailer.key}`}
          ></iframe>
        ) : (
          <img
            width="100%"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
        )}
      </div>
    </div>
  );
}
