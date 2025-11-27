'use client'
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
    const links = <>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/find-donors'}>Find Donors</Link></li>
        <li><Link href={'/become-a-donor'}>Become a Donor</Link></li>
        <li><Link href={'/manage'}>Manage Donor</Link></li>
    </>
    return (
        <div className="fixed z-10 left-0 md:px-10 px-5 navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Link href={'/'} className="flex items-center gap-2">
                    <div className="bg-red-600 p-2 rounded-lg">
                        <Heart className="size-6 text-white fill-white" />
                    </div>
                    <span className="text-red-600">LifeShare</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="btn text-red-600">Login / Signup</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton signOutRedirectUrl="/" />
                </SignedIn>
            </div>
        </div>
    );
};

export default Navbar;