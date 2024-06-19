import React from "react";
import Navbar from "../../components/layout/Navbar";
import Banner from "../../components/Browse/Banner";

import MovieList from "../../components/Movies/MovieList";

function Browse() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Banner */}
      <Banner />
      {/* Movie list */}
      <div className="container movieBrowse">
        <MovieList moviesURL="api/movies/trending?page=2" position="poster" />
        <MovieList moviesURL="api/movies/trending" heading="Xu hướng" />
        <MovieList moviesURL="api/movies/top-rate" heading="Xếp hạng cao" />
        <MovieList moviesURL="api/movies/discover/28" heading="Hành động" />
        <MovieList moviesURL="api/movies/discover/35" heading="Hài" />
        <MovieList moviesURL="api/movies/discover/27" heading="Kinh dị" />
        <MovieList moviesURL="api/movies/discover/10749" heading="Lãng mạn" />
        <MovieList moviesURL="api/movies/discover/99" heading="Tài liệu" />
      </div>
    </>
  );
}

export default Browse;
