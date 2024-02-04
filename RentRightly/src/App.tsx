import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import TenantView from './components/TenantView';
import EntranceInterface from './components/EntranceInterface';
import RenterUI from './components/RenterUI';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntranceInterface />} />
          <Route path="/renter" element={<RenterUI />} />
          <Route path="/tenantview" element={<TenantView />} /> {/* Add the route for PDFViewer */}
          {/* Add additional routes as needed */}
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
