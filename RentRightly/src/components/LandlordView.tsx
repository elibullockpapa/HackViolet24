import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

function LandlordPage() {
    const [documentUploaded, setDocumentUploaded] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [uploadedFile, setUploadedFile] = useState('');

    // Example address
    const exampleAddress = "123 Main St, Springfield, IL";

    const navigate = useNavigate();
    const handleLandlordClick = () => {
        navigate("/landlord");
      };

    // Example clarification questions
    const questions = [
        "Could you clarify the restrictions on pet breeds and the policy for registering pets with management?",
        "Can you detail the process for submitting maintenance requests, especially for emergencies outside normal work hours?",
        "What are the specific guidelines for modifications residents can make in their apartments, such as wall decorations or furniture arrangements?",
        "Could you elaborate on the guidelines and responsibilities of residents when they have guests, especially regarding the use of common areas and amenities?"
    ];

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setDocumentUploaded(true);
            setUploadedFile(URL.createObjectURL(file));
            // Start the AI generating process
            setTimeout(() => {
                setShowQuestions(true);
            }, 3800); // 4-second delay
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Sheet variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography level="h4" variant="outlined" color="primary">RentRightly</Typography>
                <Typography textColor="warning.600" sx={{ fontSize: 16 }}>Unfinished Contract - {exampleAddress}</Typography>
                <Button onClick={handleLandlordClick}>Save</Button>
            </Sheet>

            {!documentUploaded && (
                <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '30vh' }}>
                    <Button component="label">
                        Upload Document
                        <input type="file" hidden onChange={handleUpload} accept="application/pdf" />
                    </Button>
                    <Typography sx={{ fontSize: 14 }}>Upload the housing contract document. The AI will then generate common clarification questions.</Typography>
                </Stack>
            )}

            {documentUploaded && !showQuestions && (
                <Typography sx={{ textAlign: 'center', my: 2, fontSize: 16 }}>
                    AI is generating questions...
                </Typography>
            )}

            {documentUploaded && showQuestions && (
                <>
                    <Box sx={{ height: '70vh' }}>
                        {/* Display uploaded PDF */}
                        <object data={uploadedFile} type="application/pdf" width="100%" height="100%">
                            <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={uploadedFile}>Download PDF</a>.</p>
                        </object>
                    </Box>

                    <Stack spacing={2} sx={{ p: 2, alignItems: 'center' }}>
                        <Typography sx={{ textAlign: 'center', my: 2, fontSize: 20, fontWeight: 'bold' }}>
                            AI Clarification Questions
                        </Typography>
                        {questions.map((question, index) => (
                            <Box key={index} sx={{ width: '100%', maxWidth: 500 }}>
                                <Typography sx={{ fontSize: 16, mb: 1 }}>{question}</Typography>
                                <Input fullWidth placeholder="Type your answer here" />
                            </Box>
                        ))}
                    </Stack>
                </>
            )}
        </Box>
    );
}

export default LandlordPage;
