import { Heart } from 'lucide-react';
import React from 'react';

const BecomeDonerHeader = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="text-center mb-8">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="size-8 text-red-600" />
                </div>
                <h1 className="text-gray-900 mb-2 text-2xl md:text-3xl">Become a Blood Donor</h1>
                <p className="text-gray-600">
                    Fill out the form below to register as a blood donor and help save lives.
                </p>
            </div>

            <div className="p-6 mb-8 md:w-[500px] bg-blue-50 border-blue-200">
                <h3 className="text-gray-900 mb-2">Eligibility Requirements</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Be at least 17 years old (or 16 with parental consent)</li>
                    <li>• Weigh at least 110 pounds</li>
                    <li>• Be in good general health</li>
                    <li>• Have not donated blood in the last 56 days</li>
                </ul>
            </div>
        </div>
    );
};

export default BecomeDonerHeader;