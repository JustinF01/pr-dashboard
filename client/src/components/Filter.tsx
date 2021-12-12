import React from "react";
import { MenuItem, Box, TextField } from "@mui/material";

interface Props {
    filter: string;
    filters: string[];
    filterMethod: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    helperText: string;
}

const Filter: React.FC<Props> = ({filter, filters, filterMethod, label, helperText}) => {
    return (
        <Box sx={{mr: 1}}>
            <TextField
                id="outlined-select-status"
                select
                fullWidth
                label={label}
                value={filter}
                size="small"
                onChange={filterMethod}
                helperText={helperText}
                >
                { label === "Status" ? <MenuItem value="All">All</MenuItem> : null }
                {filters.map((option, index) => (
                    
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}

export default Filter;