import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Categories from "../components/Categories";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Categories Component", () => {
  const mockCategories = [
    { categoryId: 1, categoryName: "Stationary" },
    { categoryId: 2, categoryName: "Hotels" },
    { categoryId: 3, categoryName: "Computer" },
    { categoryId: 4, categoryName: "Food" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays categories", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCategories });

    render(<Categories />);

    // Check that the component initially renders the loading state
    expect(screen.queryByText("Stationary")).not.toBeInTheDocument();

    // Wait for the categories to be rendered
    await waitFor(() => expect(screen.getByText("Stationary")).toBeInTheDocument());

    // Verify other category names are displayed
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.categoryName)).toBeInTheDocument();
    });
  });

  it("renders the correct icons for each category", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCategories });

    render(<Categories />);

    // Wait for categories to load
    await waitFor(() => screen.getByText("Stationary"));

    // Check that each category icon is rendered
    expect(screen.getByText("Stationary").previousSibling).toContainHTML("svg"); // Verifying icon existence
    expect(screen.getByText("Hotels").previousSibling).toContainHTML("svg");
    expect(screen.getByText("Computer").previousSibling).toContainHTML("svg");
    expect(screen.getByText("Food").previousSibling).toContainHTML("svg");
  });

  it("displays a default icon for unknown categories", async () => {
    const mockDataWithUnknownCategory = [
      ...mockCategories,
      { categoryId: 5, categoryName: "UnknownCategory" },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockDataWithUnknownCategory });

    render(<Categories />);

    // Wait for categories to load
    await waitFor(() => screen.getByText("UnknownCategory"));

    // Check default icon (FaPenNib) is rendered for unknown category
    const unknownCategoryIcon = screen.getByText("UnknownCategory").previousSibling;
    expect(unknownCategoryIcon).toContainHTML("svg");
  });

  it("handles API errors gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    render(<Categories />);

    // Ensure nothing is displayed when there is an API error
    await waitFor(() => expect(screen.queryByText("Stationary")).not.toBeInTheDocument());
    expect(screen.queryByText("Error fetching categories")).not.toBeInTheDocument(); // You could also implement an error UI in the component and test it here.
  });
});
