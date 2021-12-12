import React, { ChangeEvent, useEffect, useState } from "react";
import { List, Typography, Box, Container } from "@mui/material";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filters";
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
                   {/** status, statuses and handleStatusChange */}
                   <Filter filter={status} filters={statuses} filterMethod={handleStatusChange} label="Status" helperText="Filter by Status" />
                   <Filter filter={label} filters={filterLabels} filterMethod={handleLabelChange} label="Labels" helperText="Filter by Labels" />
                   <Filter filter={sort} filters={sortOptions} filterMethod={sortBy} label="Sort By" helperText="Sort Items" />
                </Box>

                { loading ? <Loader/> : <List>{data}</List> }
            </Container>
        </Box>
    )
}

export default ListScreen;