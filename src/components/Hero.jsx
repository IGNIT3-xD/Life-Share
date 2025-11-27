import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative rounded-md bg-linear-to-br from-red-50 to-red-100 py-10 md:py-14 lg::py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-red-600 mb-4 text-2xl md:text-3xl lg:text-4xl font-medium">
                            Give Blood, Give Life
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Every donation can save up to three lives. Join our community of heroes
                            and make a difference today. Your blood donation could be someones
                            second chance at life.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={'/become-a-donor'} className="btn bg-red-600 text-white hover:bg-red-700">
                                Become a Donor
                            </Link>
                            <Link href={'/find-donors'} className="btn">
                                Find a Donor
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-6 mt-12">
                            <div>
                                <div className="text-red-600 text-2xl">10,000+</div>
                                <p className="text-gray-600 text-sm mt-1.5">Donors</p>
                            </div>
                            <div>
                                <div className="text-red-600 text-2xl">30,000+</div>
                                <p className="text-gray-600 text-sm mt-1.5">Lives Saved</p>
                            </div>
                            <div>
                                <div className="text-red-600 text-2xl">50+</div>
                                <p className="text-gray-600 text-sm mt-1.5">Locations</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Image
                            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800"
                            alt="Blood donation"
                            className="rounded-2xl shadow-2xl"
                            width={800}
                            height={533}
                            loading='eager'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;