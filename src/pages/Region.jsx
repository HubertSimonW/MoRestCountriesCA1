import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import { motion } from "framer-motion";

// Animation staggered grid
const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Region() {
  const { region } = useParams();
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("Loading…");
  const [q, setQ] = useState("");

  // Get data from the rest countries api if region is changed
  useEffect(() => {
    const load = async () => {
      setStatus("Loading…");
      try {
        // Fetch them in the selected region
        const res = await fetch(`/api/v3.1/region/${region}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCountries(Array.isArray(data) ? data : []);
        setStatus(`Loaded ${Array.isArray(data) ? data.length : 0} countries for ${region}`);
      } catch (e) {
        console.error(e);
        setStatus("Failed to load region.");
      }
    };
    load();
  }, [region]); // Reruns if the region is switched
        // Country list filtered based on the search term
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return countries;
    return countries.filter((c) => c.name?.common?.toLowerCase().includes(term));
  }, [countries, q]);

  return (
    <section className="space-y-4 fade-in">
            {/* Region Head */}
      <h1 className="text-2xl font-semibold">{region}</h1>
      <div className="text-sm opacity-70">{status}</div>
          
      <input 
        className="input input-bordered w-full sm:w-80"
        placeholder={`Search in ${region}…`}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {list.length === 0 ? (
        <div>No countries match your filters.</div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {list.map((c) => (
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
