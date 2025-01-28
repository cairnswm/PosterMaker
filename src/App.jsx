import React from 'react';
import PosterMaker from './components/PosterMaker';
import { PosterProvider } from './context/PosterContext';

function App() {
  return (
    <PosterProvider>
      <div className="vh-100 d-flex flex-column">
        <header className="bg-white border-bottom p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="h3 mb-0">Poster Maker</h1>
            <div className="btn-group">
              <button className="btn btn-outline-primary" onClick={() => window.posterContext.newPoster()}>
                New
              </button>
              <button className="btn btn-outline-primary" onClick={() => window.posterContext.exportPoster()}>
                Export
              </button>
              <button className="btn btn-outline-primary" onClick={() => document.getElementById('import-file').click()}>
                Import
              </button>
              <button className="btn btn-outline-primary" onClick={() => window.posterContext.saveAsImage()}>
                Save as PNG
              </button>
            </div>
          </div>
          <p className="text-center text-muted mb-0">Create beautiful posters with ease</p>
          <input
            type="file"
            id="import-file"
            className="d-none"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) window.posterContext.importPoster(file);
              e.target.value = '';
            }}
            accept=".json"
          />
        </header>
        <div className="flex-grow-1">
          <PosterMaker />
        </div>
      </div>
    </PosterProvider>
  );
}

export default App;