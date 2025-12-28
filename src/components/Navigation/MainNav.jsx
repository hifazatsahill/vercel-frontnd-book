import React from 'react';
import Link from 'next/link';

const MainNav = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Medical AI Book
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/book"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Book
              </Link>
              <Link
                href="/chat"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Chat
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/auth/login"
              className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;