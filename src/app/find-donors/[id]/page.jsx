'use client'
import Loading from "@/components/Loading";
import { ArrowLeft, Award, Calendar, Droplet, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json())

const Page = () => {
    const { id } = useParams()
    // console.log(id);

    const { data: donor, isLoading, isError } = useSWR(`/api/donors/${id}`, fetcher)

    if (isLoading) return <Loading />;
    if (isError) return "Error!!!"

    // console.log(donor);

    return (
        <div className="bg-gray-100 mb-10 py-8">
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href={'/find-donors'} className="flex items-center mb-4">
                    <span> <ArrowLeft className="size-4 mr-2" /></span>
                    <span>Back to Donors</span>
                </Link>

                {/* Donor Profile Card */}
                <div className="overflow-hidden mb-6">
                    <div className="bg-linear-to-r from-red-500 to-red-700 h-32"></div>
                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row gap-6 -mt-16">
                            <Image
                                src={donor.image}
                                alt={donor.name}
                                className="size-32 rounded-full border-4 border-white object-cover"
                                width={800}
                                height={600}
                                loading="eager"
                            />
                            <div className="flex-1 mt-4">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div className="bg-red-600 text-white px-6 py-3 rounded-lg md:text-center space-y-2">
                                        <div className="text-sm">{donor.name}</div>
                                        <span>{donor.availability}</span>
                                    </div>
                                    <div className="bg-red-600 text-white px-6 py-3 rounded-lg md:text-center space-y-2">
                                        <div className="text-sm">Blood Type</div>
                                        <div>{donor.bloodType}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="p-6 mb-6">
                    <h2 className="text-gray-900 mb-4">Contact Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Phone className="size-5 text-gray-400" />
                            <span className="text-gray-600">Phone:</span>
                            <a href={`tel:${donor.phone}`} className="text-red-600 hover:underline">
                                {donor.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="size-5 text-gray-400" />
                            <span className="text-gray-600">Email:</span>
                            <a href={`mailto:${donor.email}`} className="text-red-600 hover:underline">
                                {donor.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="size-5 text-gray-400" />
                            <span className="text-gray-600">Location:</span>
                            <span className="text-gray-900">{donor.location}</span>
                        </div>
                    </div>
                </div>

                {/* Donor Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="p-6">
                        <h3 className="text-gray-900 mb-4">Personal Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Age:</span>
                                <span className="text-gray-900">{donor.age} years</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Gender:</span>
                                <span className="text-gray-900">{donor.gender}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Blood Type:</span>
                                <span className="text-red-600">{donor.bloodType}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-gray-900 mb-4">Donation History</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Donations:</span>
                                <span className="text-gray-900">{donor.totalDonations}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Last Donation:</span>
                                <span className="text-gray-900">
                                    {
                                        donor.lastDonation ? donor.lastDonation : "----"
                                    }
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span>{donor.availability}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="p-6 text-center">
                        <Droplet className="size-8 text-red-600 mx-auto mb-2" />
                        <div className="text-gray-900 mb-1">{donor.totalDonations}</div>
                        <p className="text-gray-600 text-sm">Total Donations</p>
                    </div>
                    <div className="p-6 text-center">
                        <Award className="size-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-gray-900 mb-1">{donor.totalDonations * 3}</div>
                        <p className="text-gray-600 text-sm">Lives Potentially Saved</p>
                    </div>
                    <div className="p-6 text-center">
                        <Calendar className="size-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-gray-900 mb-1">
                            {
                                donor.lastDonation ? Math.floor((new Date().getTime() - new Date(donor.lastDonation).getTime()) / (1000 * 60 * 60 * 24))
                                    : '---'
                            }
                        </div>
                        <p className="text-gray-600 text-sm">Days Since Last Donation</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Page;