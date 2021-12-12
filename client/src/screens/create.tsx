import React, {useState} from "react";
import { Box, Typography, TextField, Container, Paper, MenuItem, Button, CircularProgress } from "@mui/material";
import axios from "axios";

const CreateScreen: React.FC = () => {
    const [no, setNo] = useState<string>("0");
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [labels, setLabels] = useState<string>('');
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNo(event.target.value);
    }
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(event.target.value);
    }
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }
    const handleLabelsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabels(event.target.value);
    }
    const Send = () => {
        setLoading(true);
        const sanitizedLabels = labels.toLowerCase().replace(/ /g, '');
        console.log(sanitizedLabels);
        const data = {
            no,
            title,
            description,
            author,
            status,
            labels: sanitizedLabels.split(','),
            date: new Date()
        };
        axios.post("/post/prs/", data)
        .then(res => {
            setNo("");
            setTitle("");
            setDescription("");
            setStatus("");
            setLabels('');
            setAuthor("");
            setLoading(false);
        })
        .catch(error => console.log(error));

    }
    const statuses: string[] = ["Open", "Closed", "Draft"];
    return (
        <Box>
            <Box>
                <Container maxWidth="md">
                    <Box sx={{py: 2}}>
                        <Typography component="h1" variant="h4">Create a Pull Request</Typography>
                    </Box>
                    {/* user feedback message here */}
                    { loading ? <CircularProgress/> : null }
                    <Paper variant="outlined">
                        <Box component="form" autoComplete="false" sx={{p: 2, display: "flex", justifyContent: "flex-start", alignItems: "stretch", flexDirection: "column"}}>
                            <Box sx={{display: "flex", width: "100%"}}>
                                <Box sx={{maxWidth: "120px", flexGrow: "1"}}>
                                    <TextField id="no" label="Number" value={no} onChange={handleNoChange} />
                                </Box>
                                <Box sx={{width: "100%", ml: 1}}>
                                    <TextField  fullWidth id="title" label="Title" value={title} onChange={handleTitleChange} />
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{my: 1}}>
                                    <TextField  fullWidth id="description" label="Description" value={description} onChange={handleDescChange} multiline rows={4} />
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                                    <Box sx={{flexGrow: 1}}>
                                        <TextField fullWidth id="author" label="Author" value={author} onChange={handleAuthorChange} />
                                    </Box>
                                    <Box sx={{width: "100%", maxWidth: "120px", mx: 1}}>
                                        <TextField fullWidth id="status" label="Status" select value={status} onChange={handleStatusChange}>
                                            {statuses.map((s, index) => {
                                                return <MenuItem key={index} value={s}>{s}</MenuItem>
                                            })}
                                        </TextField>
                                    </Box>
                                    <Box sx={{flexGrow: 1}}>
                                        <TextField fullWidth id="labels" label="Labels" value={labels} onChange={handleLabelsChange} helperText="Please use comma(,) separated values(CSV)" />
                                    </Box>

                                </Box>
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "flex-end", my: 1}}>
                                <Button variant="contained" onClick={Send}>Send Pull Request</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Box>
    )
}

export default CreateScreen;