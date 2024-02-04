import React, { useState, useCallback, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Box from '@mui/joy/Box';
import { useResizeObserver } from '@wojtekmaj/react-hooks';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 800;

const PDFViewerTabs: React.FC = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pdfFile, setPdfFile] = useState<string | null>('/documents/ALight-Blacksburg-Community-Policies.pdf');
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

    const onResize = useCallback((entries: ResizeObserverEntry[]) => {
        const [entry] = entries;
        setContainerWidth(entry.contentRect.width);
    }, []);

    useResizeObserver(containerRef, {}, onResize);

    function onDocumentLoadSuccess({ numPages: loadedNumPages }: { numPages: number }) {
        setNumPages(loadedNumPages);
    }

    const pdfs = [
        '/documents/ALight-Blacksburg-Community-Policies.pdf',
        '/documents/agreement.pdf',
        // ... add more PDF file paths as needed
    ];

    return (
        <Box sx={{ position: 'relative', height: '100vh' }}>
            <Tabs
                aria-label="PDF tabs"
                value={pdfFile}
                onChange={(event, newValue) => {
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
                <TabList variant="soft">
                    {pdfs.map((pdfPath) => (
                        <Tab key={pdfPath} value={pdfPath}>
                            {pdfPath.split('/').pop()}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
            <div ref={setContainerRef} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 48px)' }}>
                {pdfFile && (
                    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} options={options}>
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
