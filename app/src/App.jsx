import { useState, useEffect } from 'react';

function App() {
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    fetch('alternatives.json')
      .then(response => response.json())
      .then(data => setAlternatives(data));
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Alternatives to YouTube</h1>
      <ul>
        {alternatives.map(alt => (
          <li key={alt.title} className="mb-4">
            <a
              href={alt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {alt.title}
            </a>
            <p className="text-gray-600">{alt.description}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => window.close()}
        className="mt-4 w-full px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
      >
        Close
      </button>
    </div>
  );
}

export default App;
