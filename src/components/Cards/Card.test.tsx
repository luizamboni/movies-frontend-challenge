import {ReactElement} from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

jest.mock("../Loading/Loading", () => {
  return function DummyLoading():ReactElement {
    return <div data-testid="loading">Loading...</div>;
  };
});

describe("Card Component", () => {
  test("renders the Loading component when isLoading is true", () => {
    render(<Card isLoading={true} title="Test Title">Test Children</Card>);

    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });

  test("does not render the Loading component when isLoading is false", () => {
    render(<Card isLoading={false} title="Test Title">Test Children</Card>);

    const loadingElement = screen.queryByTestId("loading");
    expect(loadingElement).not.toBeInTheDocument();
  });

  test("renders the title and children correctly", () => {
    const title = "Test Title";
    const children = "Test Children";
    render(<Card title={title}>{children}</Card>);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
