import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import PDFViewer from './components/pdfViewer';

function App() {

  return (
    <CssVarsProvider>
      <CssBaseline />
      <PDFViewer />
    </CssVarsProvider>
  )
}
export default App