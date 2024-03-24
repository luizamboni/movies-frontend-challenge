import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import movieApi, { YearWithMultipleWinners, ProducerWinIntervals, StudiosWithWinCount, Movie } from "../../external/moviesApi"; // Adjust the import path as needed
import { retry } from "./utils";
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
      const result = await movieApi.getYearWithMultipleWinners();
      setYearWithMultipleWinners(result);
    }

    async function fetchProducerWinIntervals() {
      const result = await movieApi.getProducersWithLongestAndShortestIntervalBetweenWins();
      setProducerWinIntervals(result);
    }

    async function fetchStudiosWithWinCount() {
      const result = await movieApi.getStudiosWithWinCount();
      setStudiosWithWinCount(result);
    }

    retry(fetchYearWithMultipleWinners, 3).catch(console.error);
    retry(fetchProducerWinIntervals, 3).catch(console.error);
    retry(fetchStudiosWithWinCount, 3).catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchWinnersByYear() {
      try {
        const result = await movieApi.getWinnersByYear(year);
        setWinnersByYear(result);
      } catch (error) {
        console.error(`Failed to fetch winners by year ${year}:`, error);
      }
    }

    fetchWinnersByYear();
  }, [year]);

  function handleYearChange(value: number) {
    setWinnersByYear(null);
    setYear(value);
  }

  return (
    <div className={style.dashboardContainer}>
      <div className={style.column} >
        <Card isLoading={!yearWithMultipleWinners} title="List Years With Multiple Winners">
          {yearWithMultipleWinners &&<GenericTable 
            columns={{year: "Year", winnerCount: "Win Count"}} 
            data={yearWithMultipleWinners.years} 
          />}
        </Card>
        {producerWinIntervals && (
          <Card isLoading={!producerWinIntervals} title="Producers With Longest and Shortest Intervals between wins">
            {producerWinIntervals &&
              <>
                <h3>Maximum</h3>
                <GenericTable 
                  columns={{producer: "Producer", interval: "Interval", previousWin: "Previous Year", followingWin: "Following Year"}} 
                  data={producerWinIntervals.max} 
                />
                <h3>Minimum</h3>
                <GenericTable 
                  columns={{producer: "Producer", interval: "Interval", previousWin: "Previous Year", followingWin: "Following Year"}} 
                  data={producerWinIntervals.min} 
                />
              </>
            }
          </Card>
        )}
      </div>
      <div className={style.column} >
        <Card isLoading={!studiosWithWinCount} title="Top 3 studios with winners" >
          {studiosWithWinCount && <GenericTable 
            columns={{name: "Name", winCount: "Win Count"}} 
            data={studiosWithWinCount.studios.slice(0, 3)} 
          />}
        </Card>
        <WinnerByYearCard data={winnersByYear} isLoading={!winnersByYear} value={year} onChange={handleYearChange} />
      </div>
    </div>
  );
}

export default Dashboard;
