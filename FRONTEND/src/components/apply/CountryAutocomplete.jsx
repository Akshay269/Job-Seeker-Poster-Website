import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Spinner from "../Spinner"; 

let debounceTimeout;

const CountryAutocomplete = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedCountry = watch("country") || "";
  const [query, setQuery] = useState(selectedCountry);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const popularCountries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
  ];

  // Fetch and cache countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const cached = localStorage.getItem("countryList");
        if (cached) {
          setCountries(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();
        const names = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));

        setCountries(names);
        localStorage.setItem("countryList", JSON.stringify(names));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Debounced filtering
  useEffect(() => {
    if (!query.trim()) {
      setFilteredCountries([]);
      return;
    }

    setSearching(true);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const filtered = countries.filter((c) =>
        c.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredCountries(filtered);
      setSearching(false);
    }, 300); 
  }, [query, countries]);

  const handleSelect = (country) => {
    setQuery(country);
    setValue("country", country, { shouldValidate: true });
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <input
        id="country"
        type="text"
        {...register("country", { required: "Country is required" })}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setValue("country", e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Start typing country name..."
        autoComplete="off"
      />

      {errors.country && (
        <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
      )}

      {loading && (
        <div className="absolute z-10 mt-1 px-4 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded shadow text-sm text-gray-600">
          <Spinner className="w-4 h-4" />
          Loading countries...
        </div>
      )}

      {!loading && showDropdown && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-y-auto rounded shadow">
          {searching && (
            <li className="px-4 py-2 text-gray-500 flex items-center gap-2">
              <Spinner className="w-4 h-4" /> Searching...
            </li>
          )}

          {!searching && query.length < 2 &&
            popularCountries.map((country) => (
              <li
                key={country}
                onClick={() => handleSelect(country)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {country}
              </li>
            ))}

          {!searching && query.length >= 2 && filteredCountries.map((country) => (
            <li
              key={country}
              onClick={() => handleSelect(country)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {country}
            </li>
          ))}

          {!searching && query.length >= 2 && filteredCountries.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No match found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
