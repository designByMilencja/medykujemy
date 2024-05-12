'use client'
import YouTube from "react-youtube";
import React from "react";

interface Props {
    videoId: string
}
const YouTubeBox = ({videoId}: Props) => {
    return (
        <YouTube videoId={videoId} />
    );
}

export default YouTubeBox;
