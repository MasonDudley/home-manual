'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: '🏠'
  },
  {
    name: 'Properties',
    href: '/properties',
    icon: '🏢',
    children: [
      { name: 'All Properties', href: '/properties' },
      { name: 'Add Property', href: '/properties/add' }
    ]
  },
  {
    name: 'Maintenance',
    href: '/maintenance',
    icon: '🔧',
    children: [
      { name: 'Schedule', href: '/maintenance' },
      { name: 'History', href: '/maintenance/history' },
      { name: 'Add Task', href: '/maintenance/add' }
    ]
  },
  {
    name: 'Vendors',
    href: '/vendors',
    icon: '👥',
    children: [
      { name: 'All Vendors', href: '/vendors' },
      { name: 'Add Vendor', href: '/vendors/add' }
    ]
  },
  {
    name: 'Documents',
    href: '/docs',
    icon: '📄'
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Properties']);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Property Manager
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Rental Property System
        </p>
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)]">
        {navigation.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between">
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium flex-1 ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
              {item.children && (
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className={`transform transition-transform ${
                    expandedItems.includes(item.name) ? 'rotate-90' : ''
                  }`}>
                    ▶
                  </span>
                </button>
              )}
            </div>

            {item.children && expandedItems.includes(item.name) && (
              <div className="ml-6 mt-2 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className={`block px-3 py-2 rounded-lg text-sm ${
                      pathname === child.href
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
