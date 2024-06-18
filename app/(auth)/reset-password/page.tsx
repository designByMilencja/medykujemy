import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm";
import React, { Suspense } from "react";

const Reset = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
};

export default Reset;
