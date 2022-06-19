import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Contribute from "./routes/contribute";
import Create from "./routes/create";
import Intake from "./routes/intake";
import Settings from "./routes/settings";
import Officers from "./routes/officers";
import Officer from "./routes/officer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="contribute" element={<Contribute />} />
          <Route path="create" element={<Create />} />
          <Route path="intake" element={<Intake />} />
          <Route path="settings" element={<Settings />} />
          <Route path="officer">
            <Route path=":pid" element={<Officer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
);