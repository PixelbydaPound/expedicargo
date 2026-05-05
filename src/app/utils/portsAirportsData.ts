// Comprehensive global ports and airports database - ALL major commercial locations
// IATA codes for airports, UN/LOCODE for ports

export interface Location {
  name: string;
  code: string; // IATA for airports, UN/LOCODE for ports
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  type: 'port' | 'airport' | 'both';
}

export const locations: Location[] = [
  // ========== NORTH AMERICA ==========
  
  // UNITED STATES 🇺🇸
  // Major Ports
  { name: "Port of Los Angeles", code: "USLAX", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Long Beach", code: "USLGB", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of New York/New Jersey", code: "USNYC", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Savannah", code: "USSAV", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Houston", code: "USHOU", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Miami", code: "USMIA", country: "United States", countryCode: "US", type: "port" },
  { name: "Port Everglades", code: "USFTL", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Seattle", code: "USSEA", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Charleston", code: "USCHS", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Oakland", code: "USOAK", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Norfolk", code: "USORF", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Baltimore", code: "USBAL", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Philadelphia", code: "USPHL", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Boston", code: "USBOS", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of San Diego", code: "USSAN", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of New Orleans", code: "USMSY", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Tampa", code: "USTPA", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Jacksonville", code: "USJAX", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Portland", code: "USPDX", country: "United States", countryCode: "US", type: "port" },
  { name: "Port of Tacoma", code: "USTCM", country: "United States", countryCode: "US", type: "port" },
  // Major Airports
  { name: "Hartsfield-Jackson Atlanta (ATL)", code: "ATL", country: "United States", countryCode: "US", type: "airport" },
  { name: "Los Angeles International (LAX)", code: "LAX", country: "United States", countryCode: "US", type: "airport" },
  { name: "O'Hare International Chicago (ORD)", code: "ORD", country: "United States", countryCode: "US", type: "airport" },
  { name: "Dallas/Fort Worth International (DFW)", code: "DFW", country: "United States", countryCode: "US", type: "airport" },
  { name: "Denver International (DEN)", code: "DEN", country: "United States", countryCode: "US", type: "airport" },
  { name: "John F. Kennedy International (JFK)", code: "JFK", country: "United States", countryCode: "US", type: "airport" },
  { name: "San Francisco International (SFO)", code: "SFO", country: "United States", countryCode: "US", type: "airport" },
  { name: "Seattle-Tacoma International (SEA)", code: "SEA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Las Vegas McCarran (LAS)", code: "LAS", country: "United States", countryCode: "US", type: "airport" },
  { name: "Orlando International (MCO)", code: "MCO", country: "United States", countryCode: "US", type: "airport" },
  { name: "Charlotte Douglas (CLT)", code: "CLT", country: "United States", countryCode: "US", type: "airport" },
  { name: "Phoenix Sky Harbor (PHX)", code: "PHX", country: "United States", countryCode: "US", type: "airport" },
  { name: "Miami International (MIA)", code: "MIA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Newark Liberty International (EWR)", code: "EWR", country: "United States", countryCode: "US", type: "airport" },
  { name: "Minneapolis-St Paul (MSP)", code: "MSP", country: "United States", countryCode: "US", type: "airport" },
  { name: "Detroit Metropolitan (DTW)", code: "DTW", country: "United States", countryCode: "US", type: "airport" },
  { name: "Boston Logan International (BOS)", code: "BOS", country: "United States", countryCode: "US", type: "airport" },
  { name: "Fort Lauderdale-Hollywood (FLL)", code: "FLL", country: "United States", countryCode: "US", type: "airport" },
  { name: "LaGuardia Airport (LGA)", code: "LGA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Philadelphia International (PHL)", code: "PHL", country: "United States", countryCode: "US", type: "airport" },
  { name: "George Bush Intercontinental (IAH)", code: "IAH", country: "United States", countryCode: "US", type: "airport" },
  { name: "San Diego International (SAN)", code: "SAN", country: "United States", countryCode: "US", type: "airport" },
  { name: "Tampa International (TPA)", code: "TPA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Portland International (PDX)", code: "PDX", country: "United States", countryCode: "US", type: "airport" },
  { name: "Baltimore/Washington (BWI)", code: "BWI", country: "United States", countryCode: "US", type: "airport" },
  { name: "Austin-Bergstrom (AUS)", code: "AUS", country: "United States", countryCode: "US", type: "airport" },
  { name: "Nashville International (BNA)", code: "BNA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Salt Lake City International (SLC)", code: "SLC", country: "United States", countryCode: "US", type: "airport" },
  { name: "Raleigh-Durham (RDU)", code: "RDU", country: "United States", countryCode: "US", type: "airport" },
  { name: "Sacramento International (SMF)", code: "SMF", country: "United States", countryCode: "US", type: "airport" },
  { name: "Kansas City International (MCI)", code: "MCI", country: "United States", countryCode: "US", type: "airport" },
  { name: "San Antonio International (SAT)", code: "SAT", country: "United States", countryCode: "US", type: "airport" },
  { name: "Cincinnati/Northern Kentucky (CVG)", code: "CVG", country: "United States", countryCode: "US", type: "airport" },
  { name: "Indianapolis International (IND)", code: "IND", country: "United States", countryCode: "US", type: "airport" },
  { name: "Cleveland Hopkins (CLE)", code: "CLE", country: "United States", countryCode: "US", type: "airport" },
  { name: "Pittsburgh International (PIT)", code: "PIT", country: "United States", countryCode: "US", type: "airport" },
  { name: "St. Louis Lambert (STL)", code: "STL", country: "United States", countryCode: "US", type: "airport" },
  { name: "Memphis International (MEM)", code: "MEM", country: "United States", countryCode: "US", type: "airport" },
  { name: "New Orleans Louis Armstrong (MSY)", code: "MSY", country: "United States", countryCode: "US", type: "airport" },
  { name: "Jacksonville International (JAX)", code: "JAX", country: "United States", countryCode: "US", type: "airport" },
  { name: "Ontario International (ONT)", code: "ONT", country: "United States", countryCode: "US", type: "airport" },
  { name: "Oakland International (OAK)", code: "OAK", country: "United States", countryCode: "US", type: "airport" },
  { name: "San Jose International (SJC)", code: "SJC", country: "United States", countryCode: "US", type: "airport" },
  { name: "John Wayne Orange County (SNA)", code: "SNA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Daniel K. Inouye Honolulu (HNL)", code: "HNL", country: "United States", countryCode: "US", type: "airport" },
  { name: "Anchorage Ted Stevens (ANC)", code: "ANC", country: "United States", countryCode: "US", type: "airport" },
  { name: "Midway International Chicago (MDW)", code: "MDW", country: "United States", countryCode: "US", type: "airport" },
  { name: "Love Field Dallas (DAL)", code: "DAL", country: "United States", countryCode: "US", type: "airport" },
  { name: "William P. Hobby Houston (HOU)", code: "HOU", country: "United States", countryCode: "US", type: "airport" },
  { name: "Milwaukee Mitchell (MKE)", code: "MKE", country: "United States", countryCode: "US", type: "airport" },
  { name: "Columbus International (CMH)", code: "CMH", country: "United States", countryCode: "US", type: "airport" },
  { name: "Norfolk International (ORF)", code: "ORF", country: "United States", countryCode: "US", type: "airport" },
  { name: "Richmond International (RIC)", code: "RIC", country: "United States", countryCode: "US", type: "airport" },
  { name: "Omaha Eppley Airfield (OMA)", code: "OMA", country: "United States", countryCode: "US", type: "airport" },
  { name: "Albuquerque Sunport (ABQ)", code: "ABQ", country: "United States", countryCode: "US", type: "airport" },
  { name: "Tucson International (TUS)", code: "TUS", country: "United States", countryCode: "US", type: "airport" },
  { name: "El Paso International (ELP)", code: "ELP", country: "United States", countryCode: "US", type: "airport" },
  { name: "Louisville Muhammad Ali (SDF)", code: "SDF", country: "United States", countryCode: "US", type: "airport" },
  { name: "Boise Airport (BOI)", code: "BOI", country: "United States", countryCode: "US", type: "airport" },
  { name: "Spokane International (GEG)", code: "GEG", country: "United States", countryCode: "US", type: "airport" },
  { name: "Reno-Tahoe International (RNO)", code: "RNO", country: "United States", countryCode: "US", type: "airport" },
  { name: "Tulsa International (TUL)", code: "TUL", country: "United States", countryCode: "US", type: "airport" },
  { name: "Buffalo Niagara (BUF)", code: "BUF", country: "United States", countryCode: "US", type: "airport" },
  { name: "Providence T.F. Green (PVD)", code: "PVD", country: "United States", countryCode: "US", type: "airport" },
  { name: "Bradley International Hartford (BDL)", code: "BDL", country: "United States", countryCode: "US", type: "airport" },
  { name: "Westchester County (HPN)", code: "HPN", country: "United States", countryCode: "US", type: "airport" },
  { name: "Charleston International (CHS)", code: "CHS", country: "United States", countryCode: "US", type: "airport" },
  { name: "Greenville-Spartanburg (GSP)", code: "GSP", country: "United States", countryCode: "US", type: "airport" },
  { name: "Savannah/Hilton Head (SAV)", code: "SAV", country: "United States", countryCode: "US", type: "airport" },
  { name: "Des Moines International (DSM)", code: "DSM", country: "United States", countryCode: "US", type: "airport" },
  { name: "Birmingham-Shuttlesworth (BHM)", code: "BHM", country: "United States", countryCode: "US", type: "airport" },
  { name: "Little Rock National (LIT)", code: "LIT", country: "United States", countryCode: "US", type: "airport" },

  // CANADA 🇨🇦
  // Ports
  { name: "Port of Vancouver", code: "CAVAN", country: "Canada", countryCode: "CA", type: "port" },
  { name: "Port of Montreal", code: "CAMTR", country: "Canada", countryCode: "CA", type: "port" },
  { name: "Port of Halifax", code: "CAHAL", country: "Canada", countryCode: "CA", type: "port" },
  { name: "Port of Prince Rupert", code: "CAPRR", country: "Canada", countryCode: "CA", type: "port" },
  { name: "Port of Saint John", code: "CASJN", country: "Canada", countryCode: "CA", type: "port" },
  { name: "Port of Quebec", code: "CAQBC", country: "Canada", countryCode: "CA", type: "port" },
  // Airports
  { name: "Toronto Pearson (YYZ)", code: "YYZ", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Vancouver International (YVR)", code: "YVR", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Montreal-Trudeau (YUL)", code: "YUL", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Calgary International (YYC)", code: "YYC", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Edmonton International (YEG)", code: "YEG", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Ottawa Macdonald-Cartier (YOW)", code: "YOW", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Winnipeg Richardson (YWG)", code: "YWG", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Halifax Stanfield (YHZ)", code: "YHZ", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Victoria International (YYJ)", code: "YYJ", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Quebec City Jean Lesage (YQB)", code: "YQB", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Hamilton John C. Munro (YHM)", code: "YHM", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "London International (YXU)", code: "YXU", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Kelowna International (YLW)", code: "YLW", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Regina International (YQR)", code: "YQR", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Saskatoon John G. Diefenbaker (YXE)", code: "YXE", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Thunder Bay International (YQT)", code: "YQT", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Moncton Greater (YQM)", code: "YQM", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Saint John Airport (YSJ)", code: "YSJ", country: "Canada", countryCode: "CA", type: "airport" },
  { name: "Abbotsford International (YXX)", code: "YXX", country: "Canada", countryCode: "CA", type: "airport" },

  // MEXICO 🇲🇽
  // Ports
  { name: "Port of Manzanillo", code: "MXZLO", country: "Mexico", countryCode: "MX", type: "port" },
  { name: "Port of Veracruz", code: "MXVER", country: "Mexico", countryCode: "MX", type: "port" },
  { name: "Port of Lázaro Cárdenas", code: "MXLZC", country: "Mexico", countryCode: "MX", type: "port" },
  { name: "Port of Altamira", code: "MXTAM", country: "Mexico", countryCode: "MX", type: "port" },
  { name: "Port of Ensenada", code: "MXESE", country: "Mexico", countryCode: "MX", type: "port" },
  { name: "Port of Progreso", code: "MXPGR", country: "Mexico", countryCode: "MX", type: "port" },
  // Airports
  { name: "Mexico City International (MEX)", code: "MEX", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Cancún International (CUN)", code: "CUN", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Guadalajara International (GDL)", code: "GDL", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Monterrey International (MTY)", code: "MTY", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Tijuana International (TIJ)", code: "TIJ", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Los Cabos International (SJD)", code: "SJD", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Puerto Vallarta International (PVR)", code: "PVR", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Mérida International (MID)", code: "MID", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Querétaro International (QRO)", code: "QRO", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Toluca International (TLC)", code: "TLC", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Hermosillo International (HMO)", code: "HMO", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Chihuahua International (CUU)", code: "CUU", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "León/Bajío International (BJX)", code: "BJX", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Acapulco International (ACA)", code: "ACA", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Mazatlán International (MZT)", code: "MZT", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Veracruz International (VER)", code: "VER", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Tuxtla Gutiérrez (TGZ)", code: "TGZ", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Oaxaca International (OAX)", code: "OAX", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Aguascalientes International (AGU)", code: "AGU", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Reynosa International (REX)", code: "REX", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Tampico International (TAM)", code: "TAM", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "La Paz International (LAP)", code: "LAP", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Zacatecas International (ZCL)", code: "ZCL", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Culiacán International (CUL)", code: "CUL", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Ciudad Juárez International (CJS)", code: "CJS", country: "Mexico", countryCode: "MX", type: "airport" },
  { name: "Morelia International (MLM)", code: "MLM", country: "Mexico", countryCode: "MX", type: "airport" },

  // ========== SOUTH AMERICA ==========

  // COLOMBIA 🇨🇴
  // Ports
  { name: "Port of Cartagena", code: "COCTG", country: "Colombia", countryCode: "CO", type: "port" },
  { name: "Port of Barranquilla", code: "COBAQ", country: "Colombia", countryCode: "CO", type: "port" },
  { name: "Port of Buenaventura", code: "COBUN", country: "Colombia", countryCode: "CO", type: "port" },
  { name: "Port of Santa Marta", code: "COSMR", country: "Colombia", countryCode: "CO", type: "port" },
  { name: "Port of Turbo", code: "COTBO", country: "Colombia", countryCode: "CO", type: "port" },
  // Airports
  { name: "El Dorado International Bogotá (BOG)", code: "BOG", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "José María Córdova Medellín (MDE)", code: "MDE", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Alfonso Bonilla Aragón Cali (CLO)", code: "CLO", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Rafael Núñez Cartagena (CTG)", code: "CTG", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Ernesto Cortissoz Barranquilla (BAQ)", code: "BAQ", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Simón Bolívar Santa Marta (SMR)", code: "SMR", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Matecaña Pereira (PEI)", code: "PEI", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Palonegro Bucaramanga (BGA)", code: "BGA", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Enrique Olaya Herrera Medellín (EOH)", code: "EOH", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Alfonso López Valledupar (VUP)", code: "VUP", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Camilo Daza Cúcuta (CUC)", code: "CUC", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Almirante Padilla Riohacha (RCH)", code: "RCH", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Los Garzones Montería (MTR)", code: "MTR", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "El Edén Armenia (AXM)", code: "AXM", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Palonegro Ibagué (IBE)", code: "IBE", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Gustavo Rojas Pinilla San Andrés (ADZ)", code: "ADZ", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Antonio Nariño Pasto (PSO)", code: "PSO", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Benito Salas Neiva (NVA)", code: "NVA", country: "Colombia", countryCode: "CO", type: "airport" },
  { name: "Yariguíes Barrancabermeja (EJA)", code: "EJA", country: "Colombia", countryCode: "CO", type: "airport" },

  // VENEZUELA 🇻🇪
  // Ports
  { name: "Puerto de La Guaira", code: "VELGR", country: "Venezuela", countryCode: "VE", type: "port" },
  { name: "Puerto Cabello", code: "VEPBL", country: "Venezuela", countryCode: "VE", type: "port" },
  { name: "Puerto de Maracaibo", code: "VEMAR", country: "Venezuela", countryCode: "VE", type: "port" },
  { name: "Puerto de Guanta", code: "VEGUA", country: "Venezuela", countryCode: "VE", type: "port" },
  { name: "Puerto Sucre", code: "VECMN", country: "Venezuela", countryCode: "VE", type: "port" },
  { name: "Puerto La Cruz", code: "VEPLC", country: "Venezuela", countryCode: "VE", type: "port" },
  { name: "Puerto Ordaz", code: "VEPZO", country: "Venezuela", countryCode: "VE", type: "port" },
  // Airports
  { name: "Simón Bolívar International Caracas (CCS)", code: "CCS", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "La Chinita International Maracaibo (MAR)", code: "MAR", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Arturo Michelena International Valencia (VLN)", code: "VLN", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "José Antonio Anzoátegui Barcelona (BLA)", code: "BLA", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Manuel Carlos Piar Puerto Ordaz (PZO)", code: "PZO", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Santiago Mariño Porlamar (PMV)", code: "PMV", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Josefa Camejo Paraguaná (LSP)", code: "LSP", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Alberto Carnevalli Mérida (MRD)", code: "MRD", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Antonio José de Sucre Cumaná (CUM)", code: "CUM", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Mayor Buenaventura Vivas Santo Domingo (STD)", code: "STD", country: "Venezuela", countryCode: "VE", type: "airport" },
  { name: "Juan Pablo Pérez Alfonzo El Vigía (VIG)", code: "VIG", country: "Venezuela", countryCode: "VE", type: "airport" },

  // BRAZIL 🇧🇷
  // Ports
  { name: "Port of Santos", code: "BRSSZ", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Rio de Janeiro", code: "BRRIO", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Paranaguá", code: "BRPNG", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Itajaí", code: "BRITJ", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Salvador", code: "BRSSA", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Suape", code: "BRSPE", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Vitória", code: "BRVIX", country: "Brazil", countryCode: "BR", type: "port" },
  { name: "Port of Manaus", code: "BRMAO", country: "Brazil", countryCode: "BR", type: "port" },
  // Airports
  { name: "São Paulo/Guarulhos (GRU)", code: "GRU", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Rio de Janeiro/Galeão (GIG)", code: "GIG", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Brasília International (BSB)", code: "BSB", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Congonhas São Paulo (CGH)", code: "CGH", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Recife/Guararapes (REC)", code: "REC", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Belo Horizonte/Confins (CNF)", code: "CNF", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Salvador International (SSA)", code: "SSA", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Fortaleza/Pinto Martins (FOR)", code: "FOR", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Curitiba/Afonso Pena (CWB)", code: "CWB", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Porto Alegre/Salgado Filho (POA)", code: "POA", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Manaus/Eduardo Gomes (MAO)", code: "MAO", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Santos Dumont Rio de Janeiro (SDU)", code: "SDU", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Belém International (BEL)", code: "BEL", country: "Brazil", countryCode: "BR", type: "airport" },
  { name: "Campinas/Viracopos (VCP)", code: "VCP", country: "Brazil", countryCode: "BR", type: "airport" },

  // ARGENTINA 🇦🇷
  // Ports
  { name: "Port of Buenos Aires", code: "ARBUE", country: "Argentina", countryCode: "AR", type: "port" },
  { name: "Port of Rosario", code: "ARROS", country: "Argentina", countryCode: "AR", type: "port" },
  { name: "Port of Bahía Blanca", code: "ARBHI", country: "Argentina", countryCode: "AR", type: "port" },
  { name: "Port of Mar del Plata", code: "ARMDQ", country: "Argentina", countryCode: "AR", type: "port" },
  // Airports
  { name: "Ezeiza International Buenos Aires (EZE)", code: "EZE", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "Aeroparque Jorge Newbery (AEP)", code: "AEP", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "Córdoba International (COR)", code: "COR", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "Mendoza International (MDZ)", code: "MDZ", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "Rosario International (ROS)", code: "ROS", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "Salta International (SLA)", code: "SLA", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "San Carlos de Bariloche (BRC)", code: "BRC", country: "Argentina", countryCode: "AR", type: "airport" },
  { name: "Ushuaia International (USH)", code: "USH", country: "Argentina", countryCode: "AR", type: "airport" },

  // CHILE 🇨🇱
  // Ports
  { name: "Port of Valparaíso", code: "CLVAP", country: "Chile", countryCode: "CL", type: "port" },
  { name: "Port of San Antonio", code: "CLSAN", country: "Chile", countryCode: "CL", type: "port" },
  { name: "Port of Talcahuano", code: "CLTAL", country: "Chile", countryCode: "CL", type: "port" },
  { name: "Port of Antofagasta", code: "CLANT", country: "Chile", countryCode: "CL", type: "port" },
  { name: "Port of Iquique", code: "CLIQQ", country: "Chile", countryCode: "CL", type: "port" },
  // Airports
  { name: "Arturo Merino Benítez Santiago (SCL)", code: "SCL", country: "Chile", countryCode: "CL", type: "airport" },
  { name: "Carriel Sur Concepción (CCP)", code: "CCP", country: "Chile", countryCode: "CL", type: "airport" },
  { name: "El Tepual Puerto Montt (PMC)", code: "PMC", country: "Chile", countryCode: "CL", type: "airport" },
  { name: "Diego Aracena Iquique (IQQ)", code: "IQQ", country: "Chile", countryCode: "CL", type: "airport" },
  { name: "Cerro Moreno Antofagasta (ANF)", code: "ANF", country: "Chile", countryCode: "CL", type: "airport" },
  { name: "La Florida La Serena (LSC)", code: "LSC", country: "Chile", countryCode: "CL", type: "airport" },
  { name: "Presidente Ibáñez Punta Arenas (PUQ)", code: "PUQ", country: "Chile", countryCode: "CL", type: "airport" },

  // PERU 🇵🇪
  // Ports
  { name: "Port of Callao", code: "PECLL", country: "Peru", countryCode: "PE", type: "port" },
  { name: "Port of Paita", code: "PEPAI", country: "Peru", countryCode: "PE", type: "port" },
  { name: "Port of Matarani", code: "PEMRI", country: "Peru", countryCode: "PE", type: "port" },
  { name: "Port of Salaverry", code: "PESAL", country: "Peru", countryCode: "PE", type: "port" },
  // Airports
  { name: "Jorge Chávez International Lima (LIM)", code: "LIM", country: "Peru", countryCode: "PE", type: "airport" },
  { name: "Alejandro Velasco Astete Cusco (CUZ)", code: "CUZ", country: "Peru", countryCode: "PE", type: "airport" },
  { name: "Rodríguez Ballón Arequipa (AQP)", code: "AQP", country: "Peru", countryCode: "PE", type: "airport" },
  { name: "Capitán FAP Carlos Martínez de Pinillos Trujillo (TRU)", code: "TRU", country: "Peru", countryCode: "PE", type: "airport" },
  { name: "Coronel FAP Francisco Secada Vignetta Iquitos (IQT)", code: "IQT", country: "Peru", countryCode: "PE", type: "airport" },
  { name: "Capitán FAP Guillermo Concha Iberico Piura (PIU)", code: "PIU", country: "Peru", countryCode: "PE", type: "airport" },

  // ECUADOR 🇪🇨
  // Ports
  { name: "Port of Guayaquil", code: "ECGYE", country: "Ecuador", countryCode: "EC", type: "port" },
  { name: "Port of Manta", code: "ECMAN", country: "Ecuador", countryCode: "EC", type: "port" },
  { name: "Port of Esmeraldas", code: "ECESM", country: "Ecuador", countryCode: "EC", type: "port" },
  { name: "Port of Puerto Bolívar", code: "ECPBO", country: "Ecuador", countryCode: "EC", type: "port" },
  // Airports
  { name: "Mariscal Sucre International Quito (UIO)", code: "UIO", country: "Ecuador", countryCode: "EC", type: "airport" },
  { name: "José Joaquín de Olmedo Guayaquil (GYE)", code: "GYE", country: "Ecuador", countryCode: "EC", type: "airport" },
  { name: "Mariscal Lamar Cuenca (CUE)", code: "CUE", country: "Ecuador", countryCode: "EC", type: "airport" },
  { name: "Eloy Alfaro Manta (MEC)", code: "MEC", country: "Ecuador", countryCode: "EC", type: "airport" },
  { name: "Seymour Galápagos (GPS)", code: "GPS", country: "Ecuador", countryCode: "EC", type: "airport" },

  // URUGUAY 🇺🇾
  // Ports
  { name: "Port of Montevideo", code: "UYMVD", country: "Uruguay", countryCode: "UY", type: "port" },
  { name: "Port of Fray Bentos", code: "UYFBY", country: "Uruguay", countryCode: "UY", type: "port" },
  // Airports
  { name: "Carrasco International Montevideo (MVD)", code: "MVD", country: "Uruguay", countryCode: "UY", type: "airport" },
  { name: "Capitán de Corbeta Carlos A. Curbelo Punta del Este (PDP)", code: "PDP", country: "Uruguay", countryCode: "UY", type: "airport" },

  // PARAGUAY 🇵🇾
  // Airports
  { name: "Silvio Pettirossi International Asunción (ASU)", code: "ASU", country: "Paraguay", countryCode: "PY", type: "airport" },
  { name: "Guaraní International Ciudad del Este (AGT)", code: "AGT", country: "Paraguay", countryCode: "PY", type: "airport" },

  // BOLIVIA 🇧🇴
  // Airports
  { name: "El Alto International La Paz (LPB)", code: "LPB", country: "Bolivia", countryCode: "BO", type: "airport" },
  { name: "Viru Viru International Santa Cruz (VVI)", code: "VVI", country: "Bolivia", countryCode: "BO", type: "airport" },
  { name: "Jorge Wilstermann Cochabamba (CBB)", code: "CBB", country: "Bolivia", countryCode: "BO", type: "airport" },

  // ========== CENTRAL AMERICA & CARIBBEAN ==========

  // PANAMA 🇵🇦
  // Ports
  { name: "Port of Balboa", code: "PABAL", country: "Panama", countryCode: "PA", type: "port" },
  { name: "Port of Colón", code: "PAPMR", country: "Panama", countryCode: "PA", type: "port" },
  { name: "Port of Manzanillo", code: "PAMIT", country: "Panama", countryCode: "PA", type: "port" },
  // Airports
  { name: "Tocumen International Panama City (PTY)", code: "PTY", country: "Panama", countryCode: "PA", type: "airport" },
  { name: "Marcos A. Gelabert Albrook (PAC)", code: "PAC", country: "Panama", countryCode: "PA", type: "airport" },
  { name: "Enrique Malek David (DAV)", code: "DAV", country: "Panama", countryCode: "PA", type: "airport" },

  // COSTA RICA 🇨🇷
  // Ports
  { name: "Port of Limón", code: "CRLIM", country: "Costa Rica", countryCode: "CR", type: "port" },
  { name: "Port of Caldera", code: "CRCAL", country: "Costa Rica", countryCode: "CR", type: "port" },
  { name: "Port of Puntarenas", code: "CRPIO", country: "Costa Rica", countryCode: "CR", type: "port" },
  // Airports
  { name: "Juan Santamaría International San José (SJO)", code: "SJO", country: "Costa Rica", countryCode: "CR", type: "airport" },
  { name: "Daniel Oduber Quirós Liberia (LIR)", code: "LIR", country: "Costa Rica", countryCode: "CR", type: "airport" },
  { name: "Tobías Bolaños Alajuela (SYQ)", code: "SYQ", country: "Costa Rica", countryCode: "CR", type: "airport" },

  // GUATEMALA 🇬🇹
  // Ports
  { name: "Port of Quetzal", code: "GTPRQ", country: "Guatemala", countryCode: "GT", type: "port" },
  { name: "Port of Santo Tomás de Castilla", code: "GTSTO", country: "Guatemala", countryCode: "GT", type: "port" },
  // Airports
  { name: "La Aurora International Guatemala City (GUA)", code: "GUA", country: "Guatemala", countryCode: "GT", type: "airport" },
  { name: "Mundo Maya International Flores (FRS)", code: "FRS", country: "Guatemala", countryCode: "GT", type: "airport" },

  // EL SALVADOR 🇸🇻
  // Ports
  { name: "Port of Acajutla", code: "SVAQJ", country: "El Salvador", countryCode: "SV", type: "port" },
  // Airports
  { name: "Monseñor Óscar Arnulfo Romero International (SAL)", code: "SAL", country: "El Salvador", countryCode: "SV", type: "airport" },

  // HONDURAS 🇭🇳
  // Ports
  { name: "Port of Puerto Cortés", code: "HNPCR", country: "Honduras", countryCode: "HN", type: "port" },
  { name: "Port of La Ceiba", code: "HNLCB", country: "Honduras", countryCode: "HN", type: "port" },
  // Airports
  { name: "Toncontín International Tegucigalpa (TGU)", code: "TGU", country: "Honduras", countryCode: "HN", type: "airport" },
  { name: "Ramón Villeda Morales San Pedro Sula (SAP)", code: "SAP", country: "Honduras", countryCode: "HN", type: "airport" },
  { name: "Golosón International La Ceiba (LCE)", code: "LCE", country: "Honduras", countryCode: "HN", type: "airport" },

  // NICARAGUA 🇳🇮
  // Ports
  { name: "Port of Corinto", code: "NICOR", country: "Nicaragua", countryCode: "NI", type: "port" },
  // Airports
  { name: "Augusto C. Sandino International Managua (MGA)", code: "MGA", country: "Nicaragua", countryCode: "NI", type: "airport" },

  // DOMINICAN REPUBLIC 🇩🇴
  // Ports
  { name: "Port of Santo Domingo", code: "DOSDQ", country: "Dominican Republic", countryCode: "DO", type: "port" },
  { name: "Port of Haina", code: "DOHAI", country: "Dominican Republic", countryCode: "DO", type: "port" },
  { name: "Port of Caucedo", code: "DOCAU", country: "Dominican Republic", countryCode: "DO", type: "port" },
  // Airports
  { name: "Las Américas International Santo Domingo (SDQ)", code: "SDQ", country: "Dominican Republic", countryCode: "DO", type: "airport" },
  { name: "Punta Cana International (PUJ)", code: "PUJ", country: "Dominican Republic", countryCode: "DO", type: "airport" },
  { name: "Gregorio Luperón Puerto Plata (POP)", code: "POP", country: "Dominican Republic", countryCode: "DO", type: "airport" },
  { name: "Cibao International Santiago (STI)", code: "STI", country: "Dominican Republic", countryCode: "DO", type: "airport" },
  { name: "La Romana International (LRM)", code: "LRM", country: "Dominican Republic", countryCode: "DO", type: "airport" },

  // JAMAICA 🇯🇲
  // Ports
  { name: "Port of Kingston", code: "JMKIN", country: "Jamaica", countryCode: "JM", type: "port" },
  { name: "Port of Montego Bay", code: "JMMBJ", country: "Jamaica", countryCode: "JM", type: "port" },
  // Airports
  { name: "Norman Manley International Kingston (KIN)", code: "KIN", country: "Jamaica", countryCode: "JM", type: "airport" },
  { name: "Sangster International Montego Bay (MBJ)", code: "MBJ", country: "Jamaica", countryCode: "JM", type: "airport" },

  // PUERTO RICO 🇵🇷
  // Ports
  { name: "Port of San Juan", code: "PRSJU", country: "Puerto Rico", countryCode: "PR", type: "port" },
  { name: "Port of Ponce", code: "PRPSE", country: "Puerto Rico", countryCode: "PR", type: "port" },
  // Airports
  { name: "Luis Muñoz Marín International San Juan (SJU)", code: "SJU", country: "Puerto Rico", countryCode: "PR", type: "airport" },
  { name: "Rafael Hernández Aguadilla (BQN)", code: "BQN", country: "Puerto Rico", countryCode: "PR", type: "airport" },
  { name: "Mercedita Ponce (PSE)", code: "PSE", country: "Puerto Rico", countryCode: "PR", type: "airport" },

  // CUBA 🇨🇺
  // Ports
  { name: "Port of Havana", code: "CUHAV", country: "Cuba", countryCode: "CU", type: "port" },
  { name: "Port of Santiago de Cuba", code: "CUSCU", country: "Cuba", countryCode: "CU", type: "port" },
  // Airports
  { name: "José Martí International Havana (HAV)", code: "HAV", country: "Cuba", countryCode: "CU", type: "airport" },
  { name: "Juan Gualberto Gómez Varadero (VRA)", code: "VRA", country: "Cuba", countryCode: "CU", type: "airport" },
  { name: "Antonio Maceo Santiago de Cuba (SCU)", code: "SCU", country: "Cuba", countryCode: "CU", type: "airport" },

  // TRINIDAD AND TOBAGO 🇹🇹
  // Ports
  { name: "Port of Spain", code: "TTPOS", country: "Trinidad and Tobago", countryCode: "TT", type: "port" },
  { name: "Port of Point Lisas", code: "TTPTL", country: "Trinidad and Tobago", countryCode: "TT", type: "port" },
  // Airports
  { name: "Piarco International Port of Spain (POS)", code: "POS", country: "Trinidad and Tobago", countryCode: "TT", type: "airport" },
  { name: "Arthur Napoleon Raymond Robinson Tobago (TAB)", code: "TAB", country: "Trinidad and Tobago", countryCode: "TT", type: "airport" },

  // BAHAMAS 🇧🇸
  // Ports
  { name: "Port of Freeport", code: "BSFPO", country: "Bahamas", countryCode: "BS", type: "port" },
  { name: "Port of Nassau", code: "BSNAS", country: "Bahamas", countryCode: "BS", type: "port" },
  // Airports
  { name: "Lynden Pindling International Nassau (NAS)", code: "NAS", country: "Bahamas", countryCode: "BS", type: "airport" },
  { name: "Grand Bahama International Freeport (FPO)", code: "FPO", country: "Bahamas", countryCode: "BS", type: "airport" },

  // BARBADOS 🇧🇧
  // Ports
  { name: "Port of Bridgetown", code: "BBBGI", country: "Barbados", countryCode: "BB", type: "port" },
  // Airports
  { name: "Grantley Adams International (BGI)", code: "BGI", country: "Barbados", countryCode: "BB", type: "airport" },

  // ========== EUROPE ==========

  // SPAIN 🇪🇸
  // Ports
  { name: "Port of Barcelona", code: "ESBCN", country: "Spain", countryCode: "ES", type: "port" },
  { name: "Port of Valencia", code: "ESVLC", country: "Spain", countryCode: "ES", type: "port" },
  { name: "Port of Algeciras", code: "ESALG", country: "Spain", countryCode: "ES", type: "port" },
  { name: "Port of Bilbao", code: "ESBIO", country: "Spain", countryCode: "ES", type: "port" },
  { name: "Port of Tarragona", code: "ESTAR", country: "Spain", countryCode: "ES", type: "port" },
  { name: "Port of Las Palmas", code: "ESLPA", country: "Spain", countryCode: "ES", type: "port" },
  { name: "Port of Málaga", code: "ESAGP", country: "Spain", countryCode: "ES", type: "port" },
  // Airports
  { name: "Madrid–Barajas Adolfo Suárez (MAD)", code: "MAD", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Barcelona–El Prat (BCN)", code: "BCN", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Palma de Mallorca (PMI)", code: "PMI", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Málaga-Costa del Sol (AGP)", code: "AGP", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Gran Canaria (LPA)", code: "LPA", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Alicante-Elche (ALC)", code: "ALC", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Valencia Airport (VLC)", code: "VLC", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Sevilla Airport (SVQ)", code: "SVQ", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Bilbao Airport (BIO)", code: "BIO", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Tenerife South (TFS)", code: "TFS", country: "Spain", countryCode: "ES", type: "airport" },
  { name: "Ibiza Airport (IBZ)", code: "IBZ", country: "Spain", countryCode: "ES", type: "airport" },

  // GERMANY 🇩🇪
  // Ports
  { name: "Port of Hamburg", code: "DEHAM", country: "Germany", countryCode: "DE", type: "port" },
  { name: "Port of Bremerhaven", code: "DEBRV", country: "Germany", countryCode: "DE", type: "port" },
  { name: "Port of Bremen", code: "DEBRE", country: "Germany", countryCode: "DE", type: "port" },
  { name: "Port of Wilhelmshaven", code: "DEWVN", country: "Germany", countryCode: "DE", type: "port" },
  // Airports
  { name: "Frankfurt Airport (FRA)", code: "FRA", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Munich Airport (MUC)", code: "MUC", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Berlin Brandenburg (BER)", code: "BER", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Düsseldorf Airport (DUS)", code: "DUS", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Hamburg Airport (HAM)", code: "HAM", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Cologne Bonn Airport (CGN)", code: "CGN", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Stuttgart Airport (STR)", code: "STR", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Hannover Airport (HAJ)", code: "HAJ", country: "Germany", countryCode: "DE", type: "airport" },
  { name: "Nuremberg Airport (NUE)", code: "NUE", country: "Germany", countryCode: "DE", type: "airport" },

  // FRANCE 🇫🇷
  // Ports
  { name: "Port of Marseille", code: "FRMRS", country: "France", countryCode: "FR", type: "port" },
  { name: "Port of Le Havre", code: "FRLEH", country: "France", countryCode: "FR", type: "port" },
  { name: "Port of Dunkirk", code: "FRDKK", country: "France", countryCode: "FR", type: "port" },
  { name: "Port of Nantes-Saint-Nazaire", code: "FRSNT", country: "France", countryCode: "FR", type: "port" },
  { name: "Port of Bordeaux", code: "FRBOD", country: "France", countryCode: "FR", type: "port" },
  // Airports
  { name: "Charles de Gaulle Paris (CDG)", code: "CDG", country: "France", countryCode: "FR", type: "airport" },
  { name: "Paris Orly (ORY)", code: "ORY", country: "France", countryCode: "FR", type: "airport" },
  { name: "Nice Côte d'Azur (NCE)", code: "NCE", country: "France", countryCode: "FR", type: "airport" },
  { name: "Lyon Saint-Exupéry (LYS)", code: "LYS", country: "France", countryCode: "FR", type: "airport" },
  { name: "Marseille Provence (MRS)", code: "MRS", country: "France", countryCode: "FR", type: "airport" },
  { name: "Toulouse-Blagnac (TLS)", code: "TLS", country: "France", countryCode: "FR", type: "airport" },
  { name: "Bordeaux-Mérignac (BOD)", code: "BOD", country: "France", countryCode: "FR", type: "airport" },
  { name: "Nantes Atlantique (NTE)", code: "NTE", country: "France", countryCode: "FR", type: "airport" },
  { name: "Strasbourg Airport (SXB)", code: "SXB", country: "France", countryCode: "FR", type: "airport" },

  // UNITED KINGDOM 🇬🇧
  // Ports
  { name: "Port of Felixstowe", code: "GBFXT", country: "United Kingdom", countryCode: "GB", type: "port" },
  { name: "Port of Southampton", code: "GBSOU", country: "United Kingdom", countryCode: "GB", type: "port" },
  { name: "Port of London", code: "GBLON", country: "United Kingdom", countryCode: "GB", type: "port" },
  { name: "Port of Liverpool", code: "GBLIV", country: "United Kingdom", countryCode: "GB", type: "port" },
  { name: "Port of Immingham", code: "GBIMM", country: "United Kingdom", countryCode: "GB", type: "port" },
  { name: "Port of Dover", code: "GBDOV", country: "United Kingdom", countryCode: "GB", type: "port" },
  // Airports
  { name: "London Heathrow (LHR)", code: "LHR", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "London Gatwick (LGW)", code: "LGW", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "Manchester Airport (MAN)", code: "MAN", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "London Stansted (STN)", code: "STN", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "London Luton (LTN)", code: "LTN", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "Edinburgh Airport (EDI)", code: "EDI", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "Birmingham Airport (BHX)", code: "BHX", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "Glasgow Airport (GLA)", code: "GLA", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "Bristol Airport (BRS)", code: "BRS", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "Newcastle Airport (NCL)", code: "NCL", country: "United Kingdom", countryCode: "GB", type: "airport" },
  { name: "London City (LCY)", code: "LCY", country: "United Kingdom", countryCode: "GB", type: "airport" },

  // ITALY 🇮🇹
  // Ports
  { name: "Port of Genoa", code: "ITGOA", country: "Italy", countryCode: "IT", type: "port" },
  { name: "Port of Gioia Tauro", code: "ITGIT", country: "Italy", countryCode: "IT", type: "port" },
  { name: "Port of Naples", code: "ITNAP", country: "Italy", countryCode: "IT", type: "port" },
  { name: "Port of Trieste", code: "ITTRS", country: "Italy", countryCode: "IT", type: "port" },
  { name: "Port of La Spezia", code: "ITSPE", country: "Italy", countryCode: "IT", type: "port" },
  { name: "Port of Venice", code: "ITVCE", country: "Italy", countryCode: "IT", type: "port" },
  { name: "Port of Livorno", code: "ITLIV", country: "Italy", countryCode: "IT", type: "port" },
  // Airports
  { name: "Rome Fiumicino Leonardo da Vinci (FCO)", code: "FCO", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Milan Malpensa (MXP)", code: "MXP", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Venice Marco Polo (VCE)", code: "VCE", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Milan Linate (LIN)", code: "LIN", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Naples International (NAP)", code: "NAP", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Bologna Guglielmo Marconi (BLQ)", code: "BLQ", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Rome Ciampino (CIA)", code: "CIA", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Turin Airport (TRN)", code: "TRN", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Palermo Falcone-Borsellino (PMO)", code: "PMO", country: "Italy", countryCode: "IT", type: "airport" },
  { name: "Catania-Fontanarossa (CTA)", code: "CTA", country: "Italy", countryCode: "IT", type: "airport" },

  // NETHERLANDS 🇳🇱
  // Ports
  { name: "Port of Rotterdam", code: "NLRTM", country: "Netherlands", countryCode: "NL", type: "port" },
  { name: "Port of Amsterdam", code: "NLAMS", country: "Netherlands", countryCode: "NL", type: "port" },
  { name: "Port of Vlissingen", code: "NLVLI", country: "Netherlands", countryCode: "NL", type: "port" },
  // Airports
  { name: "Amsterdam Schiphol (AMS)", code: "AMS", country: "Netherlands", countryCode: "NL", type: "airport" },
  { name: "Eindhoven Airport (EIN)", code: "EIN", country: "Netherlands", countryCode: "NL", type: "airport" },
  { name: "Rotterdam The Hague Airport (RTM)", code: "RTM", country: "Netherlands", countryCode: "NL", type: "airport" },

  // BELGIUM 🇧🇪
  // Ports
  { name: "Port of Antwerp", code: "BEANR", country: "Belgium", countryCode: "BE", type: "port" },
  { name: "Port of Zeebrugge", code: "BEZEE", country: "Belgium", countryCode: "BE", type: "port" },
  { name: "Port of Ghent", code: "BEGNE", country: "Belgium", countryCode: "BE", type: "port" },
  // Airports
  { name: "Brussels Airport (BRU)", code: "BRU", country: "Belgium", countryCode: "BE", type: "airport" },
  { name: "Brussels South Charleroi (CRL)", code: "CRL", country: "Belgium", countryCode: "BE", type: "airport" },
  { name: "Antwerp International (ANR)", code: "ANR", country: "Belgium", countryCode: "BE", type: "airport" },

  // PORTUGAL 🇵🇹
  // Ports
  { name: "Port of Lisbon", code: "PTLIS", country: "Portugal", countryCode: "PT", type: "port" },
  { name: "Port of Sines", code: "PTSIN", country: "Portugal", countryCode: "PT", type: "port" },
  { name: "Port of Leixões", code: "PTLEX", country: "Portugal", countryCode: "PT", type: "port" },
  // Airports
  { name: "Lisbon Portela Humberto Delgado (LIS)", code: "LIS", country: "Portugal", countryCode: "PT", type: "airport" },
  { name: "Porto Francisco Sá Carneiro (OPO)", code: "OPO", country: "Portugal", countryCode: "PT", type: "airport" },
  { name: "Faro Airport (FAO)", code: "FAO", country: "Portugal", countryCode: "PT", type: "airport" },
  { name: "Funchal Madeira (FNC)", code: "FNC", country: "Portugal", countryCode: "PT", type: "airport" },
  { name: "Ponta Delgada João Paulo II Azores (PDL)", code: "PDL", country: "Portugal", countryCode: "PT", type: "airport" },

  // GREECE 🇬🇷
  // Ports
  { name: "Port of Piraeus", code: "GRPIR", country: "Greece", countryCode: "GR", type: "port" },
  { name: "Port of Thessaloniki", code: "GRTHE", country: "Greece", countryCode: "GR", type: "port" },
  { name: "Port of Heraklion", code: "GRHER", country: "Greece", countryCode: "GR", type: "port" },
  // Airports
  { name: "Athens International Eleftherios Venizelos (ATH)", code: "ATH", country: "Greece", countryCode: "GR", type: "airport" },
  { name: "Thessaloniki Macedonia (SKG)", code: "SKG", country: "Greece", countryCode: "GR", type: "airport" },
  { name: "Heraklion Nikos Kazantzakis (HER)", code: "HER", country: "Greece", countryCode: "GR", type: "airport" },
  { name: "Rhodes Diagoras (RHO)", code: "RHO", country: "Greece", countryCode: "GR", type: "airport" },
  { name: "Corfu Ioannis Kapodistrias (CFU)", code: "CFU", country: "Greece", countryCode: "GR", type: "airport" },
  { name: "Chania Daskalogiannis (CHQ)", code: "CHQ", country: "Greece", countryCode: "GR", type: "airport" },

  // TURKEY 🇹🇷
  // Ports
  { name: "Port of Istanbul", code: "TRIST", country: "Turkey", countryCode: "TR", type: "port" },
  { name: "Port of Izmir", code: "TRIZM", country: "Turkey", countryCode: "TR", type: "port" },
  { name: "Port of Mersin", code: "TRMER", country: "Turkey", countryCode: "TR", type: "port" },
  { name: "Port of Kocaeli", code: "TRKOC", country: "Turkey", countryCode: "TR", type: "port" },
  // Airports
  { name: "Istanbul Airport (IST)", code: "IST", country: "Turkey", countryCode: "TR", type: "airport" },
  { name: "Sabiha Gökçen Istanbul (SAW)", code: "SAW", country: "Turkey", countryCode: "TR", type: "airport" },
  { name: "Antalya Airport (AYT)", code: "AYT", country: "Turkey", countryCode: "TR", type: "airport" },
  { name: "Ankara Esenboğa (ESB)", code: "ESB", country: "Turkey", countryCode: "TR", type: "airport" },
  { name: "Izmir Adnan Menderes (ADB)", code: "ADB", country: "Turkey", countryCode: "TR", type: "airport" },
  { name: "Dalaman Airport (DLM)", code: "DLM", country: "Turkey", countryCode: "TR", type: "airport" },
  { name: "Bodrum-Milas (BJV)", code: "BJV", country: "Turkey", countryCode: "TR", type: "airport" },

  // POLAND 🇵🇱
  // Ports
  { name: "Port of Gdańsk", code: "PLGDN", country: "Poland", countryCode: "PL", type: "port" },
  { name: "Port of Gdynia", code: "PLGDY", country: "Poland", countryCode: "PL", type: "port" },
  { name: "Port of Szczecin", code: "PLSZZ", country: "Poland", countryCode: "PL", type: "port" },
  // Airports
  { name: "Warsaw Chopin (WAW)", code: "WAW", country: "Poland", countryCode: "PL", type: "airport" },
  { name: "Kraków John Paul II (KRK)", code: "KRK", country: "Poland", countryCode: "PL", type: "airport" },
  { name: "Gdańsk Lech Wałęsa (GDN)", code: "GDN", country: "Poland", countryCode: "PL", type: "airport" },
  { name: "Warsaw Modlin (WMI)", code: "WMI", country: "Poland", countryCode: "PL", type: "airport" },
  { name: "Wrocław Copernicus (WRO)", code: "WRO", country: "Poland", countryCode: "PL", type: "airport" },
  { name: "Katowice Airport (KTW)", code: "KTW", country: "Poland", countryCode: "PL", type: "airport" },

  // RUSSIA 🇷🇺
  // Ports
  { name: "Port of St. Petersburg", code: "RULED", country: "Russia", countryCode: "RU", type: "port" },
  { name: "Port of Novorossiysk", code: "RUNVS", country: "Russia", countryCode: "RU", type: "port" },
  { name: "Port of Vladivostok", code: "RUVVO", country: "Russia", countryCode: "RU", type: "port" },
  { name: "Port of Kaliningrad", code: "RUKAL", country: "Russia", countryCode: "RU", type: "port" },
  // Airports
  { name: "Sheremetyevo International Moscow (SVO)", code: "SVO", country: "Russia", countryCode: "RU", type: "airport" },
  { name: "Domodedovo Moscow (DME)", code: "DME", country: "Russia", countryCode: "RU", type: "airport" },
  { name: "Vnukovo Moscow (VKO)", code: "VKO", country: "Russia", countryCode: "RU", type: "airport" },
  { name: "Pulkovo St. Petersburg (LED)", code: "LED", country: "Russia", countryCode: "RU", type: "airport" },
  { name: "Sochi International (AER)", code: "AER", country: "Russia", countryCode: "RU", type: "airport" },
  { name: "Koltsovo Yekaterinburg (SVX)", code: "SVX", country: "Russia", countryCode: "RU", type: "airport" },

  // SWEDEN 🇸🇪
  // Ports
  { name: "Port of Gothenburg", code: "SEGOT", country: "Sweden", countryCode: "SE", type: "port" },
  { name: "Port of Stockholm", code: "SESTO", country: "Sweden", countryCode: "SE", type: "port" },
  { name: "Port of Malmö", code: "SEMAL", country: "Sweden", countryCode: "SE", type: "port" },
  // Airports
  { name: "Stockholm Arlanda (ARN)", code: "ARN", country: "Sweden", countryCode: "SE", type: "airport" },
  { name: "Gothenburg Landvetter (GOT)", code: "GOT", country: "Sweden", countryCode: "SE", type: "airport" },
  { name: "Stockholm Bromma (BMA)", code: "BMA", country: "Sweden", countryCode: "SE", type: "airport" },
  { name: "Malmö Airport (MMX)", code: "MMX", country: "Sweden", countryCode: "SE", type: "airport" },

  // NORWAY 🇳🇴
  // Ports
  { name: "Port of Oslo", code: "NOOSL", country: "Norway", countryCode: "NO", type: "port" },
  { name: "Port of Bergen", code: "NOBGO", country: "Norway", countryCode: "NO", type: "port" },
  // Airports
  { name: "Oslo Gardermoen (OSL)", code: "OSL", country: "Norway", countryCode: "NO", type: "airport" },
  { name: "Bergen Flesland (BGO)", code: "BGO", country: "Norway", countryCode: "NO", type: "airport" },
  { name: "Stavanger Sola (SVG)", code: "SVG", country: "Norway", countryCode: "NO", type: "airport" },
  { name: "Trondheim Værnes (TRD)", code: "TRD", country: "Norway", countryCode: "NO", type: "airport" },

  // DENMARK 🇩🇰
  // Ports
  { name: "Port of Copenhagen", code: "DKCPH", country: "Denmark", countryCode: "DK", type: "port" },
  { name: "Port of Aarhus", code: "DKAAR", country: "Denmark", countryCode: "DK", type: "port" },
  // Airports
  { name: "Copenhagen Kastrup (CPH)", code: "CPH", country: "Denmark", countryCode: "DK", type: "airport" },
  { name: "Billund Airport (BLL)", code: "BLL", country: "Denmark", countryCode: "DK", type: "airport" },
  { name: "Aalborg Airport (AAL)", code: "AAL", country: "Denmark", countryCode: "DK", type: "airport" },

  // FINLAND 🇫🇮
  // Ports
  { name: "Port of Helsinki", code: "FIHEL", country: "Finland", countryCode: "FI", type: "port" },
  { name: "Port of Kotka", code: "FIKOT", country: "Finland", countryCode: "FI", type: "port" },
  // Airports
  { name: "Helsinki-Vantaa (HEL)", code: "HEL", country: "Finland", countryCode: "FI", type: "airport" },
  { name: "Oulu Airport (OUL)", code: "OUL", country: "Finland", countryCode: "FI", type: "airport" },
  { name: "Turku Airport (TKU)", code: "TKU", country: "Finland", countryCode: "FI", type: "airport" },

  // SWITZERLAND 🇨🇭
  // Airports
  { name: "Zurich Airport (ZRH)", code: "ZRH", country: "Switzerland", countryCode: "CH", type: "airport" },
  { name: "Geneva Airport (GVA)", code: "GVA", country: "Switzerland", countryCode: "CH", type: "airport" },
  { name: "Basel-Mulhouse-Freiburg (BSL)", code: "BSL", country: "Switzerland", countryCode: "CH", type: "airport" },
  { name: "Bern Airport (BRN)", code: "BRN", country: "Switzerland", countryCode: "CH", type: "airport" },

  // AUSTRIA 🇦🇹
  // Airports
  { name: "Vienna International (VIE)", code: "VIE", country: "Austria", countryCode: "AT", type: "airport" },
  { name: "Salzburg Airport (SZG)", code: "SZG", country: "Austria", countryCode: "AT", type: "airport" },
  { name: "Innsbruck Airport (INN)", code: "INN", country: "Austria", countryCode: "AT", type: "airport" },

  // IRELAND 🇮🇪
  // Ports
  { name: "Port of Dublin", code: "IEDUB", country: "Ireland", countryCode: "IE", type: "port" },
  { name: "Port of Cork", code: "IECORK", country: "Ireland", countryCode: "IE", type: "port" },
  // Airports
  { name: "Dublin Airport (DUB)", code: "DUB", country: "Ireland", countryCode: "IE", type: "airport" },
  { name: "Cork Airport (ORK)", code: "ORK", country: "Ireland", countryCode: "IE", type: "airport" },
  { name: "Shannon Airport (SNN)", code: "SNN", country: "Ireland", countryCode: "IE", type: "airport" },

  // CZECH REPUBLIC 🇨🇿
  // Airports
  { name: "Václav Havel Prague (PRG)", code: "PRG", country: "Czech Republic", countryCode: "CZ", type: "airport" },
  { name: "Brno-Tuřany (BRQ)", code: "BRQ", country: "Czech Republic", countryCode: "CZ", type: "airport" },

  // ROMANIA 🇷🇴
  // Ports
  { name: "Port of Constanța", code: "ROCND", country: "Romania", countryCode: "RO", type: "port" },
  // Airports
  { name: "Henri Coandă Bucharest (OTP)", code: "OTP", country: "Romania", countryCode: "RO", type: "airport" },
  { name: "Cluj-Napoca (CLJ)", code: "CLJ", country: "Romania", countryCode: "RO", type: "airport" },

  // HUNGARY 🇭🇺
  // Airports
  { name: "Budapest Ferenc Liszt (BUD)", code: "BUD", country: "Hungary", countryCode: "HU", type: "airport" },

  // CROATIA 🇭🇷
  // Ports
  { name: "Port of Rijeka", code: "HRRIK", country: "Croatia", countryCode: "HR", type: "port" },
  // Airports
  { name: "Zagreb Franjo Tuđman (ZAG)", code: "ZAG", country: "Croatia", countryCode: "HR", type: "airport" },
  { name: "Split Airport (SPU)", code: "SPU", country: "Croatia", countryCode: "HR", type: "airport" },
  { name: "Dubrovnik Airport (DBV)", code: "DBV", country: "Croatia", countryCode: "HR", type: "airport" },

  // UKRAINE 🇺🇦
  // Ports
  { name: "Port of Odesa", code: "UAODS", country: "Ukraine", countryCode: "UA", type: "port" },
  { name: "Port of Mykolaiv", code: "UAMKV", country: "Ukraine", countryCode: "UA", type: "port" },
  // Airports
  { name: "Boryspil International Kyiv (KBP)", code: "KBP", country: "Ukraine", countryCode: "UA", type: "airport" },
  { name: "Lviv Danylo Halytskyi (LWO)", code: "LWO", country: "Ukraine", countryCode: "UA", type: "airport" },

  // ========== ASIA ==========

  // CHINA 🇨🇳
  // Ports
  { name: "Port of Shanghai", code: "CNSHA", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Shenzhen", code: "CNSZX", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Ningbo-Zhoushan", code: "CNNGB", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Guangzhou", code: "CNCAN", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Qingdao", code: "CNTAO", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Tianjin", code: "CNTSN", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Xiamen", code: "CNXMN", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Dalian", code: "CNDLC", country: "China", countryCode: "CN", type: "port" },
  { name: "Port of Yingkou", code: "CNYIK", country: "China", countryCode: "CN", type: "port" },
  // Airports
  { name: "Beijing Capital International (PEK)", code: "PEK", country: "China", countryCode: "CN", type: "airport" },
  { name: "Beijing Daxing International (PKX)", code: "PKX", country: "China", countryCode: "CN", type: "airport" },
  { name: "Shanghai Pudong International (PVG)", code: "PVG", country: "China", countryCode: "CN", type: "airport" },
  { name: "Shanghai Hongqiao International (SHA)", code: "SHA", country: "China", countryCode: "CN", type: "airport" },
  { name: "Guangzhou Baiyun International (CAN)", code: "CAN", country: "China", countryCode: "CN", type: "airport" },
  { name: "Shenzhen Bao'an International (SZX)", code: "SZX", country: "China", countryCode: "CN", type: "airport" },
  { name: "Chengdu Shuangliu (CTU)", code: "CTU", country: "China", countryCode: "CN", type: "airport" },
  { name: "Chongqing Jiangbei (CKG)", code: "CKG", country: "China", countryCode: "CN", type: "airport" },
  { name: "Hong Kong International (HKG)", code: "HKG", country: "China", countryCode: "CN", type: "airport" },
  { name: "Kunming Changshui (KMG)", code: "KMG", country: "China", countryCode: "CN", type: "airport" },
  { name: "Xi'an Xianyang (XIY)", code: "XIY", country: "China", countryCode: "CN", type: "airport" },
  { name: "Hangzhou Xiaoshan (HGH)", code: "HGH", country: "China", countryCode: "CN", type: "airport" },
  { name: "Xiamen Gaoqi (XMN)", code: "XMN", country: "China", countryCode: "CN", type: "airport" },
  { name: "Nanjing Lukou (NKG)", code: "NKG", country: "China", countryCode: "CN", type: "airport" },

  // JAPAN 🇯🇵
  // Ports
  { name: "Port of Tokyo", code: "JPTYO", country: "Japan", countryCode: "JP", type: "port" },
  { name: "Port of Yokohama", code: "JPYOK", country: "Japan", countryCode: "JP", type: "port" },
  { name: "Port of Nagoya", code: "JPNGO", country: "Japan", countryCode: "JP", type: "port" },
  { name: "Port of Kobe", code: "JPUKB", country: "Japan", countryCode: "JP", type: "port" },
  { name: "Port of Osaka", code: "JPOSA", country: "Japan", countryCode: "JP", type: "port" },
  { name: "Port of Hakata", code: "JPHKT", country: "Japan", countryCode: "JP", type: "port" },
  // Airports
  { name: "Tokyo Haneda (HND)", code: "HND", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "Narita International Tokyo (NRT)", code: "NRT", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "Kansai International Osaka (KIX)", code: "KIX", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "Osaka Itami (ITM)", code: "ITM", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "Chubu Centrair Nagoya (NGO)", code: "NGO", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "Fukuoka Airport (FUK)", code: "FUK", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "New Chitose Sapporo (CTS)", code: "CTS", country: "Japan", countryCode: "JP", type: "airport" },
  { name: "Naha Okinawa (OKA)", code: "OKA", country: "Japan", countryCode: "JP", type: "airport" },

  // SOUTH KOREA 🇰🇷
  // Ports
  { name: "Port of Busan", code: "KRPUS", country: "South Korea", countryCode: "KR", type: "port" },
  { name: "Port of Incheon", code: "KRINC", country: "South Korea", countryCode: "KR", type: "port" },
  { name: "Port of Gwangyang", code: "KRKWA", country: "South Korea", countryCode: "KR", type: "port" },
  { name: "Port of Ulsan", code: "KRUSN", country: "South Korea", countryCode: "KR", type: "port" },
  // Airports
  { name: "Incheon International Seoul (ICN)", code: "ICN", country: "South Korea", countryCode: "KR", type: "airport" },
  { name: "Gimpo International Seoul (GMP)", code: "GMP", country: "South Korea", countryCode: "KR", type: "airport" },
  { name: "Gimhae International Busan (PUS)", code: "PUS", country: "South Korea", countryCode: "KR", type: "airport" },
  { name: "Jeju International (CJU)", code: "CJU", country: "South Korea", countryCode: "KR", type: "airport" },
  { name: "Daegu International (TAE)", code: "TAE", country: "South Korea", countryCode: "KR", type: "airport" },

  // TAIWAN 🇹🇼
  // Ports
  { name: "Port of Kaohsiung", code: "TWKHH", country: "Taiwan", countryCode: "TW", type: "port" },
  { name: "Port of Keelung", code: "TWKEL", country: "Taiwan", countryCode: "TW", type: "port" },
  { name: "Port of Taichung", code: "TWTXG", country: "Taiwan", countryCode: "TW", type: "port" },
  // Airports
  { name: "Taoyuan International Taipei (TPE)", code: "TPE", country: "Taiwan", countryCode: "TW", type: "airport" },
  { name: "Taipei Songshan (TSA)", code: "TSA", country: "Taiwan", countryCode: "TW", type: "airport" },
  { name: "Kaohsiung International (KHH)", code: "KHH", country: "Taiwan", countryCode: "TW", type: "airport" },
  { name: "Taichung Airport (RMQ)", code: "RMQ", country: "Taiwan", countryCode: "TW", type: "airport" },

  // SINGAPORE 🇸🇬
  // Ports
  { name: "Port of Singapore", code: "SGSIN", country: "Singapore", countryCode: "SG", type: "port" },
  // Airports
  { name: "Singapore Changi (SIN)", code: "SIN", country: "Singapore", countryCode: "SG", type: "airport" },

  // THAILAND 🇹🇭
  // Ports
  { name: "Port of Bangkok", code: "THBKK", country: "Thailand", countryCode: "TH", type: "port" },
  { name: "Port of Laem Chabang", code: "THLCH", country: "Thailand", countryCode: "TH", type: "port" },
  { name: "Port of Songkhla", code: "THSGZ", country: "Thailand", countryCode: "TH", type: "port" },
  // Airports
  { name: "Suvarnabhumi Bangkok (BKK)", code: "BKK", country: "Thailand", countryCode: "TH", type: "airport" },
  { name: "Don Mueang International Bangkok (DMK)", code: "DMK", country: "Thailand", countryCode: "TH", type: "airport" },
  { name: "Phuket International (HKT)", code: "HKT", country: "Thailand", countryCode: "TH", type: "airport" },
  { name: "Chiang Mai International (CNX)", code: "CNX", country: "Thailand", countryCode: "TH", type: "airport" },
  { name: "Hat Yai International (HDY)", code: "HDY", country: "Thailand", countryCode: "TH", type: "airport" },
  { name: "U-Tapao Pattaya (UTP)", code: "UTP", country: "Thailand", countryCode: "TH", type: "airport" },

  // MALAYSIA 🇲🇾
  // Ports
  { name: "Port of Klang", code: "MYPKG", country: "Malaysia", countryCode: "MY", type: "port" },
  { name: "Port of Tanjung Pelepas", code: "MYPTP", country: "Malaysia", countryCode: "MY", type: "port" },
  { name: "Port of Penang", code: "MYPEN", country: "Malaysia", countryCode: "MY", type: "port" },
  { name: "Port of Johor", code: "MYJHB", country: "Malaysia", countryCode: "MY", type: "port" },
  // Airports
  { name: "Kuala Lumpur International (KUL)", code: "KUL", country: "Malaysia", countryCode: "MY", type: "airport" },
  { name: "Penang International (PEN)", code: "PEN", country: "Malaysia", countryCode: "MY", type: "airport" },
  { name: "Kota Kinabalu International (BKI)", code: "BKI", country: "Malaysia", countryCode: "MY", type: "airport" },
  { name: "Kuching International (KCH)", code: "KCH", country: "Malaysia", countryCode: "MY", type: "airport" },
  { name: "Langkawi International (LGK)", code: "LGK", country: "Malaysia", countryCode: "MY", type: "airport" },

  // INDONESIA 🇮🇩
  // Ports
  { name: "Port of Jakarta (Tanjung Priok)", code: "IDJKT", country: "Indonesia", countryCode: "ID", type: "port" },
  { name: "Port of Surabaya (Tanjung Perak)", code: "IDSUB", country: "Indonesia", countryCode: "ID", type: "port" },
  { name: "Port of Belawan", code: "IDBEL", country: "Indonesia", countryCode: "ID", type: "port" },
  { name: "Port of Semarang", code: "IDSRG", country: "Indonesia", countryCode: "ID", type: "port" },
  // Airports
  { name: "Soekarno-Hatta International Jakarta (CGK)", code: "CGK", country: "Indonesia", countryCode: "ID", type: "airport" },
  { name: "Ngurah Rai International Bali (DPS)", code: "DPS", country: "Indonesia", countryCode: "ID", type: "airport" },
  { name: "Juanda International Surabaya (SUB)", code: "SUB", country: "Indonesia", countryCode: "ID", type: "airport" },
  { name: "Kualanamu International Medan (KNO)", code: "KNO", country: "Indonesia", countryCode: "ID", type: "airport" },
  { name: "Halim Perdanakusuma Jakarta (HLP)", code: "HLP", country: "Indonesia", countryCode: "ID", type: "airport" },
  { name: "Sultan Hasanuddin Makassar (UPG)", code: "UPG", country: "Indonesia", countryCode: "ID", type: "airport" },

  // VIETNAM 🇻🇳
  // Ports
  { name: "Port of Ho Chi Minh City (Saigon)", code: "VNSGN", country: "Vietnam", countryCode: "VN", type: "port" },
  { name: "Port of Haiphong", code: "VNHPH", country: "Vietnam", countryCode: "VN", type: "port" },
  { name: "Port of Da Nang", code: "VNDAD", country: "Vietnam", countryCode: "VN", type: "port" },
  { name: "Port of Cai Mep", code: "VNCMQ", country: "Vietnam", countryCode: "VN", type: "port" },
  // Airports
  { name: "Noi Bai International Hanoi (HAN)", code: "HAN", country: "Vietnam", countryCode: "VN", type: "airport" },
  { name: "Tan Son Nhat International Ho Chi Minh (SGN)", code: "SGN", country: "Vietnam", countryCode: "VN", type: "airport" },
  { name: "Da Nang International (DAD)", code: "DAD", country: "Vietnam", countryCode: "VN", type: "airport" },
  { name: "Cam Ranh International (CXR)", code: "CXR", country: "Vietnam", countryCode: "VN", type: "airport" },
  { name: "Phu Quoc International (PQC)", code: "PQC", country: "Vietnam", countryCode: "VN", type: "airport" },

  // PHILIPPINES 🇵🇭
  // Ports
  { name: "Port of Manila", code: "PHMNL", country: "Philippines", countryCode: "PH", type: "port" },
  { name: "Port of Subic Bay", code: "PHSFS", country: "Philippines", countryCode: "PH", type: "port" },
  { name: "Port of Cebu", code: "PHCEB", country: "Philippines", countryCode: "PH", type: "port" },
  { name: "Port of Davao", code: "PHDVO", country: "Philippines", countryCode: "PH", type: "port" },
  // Airports
  { name: "Ninoy Aquino International Manila (MNL)", code: "MNL", country: "Philippines", countryCode: "PH", type: "airport" },
  { name: "Mactan-Cebu International (CEB)", code: "CEB", country: "Philippines", countryCode: "PH", type: "airport" },
  { name: "Clark International (CRK)", code: "CRK", country: "Philippines", countryCode: "PH", type: "airport" },
  { name: "Francisco Bangoy Davao (DVO)", code: "DVO", country: "Philippines", countryCode: "PH", type: "airport" },
  { name: "Iloilo International (ILO)", code: "ILO", country: "Philippines", countryCode: "PH", type: "airport" },

  // INDIA 🇮🇳
  // Ports
  { name: "Jawaharlal Nehru Port Mumbai", code: "INNSA", country: "India", countryCode: "IN", type: "port" },
  { name: "Port of Chennai", code: "INMAA", country: "India", countryCode: "IN", type: "port" },
  { name: "Port of Mumbai", code: "INBOM", country: "India", countryCode: "IN", type: "port" },
  { name: "Port of Kolkata", code: "INCCU", country: "India", countryCode: "IN", type: "port" },
  { name: "Port of Cochin", code: "INCOK", country: "India", countryCode: "IN", type: "port" },
  { name: "Port of Visakhapatnam", code: "INVTZ", country: "India", countryCode: "IN", type: "port" },
  // Airports
  { name: "Indira Gandhi International Delhi (DEL)", code: "DEL", country: "India", countryCode: "IN", type: "airport" },
  { name: "Chhatrapati Shivaji Mumbai (BOM)", code: "BOM", country: "India", countryCode: "IN", type: "airport" },
  { name: "Kempegowda International Bengaluru (BLR)", code: "BLR", country: "India", countryCode: "IN", type: "airport" },
  { name: "Chennai International (MAA)", code: "MAA", country: "India", countryCode: "IN", type: "airport" },
  { name: "Netaji Subhas Chandra Bose Kolkata (CCU)", code: "CCU", country: "India", countryCode: "IN", type: "airport" },
  { name: "Rajiv Gandhi International Hyderabad (HYD)", code: "HYD", country: "India", countryCode: "IN", type: "airport" },
  { name: "Cochin International (COK)", code: "COK", country: "India", countryCode: "IN", type: "airport" },
  { name: "Pune Airport (PNQ)", code: "PNQ", country: "India", countryCode: "IN", type: "airport" },
  { name: "Ahmedabad Sardar Vallabhbhai Patel (AMD)", code: "AMD", country: "India", countryCode: "IN", type: "airport" },
  { name: "Goa International (GOI)", code: "GOI", country: "India", countryCode: "IN", type: "airport" },

  // PAKISTAN 🇵🇰
  // Ports
  { name: "Port of Karachi", code: "PKKHI", country: "Pakistan", countryCode: "PK", type: "port" },
  { name: "Port Muhammad Bin Qasim", code: "PKQCT", country: "Pakistan", countryCode: "PK", type: "port" },
  { name: "Port of Gwadar", code: "PKGWD", country: "Pakistan", countryCode: "PK", type: "port" },
  // Airports
  { name: "Jinnah International Karachi (KHI)", code: "KHI", country: "Pakistan", countryCode: "PK", type: "airport" },
  { name: "Allama Iqbal International Lahore (LHE)", code: "LHE", country: "Pakistan", countryCode: "PK", type: "airport" },
  { name: "Islamabad International (ISB)", code: "ISB", country: "Pakistan", countryCode: "PK", type: "airport" },
  { name: "Peshawar Bacha Khan (PEW)", code: "PEW", country: "Pakistan", countryCode: "PK", type: "airport" },

  // BANGLADESH 🇧🇩
  // Ports
  { name: "Port of Chittagong", code: "BDCGP", country: "Bangladesh", countryCode: "BD", type: "port" },
  { name: "Port of Mongla", code: "BDMGL", country: "Bangladesh", countryCode: "BD", type: "port" },
  // Airports
  { name: "Hazrat Shahjalal International Dhaka (DAC)", code: "DAC", country: "Bangladesh", countryCode: "BD", type: "airport" },
  { name: "Shah Amanat International Chittagong (CGP)", code: "CGP", country: "Bangladesh", countryCode: "BD", type: "airport" },

  // SRI LANKA 🇱🇰
  // Ports
  { name: "Port of Colombo", code: "LKCMB", country: "Sri Lanka", countryCode: "LK", type: "port" },
  { name: "Port of Hambantota", code: "LKHRI", country: "Sri Lanka", countryCode: "LK", type: "port" },
  // Airports
  { name: "Bandaranaike International Colombo (CMB)", code: "CMB", country: "Sri Lanka", countryCode: "LK", type: "airport" },
  { name: "Mattala Rajapaksa International (HRI)", code: "HRI", country: "Sri Lanka", countryCode: "LK", type: "airport" },

  // ========== MIDDLE EAST ==========

  // UNITED ARAB EMIRATES 🇦🇪
  // Ports
  { name: "Port of Jebel Ali Dubai", code: "AEJEA", country: "United Arab Emirates", countryCode: "AE", type: "port" },
  { name: "Port of Abu Dhabi", code: "AEAUH", country: "United Arab Emirates", countryCode: "AE", type: "port" },
  { name: "Port Khalifa Abu Dhabi", code: "AEKTF", country: "United Arab Emirates", countryCode: "AE", type: "port" },
  // Airports
  { name: "Dubai International (DXB)", code: "DXB", country: "United Arab Emirates", countryCode: "AE", type: "airport" },
  { name: "Abu Dhabi International (AUH)", code: "AUH", country: "United Arab Emirates", countryCode: "AE", type: "airport" },
  { name: "Al Maktoum International Dubai (DWC)", code: "DWC", country: "United Arab Emirates", countryCode: "AE", type: "airport" },
  { name: "Sharjah International (SHJ)", code: "SHJ", country: "United Arab Emirates", countryCode: "AE", type: "airport" },

  // SAUDI ARABIA 🇸🇦
  // Ports
  { name: "Port of Jeddah", code: "SAJED", country: "Saudi Arabia", countryCode: "SA", type: "port" },
  { name: "King Abdullah Port", code: "SAKAU", country: "Saudi Arabia", countryCode: "SA", type: "port" },
  { name: "Port of Dammam", code: "SADAM", country: "Saudi Arabia", countryCode: "SA", type: "port" },
  { name: "Port of Jubail", code: "SAJUB", country: "Saudi Arabia", countryCode: "SA", type: "port" },
  // Airports
  { name: "King Abdulaziz International Jeddah (JED)", code: "JED", country: "Saudi Arabia", countryCode: "SA", type: "airport" },
  { name: "King Khalid International Riyadh (RUH)", code: "RUH", country: "Saudi Arabia", countryCode: "SA", type: "airport" },
  { name: "King Fahd International Dammam (DMM)", code: "DMM", country: "Saudi Arabia", countryCode: "SA", type: "airport" },
  { name: "Prince Mohammad bin Abdulaziz Medina (MED)", code: "MED", country: "Saudi Arabia", countryCode: "SA", type: "airport" },

  // QATAR 🇶🇦
  // Ports
  { name: "Port of Doha", code: "QADOH", country: "Qatar", countryCode: "QA", type: "port" },
  { name: "Port of Hamad", code: "QAHAD", country: "Qatar", countryCode: "QA", type: "port" },
  // Airports
  { name: "Hamad International Doha (DOH)", code: "DOH", country: "Qatar", countryCode: "QA", type: "airport" },

  // OMAN 🇴🇲
  // Ports
  { name: "Port of Salalah", code: "OMSLL", country: "Oman", countryCode: "OM", type: "port" },
  { name: "Port of Sohar", code: "OMSOH", country: "Oman", countryCode: "OM", type: "port" },
  // Airports
  { name: "Muscat International (MCT)", code: "MCT", country: "Oman", countryCode: "OM", type: "airport" },
  { name: "Salalah Airport (SLL)", code: "SLL", country: "Oman", countryCode: "OM", type: "airport" },

  // KUWAIT 🇰🇼
  // Ports
  { name: "Port of Shuwaikh", code: "KWKWI", country: "Kuwait", countryCode: "KW", type: "port" },
  { name: "Port of Shuaiba", code: "KWSAI", country: "Kuwait", countryCode: "KW", type: "port" },
  // Airports
  { name: "Kuwait International (KWI)", code: "KWI", country: "Kuwait", countryCode: "KW", type: "airport" },

  // BAHRAIN 🇧🇭
  // Ports
  { name: "Khalifa Bin Salman Port", code: "BHKBS", country: "Bahrain", countryCode: "BH", type: "port" },
  // Airports
  { name: "Bahrain International (BAH)", code: "BAH", country: "Bahrain", countryCode: "BH", type: "airport" },

  // ISRAEL 🇮🇱
  // Ports
  { name: "Port of Haifa", code: "ILHFA", country: "Israel", countryCode: "IL", type: "port" },
  { name: "Port of Ashdod", code: "ILASD", country: "Israel", countryCode: "IL", type: "port" },
  { name: "Port of Eilat", code: "ILETM", country: "Israel", countryCode: "IL", type: "port" },
  // Airports
  { name: "Ben Gurion Tel Aviv (TLV)", code: "TLV", country: "Israel", countryCode: "IL", type: "airport" },
  { name: "Ramon Airport Eilat (ETM)", code: "ETM", country: "Israel", countryCode: "IL", type: "airport" },

  // JORDAN 🇯🇴
  // Ports
  { name: "Port of Aqaba", code: "JOAQJ", country: "Jordan", countryCode: "JO", type: "port" },
  // Airports
  { name: "Queen Alia International Amman (AMM)", code: "AMM", country: "Jordan", countryCode: "JO", type: "airport" },
  { name: "King Hussein International Aqaba (AQJ)", code: "AQJ", country: "Jordan", countryCode: "JO", type: "airport" },

  // LEBANON 🇱🇧
  // Ports
  { name: "Port of Beirut", code: "LBBEY", country: "Lebanon", countryCode: "LB", type: "port" },
  { name: "Port of Tripoli", code: "LBTRI", country: "Lebanon", countryCode: "LB", type: "port" },
  // Airports
  { name: "Beirut-Rafic Hariri International (BEY)", code: "BEY", country: "Lebanon", countryCode: "LB", type: "airport" },

  // EGYPT 🇪🇬
  // Ports
  { name: "Port of Alexandria", code: "EGALY", country: "Egypt", countryCode: "EG", type: "port" },
  { name: "Port Said", code: "EGPSD", country: "Egypt", countryCode: "EG", type: "port" },
  { name: "Port of Damietta", code: "EGDAM", country: "Egypt", countryCode: "EG", type: "port" },
  { name: "Port of Suez", code: "EGSUZ", country: "Egypt", countryCode: "EG", type: "port" },
  // Airports
  { name: "Cairo International (CAI)", code: "CAI", country: "Egypt", countryCode: "EG", type: "airport" },
  { name: "Hurghada International (HRG)", code: "HRG", country: "Egypt", countryCode: "EG", type: "airport" },
  { name: "Sharm El Sheikh International (SSH)", code: "SSH", country: "Egypt", countryCode: "EG", type: "airport" },
  { name: "Borg El Arab Alexandria (HBE)", code: "HBE", country: "Egypt", countryCode: "EG", type: "airport" },
  { name: "Luxor International (LXR)", code: "LXR", country: "Egypt", countryCode: "EG", type: "airport" },

  // IRAN 🇮🇷
  // Ports
  { name: "Port of Bandar Abbas", code: "IRBND", country: "Iran", countryCode: "IR", type: "port" },
  { name: "Shahid Rajaee Port", code: "IRBKM", country: "Iran", countryCode: "IR", type: "port" },
  // Airports
  { name: "Imam Khomeini International Tehran (IKA)", code: "IKA", country: "Iran", countryCode: "IR", type: "airport" },
  { name: "Mehrabad International Tehran (THR)", code: "THR", country: "Iran", countryCode: "IR", type: "airport" },

  // IRAQ 🇮🇶
  // Ports
  { name: "Port of Umm Qasr", code: "IQUQI", country: "Iraq", countryCode: "IQ", type: "port" },
  // Airports
  { name: "Baghdad International (BGW)", code: "BGW", country: "Iraq", countryCode: "IQ", type: "airport" },
  { name: "Basra International (BSR)", code: "BSR", country: "Iraq", countryCode: "IQ", type: "airport" },

  // ========== AFRICA ==========

  // SOUTH AFRICA 🇿🇦
  // Ports
  { name: "Port of Durban", code: "ZADUR", country: "South Africa", countryCode: "ZA", type: "port" },
  { name: "Port of Cape Town", code: "ZACPT", country: "South Africa", countryCode: "ZA", type: "port" },
  { name: "Port Elizabeth", code: "ZAPLZ", country: "South Africa", countryCode: "ZA", type: "port" },
  { name: "Port of Richards Bay", code: "ZARDB", country: "South Africa", countryCode: "ZA", type: "port" },
  // Airports
  { name: "O.R. Tambo International Johannesburg (JNB)", code: "JNB", country: "South Africa", countryCode: "ZA", type: "airport" },
  { name: "Cape Town International (CPT)", code: "CPT", country: "South Africa", countryCode: "ZA", type: "airport" },
  { name: "King Shaka Durban (DUR)", code: "DUR", country: "South Africa", countryCode: "ZA", type: "airport" },
  { name: "Port Elizabeth Airport (PLZ)", code: "PLZ", country: "South Africa", countryCode: "ZA", type: "airport" },
  { name: "Lanseria International Johannesburg (HLA)", code: "HLA", country: "South Africa", countryCode: "ZA", type: "airport" },

  // NIGERIA 🇳🇬
  // Ports
  { name: "Apapa Port Lagos", code: "NGLOS", country: "Nigeria", countryCode: "NG", type: "port" },
  { name: "Tin Can Island Port", code: "NGTCN", country: "Nigeria", countryCode: "NG", type: "port" },
  { name: "Port Harcourt", code: "NGPHC", country: "Nigeria", countryCode: "NG", type: "port" },
  { name: "Calabar Port", code: "NGCBQ", country: "Nigeria", countryCode: "NG", type: "port" },
  // Airports
  { name: "Murtala Muhammed International Lagos (LOS)", code: "LOS", country: "Nigeria", countryCode: "NG", type: "airport" },
  { name: "Nnamdi Azikiwe International Abuja (ABV)", code: "ABV", country: "Nigeria", countryCode: "NG", type: "airport" },
  { name: "Port Harcourt International (PHC)", code: "PHC", country: "Nigeria", countryCode: "NG", type: "airport" },
  { name: "Kano Mallam Aminu (KAN)", code: "KAN", country: "Nigeria", countryCode: "NG", type: "airport" },

  // KENYA 🇰🇪
  // Ports
  { name: "Port of Mombasa", code: "KEMBA", country: "Kenya", countryCode: "KE", type: "port" },
  // Airports
  { name: "Jomo Kenyatta International Nairobi (NBO)", code: "NBO", country: "Kenya", countryCode: "KE", type: "airport" },
  { name: "Moi International Mombasa (MBA)", code: "MBA", country: "Kenya", countryCode: "KE", type: "airport" },

  // GHANA 🇬🇭
  // Ports
  { name: "Port of Tema", code: "GHTEM", country: "Ghana", countryCode: "GH", type: "port" },
  { name: "Port of Takoradi", code: "GHTKO", country: "Ghana", countryCode: "GH", type: "port" },
  // Airports
  { name: "Kotoka International Accra (ACC)", code: "ACC", country: "Ghana", countryCode: "GH", type: "airport" },
  { name: "Kumasi Airport (KMS)", code: "KMS", country: "Ghana", countryCode: "GH", type: "airport" },

  // MOROCCO 🇲🇦
  // Ports
  { name: "Tanger Med Port", code: "MATAN", country: "Morocco", countryCode: "MA", type: "port" },
  { name: "Port of Casablanca", code: "MACAS", country: "Morocco", countryCode: "MA", type: "port" },
  { name: "Port of Agadir", code: "MAAGA", country: "Morocco", countryCode: "MA", type: "port" },
  // Airports
  { name: "Mohammed V International Casablanca (CMN)", code: "CMN", country: "Morocco", countryCode: "MA", type: "airport" },
  { name: "Marrakech Menara (RAK)", code: "RAK", country: "Morocco", countryCode: "MA", type: "airport" },
  { name: "Agadir-Al Massira (AGA)", code: "AGA", country: "Morocco", countryCode: "MA", type: "airport" },
  { name: "Rabat-Salé (RBA)", code: "RBA", country: "Morocco", countryCode: "MA", type: "airport" },
  { name: "Tangier Ibn Battouta (TNG)", code: "TNG", country: "Morocco", countryCode: "MA", type: "airport" },

  // TANZANIA 🇹🇿
  // Ports
  { name: "Port of Dar es Salaam", code: "TZDAR", country: "Tanzania", countryCode: "TZ", type: "port" },
  { name: "Port of Tanga", code: "TZTAN", country: "Tanzania", countryCode: "TZ", type: "port" },
  // Airports
  { name: "Julius Nyerere International Dar es Salaam (DAR)", code: "DAR", country: "Tanzania", countryCode: "TZ", type: "airport" },
  { name: "Kilimanjaro International (JRO)", code: "JRO", country: "Tanzania", countryCode: "TZ", type: "airport" },

  // ETHIOPIA 🇪🇹
  // Airports
  { name: "Addis Ababa Bole International (ADD)", code: "ADD", country: "Ethiopia", countryCode: "ET", type: "airport" },

  // SENEGAL 🇸🇳
  // Ports
  { name: "Port of Dakar", code: "SNDKR", country: "Senegal", countryCode: "SN", type: "port" },
  // Airports
  { name: "Blaise Diagne International Dakar (DSS)", code: "DSS", country: "Senegal", countryCode: "SN", type: "airport" },

  // IVORY COAST 🇨🇮
  // Ports
  { name: "Port of Abidjan", code: "CIABJ", country: "Ivory Coast", countryCode: "CI", type: "port" },
  { name: "Port of San Pedro", code: "CISPD", country: "Ivory Coast", countryCode: "CI", type: "port" },
  // Airports
  { name: "Félix-Houphouët-Boigny Abidjan (ABJ)", code: "ABJ", country: "Ivory Coast", countryCode: "CI", type: "airport" },

  // ANGOLA 🇦🇴
  // Ports
  { name: "Port of Luanda", code: "AOLAD", country: "Angola", countryCode: "AO", type: "port" },
  { name: "Port of Lobito", code: "AOLOB", country: "Angola", countryCode: "AO", type: "port" },
  // Airports
  { name: "Quatro de Fevereiro Luanda (LAD)", code: "LAD", country: "Angola", countryCode: "AO", type: "airport" },

  // ALGERIA 🇩🇿
  // Ports
  { name: "Port of Algiers", code: "DZALG", country: "Algeria", countryCode: "DZ", type: "port" },
  { name: "Port of Oran", code: "DZORN", country: "Algeria", countryCode: "DZ", type: "port" },
  // Airports
  { name: "Houari Boumediene Algiers (ALG)", code: "ALG", country: "Algeria", countryCode: "DZ", type: "airport" },
  { name: "Oran Es Sénia (ORN)", code: "ORN", country: "Algeria", countryCode: "DZ", type: "airport" },

  // TUNISIA 🇹🇳
  // Ports
  { name: "Port of Tunis", code: "TNRAD", country: "Tunisia", countryCode: "TN", type: "port" },
  { name: "Port of Sfax", code: "TNSFX", country: "Tunisia", countryCode: "TN", type: "port" },
  // Airports
  { name: "Tunis-Carthage (TUN)", code: "TUN", country: "Tunisia", countryCode: "TN", type: "airport" },
  { name: "Enfidha-Hammamet (NBE)", code: "NBE", country: "Tunisia", countryCode: "TN", type: "airport" },

  // MOZAMBIQUE 🇲🇿
  // Ports
  { name: "Port of Maputo", code: "MZMPM", country: "Mozambique", countryCode: "MZ", type: "port" },
  { name: "Port of Beira", code: "MZBEW", country: "Mozambique", countryCode: "MZ", type: "port" },
  { name: "Port of Nacala", code: "MZNCE", country: "Mozambique", countryCode: "MZ", type: "port" },
  // Airports
  { name: "Maputo International (MPM)", code: "MPM", country: "Mozambique", countryCode: "MZ", type: "airport" },

  // ========== OCEANIA ==========

  // AUSTRALIA 🇦🇺
  // Ports
  { name: "Port of Melbourne", code: "AUMEL", country: "Australia", countryCode: "AU", type: "port" },
  { name: "Port of Sydney (Botany Bay)", code: "AUSYD", country: "Australia", countryCode: "AU", type: "port" },
  { name: "Port of Brisbane", code: "AUBNE", country: "Australia", countryCode: "AU", type: "port" },
  { name: "Port of Fremantle Perth", code: "AUFRE", country: "Australia", countryCode: "AU", type: "port" },
  { name: "Port of Adelaide", code: "AUADL", country: "Australia", countryCode: "AU", type: "port" },
  { name: "Port of Newcastle", code: "AUNTL", country: "Australia", countryCode: "AU", type: "port" },
  // Airports
  { name: "Sydney Kingsford Smith (SYD)", code: "SYD", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Melbourne Airport Tullamarine (MEL)", code: "MEL", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Brisbane Airport (BNE)", code: "BNE", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Perth Airport (PER)", code: "PER", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Adelaide Airport (ADL)", code: "ADL", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Gold Coast Airport (OOL)", code: "OOL", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Cairns Airport (CNS)", code: "CNS", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Canberra Airport (CBR)", code: "CBR", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Darwin International (DRW)", code: "DRW", country: "Australia", countryCode: "AU", type: "airport" },
  { name: "Hobart Airport (HBA)", code: "HBA", country: "Australia", countryCode: "AU", type: "airport" },

  // NEW ZEALAND 🇳🇿
  // Ports
  { name: "Port of Auckland", code: "NZAKL", country: "New Zealand", countryCode: "NZ", type: "port" },
  { name: "Port of Tauranga", code: "NZTRG", country: "New Zealand", countryCode: "NZ", type: "port" },
  { name: "Port of Lyttelton Christchurch", code: "NZLYT", country: "New Zealand", countryCode: "NZ", type: "port" },
  { name: "Port of Wellington", code: "NZWLG", country: "New Zealand", countryCode: "NZ", type: "port" },
  // Airports
  { name: "Auckland Airport (AKL)", code: "AKL", country: "New Zealand", countryCode: "NZ", type: "airport" },
  { name: "Christchurch Airport (CHC)", code: "CHC", country: "New Zealand", countryCode: "NZ", type: "airport" },
  { name: "Wellington Airport (WLG)", code: "WLG", country: "New Zealand", countryCode: "NZ", type: "airport" },
  { name: "Queenstown Airport (ZQN)", code: "ZQN", country: "New Zealand", countryCode: "NZ", type: "airport" },
  { name: "Dunedin Airport (DUD)", code: "DUD", country: "New Zealand", countryCode: "NZ", type: "airport" },
];

// Get unique countries for dropdown
export const getCountries = (): { name: string; code: string }[] => {
  const uniqueCountries = Array.from(
    new Set(locations.map(loc => JSON.stringify({ name: loc.country, code: loc.countryCode })))
  ).map(str => JSON.parse(str));
  
  return uniqueCountries.sort((a, b) => a.name.localeCompare(b.name));
};

// Filter locations by country and type
export const getLocationsByCountry = (
  countryCode: string,
  type?: 'port' | 'airport'
): Location[] => {
  return locations.filter(loc => {
    const matchesCountry = loc.countryCode === countryCode;
    if (!type) return matchesCountry;
    return matchesCountry && (loc.type === type || loc.type === 'both');
  });
};

// Search locations by name or code
export const searchLocations = (
  query: string,
  countryCode?: string,
  type?: 'port' | 'airport'
): Location[] => {
  const filtered = locations.filter(loc => {
    const matchesQuery = loc.name.toLowerCase().includes(query.toLowerCase()) ||
                        loc.code.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = !countryCode || loc.countryCode === countryCode;
    const matchesType = !type || loc.type === type || loc.type === 'both';
    
    return matchesQuery && matchesCountry && matchesType;
  });
  
  return filtered.slice(0, 20); // Limit to 20 results for better UX
};
