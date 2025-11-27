import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
    return (
        <div className='my-10 flex items-center justify-center'>
            <SignUp path='/sign-up' routing='path' signInUrl='/sign-in' />
        </div>
    );
};

export default page;