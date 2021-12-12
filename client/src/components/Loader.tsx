import React from "react";
import Stack from '@mui/material/Stack';
import {Skeleton} from "@mui/material";

const Loader: React.FC = () => {
    return (
        <Stack>
            <Skeleton variant="text" height={120} animation="wave" />
            <Skeleton variant="text" height={120} animation="wave" /> 
            <Skeleton variant="text" height={120} animation="wave" /> 
        </Stack>
    )
}

export default Loader;