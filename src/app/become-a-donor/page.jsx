'use client'
import BecomeDonerHeader from "@/components/BecomeDonerHeader";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

const Page = () => {
    const { user, isSignedIn } = useUser()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

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

    const onSubmit = async (data) => {
        // console.log(data);
        const photo = data.image[0]

        const formData = new FormData()
        formData.append('image', photo)

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_KEY}`, {
            method: 'POST',
            body: formData
        })

        const photoData = await res.json()
        // console.log(photoData);
        const img = photoData.data.image.url
        // console.log(img);

        const donorInfo = {
            name: data.name,
            bloodType: data.blood,
            gender: data.gender,
            location: data.address,
            phone: data.contactNo,
            email: data.email,
            age: parseInt(data.age),
            image: img,
            availability: data.availability,
            totalDonations: parseInt(data.totalDonations)
        }


        if (photoData.success) {
            const res = await fetch('/api/become-a-donor', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donorInfo)
            })

            const result = await res.json()
            // console.log(result);
            if (result.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Thank You! For becoming a donor.",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }
        }
    }

    return (
        <div className="py-10">
            <BecomeDonerHeader />

            {/* Form */}
            <div className="p-8 border border-black/10 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-gray-900 mb-4">Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName">Your Name *</label>
                                <input {...register('name', { required: true })} type='text' className="input ml-2" placeholder='Your Name' />
                            </div>
                            <div>
                                <label htmlFor="email">Email Address *</label>
                                <input {...register('email', { required: true })} type="email" className="input ml-2" placeholder='Your Email' />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone Number *</label>
                                <input {...register('contactNo', { required: true })} type="tel" className="input ml-2" placeholder='Your Contact No.' />
                            </div>
                            <div>
                                <label htmlFor="age">Age *</label>
                                <input {...register('age', { required: true })}
                                    placeholder='Your Age'
                                    type="number"
                                    className="input ml-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth">Your Image *</label>
                                <input {...register('image', { required: true })} type="file" className="ml-2 file-input" />
                            </div>
                            <div>
                                <label htmlFor="gender">Gender *</label>
                                <select {...register('gender', { required: true })} defaultValue="Gender" className="select ml-2">
                                    <option disabled={true}>Your Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bloodType">Blood Type *</label>
                                <select {...register('blood', { required: true })} defaultValue="Select blood type" className="select ml-2">
                                    <option disabled={true}>Select blood type</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bloodType">Availablity *</label>
                                <select {...register('availability', { required: true })} defaultValue="Select availability" className="select ml-2">
                                    <option disabled={true}>Select a option</option>
                                    <option>Not Available</option>
                                    <option>Available</option>
                                    <option>Recently Donated</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="totalDonations">Total Donations *</label>
                                <input {...register('totalDonations', { required: true })}
                                    type='number'
                                    placeholder='Total Donations'
                                    className="input ml-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div>
                        <h2 className="text-gray-900 mb-4">Address Information</h2>
                        <div>
                            <label htmlFor="address">Your Address *</label>
                            <input {...register('address', { required: true })}
                                type='text'
                                placeholder='Your Adderss'
                                className="input ml-2"
                            />
                        </div>
                    </div>

                    {/* Medical Information */}
                    <div>
                        <h2 className="text-gray-900 mb-4">Medical Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="medicalConditions">
                                    Do you have any medical conditions?
                                </label>
                                <textarea
                                    {...register('condition', { required: true })}
                                    className="textarea ml-2"
                                    placeholder="Please list any medical conditions or write 'None'"
                                />
                            </div>
                            <div>
                                <label htmlFor="medications">
                                    Are you currently taking any medications?
                                </label>
                                <textarea
                                    {...register('medicine', { required: true })}
                                    className="textarea ml-2"
                                    placeholder="Please list any medications or write 'None'"
                                />
                            </div>
                            <div>
                                <label htmlFor="previousDonations">
                                    Have you donated blood before?
                                </label>
                                <select {...register('donatedBefore', { required: true })} defaultValue="Select options" className="select ml-2">
                                    <option disabled={true}>Select options</option>
                                    <option>Never</option>
                                    <option>Once</option>
                                    <option>2-5 times</option>
                                    <option>more than 5 times</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-start gap-3">
                            <input {...register('eligible', { required: true })} type="checkbox" defaultChecked className="checkbox" />
                            <label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                                I certify that the information provided is accurate and I meet the
                                eligibility requirements for blood donation. *
                            </label>

                            {errors.eligible && <p className="text-red-600">You must confirm eligibility</p>}

                        </div>
                        <div className="flex items-start gap-3">
                            <input {...register('terms', { required: true })} type="checkbox" defaultChecked className="checkbox" />
                            <label htmlFor="agreePrivacy" className="text-sm cursor-pointer">
                                I agree to the privacy policy and consent to be contacted regarding
                                blood donation opportunities. *
                            </label>
                            {errors.terms && <p className="text-red-600">You must accept the Terms & Conditions</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button type="submit" className="flex-1 btn text-white bg-red-600 hover:bg-red-700">Submit Registration</button>
                        <Link href={'/'} type="button" className="btn flex-1">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;