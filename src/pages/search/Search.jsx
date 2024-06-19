import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import SearchForm from "../../components/Search/SearchForm";
import ResultList from "../../components/Search/ResultList";
const Search = () => {
  // Tạo State
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchGenre, setSearchGenre] = useState("all");
  const [searchMediaType, setSearchMediaType] = useState("all");
  const [searchLanguage, setSearchLanguage] = useState("all");
  const [searchYear, setSearchYear] = useState("all");
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const [isTouched, setIsTouched] = useState(false);

  // Hàm lấy giá trị Search keyword
  const getSearchKeywords = (keywords) => {
    setSearchKeywords(keywords);
  };
  const getGenre = (genre) => {
    setSearchGenre(genre);
  };
  const getMediaType = (type) => {
    setSearchMediaType(type);
  };
  const getLanguage = (lang) => {
    setSearchLanguage(lang);
  };
  const getTotalPages = (page) => {
    setTotalPages(page);
  };
  const getYear = (year) => {
    setSearchYear(year);
  };

  const handlePrevBtn = (e) => {
    e.preventDefault();
    if (+pageNum === 1) return;
    setPageNum((prevState) => +prevState - 1);
  };
  const handleNextBtn = (e) => {
    e.preventDefault();
    if (totalPages === pageNum) return;
    setPageNum((prevState) => +prevState + 1);
  };

  // Use Effect
  useEffect(() => {
    setPageNum(1);
  }, [searchKeywords]);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Form */}
      <SearchForm
        onGetKeyword={getSearchKeywords}
        onIsTouched={setIsTouched}
        onGetGenre={getGenre}
        onGetMediaType={getMediaType}
        onGetLanguage={getLanguage}
        onGetYear={getYear}
      />
      {/* Result */}
      {searchKeywords !== "" && (
        <ResultList
          keywords={searchKeywords}
          genre={searchGenre}
          type={searchMediaType}
          language={searchLanguage}
          year={searchYear}
          page={pageNum}
          heading="Search Result"
          isTouched={isTouched}
          onGetTotalPages={getTotalPages}
        />
      )}
      {/* Paging */}
      {totalPages !== 0 && (
        <div className="container d-flex justify-content-end mb-4">
          <button type="button" className="p-1 px-2" onClick={handlePrevBtn}>
            {`<-`}
          </button>
          <span className="p-1 px-2">{pageNum}</span>
          <button type="button" className="p-1 px-2" onClick={handleNextBtn}>
            {`->`}
          </button>
        </div>
      )}
    </>
  );
};

export default Search;
