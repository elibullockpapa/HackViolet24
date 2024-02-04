import React, { useState, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Box from '@mui/joy/Box';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure the location of the pdf.worker.js file. This is required for PDF.js to work.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

// Options for the PDF.js Document component
const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

// Maximum width for the rendered PDF Page
const maxWidth = 800;

// The main functional component for the PDF viewer with tabs
const PDFViewerTabs: React.FC = () => {
    // State for tracking the total number of pages in the loaded PDF
    const [numPages, setNumPages] = useState<number | null>(null);

    // State for the current PDF file path or File object
    const [pdfFile, setPdfFile] = useState<string | null>('/documents/ALight-Blacksburg-Community-Policies.pdf');

    // Ref for the container div to attach the resize observer
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

    // State for tracking the width of the container, for responsive page sizing
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

    // Callback for the resize observer to update container width
    const onResize = useCallback((entries: ResizeObserverEntry[]) => {
        const [entry] = entries;
        setContainerWidth(entry.contentRect.width);
    }, []);

    // Hook to listen for resize events on the containerRef
    useResizeObserver(containerRef, {}, onResize);

    // Callback for when the PDF document has loaded successfully
    function onDocumentLoadSuccess({ numPages: loadedNumPages }: { numPages: number }) {
        setNumPages(loadedNumPages);
    }

    // Array of PDF file paths for the tabs
    const pdfs = [
        '/documents/ALight-Blacksburg-Community-Policies.pdf',
        '/documents/agreement.pdf',
        // ... add more PDF file paths as needed
    ];

    return (
        <Box sx={{ position: 'relative', height: '100vh' }}>
            {/* Tabs component for selecting the PDF to view */}
            <Tabs
                aria-label="PDF tabs"
                value={pdfFile}
                onChange={(event, newValue) => {
                    // Update the current PDF file based on tab selection
                    if (typeof newValue === 'string') {
                        setPdfFile(newValue);
                    }
                }}
                sx={{
                    position: 'sticky',
                    top: 0,
                    bgcolor: 'background.default',
                    zIndex: 1100, // Ensure the tabs stay on top
                }}
            >
                {/* List of tabs corresponding to the PDFs */}
                <TabList variant="soft">
                    {pdfs.map((pdfPath) => (
                        <Tab key={pdfPath} value={pdfPath}>
                            {/* Extract and display the file name from the path */}
                            {pdfPath.split('/').pop()}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
            {/* Container for the PDF document */}
            <div ref={setContainerRef} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 48px)' }}>
                {/* Conditional rendering of the Document component */}
                {pdfFile && (
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                        {/* Render a Page component for each page in the PDF */}
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                            />
                        ))}
                    </Document>
                )}
            </div>
        </Box>
    );
};

export default PDFViewerTabs;
