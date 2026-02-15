import React from "react"
import { render, screen } from "@testing-library/react"
import Section from "../section"

describe("Section", () => {
  describe("rendering", () => {
    it("should render children correctly", () => {
      render(
        <Section>
          <p>Test content</p>
        </Section>
      )
      expect(screen.getByText("Test content")).toBeInTheDocument()
    })

    it("should render as section element", () => {
      render(<Section>Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toBeInTheDocument()
    })

    it("should apply custom id", () => {
      render(<Section id="custom-section">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveAttribute("id", "custom-section")
    })

    it("should apply custom className", () => {
      render(<Section className="custom-class">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("custom-class")
    })
  })

  describe("background styling via className", () => {
    it("should apply white background class", () => {
      render(<Section className="bg-white">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("bg-white")
    })

    it("should apply dark background class", () => {
      render(<Section className="bg-background-dark">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("bg-background-dark")
    })

    it("should apply gray background class", () => {
      render(<Section className="bg-gray-100">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("bg-gray-100")
    })
  })

  describe("spacing via className", () => {
    it("should apply padding classes", () => {
      render(<Section className="py-16 px-12">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("py-16", "px-12")
    })

    it("should apply small padding classes", () => {
      render(<Section className="py-8">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("py-8")
    })

    it("should apply no padding classes", () => {
      render(<Section className="py-0 px-0">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("py-0", "px-0")
    })

    it("should apply large padding classes", () => {
      render(<Section className="py-20 px-20">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass("py-20", "px-20")
    })
  })

  describe("combined props", () => {
    it("should combine all props correctly", () => {
      render(
        <Section
          className="bg-background-dark py-8 px-12 custom-class"
          id="test-section"
        >
          Content
        </Section>
      )

      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveClass(
        "bg-background-dark",
        "py-8",
        "px-12",
        "custom-class"
      )
      expect(section).toHaveAttribute("id", "test-section")
    })
  })

  describe("accessibility", () => {
    it("should have section role", () => {
      render(<Section>Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toBeInTheDocument()
    })

    it("should support custom id for navigation", () => {
      render(<Section id="main-content">Content</Section>)
      const section = screen.getByText("Content").closest("section")
      expect(section).toHaveAttribute("id", "main-content")
    })
  })
})
