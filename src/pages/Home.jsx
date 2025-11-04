import { useEffect, useMemo, useState } from "react";
import CountryCard from "../components/CountryCard"; //reusable comp for each country
import { motion } from "framer-motion"; // grid animation
import { API_BASE } from "../lib/apiBase";


const FIELDS =
  "name,cca3,flags,region,subregion,population,capital,languages,currencies,borders"; //API

// Animation for grid (container + item) fade
const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Loading…");

  // Get all countries
  useEffect(() => {
    const load = async () => {
      setStatus("Loading…");
      try {
        // selected fields
        const url1 = `${API_BASE}/v3.1/all?fields=${FIELDS}&ts=${Date.now()}`;
        let res = await fetch(url1, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} on fields`);

        let data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          // if nothing returned fallbacxk
          const url2 = `${API_BASE}/v3.1/all?ts=${Date.now()}`;
          res = await fetch(url2, { cache: "no-store" });
          if (!res.ok) throw new Error(`HTTP ${res.status} on fallback`);
          data = await res.json();
        }

        setCountries(Array.isArray(data) ? data : []);
        setStatus(`Loaded ${Array.isArray(data) ? data.length : 0} countries`);
      } catch (e) {
        console.error("Home load error:", e);
        setStatus("Failed to load the countries. Disable your adblock/VPN.");
      }
    };
    load();
  }, []);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return countries; // If empty it shows all
    return countries.filter((c) => c.name?.common?.toLowerCase().includes(term));
  }, [countries, q]);

  return (
    <section className="space-y-4 fade-in">
            {/* status line above search */}
      <div className="text-sm opacity-70">{status}</div>
            {/* Search input */}
      <input
        className="input input-bordered w-full sm:w-80"
        placeholder="Search country…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {list.length === 0 ? (
        <div>No countries match your filters.</div>
      ) : (
        <motion.div                 // Animated grid con
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {list.map((c) => ( 
            //All the items use child variant
            <motion.div key={c.cca3} variants={item}>
              <CountryCard
                code={c.cca3}
                flagImg={c.flags?.svg || c.flags?.png}
                name={c.name?.common}
                region={c.region}
                population={c.population}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
