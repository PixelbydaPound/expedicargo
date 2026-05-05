import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getCountries, getLocationsByCountry, searchLocations, Location } from "../utils/portsAirportsData";
import { Ship, Plane, MapPin, ChevronDown, CheckCircle2, X, Globe } from "lucide-react";

interface LocationSelectorProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string, code: string) => void;
  shipmentType: 'sea' | 'air' | '';
  required?: boolean;
  placeholder?: string;
}

export function LocationSelector({
  id,
  label,
  value,
  onChange,
  shipmentType,
  required = false,
  placeholder
}: LocationSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCountryName, setSelectedCountryName] = useState<string>("");
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [countryHighlightedIndex, setCountryHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  const countries = getCountries();
  const locationType = shipmentType === 'sea' ? 'port' : shipmentType === 'air' ? 'airport' : undefined;

  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter locations when country or search query changes
  useEffect(() => {
    if (selectedCountry && searchQuery.length > 0) {
      const results = searchLocations(searchQuery, selectedCountry, locationType);
      setFilteredLocations(results);
    } else if (selectedCountry) {
      const results = getLocationsByCountry(selectedCountry, locationType);
      setFilteredLocations(results);
    } else if (searchQuery.length > 2) {
      const results = searchLocations(searchQuery, undefined, locationType);
      setFilteredLocations(results);
    } else {
      setFilteredLocations([]);
    }
    setHighlightedIndex(-1); // Reset highlight when results change
  }, [selectedCountry, searchQuery, locationType]);

  const handleCountrySelect = (countryCode: string, countryName: string) => {
    setSelectedCountry(countryCode);
    setSelectedCountryName(countryName);
    setCountrySearchQuery(countryName);
    setShowCountryDropdown(false);
    setSearchQuery("");
    setSelectedCode("");
    onChange("", "");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCountrySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setCountrySearchQuery(query);
    setShowCountryDropdown(true);
    
    // If user clears the field, reset country selection
    if (query === "") {
      setSelectedCountry("");
      setSelectedCountryName("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowDropdown(query.length > 0 || selectedCountry !== "");
    onChange(query, ""); // Update parent with partial value
  };

  const handleLocationSelect = (location: Location) => {
    const displayValue = `${location.name} (${location.code})`;
    setSearchQuery(displayValue);
    setSelectedCode(location.code);
    onChange(displayValue, location.code);
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    if (selectedCountry || searchQuery.length > 2) {
      setShowDropdown(true);
    }
  };

  const handleCountryInputFocus = () => {
    setShowCountryDropdown(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredLocations.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredLocations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredLocations.length) {
          handleLocationSelect(filteredLocations[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleCountryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showCountryDropdown || filteredCountries.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setCountryHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setCountryHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (countryHighlightedIndex >= 0 && countryHighlightedIndex < filteredCountries.length) {
          const country = filteredCountries[countryHighlightedIndex];
          handleCountrySelect(country.code, country.name);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowCountryDropdown(false);
        setCountryHighlightedIndex(-1);
        break;
    }
  };

  // Get flag emoji from country code
  const getFlagEmoji = (countryCode: string) => {
    return countryCode
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  // Get icon based on shipment type
  const getIcon = () => {
    if (shipmentType === 'sea') return <Ship className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    if (shipmentType === 'air') return <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    return <MapPin className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="flex gap-2">
        {/* Country Autocomplete Search */}
        <div className="w-[200px] relative" ref={countryDropdownRef}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Globe className="w-4 h-4 text-gray-400" />
            </div>
            <Input
              ref={countryInputRef}
              value={countrySearchQuery}
              onChange={handleCountrySearchChange}
              onFocus={handleCountryInputFocus}
              onKeyDown={handleCountryKeyDown}
              placeholder="Buscar país / Search..."
              className={`pl-10 border-2 transition-all ${
                selectedCountry 
                  ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
              autoComplete="off"
            />
            {selectedCountry && countrySearchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setCountrySearchQuery("");
                  setSelectedCountry("");
                  setSelectedCountryName("");
                  setSearchQuery("");
                  setSelectedCode("");
                  onChange("", "");
                  countryInputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </button>
            ) : showCountryDropdown && filteredCountries.length > 0 ? (
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            ) : null}
          </div>

          {/* Country Dropdown Results */}
          {showCountryDropdown && filteredCountries.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 rounded-lg shadow-xl max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 border-b border-gray-100 dark:border-gray-700 bg-blue-50 dark:bg-blue-950/30">
                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                  <Globe className="w-3 h-3" />
                  {filteredCountries.length} {filteredCountries.length === 1 ? 'país' : 'países'} / {filteredCountries.length === 1 ? 'country' : 'countries'}
                </p>
              </div>
              {filteredCountries.map((country, index) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.code, country.name)}
                  className={`w-full text-left px-4 py-3 transition-all duration-150 border-b border-gray-100 dark:border-gray-700 last:border-0 group ${
                    index === countryHighlightedIndex 
                      ? 'bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20' 
                      : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent'
                  }`}
                  onMouseEnter={() => setCountryHighlightedIndex(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl transition-transform group-hover:scale-110">
                      {getFlagEmoji(country.code)}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {country.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Countries Found */}
          {showCountryDropdown && countrySearchQuery.length > 0 && filteredCountries.length === 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No se encontró país / No country found
            </div>
          )}
        </div>

        {/* Location Autocomplete Input */}
        <div className="flex-1 relative" ref={dropdownRef}>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {getIcon()}
            </div>
            <Input
              ref={inputRef}
              id={id}
              name={id}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedCountry
                  ? placeholder || `Type port/airport name... / Escriba nombre...`
                  : `Select country first / Seleccione país primero`
              }
              required={required}
              disabled={!selectedCountry && !shipmentType}
              className={`pl-10 border-2 transition-all ${
                selectedCode 
                  ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-950/20' 
                  : selectedCountry 
                    ? 'border-blue-300 dark:border-blue-600 focus:border-blue-500 dark:focus:border-blue-400' 
                    : ''
              }`}
              autoComplete="off"
            />
            {selectedCode && searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCode("");
                  onChange("", "");
                  inputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </button>
            ) : showDropdown && filteredLocations.length > 0 ? (
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            ) : null}
          </div>

          {/* Dropdown Results */}
          {showDropdown && filteredLocations.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 rounded-lg shadow-xl max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 border-b border-gray-100 dark:border-gray-700 bg-blue-50 dark:bg-blue-950/30">
                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  {filteredLocations.length} {locationType === 'port' ? 'port' : 'airport'}{filteredLocations.length !== 1 ? 's' : ''} found
                </p>
              </div>
              {filteredLocations.map((location, index) => (
                <button
                  key={location.code}
                  type="button"
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full text-left px-4 py-3 transition-all duration-150 border-b border-gray-100 dark:border-gray-700 last:border-0 group ${
                    index === highlightedIndex 
                      ? 'bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20' 
                      : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-900/20 dark:hover:to-transparent'
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 transition-transform group-hover:scale-110">
                      {location.type === 'port' || location.type === 'both' ? (
                        <Ship className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {location.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-semibold">
                          {location.code}
                        </span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="flex items-center gap-1">
                          <span className="text-base">{getFlagEmoji(location.countryCode)}</span>
                          {location.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {showDropdown && searchQuery.length > 0 && filteredLocations.length === 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No locations found. Try a different search or country.
            </div>
          )}
        </div>
      </div>

      {/* Helper Text - Bilingual */}
      {!selectedCountry && shipmentType && (
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span className="font-medium">
            🌍 Seleccione su país, luego comience a escribir el nombre del {locationType === 'port' ? 'puerto' : 'aeropuerto'} / 
            Select your country, then start typing the name of the {locationType === 'port' ? 'port' : 'airport'}
          </span>
        </p>
      )}
      {selectedCountry && !searchQuery && (
        <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 animate-pulse">
          <MapPin className="w-3 h-3" />
          <span className="font-medium">
            ✍️ Comience a escribir para buscar {locationType === 'port' ? 'puertos' : 'aeropuertos'} en {selectedCountryName} / 
            Start typing to search {locationType === 'port' ? 'ports' : 'airports'}
          </span>
        </p>
      )}
      {selectedCode && (
        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span className="font-medium">
            ✅ Seleccionado / Selected: {selectedCode}
          </span>
        </p>
      )}
    </div>
  );
}
