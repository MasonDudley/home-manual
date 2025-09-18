'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock data - in a real app, this would come from a database
const mockProperties = [
  {
    id: 1,
    name: "Oak Street Rental",
    address: "123 Oak Street, Springfield, IL 62701",
    type: "Single Family Home",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    rent: 1500,
    tenant: "John Smith",
    applianceCount: 6
  },
  {
    id: 2,
    name: "Maple Avenue Duplex",
    address: "456 Maple Ave, Springfield, IL 62702",
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1800,
    rent: 2200,
    tenant: "Sarah Johnson",
    applianceCount: 8
  },
  {
    id: 3,
    name: "Downtown Condo",
    address: "789 City Plaza, Unit 12B, Springfield, IL 62703",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    rent: 1200,
    tenant: "Available",
    applianceCount: 4
  }
];

export default function Properties() {
  const [properties, setProperties] = useState(mockProperties);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
    setShowDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your rental properties and their appliances
          </p>
        </div>
        <Link
          href="/properties/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
        >
          <span className="mr-2">➕</span>
          Add Property
        </Link>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {property.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {property.type}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/properties/${property.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(property.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  📍 {property.address}
                </p>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    🛏️ {property.bedrooms} bed, 🚿 {property.bathrooms} bath
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    📏 {property.sqft} sqft
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">
                    ${property.rent}/month
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    property.tenant === 'Available' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {property.tenant}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    🏠 {property.applianceCount} Appliances
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Link
                    href={`/properties/${property.id}/appliances`}
                    className="w-full bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 text-center block"
                  >
                    Manage Appliances
                  </Link>
                  <Link
                    href={`/properties/${property.id}`}
                    className="w-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-mx">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Property
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this property? This action cannot be undone and will also delete all associated appliances and data.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProperty(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Property
              </button>
            </div>
          </div>
        </div>
      )}

      {properties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No properties yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started by adding your first rental property.
          </p>
          <Link
            href="/properties/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center"
          >
            <span className="mr-2">➕</span>
            Add Your First Property
          </Link>
        </div>
      )}
    </div>
  );
}
