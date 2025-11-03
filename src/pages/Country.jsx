import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function Country() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState("Loading…");
   
  
  useEffect(() => {
    const load = async () => {
      setStatus("Loading…");
      try {
        // Set up in vite.config.js
        const res = await fetch(`/api/v3.1/alpha/${code}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCountry(Array.isArray(data) ? data[0] : data);
        setStatus("");
      } catch (e) {
        console.error(e);
        setStatus("Failed to load country.");
      }
    };
    load();
  }, [code]);
      //Currencies (obj) into (array)
  const currencies = useMemo(() => {
    if (!country?.currencies) return [];
    return Object.entries(country.currencies).map(([k, v]) => ({ //K= key V= Value 
      code: k,     // Found this on MDN Website (object entries)
      ...v,
    }));
  }, [country]);
      //Languages (obj) into (array)
  const languages = useMemo(() => {
    if (!country?.languages) return [];
    return Object.values(country.languages);
  }, [country]);

  if (status && !country) return <div className="p-6">{status}</div>;
  if (!country) return <div className="p-6">Not found.</div>;

  return (
    <section className="space-y-4 fade-in">
      <button className="btn btn-outline" onClick={() => navigate(-1)}>
        ← Back
      </button>
            {/* two columns (flag on thne left, info on the right) */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-base-200 rounded-lg overflow-hidden">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`${country.name?.common} flag`}
            className="w-full h-64 object-cover"
          />
        </div>
              {/* Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{country.name?.common}</h1>
          <div>
            Official Name:{" "}
            <span className="opacity-80">{country.name?.official}</span>
          </div>
          <div>
            Capital:{" "}
            <span className="opacity-80">{country.capital?.[0] || "-"}</span>
          </div>
          <div>
            Region / Subregion:{" "}
            <span className="opacity-80">
              {country.region} / {country.subregion}
            </span>
          </div>
          <div>
            Population:{" "}
            <span className="opacity-80">
              {country.population?.toLocaleString?.()}
            </span>
          </div>
                  {/* Currency */}
          <div className="mt-4">
            <div className="font-semibold">Currencies:</div>
            <ul className="list-disc ml-5">
              {currencies.length === 0 ? (
                <li>—</li>
              ) : (
                currencies.map((c) => (
                  <li key={c.code}>
                    {c.code}: {c.name} {c.symbol ? `(${c.symbol})` : ""}
                  </li>
                ))
              )}
            </ul>
          </div>
                {/* Language */}
          <div className="mt-4">
            <div className="font-semibold">Languages:</div>
            <ul className="list-disc ml-5">
              {languages.length === 0 ? (
                <li>—</li>
              ) : (
                languages.map((l) => <li key={l}>{l}</li>)
              )}
            </ul>
          </div>
        </div>
      </div>
                {/* Border Country */}
      <div className="space-y-2">
        <div className="font-semibold">Border Countries:</div>
        <div className="flex flex-wrap gap-2">
          {country.borders?.length ? (
            country.borders.map((b) => (
              <Link
                key={b}
                to={`/country/${b}`}
                className="badge badge-outline hover:badge-neutral"
              >
                {b}
              </Link>
            ))
          ) : (
            <span>None</span>
          )}
        </div>
      </div>
    </section>
  );
}
