import { useState } from 'react';
import { Button, Box, Card, CardContent, Typography, FormControl, Input, Stack, CardOverflow, AspectRatio } from '@mui/joy';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState<{ userQuery: string; chatbotResponse: string }[]>([]);

    // TODO: parse pdfs and concatenate them so that they can be fed as context to the chatGPT api

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData.entries());
        const userQuery = formValues.userQuery as string;

        // TODO: Call your API with userQuery here and get the response
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
                                <AspectRatio
                                    ratio="1"
                                    variant="outlined"
                                    sx={{ minWidth: 40, alignSelf: 'center', borderRadius: 'sm', marginLeft: 1 }}
                                >
                                    <div>
                                        <PersonRoundedIcon />
                                    </div>
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body-md">{entry.userQuery}</Typography>
                            </CardContent>
                        </Card>
                        <Card orientation="horizontal" key={index} variant="soft" sx={{ my: 1, textAlign: 'left' }}>
                            <CardOverflow>
                                <AspectRatio
                                    ratio="1"
                                    variant="outlined"
                                    sx={{ minWidth: 40, alignSelf: 'center', borderRadius: 'sm', marginLeft: 1 }}
                                >
                                    <div>
                                        <SmartToyRoundedIcon />
                                    </div>
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body-md">{entry.chatbotResponse}</Typography>
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