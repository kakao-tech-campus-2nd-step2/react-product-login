import { Hello } from "./hello"
import { render, screen } from "@testing-library/react"

test('abc', () => {

  render(<Hello />)

  const helloWorld = screen.getByText("Hello World", { exact: false })
  expect(helloWorld).toBeInTheDocument()

});