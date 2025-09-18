'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define proper TypeScript interfaces
interface Appliance {
  id: number;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  location: string;
  purchaseDate: string;
  warranty: string;
  condition: string;
  notes: string;
}

// Mock appliances data
const mockAppliances: Appliance[] = [
  {
    id: 1,
    type: 'Refrigerator',
    brand: 'Whirlpool',
    model: 'WRF555SDHV',
    serialNumber: 'WP2023001234',
    location: 'Kitchen',
    purchaseDate: '2023-01-15',
    warranty: '2025-01-15',
    condition: 'Excellent',
    notes: 'Stainless steel, French door style'
  },
  {
    id: 2,
    type: 'Dishwasher',
    brand: 'KitchenAid',
    model: 'KDTM404ESS',
    serialNumber: 'KA2023005678',
    location: 'Kitchen',
    purchaseDate: '2023-01-20',
    warranty: '2024-01-20',
    condition: 'Good',
    notes: 'Built-in, stainless steel'
  },
  {
    id: 3,
    type: 'Washer',
    brand: 'Samsung',
    model: 'WF45R6100AP',
    serialNumber: 'SM2022009876',
    location: 'Laundry Room',
    purchaseDate: '2022-08-10',
    warranty: '2023-08-10',
    condition: 'Fair',
    notes: 'Front-loading, needs belt replacement soon'
  }
];

const applianceTypes = [
  'Refrigerator', 'Dishwasher', 'Oven/Range', 'Microwave', 'Washer', 'Dryer',
  'HVAC System', 'Water Heater', 'Garbage Disposal', 'Air Conditioner',
  'Ceiling Fan', 'Smoke Detector', 'Other'
];

const conditions = ['Excellent', 'Good', 'Fair', 'Poor', 'Needs Replacement'];

export default function PropertyAppliances() {
  const params = useParams();
  const propertyId = params?.propertyId;
  const [appliances, setAppliances] = useState<Appliance[]>(mockAppliances);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [editingAppliance, setEditingAppliance] = useState<Appliance | null>(null);

  const [formData, setFormData] = useState({
    type: '',
    brand: '',
    model: '',
    serialNumber: '',
    location: '',
    purchaseDate: '',
    warranty: '',
    condition: 'Good',
    notes: ''
  });

  const resetForm = () => {
    setFormData({
      type: '',
      brand: '',
      model: '',
      serialNumber: '',
      location: '',
      purchaseDate: '',
      warranty: '',
      condition: 'Good',
      notes: ''
    });
    setEditingAppliance(null);
    setShowAddForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppliance) {
      // Update existing appliance
      setAppliances(appliances.map(app => 
        app.id === editingAppliance.id 
          ? { ...formData, id: editingAppliance.id } as Appliance
          : app
      ));
    } else {
      // Add new appliance
      const newAppliance: Appliance = {
        ...formData,
        id: Math.max(...appliances.map(a => a.id), 0) + 1
      };
      setAppliances([...appliances, newAppliance]);
    }
    resetForm();
  };

  const handleEdit = (appliance: Appliance) => {
    setFormData(appliance);
    setEditingAppliance(appliance);
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    setAppliances(appliances.filter(app => app.id !== id));
    setShowDeleteModal(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/properties"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Property Appliances
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage appliances for Property #{propertyId}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
        >
          <span className="mr-2">➕</span>
          Add Appliance
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingAppliance ? 'Edit Appliance' : 'Add New Appliance'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Appliance Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select Type</option>
                      {applianceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brand *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Whirlpool"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model Number *
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., WRF555SDHV"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Serial Number *
                    </label>
                    <input
                      type="text"
                      name="serialNumber"
                      value={formData.serialNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., WP2023001234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Kitchen, Laundry Room"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Warranty Expires
                    </label>
                    <input
                      type="date"
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Condition
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Additional notes about this appliance..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingAppliance ? 'Update Appliance' : 'Add Appliance'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Appliances List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {appliances.map((appliance) => (
          <div
            key={appliance.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {appliance.type}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {appliance.brand} - {appliance.model}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(appliance)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setShowDeleteModal(appliance.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Serial:</span>
                <span className="text-gray-900 dark:text-white font-mono">
                  {appliance.serialNumber}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Location:</span>
                <span className="text-gray-900 dark:text-white">
                  {appliance.location}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Condition:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  appliance.condition === 'Excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  appliance.condition === 'Good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  appliance.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {appliance.condition}
                </span>
              </div>

              {appliance.warranty && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Warranty:</span>
                  <span className="text-gray-900 dark:text-white">
                    Until {new Date(appliance.warranty).toLocaleDateString()}
                  </span>
                </div>
              )}

              {appliance.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {appliance.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-mx">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Appliance
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this appliance? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Appliance
              </button>
            </div>
          </div>
        </div>
      )}

      {appliances.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No appliances yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start tracking appliances for this property.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center"
          >
            <span className="mr-2">➕</span>
            Add Your First Appliance
          </button>
        </div>
      )}
    </div>
  );
}
