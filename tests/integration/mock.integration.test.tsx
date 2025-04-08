import { render, screen } from "@testing-library/react";

describe("Integration Test Example", () => {
  it("should render a component successfully", () => {
    render(<div data-testid="example">Hello, Integration Test!</div>);
    expect(screen.getByTestId("example")).toHaveTextContent(
      "Hello, Integration Test!"
    );
  });
});
