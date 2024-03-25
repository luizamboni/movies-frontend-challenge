import { useState, useEffect, FC as FunctionalComponent } from "react";
import movieApi, { MovieResponse, moviesParams as movieParamsInterface } from "../../external/moviesApi"; // Adjust the import path as needed
import Card from "../../components/Cards/Card";
import GenericTable from "../../components/GenericTable/GenericTable";
import style from "./List.module.css";

const List: FunctionalComponent<any> = () => {
  const [movies, setMovies] = useState<MovieResponse | null>(null);
  const [moviesParams, setMoviesParams] = useState<movieParamsInterface>({
    year: "2019",
    winner: null,
    page: 0,
    size: 15,
  });

  useEffect(() => {
    async function fetchMovies(): Promise<void> {
      try {
        const moviesResponse = await movieApi.getMovies(moviesParams);
        setMovies(moviesResponse);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }
    fetchMovies();
  }, [moviesParams]);


  const handleYearFilter = (value: string): void => {
    setMoviesParams(prevState => ({
      ...prevState,
      year: value ? value : null,
      page: 0,
    }));
  };

  const handleWinnerFilter = (value: string): void => {
    setMoviesParams(prevState => ({
      ...prevState,
      winner: value ? value === "Yes" : null,
      page: 0,
    }));
  };

  const handlePagination = (value: number): void => {
    setMoviesParams(prevState => ({
      ...prevState,
      page: value - 1,
    }));
  };

  return (
    <div className={style.listContainer}>
      <Card isLoading={!movies} title="List movies">
        {movies && <GenericTable
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
              value: moviesParams.year ? String(moviesParams?.year) : "",
              onFilter: handleYearFilter,
            },
            winner: {
              placeholder: "yes/no",
              type: "select",
              value: (moviesParams && moviesParams ? "Yes" : "No"),
              options: ["Yes", "No"],
              onFilter: handleWinnerFilter,
            }
          }}
          data={movies?.content.map(movie => ({...movie, winner: movie.winner ? "Yes" : "No" })) || []}
          pagination={{current: movies.number + 1, pages: movies.totalPages }}
          onNavigate={handlePagination}
        />
        }
      </Card>
    </div>
  );
};

export default List;
