import { useCallback } from "react";
import { json } from "react-router-dom";
const token = "RYoOcWM4JW";
export default function useRequest() {
  //Hàm fetch dữ liệu

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const response = await fetch(`http://localhost:5050/${requestConfig}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      // Lọc ra những phim không có poster và backdrop
      const filteredData = data.results.filter(
        (result) => result.backdrop_path && result.poster_path
      );
      // Hàm truyền vào apply giá trị đã lọc
      applyData(filteredData);
    } catch (err) {
      console.error(err.message || "Something went wrong!");
    }
  }, []);

  return {
    sendRequest: sendRequest,
  };
}
