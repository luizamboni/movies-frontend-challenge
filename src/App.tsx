import React, { useState, useEffect } from 'react';
import './App.css';
import api, { YearWithMultipleWinners, ProducerWinIntervals, StudiosWithWinCount, Movie, MovieResponse } from './external/moviesApi'; // Adjust the import path as needed

function App() {
  const [yearWithMultipleWinners, setYearWithMultipleWinners] = useState<YearWithMultipleWinners | null>(null);
  const [producerWinIntervals, setProducerWinIntervals] = useState<ProducerWinIntervals | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] = useState<StudiosWithWinCount | null>(null);
  const [winnersByYear, setWinnersByYear] = useState<Movie[] | null>(null);
  const [movies, setMovies] = useState<MovieResponse | null>(null);

  const year = 2018;

  useEffect(() => {
    async function fetchYearWithMultipleWinners() {
      try {
        const result = await api.getYearWithMultipleWinners();
        setYearWithMultipleWinners(result);
      } catch (error) {
        console.error("Failed to fetch year with multiple winners:", error);
      }
    }

    async function fetchProducerWinIntervals() {
      try {
        const result = await api.getProducersWithLongestAndShortestIntervalBetweenWins();
        setProducerWinIntervals(result);
      } catch (error) {
        console.error("Failed to fetch producer win intervals:", error);
      }
    }

    async function fetchStudiosWithWinCount() {
      try {
        const result = await api.getStudiosWithWinCount();
        setStudiosWithWinCount(result);
      } catch (error) {
        console.error("Failed to fetch studios with win count:", error);
      }
    }

    async function fetchWinnersByYear() {
      try {
        const result = await api.getWinnersByYear(year);
        setWinnersByYear(result);
      } catch (error) {
        console.error(`Failed to fetch winners by year ${year}:`, error);
      }
    }

    async function fetchMovies() {
      try {
        const moviesResponse = await api.getMovies();
        setMovies(moviesResponse);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }

    fetchYearWithMultipleWinners();
    fetchProducerWinIntervals();
    fetchStudiosWithWinCount();
    fetchWinnersByYear();
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {yearWithMultipleWinners && (
          <div>
            <h2>Years With Multiple Winners</h2>
            <ul>
              {yearWithMultipleWinners.years?.map((yearData, index) => (
                <li key={index}>{`Year: ${yearData.year}, Winner Count: ${yearData.winnerCount}`}</li>
              ))}
            </ul>
          </div>
        )}
        {producerWinIntervals && (
          <div>
            <h2>Producers With Longest and Shortest Intervals</h2>
            <div>
              <h3>Shortest Intervals</h3>
              <ul>
                {producerWinIntervals.min?.map((interval, index) => (
                  <li key={'min' + index}>{`${interval.producer} (${interval.interval} years between ${interval.previousWin} and ${interval.followingWin})`}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Longest Intervals</h3>
              <ul>
                {producerWinIntervals.max?.map((interval, index) => (
                  <li key={'max' + index}>{`${interval.producer} (${interval.interval} years between ${interval.previousWin} and ${interval.followingWin})`}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {studiosWithWinCount && (
          <div>
            <h2>Studios With Win Count</h2>
            <ul>
              {studiosWithWinCount.studios?.map((studio, index) => (
                <li key={index}>{`${studio.name}: ${studio.winCount} wins`}</li>
              ))}
            </ul>
          </div>
        )}
        {winnersByYear && (
          <div>
            <h2>Winners of {year}</h2>
            
            <ul>
              {winnersByYear?.map((winner, index) => (
                <li key={index}>{`Name: ${winner.title}`}</li>
              ))}
            </ul>
          </div>
        )}

        {movies ? (
          <div>
            <h2>Movie List</h2>
            <ul>
              {movies.content.map((movie, index) => (
                <li key={index}>
                  {`${movie.title} (${movie.year}) - Studios: ${movie.studios.join(', ')} - Producers: ${movie.producers.join(', ')}`}
                  {movie.winner && <strong> Winner</strong>}
                </li>
              ))}
            </ul>
            <p>Total Movies: {movies.totalElements}</p>
          </div>
        ) : (
          <p>Loading movies...</p>
        )}
      </header>
    </div>
  );
}

export default App;
