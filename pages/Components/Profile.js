'use client';
import React from 'react';
import { FaSearch, FaCalendarAlt, FaUserFriends, FaEnvelope, FaChevronDown } from 'react-icons/fa';

export default function Profile() {
  return (
    <div className="flex items-center justify-between w-full bg-white p-4 ">
      {/* Left: Search */}
      <div className="flex items-center gap-2 text-gray-500">
        <FaSearch />
        <input
          type="text"
          placeholder="Search"
          className="outline-none text-sm placeholder-gray-400"
        />
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center gap-6">
        {/* Calendar Icon */}
        <FaCalendarAlt className="text-gray-400 cursor-pointer" />

        {/* Users Icon with badge */}
        <div className="relative">
          <FaUserFriends className="text-gray-400 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5">
            2
          </span>
        </div>

        {/* Envelope Icon with badge */}
        <div className="relative">
          <FaEnvelope className="text-gray-400 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1.5">
            2
          </span>
        </div>

        {/* Profile Image */}
        <div className="w-8 h-8 bg-gray-200 rounded-full" />

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium text-gray-800">Jenil Patel</p>
            <p className="text-xs text-gray-400 -mt-0.5">Manager</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <FaChevronDown className="text-sm text-gray-400" />
        </div>
      </div>
    </div>
  );
}
