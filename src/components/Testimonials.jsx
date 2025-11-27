import Image from 'next/image';

const Testimonials = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-gray-900 mb-4 text-2xl md:text-3xl">Donor Stories</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear from our donors about their life-saving experiences.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-100 shadow p-6 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
                                alt="Donor"
                                className="size-16 rounded-full object-cover"
                                width={80}
                                height={80}
                            />
                            <div>
                                <h4 className="text-gray-900">Michael Chen</h4>
                                <p className="text-gray-600 text-sm">Regular Donor</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            &quot;I&apos;ve been donating for 5 years now. Knowing that I can help save
                            lives with such a simple act is incredibly rewarding.&quot;
                        </p>
                    </div>
                    <div className="bg-gray-100 shadow p-6 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
                                alt="Donor"
                                className="size-16 rounded-full object-cover"
                                width={80}
                                height={80}
                            />
                            <div>
                                <h4 className="text-gray-900">Sarah Johnson</h4>
                                <p className="text-gray-600 text-sm">First-time Donor</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            &quot;I was nervous at first, but the staff made me feel comfortable. It was
                            quick and painless. I&apos;ll definitely be back!&quot;
                        </p>
                    </div>
                    <div className="bg-gray-100 shadow p-6 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
                                alt="Donor"
                                className="size-16 rounded-full object-cover"
                                width={80}
                                height={80}
                            />
                            <div>
                                <h4 className="text-gray-900">David Martinez</h4>
                                <p className="text-gray-600 text-sm">Blood Recipient</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            &quot;I needed a transfusion after an accident. Thanks to donors like you, I&apos;m
                            here today. Please consider donating.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;