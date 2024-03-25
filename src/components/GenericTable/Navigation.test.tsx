/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Navigation Component", () => {

  test("renders Navigation component and navigates", () => {
    const onNavigateMock = jest.fn();

    render(<Navigation current={3} pages={5} onNavigate={onNavigateMock} />);

    const currentPage = screen.getByText("3");
    expect(currentPage).toHaveClass("pageNavigationActive");

    const allNavButtons = document.querySelectorAll(".pagination > span");
    fireEvent.click(allNavButtons[0]);
    expect(onNavigateMock).toHaveBeenCalledWith(1);
    
    fireEvent.click(allNavButtons[1]);
    expect(onNavigateMock).toHaveBeenCalledWith(2);

    fireEvent.click(allNavButtons[2]);
    expect(onNavigateMock).toHaveBeenCalledWith(1);

    fireEvent.click(allNavButtons[3]);
    expect(onNavigateMock).toHaveBeenCalledWith(2);

    fireEvent.click(allNavButtons[4]);
    expect(onNavigateMock).not.toHaveBeenCalledWith(3);

    fireEvent.click(allNavButtons[5]);
    expect(onNavigateMock).toHaveBeenCalledWith(4);

    fireEvent.click(allNavButtons[6]);
    expect(onNavigateMock).toHaveBeenCalledWith(5);

    fireEvent.click(allNavButtons[7]);
    expect(onNavigateMock).toHaveBeenCalledWith(4);

    fireEvent.click(allNavButtons[8]);
    expect(onNavigateMock).toHaveBeenCalledWith(5);
  });

  test("first page navigation buttons are disabled when on the first page", () => {
    render(<Navigation current={1} pages={5} onNavigate={jest.fn()} />);
    const allNavButtons = document.querySelectorAll(".pagination > span");
    
    expect(allNavButtons[0]).toHaveClass("pageNavigationDisabled");
    expect(allNavButtons[1]).toHaveClass("pageNavigationDisabled");
  });

  test("last page navigation buttons are disabled when on the last page", () => {
    render(<Navigation current={5} pages={5} onNavigate={jest.fn()} />);
    const currentPage = screen.getByText("5");
    expect(currentPage).toHaveClass("pageNavigationActive");

    const allNavButtons = document.querySelectorAll(".pagination > span");
    
    expect(allNavButtons[5]).toHaveClass("pageNavigationDisabled");
    expect(allNavButtons[6]).toHaveClass("pageNavigationDisabled");
  });
});
