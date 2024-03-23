import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import api, { YearWithMultipleWinners, ProducerWinIntervals, StudiosWithWinCount, Movie } from "../../external/moviesApi"; // Adjust the import path as needed
import GenericTable from "../../components/GenericTable/GenericTable";
import Card from "../../components/Cards/Card";
import WinnerByYearCard from "../../components/WinnerByYearCard/WinnerByYearCard";

function Dashboard() {
  const [yearWithMultipleWinners, setYearWithMultipleWinners] = useState<YearWithMultipleWinners | null>(null);
  const [producerWinIntervals, setProducerWinIntervals] = useState<ProducerWinIntervals | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] = useState<StudiosWithWinCount | null>(null);
  const [winnersByYear, setWinnersByYear] = useState<Movie[] | null>(null);
  const [year, setYear] = useState<number>(2016);

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

    fetchYearWithMultipleWinners();
    fetchProducerWinIntervals();
    fetchStudiosWithWinCount();
  }, []);

  useEffect(() => {
    async function fetchWinnersByYear() {
      try {
        const result = await api.getWinnersByYear(year);
        setWinnersByYear(result);
      } catch (error) {
        console.error(`Failed to fetch winners by year ${year}:`, error);
      }
    }

    fetchWinnersByYear();
  }, [year]);

  function handleYearChange(e: any) {
    setYear(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="dashboard-container">
      <div className="column" >
        {yearWithMultipleWinners && (
          <Card>
            <GenericTable 
              title="List Years With Multiple Winners" 
              columns={{year: "Year", winnerCount: "Win Count"}} 
              data={yearWithMultipleWinners.years} 
            />
          </Card>
        )}
        {producerWinIntervals && (
          <Card>
            <h2>Producers With Longest and Shortest Intervals between wins</h2>
            <GenericTable 
              title="Maximum" 
              columns={{producer: "Producer", interval: "Interval", previousWin: "Previous Year", followingWin: "Following Year"}} 
              data={producerWinIntervals.max} 
            />
            <GenericTable 
              title="Mininum" 
              columns={{producer: "Producer", interval: "Interval", previousWin: "Previous Year", followingWin: "Following Year"}} 
              data={producerWinIntervals.min} 
            />
          </Card>
        )}
      </div>
      <div className="column" >
        {studiosWithWinCount && (
          <Card>
            <GenericTable 
              title="Top 3 studios with winners" 
              columns={{name: "Name", winCount: "Win Count"}} 
              data={studiosWithWinCount.studios.slice(0, 3)} 
            />
          </Card>
        )}
        {winnersByYear && 
          <WinnerByYearCard data={winnersByYear} value={year} onChange={handleYearChange} />
        }
      </div>
    </div>
  );
}

export default Dashboard;
