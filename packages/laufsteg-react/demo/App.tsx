import { Laufsteg } from '../src/components';
import { ReviewLaufsteg } from './compoents/ReviewLaufsteg';

function App() {
  return (
    <div className="App">
      <Laufsteg friction={8}>
        <strong className="demo-text-large">WOOOOOOOW</strong>
      </Laufsteg>
      <ReviewLaufsteg />
    </div>
  );
}

export default App;
