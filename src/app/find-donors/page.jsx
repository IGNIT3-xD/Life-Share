"use client"
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
    const [search, setSearch] = useState('')
    const [bloodGrp, setBloodGrp] = useState('')
    const [status, setStatus] = useState('')

    const { data, error, isValidating } = useSWR(`/api/donors?search=${search}&bloodGroup=${encodeURIComponent(bloodGrp)}&status=${status}`, fetcher, {
        revalidateOnFocus: false,
        keepPreviousData: true,
    });

    if (!data && !error) return <Loading />;

    // console.log(search);
    // console.log(bloodGrp);
    // console.log(status);

    return (
        <div>
            {/* Heading */}
            <div className="my-8">
                <h1 className="text-gray-900 mb-3 text-2xl md:text-3xl lg:text-4xl font-medium">Find Blood Donors</h1>
                <p className="text-gray-600 md:text-xl">
                    Search our database of registered blood donors. Connect with donors who
                    match your requirements.
                </p>
            </div>
            {/* Search & filter */}
            <div className='px-3 py-5 border border-black/10 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between'>
                {/* Search */}
                <label className="input w-full md:w-auto">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearch(e.target.value)} type="search" className="grow" placeholder="Search by name" />
                </label>
                {/* Filter */}
                <div className='space-y-4 w-full md:w-auto md:space-y-0 md:space-x-4'>
                    <select
                        onChange={(e) => setBloodGrp(e.target.value)}
                        defaultValue=""
                        className="select w-full md:w-40 lg:w-48"
                    >
                        <option value="" disabled>Filter by Blood Group</option>
                        <option value="">All</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                    <select onChange={(e) => setStatus(e.target.value)} defaultValue="Status" className="select w-full md:w-40 lg:w-48">
                        <option value='' disabled>Status</option>
                        <option value={''}>All</option>
                        <option>Available</option>
                        <option>Not Available</option>
                        <option>Recently Donated</option>
                    </select>
                </div>
            </div>
            <div className="my-6">
                <p className="text-gray-600">
                    Showing {data.length} donors
                </p>
            </div>
            {/* Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                {
                    data.map(donor =>
                        <div key={donor._id} className="shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <Image
                                        src={donor.image}
                                        alt={donor.name}
                                        className="size-16 rounded-full object-cover"
                                        width={80}
                                        height={80}
                                        loading='eager'
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-gray-900 mb-1">{donor.name}</h3>
                                        <div className={`text-green-500 ${donor.availability === 'Recently Donated' && 'text-green-700'}
                                        ${donor.availability === 'Not Available' && 'text-red-500'}`}>
                                            {donor.availability}
                                        </div>
                                    </div>
                                    <div className="bg-red-600 text-white px-3 py-1 rounded-lg">
                                        {donor.bloodType}
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Age:</span>
                                        <span className="text-gray-900">{donor.age} years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Location:</span>
                                        <span className="text-gray-900">{donor.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Donations:</span>
                                        <span className="text-gray-900">{donor.totalDonations}</span>
                                    </div>
                                </div>

                                <Link href={`/find-donors/${donor._id}`} className="btn text-white w-full bg-red-600 hover:bg-red-700">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Page;