import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WinnerByYearCard from "./WinnerByYearCard";

jest.mock("../Cards/Card", () => {
  return function DummyCard({ children } : { children: any[] }) {
    return <div data-testid="card">{children}</div>;
  };
});

jest.mock("../GenericTable/GenericTable", () => {
  return function DummyGenericTable() {
    return <div data-testid="genericTable">Table Content</div>;
  };
});

jest.mock("../Loading/Loading", () => {
  return function DummyLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

describe("WinnerByYearCard Component", () => {
  const onChangeMock = jest.fn();

  test("renders the Loading component when isLoading is true", () => {
    render(<WinnerByYearCard isLoading={true} value={2020} onChange={onChangeMock} data={null} />);
    
    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders the GenericTable component when isLoading is false", () => {
    render(<WinnerByYearCard isLoading={false} data={[{id: "1", year: 2020, title: "Test Movie"}]} value={2020} onChange={onChangeMock} />);

    const tableElement = screen.getByTestId("genericTable");
    expect(tableElement).toBeInTheDocument();
  });

  test("renders search input and responds to changes", () => {
    render(<WinnerByYearCard isLoading={false} data={[]} value={2020} onChange={onChangeMock} />);

    const searchInput = screen.getByDisplayValue(2020);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "2021" } });
    expect(onChangeMock).toHaveBeenCalledWith("2021");
  });
});
