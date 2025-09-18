import Link from 'next/link';

// Mock data - you can later connect this to a database or JSON file
const properties = [
  {
    id: 1,
    nickname: "Main Home",
    address: "123 Oak Street, Springfield, IL 62701",
    type: "Primary Residence"
  },
  {
    id: 2,
    nickname: "Lake House",
    address: "456 Lakeside Drive, Lake Geneva, WI 53147",
    type: "Vacation Home"
  },
  {
    id: 3,
    nickname: "Downtown Condo",
    address: "789 City Plaza, Unit 15A, Chicago, IL 60601",
    type: "Investment Property"
  }
];

const categories = [
  {
    name: "Appliances",
    href: "/appliances",
    icon: "🏠",
    description: "Manuals, warranties, and specs"
  },
  {
    name: "Maintenance",
    href: "/maintenance", 
    description: "Schedules, records, and reminders"
  },
  {
    name: "Documents",
    href: "/docs",
    icon: "📄",
    description: "Insurance, warranties, and contracts"
  },
  {
    name: "Vendors",
    href: "/vendors",
    icon: "🔧",
    description: "Contractors, services, and contacts"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Home Manual Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all your properties, appliances, maintenance, and documents in one place
        </p>
      </div>

      {/* Properties Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {property.nickname}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {property.type}
                </p>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                {property.address}
              </p>

              {/* Quick Access Categories for each property */}
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`${category.href}?property=${property.id}`}
                    className="flex items-center justify-center p-2 text-xs rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="mr-1">{category.icon}</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Categories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800"
            >
              <div className="text-2xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Recent Activity</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            HVAC filter replaced at Main Home - 2 days ago
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Upcoming Maintenance</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gutter cleaning due in 5 days
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Quick Stats</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            3 properties • 12 appliances • 8 vendors
          </p>
        </div>
      </section>
    </div>
  );
}
