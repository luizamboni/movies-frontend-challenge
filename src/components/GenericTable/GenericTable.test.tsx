/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import GenericTable, { Filters } from "./GenericTable";
import "@testing-library/jest-dom";

describe("GenericTable", () => {
  const columns = {
    id: "ID",
    name: "Name",
    gender: "Gender",
  };

  const data = [
    { id: 12, name: "John Doe", gender: "M"},
    { id: 22, name: "Jane Doe", gender: "F"},
  ];

  const pagination = {
    current: 1,
    pages: 3,
  };

  test("renders GenericTable without crashing", () => {
    const { getByText } = render(<GenericTable columns={columns} data={data} />);
    expect(getByText("John Doe")).toBeInTheDocument();
  });

  test("onFilter called", () => {
    const onNameFilterMock = jest.fn();
    const onGenderFilterMock = jest.fn();

    const filters: Filters = {
      name: { 
        type: "text", 
        onFilter: onNameFilterMock, 
        placeholder: "", 
        value: "" 
      },
      gender: { 
        type: "select" , 
        onFilter: onGenderFilterMock, 
        value: "", 
        placeholder: "", 
        options: ["M", "F"] 
      },
    };

    const { getByTestId } = render(<GenericTable columns={columns} data={data} filters={filters} />);
    const textInput = getByTestId("name");

    expect(textInput).toBeInTheDocument();
    fireEvent.change(textInput, {target: {value: "Jonh"}});
    
    expect(onNameFilterMock).toBeCalledWith("Jonh");

    const selectInput = getByTestId("gender");

    fireEvent.change(selectInput, { target: { value: "M" } });
    expect(onGenderFilterMock).toBeCalledWith("M");
  });

  test("Navigation is not rendered", () => {
    const onNavigateMock = jest.fn();
    render(<GenericTable columns={columns} data={data} onNavigate={onNavigateMock} />);
    const navigationElement = document.querySelector(".pagination");

    expect(navigationElement).not.toBeInTheDocument();
  });

  test("Navigation is rendered", () => {
    const onNavigateMock = jest.fn();
    render(<GenericTable columns={columns} data={data} pagination={pagination} onNavigate={onNavigateMock} />);

    const navigationElement = document.querySelector(".pagination");
    expect(navigationElement).toBeInTheDocument();
  });
});
