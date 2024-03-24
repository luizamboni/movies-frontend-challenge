import api, { baseUrl } from "./moviesApi";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("API Module", () => {
  test("getYearWithMultipleWinners fetches data successfully", async () => {
    const mockData = { years: [{ year: 2020, winnerCount: 2 }] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await api.getYearWithMultipleWinners();
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/?projection=years-with-multiple-winners`);
  });

  test("getProducersWithLongestAndShortestIntervalBetweenWins fetches data successfully", async () => {
    const mockData = { min: [{ producer: "Producer 1", interval: 1, previousWin: 1990, followingWin: 1991 }], max: [{ producer: "Producer 2", interval: 10, previousWin: 1980, followingWin: 1990 }] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await api.getProducersWithLongestAndShortestIntervalBetweenWins();
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/?projection=max-min-win-interval-for-producers`);
  });

  test("getStudiosWithWinCount fetches data successfully", async () => {
    const mockData = { studios: [{ name: "Studio 1", winCount: 5 }] };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await api.getStudiosWithWinCount();
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/?projection=studios-with-win-count`);
  });

  test("getWinnersByYear fetches data successfully", async () => {
    const year = 2020;
    const mockData = [{ id: 1, year: 2020, title: "Best Movie", studios: ["Studio 1"], producers: ["Producer 1"], winner: true }];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await api.getWinnersByYear(year);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/?winner=true&year=${year}`);
  });

  test("getMovies fetches data successfully", async () => {
    const params = { page: 0, size: 10, winner: true, year: "2020" };
    const mockData = { content: [{ id: 1, year: 2020, title: "Best Movie", studios: ["Studio 1"], producers: ["Producer 1"], winner: true }], totalElements: 1 };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await api.getMovies(params);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`${baseUrl}/?`));
  });
});