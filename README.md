# DSA Playground

Interactive Data Structures and Algorithms visualizations with a built-in code editor.

## Features

- 🎯 **Algorithm Visualizations**: Step-by-step execution of popular algorithms
- 💻 **Interactive Code Editor**: Modify and run algorithm code in real-time
- 📊 **Visual Feedback**: See how data structures change during algorithm execution
- 🎨 **Modern UI**: Clean, responsive design built with Tailwind CSS
- ⚡ **Fast**: Built with Next.js 16 and React 19

## Supported Algorithms

- **Binary Search**: Visualize searching in sorted arrays
- **Two Sum**: Hash map-based solution visualization
- More algorithms coming soon!

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code editor)
- **Code Parsing**: Acorn + AST manipulation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dsa-playground
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── layout.tsx      # Root layout with sidebar
│   ├── page.tsx        # Dashboard page
│   └── [topic]/        # Dynamic topic routes
├── components/         # Reusable UI components
│   └── ui/            # Base UI components
├── features/          # Feature-specific components
│   └── dsa/
│       ├── algorithms/     # Algorithm step generators
│       ├── components/     # DSA-specific components
│       ├── controls/       # Playback controls
│       ├── data/          # Algorithm data
│       ├── editor/        # Code editor component
│       ├── pages/         # Feature pages
│       ├── types/         # TypeScript types
│       └── visualizer/    # Visualization components
└── lib/               # Utility functions
    ├── code-instrumenter.ts  # Code AST manipulation
    └── utils.ts              # General utilities
```

## Architecture

### Microfrontend Integration

This application is designed to be embedded as a microfrontend in the main portfolio:

- Runs on port 3001 (separate from main portfolio)
- Configured for iframe embedding with proper security headers
- Communicates with parent frame when needed

### Code Instrumentation

The playground uses AST manipulation to inject logging statements into user code:

1. Parse user code with Acorn
2. Walk the AST to find loops and statements
3. Inject `logStep()` calls to capture state
4. Generate instrumented code with Astring
5. Execute and capture visualization steps

### State Management

- React state for UI interactions
- Step-based state for algorithm visualization
- No external state management library needed

## Adding New Algorithms

1. Create step generator in `src/features/dsa/algorithms/`
2. Add algorithm data to `src/features/dsa/data/topics.ts`
3. Create visualizer component if needed
4. Update routing in `src/app/[topic]/[pattern]/[problemId]/page.tsx`

## Contributing

1. Follow the established code quality standards (see CLAUDE.md)
2. Write tests for new components
3. Use proper TypeScript typing (no `any` types)
4. Run linting before committing
5. Follow the existing component patterns

## Deployment

The application is configured for easy deployment to Vercel:

1. Connect repository to Vercel
2. Configure build settings (auto-detected)
3. Set environment variables if needed
4. Deploy

## License

This project is part of Kiran's portfolio and is for demonstration purposes.