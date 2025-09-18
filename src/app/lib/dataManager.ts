// Data management utilities for the rental property system
// This handles saving/loading data from localStorage

export interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  rent: number;
  tenant: string;
  purchaseDate: string;
  purchasePrice: number;
  notes: string;
  applianceCount?: number;
}

export interface Appliance {
  id: number;
  propertyId: number;
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

export interface Vendor {
  id: number;
  name: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface MaintenanceTask {
  id: number;
  propertyId: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedVendor?: string;
  cost?: number;
  notes: string;
}

// Storage keys
const STORAGE_KEYS = {
  PROPERTIES: 'rental_properties',
  APPLIANCES: 'rental_appliances',
  VENDORS: 'rental_vendors',
  MAINTENANCE: 'rental_maintenance'
};

// Generic storage functions
const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

// Property functions
export const getProperties = (): Property[] => {
  const properties = loadFromStorage<Property>(STORAGE_KEYS.PROPERTIES);
  const appliances = loadFromStorage<Appliance>(STORAGE_KEYS.APPLIANCES);
  
  // Add appliance count to each property
  return properties.map(property => ({
    ...property,
    applianceCount: appliances.filter(a => a.propertyId === property.id).length
  }));
};

export const saveProperty = (property: Omit<Property, 'id'>): Property => {
  const properties = loadFromStorage<Property>(STORAGE_KEYS.PROPERTIES);
  const newId = Math.max(0, ...properties.map(p => p.id)) + 1;
  const newProperty: Property = { ...property, id: newId };
  
  const updatedProperties = [...properties, newProperty];
  saveToStorage(STORAGE_KEYS.PROPERTIES, updatedProperties);
  
  return newProperty;
};

export const updateProperty = (id: number, updates: Partial<Property>): void => {
  const properties = loadFromStorage<Property>(STORAGE_KEYS.PROPERTIES);
  const updatedProperties = properties.map(p => 
    p.id === id ? { ...p, ...updates } : p
  );
  saveToStorage(STORAGE_KEYS.PROPERTIES, updatedProperties);
};

export const deleteProperty = (id: number): void => {
  const properties = loadFromStorage<Property>(STORAGE_KEYS.PROPERTIES);
  const appliances = loadFromStorage<Appliance>(STORAGE_KEYS.APPLIANCES);
  const maintenance = loadFromStorage<MaintenanceTask>(STORAGE_KEYS.MAINTENANCE);
  
  // Delete property
  const updatedProperties = properties.filter(p => p.id !== id);
  saveToStorage(STORAGE_KEYS.PROPERTIES, updatedProperties);
  
  // Delete associated appliances
  const updatedAppliances = appliances.filter(a => a.propertyId !== id);
  saveToStorage(STORAGE_KEYS.APPLIANCES, updatedAppliances);
  
  // Delete associated maintenance tasks
  const updatedMaintenance = maintenance.filter(m => m.propertyId !== id);
  saveToStorage(STORAGE_KEYS.MAINTENANCE, updatedMaintenance);
};

// Appliance functions
export const getAppliances = (propertyId?: number): Appliance[] => {
  const appliances = loadFromStorage<Appliance>(STORAGE_KEYS.APPLIANCES);
  return propertyId ? appliances.filter(a => a.propertyId === propertyId) : appliances;
};

export const saveAppliance = (appliance: Omit<Appliance, 'id'>): Appliance => {
  const appliances = loadFromStorage<Appliance>(STORAGE_KEYS.APPLIANCES);
  const newId = Math.max(0, ...appliances.map(a => a.id)) + 1;
  const newAppliance: Appliance = { ...appliance, id: newId };
  
  const updatedAppliances = [...appliances, newAppliance];
  saveToStorage(STORAGE_KEYS.APPLIANCES, updatedAppliances);
  
  return newAppliance;
};

export const updateAppliance = (id: number, updates: Partial<Appliance>): void => {
  const appliances = loadFromStorage<Appliance>(STORAGE_KEYS.APPLIANCES);
  const updatedAppliances = appliances.map(a => 
    a.id === id ? { ...a, ...updates } : a
  );
  saveToStorage(STORAGE_KEYS.APPLIANCES, updatedAppliances);
};

export const deleteAppliance = (id: number): void => {
  const appliances = loadFromStorage<Appliance>(STORAGE_KEYS.APPLIANCES);
  const updatedAppliances = appliances.filter(a => a.id !== id);
  saveToStorage(STORAGE_KEYS.APPLIANCES, updatedAppliances);
};

// Vendor functions
export const getVendors = (): Vendor[] => {
  return loadFromStorage<Vendor>(STORAGE_KEYS.VENDORS);
};

export const saveVendor = (vendor: Omit<Vendor, 'id'>): Vendor => {
  const vendors = loadFromStorage<Vendor>(STORAGE_KEYS.VENDORS);
  const newId = Math.max(0, ...vendors.map(v => v.id)) + 1;
  const newVendor: Vendor = { ...vendor, id: newId };
  
  const updatedVendors = [...vendors, newVendor];
  saveToStorage(STORAGE_KEYS.VENDORS, updatedVendors);
  
  return newVendor;
};

export const updateVendor = (id: number, updates: Partial<Vendor>): void => {
  const vendors = loadFromStorage<Vendor>(STORAGE_KEYS.VENDORS);
  const updatedVendors = vendors.map(v => 
    v.id === id ? { ...v, ...updates } : v
  );
  saveToStorage(STORAGE_KEYS.VENDORS, updatedVendors);
};

export const deleteVendor = (id: number): void => {
  const vendors = loadFromStorage<Vendor>(STORAGE_KEYS.VENDORS);
  const updatedVendors = vendors.filter(v => v.id !== id);
  saveToStorage(STORAGE_KEYS.VENDORS, updatedVendors);
};

// Maintenance functions
export const getMaintenance = (propertyId?: number): MaintenanceTask[] => {
  const tasks = loadFromStorage<MaintenanceTask>(STORAGE_KEYS.MAINTENANCE);
  return propertyId ? tasks.filter(t => t.propertyId === propertyId) : tasks;
};

export const saveMaintenance = (task: Omit<MaintenanceTask, 'id'>): MaintenanceTask => {
  const tasks = loadFromStorage<MaintenanceTask>(STORAGE_KEYS.MAINTENANCE);
  const newId = Math.max(0, ...tasks.map(t => t.id)) + 1;
  const newTask: MaintenanceTask = { ...task, id: newId };
  
  const updatedTasks = [...tasks, newTask];
  saveToStorage(STORAGE_KEYS.MAINTENANCE, updatedTasks);
  
  return newTask;
};

export const updateMaintenance = (id: number, updates: Partial<MaintenanceTask>): void => {
  const tasks = loadFromStorage<MaintenanceTask>(STORAGE_KEYS.MAINTENANCE);
  const updatedTasks = tasks.map(t => 
    t.id === id ? { ...t, ...updates } : t
  );
  saveToStorage(STORAGE_KEYS.MAINTENANCE, updatedTasks);
};

export const deleteMaintenance = (id: number): void => {
  const tasks = loadFromStorage<MaintenanceTask>(STORAGE_KEYS.MAINTENANCE);
  const updatedTasks = tasks.filter(t => t.id !== id);
  saveToStorage(STORAGE_KEYS.MAINTENANCE, updatedTasks);
};

// Stats functions
export const getStats = () => {
  const properties = getProperties();
  const appliances = getAppliances();
  const vendors = getVendors();
  const maintenance = getMaintenance();
  
  return {
    propertyCount: properties.length,
    applianceCount: appliances.length,
    vendorCount: vendors.length,
    pendingTasks: maintenance.filter(t => t.status === 'pending').length
  };
};
