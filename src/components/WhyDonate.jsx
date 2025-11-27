import { Award, Clock, Heart, Users } from 'lucide-react';
import React from 'react';

const WhyDonate = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-gray-900 mb-4 text-2xl md:text-3xl">Why Donate Blood?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Blood donation is a simple act that can have a profound impact on the
                        lives of others.
                    </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="size-8 text-red-600" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Save Lives</h3>
                        <p className="text-gray-600 text-sm">
                            One donation can save up to three lives
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="size-8 text-red-600" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Help Community</h3>
                        <p className="text-gray-600 text-sm">
                            Support your local hospitals and emergency services
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="size-8 text-red-600" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Health Benefits</h3>
                        <p className="text-gray-600 text-sm">
                            Regular donation can improve your cardiovascular health
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="size-8 text-red-600" />
                        </div>
                        <h3 className="text-gray-900 mb-2">Quick Process</h3>
                        <p className="text-gray-600 text-sm">
                            Takes only 10-15 minutes of your time
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyDonate;