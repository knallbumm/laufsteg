import React from 'react';

import { Dauerlauf } from '../src/components';

function App() {
  return (
    <div className="App">
      <Dauerlauf friction={3}>
        <strong className="demo-text-large">WOOOOOOOW</strong>
      </Dauerlauf>
    </div>
  );
}

export default App;
