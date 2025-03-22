# D3xtra Electron

A modern interactive 3D pathfinding application built with Electron, React, and Three.js that visualizes shortest path algorithms and handles dynamic obstacles.

![D3xtra Electron App](resources/map.glb)

## Features

- **Interactive 3D Map Visualization** - Navigate and explore a 3D map with camera controls
- **Pathfinding Algorithms** - Calculate and visualize the shortest path between locations
- **Dynamic Obstacle Placement** - Add obstacles to block paths and see algorithm recalculations
- **Location Selection** - Choose start and destination points with visual pinning
- **Real-time Path Updates** - Paths update automatically when obstacles are added or removed
- **Cross-platform Support** - Works on Windows, macOS, and Linux

## Pathfinding Algorithm

The application uses **Dijkstra's Algorithm** for finding the shortest path between locations:

- **Optimal Pathfinding** - Guarantees the shortest path between any two points on the map
- **Dynamic Recalculation** - Automatically recalculates paths when obstacles are added or removed
- **Edge Weighting** - Supports different weights for different path segments
- **Graph Representation** - The map is represented as a graph with nodes and edges
- **Efficient Implementation** - Optimized for real-time performance in interactive environments

## Technologies Used

- **Electron** - For cross-platform desktop application
- **React** - Frontend UI framework
- **Three.js / React Three Fiber** - 3D rendering and visualization
- **React Router** - Navigation within the application
- **Zustand** - State management
- **Tailwind CSS** - Styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/finnsatoshi03/d3xtra-electron.git
cd d3xtra-electron

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

## Usage

1. Launch the application
2. The interactive 3D map will load automatically
3. Select a starting location and destination
4. View the calculated shortest path
5. Add obstacles by toggling insert mode and clicking on path segments
6. Watch as the path recalculates in real-time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
