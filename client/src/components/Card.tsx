import React from "react";
import { Divider, Typography, Box, Paper, Chip} from "@mui/material";
import { pullRequest } from "../models/pr";
import moment from 'moment';

interface Props {
    item:  pullRequest;
}

const Card: React.FC<Props> = ({item}) => {
    return (
        <Box sx={{my: 1}}>
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
                                <Typography>{moment(item.date).format("DD/MM/YYYY hh:mm:ss")}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Box>
    )
}

export default Card;