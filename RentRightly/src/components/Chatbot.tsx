import { useState } from 'react';
import { Button, Box, Card, CardContent, Typography, FormControl, Input, Stack, AspectRatio, CardOverflow } from '@mui/joy';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState<{ userQuery: string; chatbotResponse: string }[]>([]);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const userQuery = formValues.userQuery as string;

        // Call your API with userQuery here and get the response
        // For demonstration, I'm using a placeholder response
        const chatbotResponse = "Placeholder response";

        setChatHistory([...chatHistory, { userQuery, chatbotResponse }]);
        event.currentTarget.reset(); // Reset the form after submission
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', textAlign: 'center', p: 1 }}>
            <Typography level="h1" component="h1" mb={2}>
                Q&A
            </Typography>

            {/* Chat history */}
            <Box
                sx={{
                    overflow: 'auto',
                    flex: 1, // This will make the chat history take all available space
                    mb: 1,
                }}
            >
                {chatHistory.map((entry, index) => (
                    <div>
                        <Card orientation="horizontal" key={index} variant="outlined" sx={{ my: 1, textAlign: 'left' }}>
                            <CardOverflow>
                                <ArrowUpwardRoundedIcon />
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body-md">User: {entry.userQuery}</Typography>
                            </CardContent>
                        </Card>
                        <Card orientation="horizontal" key={index} variant="outlined" sx={{ my: 1, textAlign: 'left' }}>
                            <CardContent>
                                <Typography level="body-md">Chatbot: {entry.chatbotResponse}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </Box>

            {/* Form for user query */}
            <form onSubmit={handleFormSubmit}>
                <Stack spacing={1}>
                    <FormControl>
                        <Input
                            name="userQuery"
                            id="user-query"
                            placeholder="Ask any question about your paperwork"
                            endDecorator={<Button type="submit" size='sm' ><ArrowUpwardRoundedIcon /></Button>}
                        />
                    </FormControl>

                </Stack>
            </form>
        </Box>
    );
};

export default Chatbot;