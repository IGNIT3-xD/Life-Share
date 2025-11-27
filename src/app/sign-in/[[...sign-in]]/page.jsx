import { SignIn } from '@clerk/nextjs';
import React from 'react';

const page = () => {
    return (
        <div className='my-10 flex items-center justify-center'>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
};

export default page;