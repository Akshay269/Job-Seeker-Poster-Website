import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Loader2Icon } from "lucide-react";

let debounceTimeout;

const CountryAutocomplete = ({ fieldPath = "country" }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [query, setQuery] = useState("");
  const watchedValue = watch(fieldPath);

  useEffect(() => {
    if (watchedValue && watchedValue !== query) {
      setQuery(watchedValue);
    }
  }, [watchedValue]);
  
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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const cached = localStorage.getItem("countryList");
        if (cached) {
          setCountries(JSON.parse(cached)); //strigified data -> JSON data --> Parsing
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await res.json();
        const names = data
          .map((c) => c.name.common)
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
    setValue(fieldPath, country, { shouldValidate: true });
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <input
        id={fieldPath}
        type="text"
        {...register(fieldPath, { required: "Country is required" })}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setValue(fieldPath, e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Start typing country name..."
        autoComplete="off"
      />

      {errors?.[fieldPath] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[fieldPath]?.message}
        </p>
      )}

      {loading && (
        <div className="absolute z-10 mt-1 px-4 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded shadow text-sm text-gray-600">
          <Loader2Icon className="animate-spin w-4 h-4 text-gray-500" />
          Loading countries...
        </div>
      )}

      {!loading && showDropdown && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-48 overflow-y-auto rounded shadow">
          {searching && (
            <li className="px-4 py-2 text-gray-500 flex items-center gap-2">
              <Loader2Icon className="animate-spin w-4 h-4 text-gray-500" />
              Searching...
            </li>
          )}

          {!searching &&
            query.length < 2 &&
            popularCountries.map((country) => (
              <li
                key={country}
                onClick={() => handleSelect(country)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {country}
              </li>
            ))}

          {!searching &&
            query.length >= 2 &&
            filteredCountries.map((country) => (
              <li
                key={country}
                onClick={() => handleSelect(country)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {country}
              </li>
            ))}

          {!searching &&
            query.length >= 2 &&
            filteredCountries.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No match found</li>
            )}
        </ul>
      )}
    </div>
  );
};

export default CountryAutocomplete;
