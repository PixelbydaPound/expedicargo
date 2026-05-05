import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { CheckCircle2, AlertCircle, Lock, Info, Package, Ship, Plane, HelpCircle, Unlock, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import confetti from "canvas-confetti";
// Supabase Edge Functions were replaced with Vercel API routes.
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { LocationSelector } from "./LocationSelector";

// Container dimension standards (internal dimensions in cm)
const CONTAINER_DIMENSIONS = {
  "20' Container": { length: "589", width: "235", height: "239", maxWeight: "28000" },
  "40' Container": { length: "1203", width: "235", height: "239", maxWeight: "30480" },
  "40' High Cube": { length: "1203", width: "235", height: "269", maxWeight: "30480" },
  "45' High Cube": { length: "1355", width: "235", height: "269", maxWeight: "32500" },
};

// Air freight packaging presets (suggested dimensions in cm)
const AIR_FREIGHT_PRESETS = {
  "Pallets (Standard)": { length: "120", width: "100", height: "160", weight: "1000" },
  "Pallets (Euro)": { length: "120", width: "80", height: "150", weight: "1000" },
  "Drums / Barrels": { length: "60", width: "60", height: "90", weight: "250" },
  "Boxes / Cartons": { length: "100", width: "100", height: "80", weight: "70" },
  "Crates": { length: "150", width: "120", height: "120", weight: "500" },
};

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const { t, language } = useLanguage();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDangerousInfo, setShowDangerousInfo] = useState(false);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [dimensionsLocked, setDimensionsLocked] = useState(false);
  const [dimensionsSource, setDimensionsSource] = useState<'container' | 'preset' | 'manual'>('manual');
  const [weightLocked, setWeightLocked] = useState(false); // Separate lock for weight (not used for containers)
  const [dimensionsJustUpdated, setDimensionsJustUpdated] = useState(false); // Flash effect when auto-filled
  
  // Form state
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    shipmentType: "",
    portOrAirportDeparture: "",
    portOrAirportDepartureCode: "",
    portOrAirportArrival: "",
    portOrAirportArrivalCode: "",
    merchandiseDescription: "",
    quantity: "",
    packagingType: "",
    packagingTypeOther: "",
    height: "",
    width: "",
    length: "",
    weight: "",
    isDangerous: "",
    needsInsurance: "",
    insuranceValue: ""
  });

  // Air Freight max limits (in metric) - defined after formData
  const AIR_FREIGHT_LIMITS = {
    length: 300, // cm
    width: 200, // cm
    height: 160, // cm
    weight: 1500 // kg
  };

  // Check if air freight dimensions exceed limits
  const checkAirFreightLimits = () => {
    if (formData.shipmentType !== 'air') return { exceeded: false };
    
    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;
    const weight = parseFloat(formData.weight) || 0;
    
    // Convert to metric if needed
    const lengthMetric = unitSystem === 'imperial' ? length * 2.54 : length;
    const widthMetric = unitSystem === 'imperial' ? width * 2.54 : width;
    const heightMetric = unitSystem === 'imperial' ? height * 2.54 : height;
    const weightMetric = unitSystem === 'imperial' ? weight / 2.20462 : weight;
    
    return {
      exceeded: lengthMetric > AIR_FREIGHT_LIMITS.length || 
                widthMetric > AIR_FREIGHT_LIMITS.width || 
                heightMetric > AIR_FREIGHT_LIMITS.height || 
                weightMetric > AIR_FREIGHT_LIMITS.weight,
      lengthExceeded: lengthMetric > AIR_FREIGHT_LIMITS.length,
      widthExceeded: widthMetric > AIR_FREIGHT_LIMITS.width,
      heightExceeded: heightMetric > AIR_FREIGHT_LIMITS.height,
      weightExceeded: weightMetric > AIR_FREIGHT_LIMITS.weight
    };
  };

  const limitsCheck = checkAirFreightLimits();

  const handleInputChange = (field: string, value: string | boolean) => {
    // If shipment type changes, clear port/airport fields
    if (field === 'shipmentType') {
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        portOrAirportDeparture: '',
        portOrAirportDepartureCode: '',
        portOrAirportArrival: '',
        portOrAirportArrivalCode: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Auto-fill dimensions based on packaging type selection
  useEffect(() => {
    const packagingType = formData.packagingType;
    
    // Debug log to verify packaging type changes
    if (packagingType) {
      console.log('📦 Packaging Type Selected:', packagingType);
      console.log('🚢 Shipment Type:', formData.shipmentType);
    }
    
    // Sea Freight: Auto-fill and lock container dimensions (but NOT weight - that depends on cargo)
    if (formData.shipmentType === 'sea' && packagingType in CONTAINER_DIMENSIONS) {
      const dims = CONTAINER_DIMENSIONS[packagingType as keyof typeof CONTAINER_DIMENSIONS];
      setFormData(prev => ({
        ...prev,
        length: dims.length,
        width: dims.width,
        height: dims.height,
        weight: '' // Clear weight - user must enter actual cargo weight
      }));
      setDimensionsLocked(true);
      setWeightLocked(false); // Weight stays editable for containers
      setDimensionsSource('container');
      setDimensionsJustUpdated(true);
      setTimeout(() => setDimensionsJustUpdated(false), 1000);
    }
    // Air Freight: Suggest presets (not locked) - ALWAYS update when packaging type changes
    else if (formData.shipmentType === 'air' && packagingType in AIR_FREIGHT_PRESETS) {
      const preset = AIR_FREIGHT_PRESETS[packagingType as keyof typeof AIR_FREIGHT_PRESETS];
      console.log('✈️ Air Freight Preset Found:', packagingType);
      console.log('📐 Auto-filling dimensions:', preset);
      setFormData(prev => ({
        ...prev,
        length: preset.length,
        width: preset.width,
        height: preset.height,
        weight: preset.weight
      }));
      setDimensionsLocked(false);
      setWeightLocked(false);
      setDimensionsSource('preset');
      setDimensionsJustUpdated(true);
      setTimeout(() => setDimensionsJustUpdated(false), 1000);
    }
    // Manual input (LCL, Breakbulk, Bundles, or Other)
    else if (packagingType && !['', 'other'].includes(packagingType)) {
      setDimensionsLocked(false);
      setWeightLocked(false);
      setDimensionsSource('manual');
      // Clear dimensions for manual input types that don't have presets
      if (formData.shipmentType === 'air' && ['Bundles', 'other'].includes(packagingType)) {
        setFormData(prev => ({
          ...prev,
          length: '',
          width: '',
          height: '',
          weight: ''
        }));
      }
    }
  }, [formData.packagingType, formData.shipmentType]);

  // Unit conversion helper
  const convertUnits = (value: string, from: 'metric' | 'imperial', to: 'metric' | 'imperial', type: 'dimension' | 'weight'): string => {
    if (!value || value === '') return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    
    if (type === 'dimension') {
      if (from === 'metric' && to === 'imperial') {
        return (numValue / 2.54).toFixed(2);
      } else if (from === 'imperial' && to === 'metric') {
        return (numValue * 2.54).toFixed(2);
      }
    } else if (type === 'weight') {
      if (from === 'metric' && to === 'imperial') {
        return (numValue * 2.20462).toFixed(2);
      } else if (from === 'imperial' && to === 'metric') {
        return (numValue / 2.20462).toFixed(2);
      }
    }
    return value;
  };

  // Handle unit system toggle with auto-conversion
  const handleUnitSystemChange = (newSystem: 'metric' | 'imperial') => {
    if (newSystem === unitSystem) return;
    
    setFormData(prev => ({
      ...prev,
      height: convertUnits(prev.height, unitSystem, newSystem, 'dimension'),
      width: convertUnits(prev.width, unitSystem, newSystem, 'dimension'),
      length: convertUnits(prev.length, unitSystem, newSystem, 'dimension'),
      weight: convertUnits(prev.weight, unitSystem, newSystem, 'weight')
    }));
    
    setUnitSystem(newSystem);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation check for better error messages
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid') as HTMLElement;
      if (firstInvalid) {
        firstInvalid.focus();
        // Show native validation message
        form.reportValidity();
        return;
      }
    }
    
    // Additional email validation to prevent empty/invalid emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      alert(t(
        'Por favor ingrese un correo electrónico válido.',
        'Please enter a valid email address.'
      ));
      const emailInput = document.getElementById('email') as HTMLInputElement;
      if (emailInput) emailInput.focus();
      return;
    }
    
    try {
      const timestamp = new Date().toISOString();
      
      // Generate unique Quote ID in format: EXP-YYYYMMDD-XXX
      const date = new Date();
      const dateStr = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 001-999
      const quoteId = `EXP-${dateStr}-${randomNum}`;
      
      // Alert to confirm new version is loaded
      console.warn("⚡ UPDATED CODE ACTIVE - Generated Quote ID:", quoteId);
      
      // Shipment type mapping
      const shipmentTypeMap: Record<string, string> = {
        "sea": "Sea Freight",
        "air": "Air Freight"
      };
      
      // Convert to metric if necessary (for consistent storage)
      const heightMetric = unitSystem === 'imperial' ? convertUnits(formData.height, 'imperial', 'metric', 'dimension') : formData.height;
      const widthMetric = unitSystem === 'imperial' ? convertUnits(formData.width, 'imperial', 'metric', 'dimension') : formData.width;
      const lengthMetric = unitSystem === 'imperial' ? convertUnits(formData.length, 'imperial', 'metric', 'dimension') : formData.length;
      const weightMetric = unitSystem === 'imperial' ? convertUnits(formData.weight, 'imperial', 'metric', 'weight') : formData.weight;
      
      // CRITICAL: Validate email one more time before submission
      const cleanedEmail = formData.email.trim().toLowerCase();
      const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!cleanedEmail || !emailValidationRegex.test(cleanedEmail)) {
        console.error("🚨 CRITICAL: Invalid email detected before submission:", formData.email);
        alert(t(
          'Error: Correo electrónico inválido. Por favor verifica e intenta nuevamente.',
          'Error: Invalid email address. Please verify and try again.'
        ));
        const emailInput = document.getElementById('email') as HTMLInputElement;
        if (emailInput) emailInput.focus();
        return;
      }
      
      // SNAKE_CASE format - matches Google Sheets format
      const quoteData = {
        "quote_id": quoteId,
        "business_name": formData.businessName.trim(),
        "contact_name": formData.contactName.trim(),
        "email": cleanedEmail,
        "phone": formData.phone || "",
        "shipment_type": shipmentTypeMap[formData.shipmentType] || formData.shipmentType,
        "origin": formData.portOrAirportDeparture,
        "destination": formData.portOrAirportArrival,
        "port_or_airport_departure": formData.portOrAirportDeparture,
        "port_or_airport_arrival": formData.portOrAirportArrival,
        "cargo_type": formData.merchandiseDescription,
        "merchandise_description": formData.merchandiseDescription,
        "company": formData.businessName,
        "quantity": formData.packagingType === "other" 
          ? `${formData.quantity} ${formData.packagingTypeOther}` 
          : `${formData.quantity} ${formData.packagingType}`,
        "packaging_type": formData.packagingType === "other" 
          ? formData.packagingTypeOther 
          : formData.packagingType,
        "dimensions": `${heightMetric}cm x ${widthMetric}cm x ${lengthMetric}cm`,
        "weight": `${weightMetric} kg`,
        "is_dangerous": formData.isDangerous === "yes" ? "Yes" : "No",
        "needs_insurance": formData.needsInsurance === "yes" ? "Yes" : "No",
        "insurance_value": formData.insuranceValue,
        "timestamp": timestamp
      };

      console.log("🚀 NEW VERSION LOADED - Quote ID Generated:", quoteId);
      console.log("📤 Sending quote data with ID:", quoteId);
      console.log("✅ EMAIL VALIDATION PASSED:", cleanedEmail);
      console.log("📋 Quote data:", quoteData);
      console.log("🏷️  Location codes:", {
        departure: formData.portOrAirportDepartureCode,
        arrival: formData.portOrAirportArrivalCode
      });
      console.log("✨ If you see this, the new code is working!");

      // Send to Make.com
      console.log("🔄 Sending to Make.com webhook...");
      const makeResponse = await fetch("https://hook.us2.make.com/wusgmbryj3mz01ngwmm12ip93a9k4p7b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteData)
      });

      if (!makeResponse.ok) {
        console.error("❌ Make.com webhook failed:", {
          status: makeResponse.status,
          statusText: makeResponse.statusText,
          email: cleanedEmail,
          quoteId: quoteId
        });
        const errorText = await makeResponse.text();
        console.error("❌ Make.com error response:", errorText);
      } else {
        console.log("✅ Make.com Response:", makeResponse.status, makeResponse.statusText);
      }

      // Send to Supabase (using converted metric values and same data structure)
      const supabaseResponse = await fetch(`/api/make-server-b5281c63/quotes`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote_id: quoteId,
          business_name: formData.businessName.trim(),
          contact_name: formData.contactName.trim(),
          email: cleanedEmail,
          phone: formData.phone || "",
          shipment_type: shipmentTypeMap[formData.shipmentType] || formData.shipmentType,
          origin: formData.portOrAirportDeparture,
          destination: formData.portOrAirportArrival,
          port_or_airport_departure: formData.portOrAirportDeparture,
          port_or_airport_arrival: formData.portOrAirportArrival,
          cargo_type: formData.merchandiseDescription,
          merchandise_description: formData.merchandiseDescription,
          company: formData.businessName,
          quantity: formData.packagingType === "other" 
            ? `${formData.quantity} ${formData.packagingTypeOther}` 
            : `${formData.quantity} ${formData.packagingType}`,
          packaging_type: formData.packagingType === "other" 
            ? formData.packagingTypeOther 
            : formData.packagingType,
          dimensions: `${heightMetric}cm x ${widthMetric}cm x ${lengthMetric}cm`,
          weight: `${weightMetric} kg`,
          is_dangerous: formData.isDangerous === "yes" ? "Yes" : "No",
          needs_insurance: formData.needsInsurance === "yes" ? "Yes" : "No",
          insurance_value: formData.insuranceValue,
          language: language,
          formType: "quote",
          timestamp: timestamp
        })
      });

      if (!supabaseResponse.ok) {
        console.error("❌ Supabase submission failed:", {
          status: supabaseResponse.status,
          statusText: supabaseResponse.statusText,
          email: cleanedEmail,
          quoteId: quoteId
        });
        const errorText = await supabaseResponse.text();
        console.error("❌ Supabase error response:", errorText);
      } else {
        console.log("✅ Supabase Response:", supabaseResponse.status, supabaseResponse.statusText);
      }

      // Show success
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          businessName: "",
          contactName: "",
          email: "",
          phone: "",
          shipmentType: "",
          portOrAirportDeparture: "",
          portOrAirportDepartureCode: "",
          portOrAirportArrival: "",
          portOrAirportArrivalCode: "",
          merchandiseDescription: "",
          quantity: "",
          packagingType: "",
          packagingTypeOther: "",
          height: "",
          width: "",
          length: "",
          weight: "",
          isDangerous: "",
          needsInsurance: "",
          insuranceValue: ""
        });
        onOpenChange(false);
      }, 3000);

    } catch (error) {
      console.error("❌ Error submitting quote:", error);
      alert("Error submitting quote. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl mb-2">
              {t('¡Cotización enviada!', 'Quote submitted!')}
            </DialogTitle>
            <p className="text-center text-gray-600 dark:text-gray-400">
              {t('Te contactaremos pronto', 'We will contact you soon')}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {t('Obtén tu cotización personalizada', 'Get your personalized quote')}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {t(
                  'Para proporcionar la cotización de envío más precisa, completa todos los campos requeridos y detalles de la carga.',
                  'To provide the most accurate shipping quote, please fill in all required fields and cargo details.'
                )}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-8 mt-6">
              {/* SECTION 1: CONTACT INFORMATION */}
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {t('Información de Contacto', 'Contact Information')}
                </h3>

                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    {t('Nombre del negocio', 'Business name')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    autoComplete="organization"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    required
                    title={t('Este campo es obligatorio para generar tu cotización.', 'This field is required to generate your quote.')}
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">
                    {t('Nombre de contacto', 'Contact name')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    autoComplete="name"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t('Correo electrónico', 'Email')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t('Teléfono', 'Phone')} <span className="text-red-500">*</span>
                  </Label>
                  <div id="phone" className="flex h-9 w-full rounded-md px-3 py-1 text-sm transition-all border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:bg-gradient-to-br focus-within:from-blue-50 focus-within:to-white dark:focus-within:from-blue-950/20 dark:focus-within:to-gray-800">
                    <PhoneInput
                      international
                      defaultCountry="US"
                      countryCallingCodeEditable={false}
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value || '')}
                      name="phone"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: SHIPMENT DETAILS */}
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {t('Detalles del Envío', 'Shipment Details')}
                </h3>

                {/* Shipment Type */}
                <div className="space-y-2">
                  <Label htmlFor="shipmentType">
                    {t('Tipo de envío', 'Shipment type')} <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.shipmentType} onValueChange={(value) => handleInputChange('shipmentType', value)}>
                    <SelectTrigger id="shipmentType">
                      <SelectValue placeholder={t('Selecciona un tipo', 'Select a type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sea">{t('Carga Marítima', 'Sea Freight')}</SelectItem>
                      <SelectItem value="air">{t('Carga Aérea', 'Air Freight')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Port or Airport of Departure - Smart Selector */}
                {formData.shipmentType && (
                  <>
                    <LocationSelector
                      id="portOrAirportDeparture"
                      label={formData.shipmentType === 'sea' 
                        ? t('Puerto de Salida', 'Port of Departure')
                        : t('Aeropuerto de Salida', 'Airport of Departure')
                      }
                      value={formData.portOrAirportDeparture}
                      onChange={(value, code) => {
                        setFormData(prev => ({
                          ...prev,
                          portOrAirportDeparture: value,
                          portOrAirportDepartureCode: code
                        }));
                      }}
                      shipmentType={formData.shipmentType as 'sea' | 'air'}
                      required
                      placeholder={formData.shipmentType === 'sea'
                        ? t('Ej: Puerto de Miami', 'e.g., Port of Miami')
                        : t('Ej: Aeropuerto Internacional de Miami', 'e.g., Miami International Airport')
                      }
                    />

                    {/* Port or Airport of Arrival - Smart Selector */}
                    <LocationSelector
                      id="portOrAirportArrival"
                      label={formData.shipmentType === 'sea' 
                        ? t('Puerto de Llegada', 'Port of Arrival')
                        : t('Aeropuerto de Llegada', 'Airport of Arrival')
                      }
                      value={formData.portOrAirportArrival}
                      onChange={(value, code) => {
                        setFormData(prev => ({
                          ...prev,
                          portOrAirportArrival: value,
                          portOrAirportArrivalCode: code
                        }));
                      }}
                      shipmentType={formData.shipmentType as 'sea' | 'air'}
                      required
                      placeholder={formData.shipmentType === 'sea'
                        ? t('Ej: Puerto de Barcelona', 'e.g., Port of Barcelona')
                        : t('Ej: Aeropuerto de Barcelona-El Prat', 'e.g., Barcelona-El Prat Airport')
                      }
                    />
                  </>
                )}

                {/* Merchandise Description */}
                <div className="space-y-2">
                  <Label htmlFor="merchandiseDescription">
                    {t('Descripción de la mercancía', 'Merchandise description')} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="merchandiseDescription"
                    name="merchandiseDescription"
                    value={formData.merchandiseDescription}
                    onChange={(e) => handleInputChange('merchandiseDescription', e.target.value)}
                    placeholder={t('Ej: Electrónicos, Ropa, Maquinaria', 'e.g., Electronics, Apparel, Machinery')}
                    rows={3}
                    required
                  />
                </div>

                {/* Quantity & Packaging Type */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quantity" className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      {t('Cantidad y Tipo de Embalaje / Unidad de Carga', 'Quantity & Packaging Type / Cargo Unit')} <span className="text-red-500">*</span>
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <HelpCircle className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs mb-2">
                            {t(
                              'Las opciones de embalaje cambian según el tipo de envío (aéreo o marítimo) para reflejar los estándares de la industria.',
                              'Packaging options change based on shipment type (air or sea) to reflect industry standards.'
                            )}
                          </p>
                          {formData.shipmentType === 'sea' && (
                            <p className="text-xs text-blue-200">
                              {t(
                                '📦 Capacidad máxima por contenedor estándar: 20\' = 28,000 kg | 40\' = 30,480 kg',
                                '📦 Maximum capacity per standard container: 20\' = 28,000 kg | 40\' = 30,480 kg'
                              )}
                            </p>
                          )}
                          {formData.packagingType === 'Drums / Barrels' && (
                            <p className="text-xs text-orange-200 mt-1">
                              {t(
                                '🛢️ Tambores estándar: ~200 L, ~250 kg por unidad',
                                '🛢️ Standard drums: ~200 L, ~250 kg per unit'
                              )}
                            </p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {/* Visual indicator for shipment type */}
                  {formData.shipmentType && (
                    <div className={`flex items-center gap-2 p-2 rounded-lg border text-sm ${
                      formData.shipmentType === 'air' 
                        ? 'bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                        : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                    }`}>
                      {formData.shipmentType === 'air' ? (
                        <>
                          <Plane className="h-4 w-4" />
                          <span>{t('Opciones de Carga Aérea', 'Air Freight Options')}</span>
                        </>
                      ) : (
                        <>
                          <Ship className="h-4 w-4" />
                          <span>{t('Opciones de Carga Marítima', 'Sea Freight Options')}</span>
                        </>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Quantity Input */}
                    <div>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        placeholder={t('Ej: 5', 'e.g., 5')}
                        required
                        className="text-center font-semibold"
                      />
                    </div>
                    
                    {/* Packaging Type Dropdown - Dynamic based on Shipment Type */}
                    <div>
                      <Select 
                        value={formData.packagingType} 
                        onValueChange={(value) => {
                          handleInputChange('packagingType', value);
                          // Clear "other" field if not selecting "other"
                          if (value !== 'other') {
                            handleInputChange('packagingTypeOther', '');
                          }
                        }}
                        disabled={!formData.shipmentType}
                      >
                        <SelectTrigger id="packagingType" name="packagingType">
                          <SelectValue placeholder={
                            formData.shipmentType 
                              ? t('Tipo de embalaje', 'Packaging type')
                              : t('Primero seleccione tipo de envío', 'Select shipment type first')
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.shipmentType === 'air' && (
                            <>
                              <SelectItem value="Boxes / Cartons">
                                <div className="flex items-center gap-2">
                                  📦 {t('Cajas / Cartones', 'Boxes / Cartons')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Crates">
                                <div className="flex items-center gap-2">
                                  🗃️ {t('Cajones', 'Crates')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Drums / Barrels">
                                <div className="flex items-center gap-2">
                                  🛢️ {t('Tambores / Barriles', 'Drums / Barrels')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Bundles">
                                <div className="flex items-center gap-2">
                                  📾 {t('Bultos', 'Bundles')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Pallets (Standard)">
                                <div className="flex items-center gap-2">
                                  🧱 {t('Pallets (Estándar)', 'Pallets (Standard)')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Pallets (Euro)">
                                <div className="flex items-center gap-2">
                                  🧱 {t('Pallets (Euro)', 'Pallets (Euro)')}
                                </div>
                              </SelectItem>
                              <SelectItem value="other">
                                <div className="flex items-center gap-2">
                                  ✏️ {t('Otro (especificar)', 'Other (specify)')}
                                </div>
                              </SelectItem>
                            </>
                          )}
                          
                          {formData.shipmentType === 'sea' && (
                            <>
                              {/* Containerized Options */}
                              <SelectItem value="20' Container">
                                <div className="flex items-center gap-2">
                                  🚢 {t("Contenedor 20' (FCL)", "20' Container (FCL)")}
                                </div>
                              </SelectItem>
                              <SelectItem value="40' Container">
                                <div className="flex items-center gap-2">
                                  🚢 {t("Contenedor 40' (FCL)", "40' Container (FCL)")}
                                </div>
                              </SelectItem>
                              <SelectItem value="40' High Cube">
                                <div className="flex items-center gap-2">
                                  🚢 {t("Contenedor 40' HC", "40' High Cube")}
                                </div>
                              </SelectItem>
                              <SelectItem value="45' High Cube">
                                <div className="flex items-center gap-2">
                                  🚢 {t("Contenedor 45' HC", "45' High Cube")}
                                </div>
                              </SelectItem>
                              <SelectItem value="LCL (Less than Container)">
                                <div className="flex items-center gap-2">
                                  📦 {t('LCL (Carga Consolidada)', 'LCL (Less than Container)')}
                                </div>
                              </SelectItem>
                              
                              {/* Loose/Breakbulk Cargo */}
                              <SelectItem value="Pallets">
                                <div className="flex items-center gap-2">
                                  🧱 {t('Pallets', 'Pallets')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Boxes / Cartons">
                                <div className="flex items-center gap-2">
                                  📦 {t('Cajas / Cartones', 'Boxes / Cartons')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Drums / Barrels">
                                <div className="flex items-center gap-2">
                                  🛢️ {t('Tambores / Barriles', 'Drums / Barrels')}
                                </div>
                              </SelectItem>
                              <SelectItem value="Breakbulk Cargo">
                                <div className="flex items-center gap-2">
                                  📋 {t('Carga Suelta', 'Breakbulk Cargo')}
                                </div>
                              </SelectItem>
                              <SelectItem value="other">
                                <div className="flex items-center gap-2">
                                  ✏️ {t('Otro (especificar)', 'Other (specify)')}
                                </div>
                              </SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Other Packaging Type Input */}
                  {formData.packagingType === 'other' && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                      <Input
                        placeholder={t('Especifique el tipo de embalaje', 'Specify packaging type')}
                        value={formData.packagingTypeOther}
                        onChange={(e) => handleInputChange('packagingTypeOther', e.target.value)}
                        required
                        className="border-orange-300 dark:border-orange-700 focus:ring-orange-500"
                      />
                    </div>
                  )}
                  
                  {/* Context-aware helper text */}
                  <div className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                    <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>
                      {!formData.shipmentType 
                        ? t('Seleccione el tipo de envío para ver las opciones de embalaje disponibles', 'Select shipment type to see available packaging options')
                        : formData.shipmentType === 'air' 
                        ? t('💡 Bultos: agrupados o envueltos. Tambores: contenedores cilíndricos para líquidos/polvos (~200 L, ~250 kg).', '💡 Bundles: grouped or wrapped pieces. Drums: cylindrical containers for liquids/powders (~200 L, ~250 kg).')
                        : t('💡 FCL: Contenedor completo. LCL: Carga consolidada. La capacidad máxima por contenedor se verifica automáticamente.', '💡 FCL: Full container load. LCL: Consolidated cargo. Maximum capacity per container is automatically verified.')
                      }
                    </span>
                  </div>
                </div>

                {/* Cargo Dimensions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      {t('Dimensiones de la carga', 'Cargo dimensions')} <span className="text-red-500">*</span>
                    </Label>
                    
                    {/* Air Freight Info Tooltip */}
                    {formData.shipmentType === 'air' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                              <Info className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p className="text-xs mb-2">
                              {t('Límites estándar de carga aérea (IATA):', 'Standard air freight limits (IATA):')}
                            </p>
                            <ul className="text-xs space-y-1">
                              <li>• {t('Largo máximo: ≤ 300 cm', 'Max length: ≤ 300 cm')}</li>
                              <li>• {t('Ancho máximo: ≤ 200 cm', 'Max width: ≤ 200 cm')}</li>
                              <li>• {t('Alto máximo: ≤ 160 cm', 'Max height: ≤ 160 cm')}</li>
                              <li>• {t('Peso máximo: ≤ 1,500 kg por pieza', 'Max weight: ≤ 1,500 kg per piece')}</li>
                            </ul>
                            <p className="text-xs mt-2 text-gray-400">
                              {t('Carga mayor requiere arreglos especiales', 'Larger cargo requires special arrangements')}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  {/* Locked Dimensions Alert (for containers) */}
                  {dimensionsLocked && dimensionsSource === 'container' && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
                      <Lock className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                      <div className="text-xs text-green-700 dark:text-green-300">
                        <p className="font-medium">
                          {t('Dimensiones estándar del contenedor aplicadas (ISO)', 'Standard container dimensions applied (ISO)')}
                        </p>
                        <p className="text-green-600 dark:text-green-400 mt-0.5">
                          {t('El peso debe ser el de su carga específica, no la capacidad máxima del contenedor', 'Enter your actual cargo weight, not the container capacity')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Preset Suggestion Alert (for air freight) */}
                  {!dimensionsLocked && dimensionsSource === 'preset' && (
                    <div className="flex items-center gap-2 p-3 bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
                      <Unlock className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
                      <div className="text-xs text-sky-700 dark:text-sky-300">
                        <p className="font-medium">
                          {t('Dimensiones sugeridas basadas en el tipo de embalaje', 'Suggested dimensions based on packaging type')}
                        </p>
                        <p className="text-sky-600 dark:text-sky-400 mt-0.5">
                          {t('Puede modificar estos valores según su carga específica', 'You can modify these values for your specific cargo')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Air Freight Suggested Maximums Helper */}
                  {formData.shipmentType === 'air' && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <Plane className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <p className="font-medium mb-1">
                          {t('Límites sugeridos para carga aérea', 'Suggested Air Freight Limits')}
                        </p>
                        <p>
                          {t(
                            'La mayoría de aerolíneas aceptan carga de hasta 300 cm de largo y 1,500 kg por pieza. Artículos más grandes requieren manejo especial.',
                            'Most airlines accept cargo up to 300 cm length and 1,500 kg per piece. Larger items require special handling.'
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Unit System Toggle */}
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Label className="text-sm whitespace-nowrap">
                      {t('Sistema de medida:', 'Measurement system:')}
                    </Label>
                    <ToggleGroup 
                      type="single" 
                      value={unitSystem} 
                      onValueChange={(value) => value && handleUnitSystemChange(value as 'metric' | 'imperial')}
                      className="bg-white dark:bg-gray-800 rounded-md p-1 border border-gray-300 dark:border-gray-600"
                      disabled={dimensionsLocked}
                    >
                      <ToggleGroupItem 
                        value="metric" 
                        className="data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:hover:bg-blue-700 px-4 py-1.5 text-sm"
                      >
                        {t('Métrico (cm/kg)', 'Metric (cm/kg)')}
                      </ToggleGroupItem>
                      <ToggleGroupItem 
                        value="imperial" 
                        className="data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:hover:bg-blue-700 px-4 py-1.5 text-sm"
                      >
                        {t('Imperial (in/lb)', 'Imperial (in/lb)')}
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="group relative">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 cursor-help" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50">
                        <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                          {t('Se convierte automáticamente a estándares internacionales', 'Automatically converts to international freight standards')}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dimension Inputs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <Label htmlFor="length" className="sr-only">
                        {unitSystem === 'metric' ? t('Largo (cm)', 'Length (cm)') : t('Largo (in)', 'Length (in)')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="length"
                          name="length"
                          type="number"
                          min="0.1"
                          step="0.01"
                          value={formData.length}
                          onChange={(e) => handleInputChange('length', e.target.value)}
                          placeholder={unitSystem === 'metric'
                            ? t('Largo (cm)', 'Length (cm)')
                            : t('Largo (in)', 'Length (in)')
                          }
                          required
                          readOnly={dimensionsLocked}
                          className={`
                            ${dimensionsLocked ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}
                            ${dimensionsJustUpdated ? 'animate-pulse ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                            ${limitsCheck.lengthExceeded ? 'border-red-500 dark:border-red-500 border-2' : ''}
                          `}
                        />
                        {dimensionsLocked && (
                          <Lock className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="width" className="sr-only">
                        {unitSystem === 'metric' ? t('Ancho (cm)', 'Width (cm)') : t('Ancho (in)', 'Width (in)')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="width"
                          name="width"
                          type="number"
                          min="0.1"
                          step="0.01"
                          value={formData.width}
                          onChange={(e) => handleInputChange('width', e.target.value)}
                          placeholder={unitSystem === 'metric'
                            ? t('Ancho (cm)', 'Width (cm)')
                            : t('Ancho (in)', 'Width (in)')
                          }
                          required
                          readOnly={dimensionsLocked}
                          className={`
                            ${dimensionsLocked ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}
                            ${dimensionsJustUpdated ? 'animate-pulse ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                            ${limitsCheck.widthExceeded ? 'border-red-500 dark:border-red-500 border-2' : ''}
                          `}
                        />
                        {dimensionsLocked && (
                          <Lock className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="height" className="sr-only">
                        {unitSystem === 'metric' ? t('Alto (cm)', 'Height (cm)') : t('Alto (in)', 'Height (in)')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          min="0.1"
                          step="0.01"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          placeholder={unitSystem === 'metric' 
                            ? t('Alto (cm)', 'Height (cm)')
                            : t('Alto (in)', 'Height (in)')
                          }
                          required
                          readOnly={dimensionsLocked}
                          className={`
                            ${dimensionsLocked ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}
                            ${dimensionsJustUpdated ? 'animate-pulse ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                            ${limitsCheck.heightExceeded ? 'border-red-500 dark:border-red-500 border-2' : ''}
                          `}
                        />
                        {dimensionsLocked && (
                          <Lock className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="weight" className="sr-only">
                        {unitSystem === 'metric' ? t('Peso (kg)', 'Weight (kg)') : t('Peso (lb)', 'Weight (lb)')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          min="0.1"
                          step="0.01"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          placeholder={
                            dimensionsSource === 'container'
                              ? (unitSystem === 'metric'
                                ? t('Peso de carga (kg)', 'Cargo weight (kg)')
                                : t('Peso de carga (lb)', 'Cargo weight (lb)'))
                              : (unitSystem === 'metric'
                                ? t('Peso (kg)', 'Weight (kg)')
                                : t('Peso (lb)', 'Weight (lb)'))
                          }
                          required
                          readOnly={weightLocked}
                          className={`
                            ${weightLocked ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}
                            ${dimensionsSource === 'container' ? 'border-orange-300 dark:border-orange-600' : ''}
                            ${dimensionsJustUpdated && dimensionsSource === 'preset' ? 'animate-pulse ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                            ${limitsCheck.weightExceeded ? 'border-red-500 dark:border-red-500 border-2' : ''}
                          `}
                        />
                        {weightLocked && (
                          <Lock className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Air Freight Limits Exceeded Warning */}
                  {limitsCheck.exceeded && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-red-700 dark:text-red-300">
                        <p className="font-medium mb-1">
                          {t('⚠️ Límites de carga aérea estándar excedidos', '⚠️ Standard air freight limits exceeded')}
                        </p>
                        <p>
                          {t(
                            'Una o más dimensiones exceden los límites recomendados. Se requerirá manejo especial y puede haber costos adicionales.',
                            'One or more dimensions exceed recommended limits. Special handling will be required and additional costs may apply.'
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Context-Aware Helper Text */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                    <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>
                      {dimensionsLocked 
                        ? t('Largo, ancho y alto son estándar ISO. Ingrese el peso real de su carga (no la capacidad del contenedor).', 'Length, width, height are ISO standard. Enter your actual cargo weight (not container capacity).')
                        : dimensionsSource === 'preset'
                        ? t('Valores sugeridos para este tipo de embalaje. Ajuste según su carga específica.', 'Suggested values for this packaging type. Adjust for your specific cargo.')
                        : t('Incluya el tamaño completo del empaque, pallet o contenedor.', 'Enter full packaged size including pallet or container.')
                      }
                    </span>
                  </p>
                </div>

                {/* Is Cargo Dangerous */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      {t('¿Es la carga peligrosa?', 'Is the cargo dangerous?')} <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t(
                        'Marca Sí si tu envío incluye productos inflamables, tóxicos o presurizados.',
                        'Mark Yes if your shipment includes flammable, toxic, or pressurized goods.'
                      )}
                    </p>
                    <RadioGroup
                      value={formData.isDangerous}
                      onValueChange={(value) => handleInputChange('isDangerous', value)}
                      required
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="dangerous-yes" />
                        <Label htmlFor="dangerous-yes" className="cursor-pointer">
                          {t('Sí', 'Yes')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="dangerous-no" />
                        <Label htmlFor="dangerous-no" className="cursor-pointer">
                          {t('No', 'No')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDangerousInfo(!showDangerousInfo)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('¿Qué se considera carga peligrosa?', 'What is considered dangerous cargo?')}
                  </button>
                  {showDangerousInfo && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 text-sm text-gray-700 dark:text-gray-300">
                      <p className="mb-2">
                        {t(
                          'Carga peligrosa incluye materiales clasificados bajo IATA e IMO como:',
                          'Dangerous cargo includes materials classified under IATA and IMO such as:'
                        )}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>{t('Explosivos y municiones', 'Explosives and ammunition')}</li>
                        <li>{t('Gases inflamables o tóxicos', 'Flammable or toxic gases')}</li>
                        <li>{t('Líquidos inflamables', 'Flammable liquids')}</li>
                        <li>{t('Materiales radioactivos', 'Radioactive materials')}</li>
                        <li>{t('Baterías de litio', 'Lithium batteries')}</li>
                        <li>{t('Productos químicos corrosivos', 'Corrosive chemicals')}</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Insurance */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      {t('¿Desea asegurar su carga?', 'Do you want to insure your cargo?')} <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t(
                        'Ofrecemos opciones de seguro completas para proteger tu carga. El costo del seguro se calcula según el valor declarado de la mercancía.',
                        'We offer comprehensive insurance options to protect your cargo. Insurance costs are calculated based on the declared value of the merchandise.'
                      )}
                    </p>
                    <RadioGroup
                      value={formData.needsInsurance}
                      onValueChange={(value) => handleInputChange('needsInsurance', value)}
                      required
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="insurance-yes" />
                        <Label htmlFor="insurance-yes" className="cursor-pointer">
                          {t('Sí', 'Yes')}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="insurance-no" />
                        <Label htmlFor="insurance-no" className="cursor-pointer">
                          {t('No', 'No')}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formData.needsInsurance === 'yes' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Label htmlFor="insuranceValue">
                        {t('Valor de la mercancía (USD)', 'Merchandise value (USD)')} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="insuranceValue"
                        name="insuranceValue"
                        type="number"
                        min="1"
                        step="0.01"
                        value={formData.insuranceValue}
                        onChange={(e) => handleInputChange('insuranceValue', e.target.value)}
                        placeholder={t('Ej: 10000', 'e.g., 10000')}
                        required
                        className="border-blue-300 dark:border-blue-600"
                      />
                      <p className="text-xs text-blue-600 dark:text-blue-400 flex items-start gap-1.5">
                        <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>
                          {t(
                            'Este valor ayuda a estimar la cobertura del seguro y el costo total del envío.',
                            'This value helps us estimate insurance coverage and total shipping cost.'
                          )}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 3: SUBMIT */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100 text-center">
                    {t(
                      'Una vez enviado, nuestro equipo de logística verificará tu información y te enviará tu cotización personalizada por correo electrónico en 24 horas.',
                      'Once submitted, our logistics team will verify your information and email your personalized quote within 24 hours.'
                    )}
                  </p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  {t('Enviar Cotización', 'Submit Quote')}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="h-3 w-3" />
                  <span>
                    {t(
                      'Tu información es confidencial y se usa solo para generar tu cotización.',
                      'Your information is confidential and used only for quote generation.'
                    )}
                  </span>
                </div>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}