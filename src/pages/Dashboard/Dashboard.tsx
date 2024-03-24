import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import api, { YearWithMultipleWinners, ProducerWinIntervals, StudiosWithWinCount, Movie } from "../../external/moviesApi"; // Adjust the import path as needed
import GenericTable from "../../components/GenericTable/GenericTable";
import Card from "../../components/Cards/Card";
import WinnerByYearCard from "../../components/WinnerByYearCard/WinnerByYearCard";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(func: () => Promise<any>, limit: number): Promise<any> {
  let attempts = 0;
  while (attempts < limit) {
    try {
      return await func();
    } catch (err) {
      console.error(`Attempt ${attempts + 1} failed:`, err);
      attempts++;
      if (attempts < limit) {
        const delay = attempts * 1000;
        console.error(`Retrying in ${delay}ms...`);
        await sleep(delay);
      } else {
        console.error("No more attempts left.");
        throw err;
      }
    }
  }
}

function Dashboard() {
  const [yearWithMultipleWinners, setYearWithMultipleWinners] = useState<YearWithMultipleWinners | null>(null);
  const [producerWinIntervals, setProducerWinIntervals] = useState<ProducerWinIntervals | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] = useState<StudiosWithWinCount | null>(null);
  const [winnersByYear, setWinnersByYear] = useState<Movie[] | null>(null);
  const [year, setYear] = useState<number>(2016);

  useEffect(() => {
    async function fetchYearWithMultipleWinners() {
      const result = await api.getYearWithMultipleWinners();
      setYearWithMultipleWinners(result);
    }

    async function fetchProducerWinIntervals() {
      const result = await api.getProducersWithLongestAndShortestIntervalBetweenWins();
      setProducerWinIntervals(result);
    }

    async function fetchStudiosWithWinCount() {
      const result = await api.getStudiosWithWinCount();
      setStudiosWithWinCount(result);
    }

    retry(fetchYearWithMultipleWinners, 3).catch(console.error);
    retry(fetchProducerWinIntervals, 3).catch(console.error);
    retry(fetchStudiosWithWinCount, 3).catch(console.error);
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
