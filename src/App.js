import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home';
// Import other components as needed

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
        {/* Other components */}
      </div>
    </QueryClientProvider>
  );
}

export default App;