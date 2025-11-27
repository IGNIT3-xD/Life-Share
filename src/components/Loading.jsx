import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <HashLoader color="#951515" />
        </div>
    );
};

export default Loading;