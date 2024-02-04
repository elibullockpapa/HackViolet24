import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import TenantView from './components/TenantView';
import EntranceInterface from './components/EntranceInterface';
import RenterUI from './components/RenterUI';
import LandlordPage from './components/LandlordView';
import LandlordUI from './components/LandlordUI';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntranceInterface />} />
          <Route path="/renter" element={<RenterUI />} />
          <Route path="/tenantview" element={<TenantView />} />
          <Route path="/landlordview" element={<LandlordPage />} />
          <Route path="/landlord" element={<LandlordUI />} />
          {/* Add additional routes as needed */}
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
