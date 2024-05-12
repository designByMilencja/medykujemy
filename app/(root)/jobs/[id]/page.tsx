import React from "react";
import JobCard from "@/components/job/JobCard";
import {ParamsProps} from "@/types";

const Page = ({params}: ParamsProps) => {
    const userId = params.id
    return (
        <JobCard id={userId}/>
    );
}

export default Page;
