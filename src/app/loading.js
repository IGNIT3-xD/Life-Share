import React from 'react';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <HashLoader color="#951515" />
        </div>
    );
};

export default loading;