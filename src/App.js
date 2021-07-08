import {LinksContext, LinksContextState} from './LinksContext';
import {LinksBlock} from './LinksBlock';

function App() {
  return (
    <LinksContext.Provider value={LinksContextState}>
      <div className="App">
        <LinksBlock />
      </div>
    </LinksContext.Provider>
  );
}

export default App;
