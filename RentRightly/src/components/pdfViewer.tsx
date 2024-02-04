import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Box from '@mui/joy/Box';

// PDF.js workerSrc configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewerTabs() {
    // State to track the number of pages in the loaded PDF document
    const [numPages, setNumPages] = React.useState<number | null>(null);

    // State to track the currently selected PDF file path
    const [pdfFile, setPdfFile] = React.useState<string | null>(null);

    // Handler when a PDF document is successfully loaded
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        // Update the state with the number of pages
        setNumPages(numPages);
    }

    // Array of PDF file paths
    const pdfs = [
        '/documents/ALight-Blacksburg-Community-Policies.pdf',
        // ... add more PDF file paths as needed
    ];

    // Set the first PDF as default if none is selected
    React.useEffect(() => {
        if (!pdfFile) {
            setPdfFile(pdfs[0]);
        }
    }, [pdfFile, pdfs]);

    return (
        <Box sx={{ position: 'relative', height: '100vh' }}>
            {/* Tabs component to switch between PDFs */}
            <Tabs
                aria-label="PDF tabs"
                value={pdfFile}
                onChange={(event, newValue) => {
                    // Ensure newValue is a string before updating state
                    if (typeof newValue === 'string') {
                        setPdfFile(newValue);
                    }
                }}
                sx={{
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'background.default',
                    zIndex: 1100,
                }}
            >
                {/* Tab list to render tabs for each PDF */}
                <TabList variant="soft">
                    {pdfs.map((pdfPath) => (
                        <Tab key={pdfPath} value={pdfPath}>
                            {`PDF ${pdfPath.split('/').pop()}`} {/* Display the file name */}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
            {/* Container for the PDF document */}
            <Box
                sx={{
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 48px)', // Adjust the height for the tab list
                }}
            >
                {/* Render the PDF document */}
                {pdfFile && (
                    <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={{
                            cMapUrl: 'cmaps/',
                            cMapPacked: true,
                        }}
                    >
                        {/* Render each page of the PDF */}
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>
                )}
            </Box>
        </Box>
    );
}
