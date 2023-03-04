import { Laufsteg } from '../src/components';
import { Reviewlaufsteg } from './compoents/Reviewlaufsteg';

function App() {
  return (
    <div className="App">
      <Laufsteg friction={8}>
        <strong className="demo-text-large">WOOOOOOOW</strong>
      </Laufsteg>
      <Reviewlaufsteg />
    </div>
  );
}

export default App;
