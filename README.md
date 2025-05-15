# Timer Master

A modern React application for managing multiple timers with categories, progress tracking, and history logging.

![Timer Master Screenshot](https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- Create and manage multiple timers with custom names and durations
- Organize timers into categories
- Track progress with visual progress bars
- Bulk actions for starting, pausing, and resetting timers by category
- Timer completion notifications
- Optional halfway alerts
- Timer history logging
- Responsive design for all devices
- Local storage persistence

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Vite

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/debabrata-pw08-429/timer-master.git
```

2. Navigate to the project directory:
```bash
cd timer-master
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Creating a Timer

1. Click the "Add New Timer" button
2. Enter a name for your timer
3. Set the duration (hours, minutes, seconds)
4. Choose or create a category
5. Optionally enable halfway alert
6. Click "Add Timer"

### Managing Timers

- Start/pause individual timers using the play/pause buttons
- Reset timers to their original duration
- Delete timers you no longer need
- Use category-level controls to manage multiple timers at once

### Viewing History

Click the "History" tab to view a log of all completed timers, including:
- Timer name
- Category
- Duration
- Completion time

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── layout/         # Layout components
├── pages/          # Page components
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── App.tsx         # Root component
```

## Development Assumptions

1. Local Storage is available and accessible
2. Users have modern browsers with ES6+ support
3. Single user environment (no multi-user support)
4. No need for server-side persistence
5. Timers continue running only while the app is open

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev)
- UI styling with [Tailwind CSS](https://tailwindcss.com)
