import { useState, useEffect } from 'react';

function App() {
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    fetch('alternatives.json')
      .then(response => response.json())
      .then(data => setAlternatives(data));
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl max-w-sm mx-auto">
      <ul className="space-y-4">
        {alternatives.map(alt => (
          <li key={alt.title} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
            <div>
              <a
                href={alt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-blue-700 hover:text-blue-800 block"
              >
                {alt.title}
              </a>
              <p className="text-gray-600 text-sm">{alt.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => window.close()}
        className="mt-8 w-full px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200 ease-in-out"
      >
        Close
      </button>
    </div>
  );
}

export default App;
