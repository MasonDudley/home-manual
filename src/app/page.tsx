export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <section className="rounded border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium mb-2">Upcoming maintenance</h2>
          <ul className="text-sm list-disc ml-5">
            <li>Replace HVAC filter (every 90 days)</li>
            <li>Test smoke/CO detectors</li>
            <li>Clean dishwasher filter</li>
          </ul>
        </section>
        <section className="rounded border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium mb-2">Quick links</h2>
          <ul className="text-sm list-disc ml-5">
            <li>Paint colors & sheens</li>
            <li>Water shutoff location</li>
            <li>Wi‑Fi and router info</li>
          </ul>
        </section>
        <section className="rounded border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium mb-2">Recent activity</h2>
          <p className="text-sm text-black/70 dark:text-white/70">No recent entries.</p>
        </section>
      </div>
    </div>
  );
}
