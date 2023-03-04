import { Laufsteg } from '../src/components';
import { ReviewLaufband } from './compoents/ReviewLaufband';

function App() {
  return (
    <div className="App">
      <Laufsteg friction={8}>
        <strong className="demo-text-large">WOOOOOOOW</strong>
      </Laufsteg>
      <ReviewLaufband />
    </div>
  );
}

export default App;
