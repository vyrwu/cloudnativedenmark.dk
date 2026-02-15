import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Button from "../button"

describe("Button", () => {
  describe("rendering", () => {
    it("should render button element", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("should render children correctly", () => {
      render(<Button>Test Button</Button>)
      expect(screen.getByText("Test Button")).toBeInTheDocument()
    })

    it("should apply custom className", () => {
      render(<Button className="custom-class">Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("custom-class")
    })
  })

  describe("styling via className", () => {
    it("should apply primary button styling", () => {
      render(<Button className="bg-background text-white">Primary</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-background")
      expect(button).toHaveClass("text-white")
    })

    it("should apply secondary button styling", () => {
      render(
        <Button className="border-2 border-background text-background">
          Secondary
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("border-2")
      expect(button).toHaveClass("border-background")
      expect(button).toHaveClass("text-background")
    })

    it("should apply ghost button styling", () => {
      render(
        <Button className="text-background hover:bg-background">Ghost</Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("text-background")
      expect(button).toHaveClass("hover:bg-background")
    })

    it("should apply disabled button styling", () => {
      render(
        <Button className="bg-gray-200 text-gray-500 cursor-not-allowed">
          Disabled
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-gray-200")
      expect(button).toHaveClass("text-gray-500")
      expect(button).toHaveClass("cursor-not-allowed")
    })
  })

  describe("sizes via className", () => {
    it("should apply medium size styling", () => {
      render(<Button className="px-6 py-3">Medium</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("px-6")
      expect(button).toHaveClass("py-3")
    })

    it("should apply small size styling", () => {
      render(<Button className="px-4 py-2 text-sm">Small</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("px-4")
      expect(button).toHaveClass("py-2")
      expect(button).toHaveClass("text-sm")
    })

    it("should apply large size styling", () => {
      render(<Button className="px-8 py-3 text-lg">Large</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("px-8")
      expect(button).toHaveClass("py-3")
      expect(button).toHaveClass("text-lg")
    })
  })

  describe("disabled state", () => {
    it("should be disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
    })

    it("should not be disabled when disabled prop is false", () => {
      render(<Button disabled={false}>Enabled Button</Button>)
      const button = screen.getByRole("button")
      expect(button).not.toBeDisabled()
    })

    it("should apply disabled styles when disabled", () => {
      render(
        <Button disabled className="bg-gray-200 text-gray-500">
          Disabled Button
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-gray-200")
      expect(button).toHaveClass("text-gray-500")
    })
  })

  describe("interaction", () => {
    it("should call onClick when clicked", () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Clickable</Button>)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("should not call onClick when disabled", () => {
      const handleClick = jest.fn()
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      )

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it("should support keyboard navigation", () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Button</Button>)

      const button = screen.getByRole("button")
      button.focus()
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" })

      expect(button).toHaveFocus()
    })
  })

  describe("accessibility", () => {
    it("should have button role", () => {
      render(<Button>Accessible Button</Button>)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("should support aria-label", () => {
      render(<Button aria-label="Custom label">Button</Button>)
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument()
    })

    it("should support type attribute", () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
    })

    it("should be focusable", () => {
      render(<Button>Focusable</Button>)
      const button = screen.getByRole("button")
      button.focus()
      expect(button).toHaveFocus()
    })
  })

  describe("complex styling combinations", () => {
    it("should handle complex className combinations", () => {
      render(
        <Button className="bg-background text-white px-8 py-3 text-lg rounded font-medium hover:bg-background/90 transition-colors">
          Complex Button
        </Button>
      )

      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-background")
      expect(button).toHaveClass("text-white")
      expect(button).toHaveClass("px-8")
      expect(button).toHaveClass("py-3")
      expect(button).toHaveClass("text-lg")
      expect(button).toHaveClass("rounded")
      expect(button).toHaveClass("font-medium")
      expect(button).toHaveClass("hover:bg-background/90")
      expect(button).toHaveClass("transition-colors")
    })

    it("should support additional HTML attributes", () => {
      render(
        <Button data-testid="custom-button" className="bg-gray-200">
          Button
        </Button>
      )
      expect(screen.getByTestId("custom-button")).toBeInTheDocument()
    })
  })
})
