import Image from 'next/image';
import React from 'react';

const Error = () => {
    return (
        <div className='my-10'>
            <Image className='mx-auto rounded-2xl' src='/error.png' alt='401 error image' width={600} height={600} loading='eager' />
            <p className='text-center mt-5 font-medium text-xl text-red-600'>You must be logged in to access this page.</p>
        </div>
    );
};

export default Error;