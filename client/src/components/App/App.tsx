

import Container from "../Container/Container";
import ListScreen from '../../screens/list';
import CreateScreen from '../../screens/create';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<CreateScreen/>}/>
          <Route path="/list-prs" element={<ListScreen/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
