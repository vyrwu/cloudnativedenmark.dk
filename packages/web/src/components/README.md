# Component Architecture

This directory contains the refactored component system for the Cloud Native Denmark website, organized following modern React best practices.

## Directory Structure

```
src/components/
├── ui/              # Basic UI building blocks
├── content/         # Content-specific components
├── layout/          # Layout and structural components
├── features/        # Feature-specific components (sessions, speakers)
└── shared/          # Shared component utilities
```

## Design Principles

### 1. Single Responsibility

Each component handles one specific concern and can be easily understood and tested.

### 2. Composition over Inheritance

Complex UIs are built by composing simpler components together.

### 3. Consistent Interfaces

Standardized prop patterns and naming conventions across all components.

### 4. Variant-based Design

Components adapt to different contexts through variant props rather than creating separate components.

## Component Categories

### UI Components (`/ui`)

Basic building blocks for the interface:

- **Button**: Standardized button with variants (primary, secondary, ghost)
- **Section**: Page section wrapper with background variants and spacing
- **Container**: Max-width container with responsive padding
- **ExternalLink**: Consistent external link styling and behavior

### Content Components (`/content`)

Domain-specific content display:

- **TeamMember/TeamGrid**: Team member display and grid layouts
- **SponsorGrid**: Sponsor tier displays with consistent styling
- **VideoEmbed**: Responsive video embedding component
- **SocialLinks**: Social media link collections
- **VenueMap**: Conference venue floor plan display
- **SpeakersSection**: Speaker showcase with expand/collapse
- **SponsorsSection**: Complete sponsor tier display

### Layout Components (`/layout`)

Page structure and layout:

- **PageHeader**: Standardized page headers with titles and descriptions
- **HeroSection**: Flexible hero section with logo, title, actions

### Feature Components (`/features`)

Feature-specific functionality:

- **SessionCard**: Session display for schedule and archive
- **SpeakerList**: Speaker grid and inline displays
- **ArchiveSession**: Archive-specific session display with video/slides

## Usage Patterns

### Importing Components

```typescript
// Individual imports
import Button from "../components/ui/button"
import Section from "../components/ui/section"

// Barrel imports (recommended)
import { Button, Section, Container } from "../components/ui"
import { TeamGrid, SponsorGrid } from "../components/content"
```

### Component Composition

```typescript
const MyPage = () => (
  <Layout>
    <PageHeader
      title="My Page"
      description="Page description"
      variant="dark"
    />
    <Section variant="default">
      <Container centerContent>
        <Button size="large" variant="primary">
          Primary Action
        </Button>
      </Container>
    </Section>
  </Layout>
);
```

### Variant Usage

Components use variant props to adapt to different contexts:

```typescript
// Button variants
<Button variant="primary" size="large">Primary</Button>
<Button variant="secondary" size="medium">Secondary</Button>
<Button variant="ghost" size="small">Ghost</Button>

// Section variants
<Section variant="default">Light background</Section>
<Section variant="dark">Dark background</Section>
<Section variant="gray">Gray background</Section>
```

## Styling Approach

- **Tailwind CSS**: Utility-first styling with consistent spacing and colors
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Design Tokens**: Consistent spacing, typography, and color scales
- **Component Variants**: Styling variations through props rather than custom CSS

## Performance Considerations

- **Code Splitting**: Components can be lazy-loaded when needed
- **Tree Shaking**: Barrel exports allow for optimal bundling
- **Memoization**: Components use React.memo where appropriate
- **Asset Optimization**: Integration with Vite's asset optimization

## Testing Strategy

- **Component Isolation**: Each component can be tested independently
- **Props Testing**: Verify component behavior with different prop combinations
- **Accessibility**: Components include ARIA labels and keyboard navigation
- **Visual Regression**: Snapshot testing for visual consistency

## Migration Notes

The refactoring maintains all existing functionality while improving:

- **Maintainability**: Changes to UI patterns happen in one place
- **Consistency**: Standardized spacing, typography, and interaction patterns
- **Reusability**: Components can be composed in different ways
- **Type Safety**: Full TypeScript interfaces for all components
- **Developer Experience**: Clear component contracts and barrel exports

## Future Enhancements

- **Theming System**: Support for multiple color themes
- **Animation Library**: Consistent animations across components
- **Form Components**: Standardized form inputs and validation
- **Data Loading**: Integrated loading states and error handling
- **Storybook Integration**: Component documentation and testing playground
