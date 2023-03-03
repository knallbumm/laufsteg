import React from 'react';

import { Laufsteg } from '../src/components';

function App() {
  return (
    <div className="App">
      <Laufsteg friction={8}>
        <strong className="demo-text-large">WOOOOOOOW</strong>
      </Laufsteg>
    </div>
  );
}

export default App;
