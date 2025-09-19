'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStats } from './lib/dataManager';

export default function Dashboard() {
  const [stats, setStats] = useState({
    propertyCount: 0,
    applianceCount: 0,
    vendorCount: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    // Load stats when component mounts
    setStats(getStats());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your Rental Property Management System
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span className="text-2xl">🏢</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.propertyCount}</p>
              <p className="text-gray-600 dark:text-gray-400">Properties</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="text-2xl">🏠</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.applianceCount}</p>
              <p className="text-gray-600 dark:text-gray-400">Appliances</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <span className="text-2xl">🔧</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingTasks}</p>
              <p className="text-gray-600 dark:text-gray-400">Pending Tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.vendorCount}</p>
              <p className="text-gray-600 dark:text-gray-400">Vendors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Section - Show if no properties */}
      {stats.propertyCount === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Welcome to Your Property Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Get started by adding your first rental property. You will be able to track appliances, 
            maintenance, vendors, and more for each property.
          </p>
          <Link
            href="/properties/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center text-lg"
          >
            <span className="mr-2">🏢➕</span>
            Add Your First Property
          </Link>
        </div>
      )}

      {/* Quick Actions - Show if has properties */}
      {stats.propertyCount > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/properties/add"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Property
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Register a new rental property
                </p>
              </div>
              <span className="text-2xl">🏢➕</span>
            </div>
          </Link>

          <Link
            href="/maintenance/add"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Schedule Maintenance
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Add a maintenance task
                </p>
              </div>
              <span className="text-2xl">🔧➕</span>
            </div>
          </Link>

          <Link
            href="/vendors/add"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Vendor
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Register a new service provider
                </p>
              </div>
              <span className="text-2xl">👥➕</span>
            </div>
          </Link>
        </div>
      )}

      {/* Recent Activity - Only show if there are properties */}
      {stats.propertyCount > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-gray-500 dark:text-gray-400">
                Activity tracking will appear here as you use the system
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
