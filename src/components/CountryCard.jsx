import { Link } from "react-router-dom"; 


export default function CountryCard({ code, flagImg, name, region, population }) {
  return (
     //If card is clicked navigates you to detailed counmtry page
    <Link to={`/country/${code}`} className="group block">   
        {/* Outer container of card (rounded corners, shadow and hover) */}
      <div className="relative rounded-2xl overflow-hidden shadow hover:shadow-2xl transition">
        <img
          src={flagImg}
          alt={`${name} flag`}
          className="h-40 w-full object-cover group-hover:scale-105 transition" //Zooms a little when hovered
        />
              {/* Fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Bottom Txt country name + population */}
        <div className="absolute bottom-0 p-4 text-white">
              {/* Country name */}
          <h3 className="text-lg font-semibold">{name}</h3>
              {/* Region + Population */}
          <p className="text-xs opacity-90">
              {/* This adds commas for the population */}
            {region} • Pop: {population?.toLocaleString?.()} 
          </p>
        </div>
      </div>
    </Link>
  );
}
