import React, { ChangeEvent, useEffect, useState } from "react";
import { List, Typography, Box, TextField, MenuItem, Container } from "@mui/material";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { pullRequest } from "../models/pr";
import axios from "axios";
var arraySort = require('array-sort');


const ListScreen: React.FC = () => {
    const [items, setItems] = useState<pullRequest[]>([]);
    const [status, setStatus] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [statuses, setStatuses] = useState<string[]>([]);
    const [filterLabels, setFilterLabels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [sort, setSort] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get("/get/prs/")
        .then(res => {
            setItems(res.data);
            setLoading(false);
        })
        .catch(error => console.log(error.message));
    }, []);

    useEffect(() => {
        if (status) {
            setLoading(true);
            axios.post("/filter/status/", {status})
            .then(res => {setItems(res.data); setLoading(false);})
            .catch(error => console.log(error));
        }
    }, [status]);

    useEffect(() => {
        if (label) {
            setLoading(true);
            axios.post("/filter/label/", {label})
            .then(res => {setItems(res.data); setLoading(false);})
            .catch(error => console.log(error));
        }
    }, [label]);

    useEffect(() => {
        if (sort) {
            switch (sort) {
                case "Title ASC":
                    arraySort(items, "title");
                break;
                case "Title DESC":
                    arraySort(items, "title", {reverse: true});
                break;
                case "No ASC":
                    arraySort(items, "no");
                break;
                case "No DESC":
                    arraySort(items, "no", {reverse: true});
                break;
                default:
                break;
            }
        }
       
    }, [sort, items]);

    // PR card or item
    const data = items.map((item, index) => {
        return <Card key={index} item={item} />
    });

    // filter options for label and status
    items.forEach(item => {
        if (statuses.find(s => s === item.status) === undefined) {
            statuses.push(item.status);
        }
    });

    items.forEach((item) => {
        item.labels.forEach((i) => {
            if ( filterLabels.includes(i.toLowerCase()) === false ) {
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

    const sortOptions = [
        "Title ASC",
        "Title DESC",
        "No ASC",
        "No DESC"
    ];

    const sortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort(event.target.value);
    }

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
                    <Box sx={{mr: 1}}>
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
                    <Box sx={{width: "100%", maxWidth: "120px"}}>
                        <TextField
                            id="outlined-select-sort"
                            select
                            fullWidth
                            label="Sort By"
                            value=""
                            size="small"
                            onChange={sortBy}
                            helperText="Sort Items"
                            >
                            {sortOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>

                { loading ? <Loader/> : <List>{data}</List> }
            </Container>
        </Box>
    )
}

export default ListScreen;