import { Laufsteg } from 'laufsteg-react';
import React from 'react';

import { ReviewLaufsteg } from './compoents/ReviewLaufsteg';

function App() {
  return (
    <div className="App">
      <Laufsteg friction={8}>
        <strong className="demo-text-large">WOW</strong>
      </Laufsteg>
      <ReviewLaufsteg />
    </div>
  );
}

export default App;
