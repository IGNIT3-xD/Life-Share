'use client'

import { Eye, Trash2, UserRoundPen, View } from "lucide-react";
import Swal from "sweetalert2";
import useSWR, { mutate } from "swr";
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import Loading from "@/components/Loading";

const fetcher = (url) => fetch(url).then(res => res.json())

const Page = () => {
    const { user, isSignedIn } = useUser();
    const { data, isLoading, isError } = useSWR('/api/donors', fetcher)

    if (isLoading) return <Loading />;
    if (isError) return "Error!!!"

    if (!isSignedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-600">You need to be signed in to access this page.</p>
                </div>
            </div>
        );
    }
    // console.log(data);

    const userEmail = user?.emailAddresses[0]?.emailAddress;
    // console.log(userEmail);

    // const handleDelete = async (id) => {
    //     const result = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     });

    //     if (result.isConfirmed) {
    //         try {
    //             const res = await fetch(`/api/all-donors/${id}`, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             });

    //             const json = await res.json();

    //             if (!res.ok) {
    //                 throw new Error(json.error || 'Failed to delete');
    //             }

    //             if (json.deletedCount) {
    //                 await Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Donor has been deleted successfully.",
    //                     icon: "success"
    //                 });

    //                 // Refresh the data
    //                 mutate('/api/donors');
    //             }
    //         } catch (error) {
    //             console.error('Delete error:', error);
    //             await Swal.fire({
    //                 title: "Error!",
    //                 text: error.message || "Failed to delete the donor.",
    //                 icon: "error"
    //             });
    //         }
    //     }
    // };

    const handleDelete = async (id, donorEmail) => {
        if (userEmail !== donorEmail) {
            await Swal.fire({
                title: "Access Denied!",
                text: "You can only delete your own donor profile.",
                icon: "error"
            });
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/all-donors/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const json = await res.json();

                if (!res.ok) {
                    if (res.status === 403) {
                        throw new Error('You can only delete your own donor profile');
                    }
                    throw new Error(json.error || 'Failed to delete');
                }

                if (json.deletedCount) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Donor has been deleted successfully.",
                        icon: "success"
                    });

                    // Refresh the data
                    mutate('/api/donors');
                }
            } catch (error) {
                console.error('Delete error:', error);
                await Swal.fire({
                    title: "Error!",
                    text: error.message || "Failed to delete the donor.",
                    icon: "error"
                });
            }
        }
    };

    return (
        <div className='mb-10 py-10'>
            <div className="mb-8">
                <h1 className="text-gray-900 my-2 text-2xl md:text-3xl">Manage Donors</h1>
                <p className="text-gray-600">
                    View, edit, and manage all your blood donoation status in the system.
                </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="p-6 border border-black/10 rounded-2xl">
                    <div className="text-gray-600 mb-1">Total Donors</div>
                    <div className="text-gray-900 text-xl">{data.length}</div>
                </div>
                <div className="p-6 border border-black/10 rounded-2xl">
                    <div className="text-gray-600 mb-1">Available</div>
                    <div className="text-green-600 text-xl">
                        {data.filter(d => d.availability === 'Available').length}
                    </div>
                </div>
                <div className="p-6 border border-black/10 rounded-2xl">
                    <div className="text-gray-600 mb-1">Recently Donated</div>
                    <div className="text-yellow-600 text-xl">
                        {data.filter(d => d.availability === 'Recently Donated').length}
                    </div>
                </div>
                <div className="p-6 border border-black/10 rounded-2xl">
                    <div className="text-gray-600 mb-1">Total Donations</div>
                    <div className="text-red-600 text-xl">
                        {data.reduce((sum, d) => sum + d.totalDonations, 0)}
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Blood Type</th>
                            <th>Location</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Donations</th>
                            <th>Last Donation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(data =>
                                <tr key={data._id}>
                                    <td className="">
                                        <span className="font-medium">{data.name}</span> <br />
                                        <span className="text-sm">{data.email}</span>
                                    </td>
                                    <td className="badge bg-red-700 text-white text-center my-8 lg:my-4">{data.bloodType}</td>
                                    <td>{data.location}</td>
                                    <td>{data.phone}</td>
                                    <td className={`text-green-500 ${data.availability === 'Recently Donated' && 'text-green-700'}
                                        ${data.availability === 'Not Available' && 'text-red-500'}`}>{data.availability}</td>
                                    <td>{data.totalDonations}</td>
                                    <td>{data.lastDonation}</td>
                                    <td className="flex items-center gap-2">
                                        <Link href={`/find-donors/${data._id}`} className="btn btn-xs"><Eye size={16} /></Link>
                                        <button onClick={() => handleDelete(data._id, data.email)} className="btn btn-xs"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Page;