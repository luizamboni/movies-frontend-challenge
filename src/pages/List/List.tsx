import React, { useState, useEffect } from "react";
import "./List.css";
import api, { MovieResponse, moviesParams as movieParamsInterface } from "../../external/moviesApi"; // Adjust the import path as needed
import Card from "../../components/Cards/Card";
import GenericTable from "../../components/GenericTable/GenericTable";

function List() {
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [moviesParams, setMoviesParams] = useState<movieParamsInterface>({
    year: "2019",
    winner: null,
    page: 0,
    size: 15,
  });

  useEffect(() => {
    async function fetchMovies() {
      try {
        const moviesResponse = await api.getMovies(moviesParams);
        setMovies(moviesResponse);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }
    fetchMovies();
  }, [moviesParams]);


  const handleYearFilter = (value: string) => {
    setMoviesParams(prevState => ({
      ...prevState,
      year: value ? value : null,
      page: 0,
    }));
  };

  const handleWinnerFilter = (value: string) => {
    setMoviesParams(prevState => ({
      ...prevState,
      winner: value ? value === "Yes" : null,
      page: 0,
    }));
  };

  const handlePagination = (value: number) => {
    setMoviesParams(prevState => ({
      ...prevState,
      page: value - 1,
    }));
  };

  return (
    <div className="list-container">
      {movies ? (
        <Card>
          <h2>List movies</h2>
          <GenericTable
            centerHeaders={true}
            columns={{
              id: "ID",
              year: "Year",
              title: "Title",
              winner: "Winner?",
            }}
            filters={{
              year: {
                placeholder: "Filter by year",
                type: "text",
                value: moviesParams.year ? String(moviesParams.year) : "",
                onFilter: handleYearFilter,
              },
              winner: {
                placeholder: "yes/no",
                type: "select",
                value: (moviesParams && moviesParams ? "Yes" : "No") || "",
                options: ["Yes", "No"],
                onFilter: handleWinnerFilter,
              }
            }}
            data={movies.content.map(movie => ({...movie, winner: movie.winner ? "Yes" : "No" }))}
            pagination={{current: movies.number + 1, pages: movies.totalPages }}
            onNavigate={handlePagination}
          />
        </Card>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default List;
