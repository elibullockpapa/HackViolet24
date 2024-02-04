import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import ContractsViewer from './ContractsViewer';
import Chatbot from './Chatbot';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Card sx={{ flex: 1, overflow: 'auto', marginRight: '0.5rem' }}>
          <ContractsViewer />
        </Card>
        <Card sx={{ flex: 1, overflow: 'auto', marginLeft: '0.5rem' }}>
          <Chatbot />
        </Card>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
