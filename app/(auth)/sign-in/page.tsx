"use client";

import React, { Suspense } from "react";
import Login from "@/components/forms/auth/LoginForm";

const SignIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
};

export default SignIn;
