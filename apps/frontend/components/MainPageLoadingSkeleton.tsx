"use client";

import { Box, Skeleton } from "@mui/material";

export default function MainPageLoadingSkeleton() {
    return (
        <Box>
            <Skeleton sx={{height: 100}}/>
            <Skeleton sx={{height: 10}}/>
            <Skeleton sx={{height: 90, width: "70%"}}/>
            <Skeleton sx={{height: 10}}/>
            <Skeleton sx={{height: 20}}/>
            <Skeleton sx={{height: 60, width: "90%"}}/>
        </Box>
    )
}