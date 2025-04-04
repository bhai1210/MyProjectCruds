'use client';
import React from 'react';
import {
  FaSearch,
  FaCalendarAlt,
  FaUserFriends,
  FaEnvelope,
  FaChevronDown,
} from 'react-icons/fa';

export default function Profile() {
  return (
    <div className="w-full  px-4 py-3  flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Search Section */}
      <div className="flex items-center gap-2 w-full sm:w-auto text-gray-500 border border-gray-200 px-2 py-1 rounded-md">
        <FaSearch className="text-sm" />
        <input
          type="text"
          placeholder="Search"
          className="w-full sm:w-64 outline-none text-sm placeholder-gray-400 bg-transparent"
        />
      </div>

      {/* Icons and Profile Section */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
        {/* Calendar */}
        <FaCalendarAlt className="text-gray-500 text-lg cursor-pointer" />

        {/* Users Icon with badge */}
        <div className="relative">
          <FaUserFriends className="text-gray-500 text-lg cursor-pointer" />
          <span className="absolute -top-1.5 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </div>

        {/* Envelope Icon with badge */}
        <div className="relative">
          <FaEnvelope className="text-gray-500 text-lg cursor-pointer" />
          <span className="absolute -top-1.5 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
            2
          </span>
        </div>

        {/* Profile Image */}
        <div className="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0" />

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800 leading-none">Jenil Patel</p>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <FaChevronDown className="text-sm text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
