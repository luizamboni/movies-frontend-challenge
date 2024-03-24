/* eslint-disable import/no-anonymous-default-export */
export const baseUrl = "https://tools.texoit.com/backend-java/api/movies";

interface YearWinner {
  year: number;
  winnerCount: number;
}

export interface YearWithMultipleWinners {
  years: YearWinner[];
}

interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducerWinIntervals {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}

interface StudioWinCount {
  name: string;
  winCount: number; // for this key, it have to be a differente interface to YearWinner
}

export interface StudiosWithWinCount {
  studios: StudioWinCount[];
}

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

interface SortDetails {
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: SortDetails;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
  
export interface MovieResponse {
  content: Movie[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: SortDetails;
  number: number;
  numberOfElements: number;
  size: number;
}
  


async function getYearWithMultipleWinners(): Promise<YearWithMultipleWinners> {
  const url = `${baseUrl}/?projection=years-with-multiple-winners`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: YearWithMultipleWinners = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
}

async function getProducersWithLongestAndShortestIntervalBetweenWins(): Promise<ProducerWinIntervals> {
  const url = `${baseUrl}/?projection=max-min-win-interval-for-producers`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProducerWinIntervals = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
}

async function getStudiosWithWinCount(): Promise<StudiosWithWinCount> {
  const url = `${baseUrl}/?projection=studios-with-win-count`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: StudiosWithWinCount = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
}

async function getWinnersByYear(year: number): Promise<Movie[]> {
  const url = `${baseUrl}/?winner=true&year=${year}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Movie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
}

export interface moviesParams {
  page: number;
  size: number;
  winner: boolean | null;
  year: string | null;
}

async function getMovies(params: moviesParams): Promise<MovieResponse> {
  // const url = `${baseUrl}/?page=0&size=99&winner=true&year=2018`;
  let queryString = "?";
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    }
  }
  const url = `${baseUrl}/${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: MovieResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
}
  

export default {
  getYearWithMultipleWinners,
  getProducersWithLongestAndShortestIntervalBetweenWins,
  getStudiosWithWinCount,
  getWinnersByYear,
  getMovies,
};
