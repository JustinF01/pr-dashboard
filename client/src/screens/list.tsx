import React, { useEffect, useState } from "react";
import { List, Divider, Typography, Box, Paper, Chip,  TextField, MenuItem, Container } from "@mui/material";
import { pullRequest } from "../models/pr";
import axios from "axios";
import moment from 'moment';


const ListScreen: React.FC = () => {
    const [items, setItems] = useState<pullRequest[]>([]);
    const [status, setStatus] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [statuses, setStatuses] = useState<string[]>([]);
    const [filterLabels, setFilterLabels] = useState<string[]>([]);

    useEffect(() => {
        axios.get("/get/prs/")
        .then(res => setItems(res.data))
        .catch(error => console.log(error.message));
    }, []);
    useEffect(() => {
        if (status) {
            axios.post("/filter/status/", {status})
            .then(res => setItems(res.data))
            .catch(error => console.log(error));
        }
       
    }, [status]);
    useEffect(() => {
        if (label) {
            axios.post("/filter/label/", {label})
            .then(res => setItems(res.data))
            .catch(error => console.log(error));
        }
       
    }, [label]);

    const data = items.map((item, index) => {
        return (
            <Box key={index} sx={{my: 1}}>
                <Paper elevation={3}>
                    <Box sx={{display: "flex", alignItems: "center", py: 1, px: 2}}>
                        <Box sx={{mr: 1, p: 1, borderRadius: "8px", bgcolor: "success.light", color: "white", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Typography>{item.no}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">{item.title}</Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "stretch", p: 2, flexWrap: "wrap"}}>
                        <Box>
                            <Typography variant="h6">Description</Typography>
                            <Divider/>
                            <Box sx={{mt: 1}}>
                                <Typography>{item.description}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6">Author</Typography>
                            <Divider/>
                            <Box sx={{mt: 1}}>
                                <Typography>{item.author}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6">Status</Typography>
                            <Divider/>
                            <Box sx={{mt: 1}}>
                                <Typography>{item.status}</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6">Labels</Typography>
                            <Divider/>
                            <Box sx={{mt: 1}}>
                                { item.labels.map( (label, index) => ( <Box key={index} component="span" sx={{mx: "2px"}}><Chip label={label} color="success" size="small"/></Box> ) ) }
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h6">Date</Typography>
                            <Divider/>
                            <Box sx={{mt: 1}}>
                                <Typography>{moment(item.creation_date).format("DD/MM/YYYY")}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        )
    });
    // filter forms

    items.forEach(item => {
        if (statuses.find(s => s === item.status) === undefined) {
            statuses.push(item.status);
        }
    });
    items.forEach((item) => {
        item.labels.forEach((i) => {
            if ( filterLabels.includes(i) === false ) {
                filterLabels.push(i);
            }
        });
    });
    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };
    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value);
    };
    

    return (
        <Box>
            <Container  maxWidth="md">
                <Typography component="h1" variant="h4">All Pull Requests</Typography>
                <Box component="form" noValidate autoComplete="off" sx={{p: 1, display: "flex", justifyContent: "flex-start", alignItems: "stretch", flexWrap: "wrap"}}>
                    <Box sx={{mr: 1}}>
                        <TextField
                            id="outlined-select-status"
                            select
                            fullWidth
                            label="Status"
                            value={status}
                            size="small"
                            onChange={handleStatusChange}
                            helperText="Filter on status"
                            >
                            <MenuItem value="All">All</MenuItem>
                            {statuses.map((option, index) => (
                                
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box>
                        <TextField
                            id="outlined-select-label"
                            select
                            fullWidth
                            label="Labels"
                            value={label}
                            size="small"
                            onChange={handleLabelChange}
                            helperText="Filter on label"
                            >
                            {filterLabels.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>
                <List>
                    {data}
                </List>
            </Container>
        </Box>
    )
}

export default ListScreen;