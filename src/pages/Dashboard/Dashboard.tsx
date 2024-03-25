import { useState, useEffect, FC as FunctionalComponent } from "react";
import style from "./Dashboard.module.css";
import movieApi, { YearWithMultipleWinners, ProducerWinIntervals, StudiosWithWinCount, Movie } from "../../external/moviesApi"; // Adjust the import path as needed
import { retry } from "./utils";
import GenericTable from "../../components/GenericTable/GenericTable";
import Card from "../../components/Cards/Card";
import WinnerByYearCard from "../../components/WinnerByYearCard/WinnerByYearCard";

const Dashboard: FunctionalComponent<any> = () => {
  const [yearWithMultipleWinners, setYearWithMultipleWinners] = useState<YearWithMultipleWinners | null>(null);
  const [producerWinIntervals, setProducerWinIntervals] = useState<ProducerWinIntervals | null>(null);
  const [studiosWithWinCount, setStudiosWithWinCount] = useState<StudiosWithWinCount | null>(null);
  const [winnersByYear, setWinnersByYear] = useState<Movie[] | null>(null);
  const [year, setYear] = useState<number>(2016);

  useEffect(() => {
    async function fetchYearWithMultipleWinners(): Promise<void> {
      const result = await movieApi.getYearWithMultipleWinners();
      setYearWithMultipleWinners(result);
    }

    async function fetchProducerWinIntervals(): Promise<void> {
      const result = await movieApi.getProducersWithLongestAndShortestIntervalBetweenWins();
      setProducerWinIntervals(result);
    }

    async function fetchStudiosWithWinCount(): Promise<void> {
      const result = await movieApi.getStudiosWithWinCount();
      setStudiosWithWinCount(result);
    }

    retry(fetchYearWithMultipleWinners, 3).catch(console.error);
    retry(fetchProducerWinIntervals, 3).catch(console.error);
    retry(fetchStudiosWithWinCount, 3).catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchWinnersByYear(): Promise<void> {
      try {
        const result = await movieApi.getWinnersByYear(year);
        setWinnersByYear(result);
      } catch (error) {
        console.error(`Failed to fetch winners by year ${year}:`, error);
      }
    }

    fetchWinnersByYear();
  }, [year]);

  const handleYearChange = (value: number): void => {
    setWinnersByYear(null);
    setYear(value);
  };

  return (
    <div className={style.dashboardContainer}>
      <div className={style.column} >
        <Card isLoading={!yearWithMultipleWinners} title="List Years With Multiple Winners">
          {yearWithMultipleWinners &&<GenericTable 
            columns={{year: "Year", winnerCount: "Win Count"}} 
            data={yearWithMultipleWinners.years} 
          />}
        </Card>
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
};

export default Dashboard;
