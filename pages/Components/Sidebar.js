import React, { useState } from "react";
import {
  FaTh,
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaFolder,
  FaClock,
  FaUserFriends,
  FaComments,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import logo from "../../public/Logo.jpg"
import { useRouter } from "next/router";
import Image from "next/image";

export default function SidebarDrawer({ onLinkClick }) {
  const router = useRouter();
  const [openEcom, setOpenEcom] = useState(true);
  const [openContact, setOpenContact] = useState(false);

  const isActive = (path) => router.pathname === path;

  return (
    <div className="h-full overflow-y-auto p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <Image src={logo} width={28} height={28} alt="Logo" />
        <h1 className="text-xl font-bold text-gray-800">Mytech</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {/* Dashboard */}
        <Link onClick={onLinkClick}  href="/">
          <span
            className={`flex items-center gap-3 px-4 py-2 rounded ${
              isActive("/dashboard")
                ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaTh className="text-lg" />
            Dashboard
          </span>
        </Link>

        {/* E-Commerce dropdown */}
        <div>
          <button
            onClick={() => setOpenEcom(!openEcom)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded ${
              isActive("/ecommerce") || openEcom
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-3">
              <FaShoppingCart className="text-lg" />
              E-Commerce
            </span>
            <span className="flex items-center gap-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                2
              </span>
              {openEcom ? (
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
              )}
            </span>
          </button>

          {openEcom && (
            <div className="ml-10 mt-1    space-y-1 text-sm">
              <Link  onClick={onLinkClick}  href="/products/table">
                <span
                  className={`block py-2 ${
                    isActive("/products/table")
                      ? "text-blue-600 font-medium"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Product
                </span>
              </Link>
              <Link onClick={onLinkClick}   href="">
                <span className="block py-2 text-gray-600 hover:text-black">
                  Categories
                </span>
              </Link>
              <Link  onClick={onLinkClick}  href="">
                <span className="flex justify-between py-2 text-gray-600 hover:text-black">
                  <span>Orders</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    2
                  </span>
                </span>
              </Link>
              <Link onClick={onLinkClick}  href="">
                <span className="block py-2 text-gray-600 hover:text-black">
                  Customer
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Project */}
        <Link onClick={onLinkClick}  href="">
          <span
            className={`flex items-center gap-3 px-4 py-2 rounded ${
              isActive("/projects")
                ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaClock className="text-lg" />
            Project
          </span>
        </Link>

        {/* Contact dropdown */}
        <div>
          <button
            onClick={() => setOpenContact(!openContact)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded ${
              openContact
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-3">
              <FaUserFriends className="text-lg" />
              Contact
            </span>
            {openContact ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>
        </div>

        {/* Static Items */}
        <Link onClick={onLinkClick}  href="">
          <span
            className={`flex items-center gap-3 px-4 py-2 rounded ${
              isActive("/file-manager")
                ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaFolder className="text-lg" />
            File Manager
          </span>
        </Link>

        <Link onClick={onLinkClick}  href="">
          <span
            className={`flex items-center gap-3 px-4 py-2 rounded ${
              isActive("/chat")
                ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaComments className="text-lg" />
            Chat
          </span>
        </Link>

        <Link  onClick={onLinkClick}  href="">
          <span
            className={`flex items-center gap-3 px-4 py-2 rounded ${
              isActive("/calendar")
                ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaCalendarAlt className="text-lg" />
            Calendar
          </span>
        </Link>
      </nav>
    </div>
  );
}
