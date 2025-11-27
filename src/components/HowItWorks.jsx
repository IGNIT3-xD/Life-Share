import { CheckCircle, Droplet, Search, UserPlus } from 'lucide-react';

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-gray-900 mb-4 text-2xl md:text-3xl">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Donating blood is easy and straightforward. Follow these simple steps.
                    </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="size-6" />
                        </div>
                        <h3 className="text-gray-900 mb-2">1. Register</h3>
                        <p className="text-gray-600 text-sm">
                            Sign up as a donor with your basic information
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Search className="size-6" />
                        </div>
                        <h3 className="text-gray-900 mb-2">2. Screening</h3>
                        <p className="text-gray-600 text-sm">
                            Quick health check to ensure you&apos;re eligible to donate
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Droplet className="size-6" />
                        </div>
                        <h3 className="text-gray-900 mb-2">3. Donate</h3>
                        <p className="text-gray-600 text-sm">
                            The actual donation takes about 10-15 minutes
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="size-6" />
                        </div>
                        <h3 className="text-gray-900 mb-2">4. Refresh</h3>
                        <p className="text-gray-600 text-sm">
                            Relax with refreshments and feel proud of your contribution
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;