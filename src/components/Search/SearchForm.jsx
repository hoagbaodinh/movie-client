import React, { useEffect, useState } from "react";
import "./SearchForm.css";
const token = "RYoOcWM4JW";
const SearchForm = (props) => {
  const [genres, setGenres] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedMediaType, setSelectedMediaType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  // Check xem đối tượng có rỗng hay không
  const isEmpty = (value) => value.trim() === "";

  useEffect(() => {
    // Mặc đinh focus vào input
    const fetchGenresAndTypes = async () => {
      try {
        const res = await fetch("http://localhost:5050/api/genres-types", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setGenres(data.genres);
        setMediaTypes(data.mediaTypes);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchGenresAndTypes();
  }, []);
  ///// Handler
  //Submit
  const submitHandler = (e) => {
    e.preventDefault();

    // Validata giá trị
    if (!isEmpty(inputTitle)) {
      props.onGetKeyword(inputTitle);
      props.onGetGenre(selectedGenre);
      props.onGetMediaType(selectedMediaType);
      props.onGetLanguage(selectedLanguage);
      props.onGetYear(selectedYear);
    } else alert("Please enter a valid input");
    resetHandler(e);
    // Đổi giá trị của isTouched
    props.onIsTouched(true);
  };

  // Reset
  const resetHandler = (e) => {
    e.preventDefault();
    setInputTitle("");
    setSelectedGenre("all");
    setSelectedMediaType("all");
    setSelectedLanguage("all");
    setSelectedYear("all");
  };

  //Years
  const years = [];
  for (let i = 1990; i <= 2023; i++) {
    years.push(i);
  }

  return (
    <div className="formContainer container">
      <form className="inputSearchForm" onSubmit={submitHandler}>
        <div className="inputContainer">
          <input
            type="text"
            name="title"
            className="inputSearch"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />

          <button type="submit" className="buttonSearchIcon">
            <svg
              className="svg-inline--fa fa-search fa-w-16"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </button>
        </div>

        {/* Genre */}
        <div className="form-controller">
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="all">All</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Media Type */}
        <div className="form-controller">
          <label htmlFor="mediaType">Media Type</label>
          <select
            name="mediaType"
            value={selectedMediaType}
            onChange={(e) => setSelectedMediaType(e.target.value)}
          >
            {mediaTypes.map((type) => (
              <option value={type} key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="form-controller">
          <label htmlFor="language">Language</label>
          <select
            name="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="all">All</option>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>

        {/* Year */}
        <div className="form-controller">
          <label htmlFor="year">Year</label>
          <select
            name="language"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="all">All</option>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="formHorizontalLine"></div>

        {/* Action */}
        <div className="formSearchActions">
          <button type="button" onClick={resetHandler}>
            RESET
          </button>
          <button type="submit" id="search_button">
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
