import { useState, useEffect } from 'react';

function App() {
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    fetch('alternatives.json')
      .then(response => response.json())
      .then(data => {
        // Fisher-Yates shuffle
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }
        setAlternatives(data);
      });
  }, []);

  return (
    <div className="w-full h-full bg-slate-900 text-slate-50 p-4 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[40%] bg-indigo-600/20 rounded-full blur-[80px]" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[40%] bg-violet-600/20 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 tracking-tight">
            NoTube
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Focus on what matters</p>
        </header>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-6 scrollbar-hide">
          {alternatives.map((alt, index) => (
            <a
              key={alt.title}
              href={alt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2.5 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-indigo-200 transition-colors truncate">
                    {alt.title}
                  </h3>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-2 mt-0.5">
                    {alt.description}
                  </p>
                </div>
                <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={() => window.parent.postMessage({ type: 'CLOSE_NOTUBE_POPUP' }, '*')}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-white/5 hover:border-white/10 flex items-center justify-center space-x-2 group"
          >
            <span>Close Extension</span>
            <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
