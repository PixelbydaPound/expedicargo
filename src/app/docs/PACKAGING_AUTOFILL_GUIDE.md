# 📦 Professional Packaging Type & Auto-fill Dimensions Guide

## ✨ Overview

The Expedicargo quote form now features **professional-grade UX** with intelligent auto-fill logic for cargo dimensions based on industry standards. This eliminates user error, saves time, and ensures accurate pricing calculations.

---

## 🎯 Key Features

### 1. **Dynamic Packaging Options** 
Options change based on shipment type (Air vs. Sea freight)

### 2. **Smart Auto-fill Logic**
- ✅ **Sea Freight Containers**: Dimensions **locked** with ISO-certified internal measurements
- ✅ **Air Freight Presets**: Dimensions **suggested** but editable
- ✅ **LCL / Breakbulk / Other**: Fully **manual** input

### 3. **Visual Indicators**
- 🔒 Lock icons on read-only fields
- 📊 Color-coded alert boxes explaining dimension source
- 💡 Context-aware tooltips and helper text
- ✈️ IATA limits tooltip for air freight

---

## 🚢 Sea Freight Container Auto-fill

When a user selects **Sea Freight** and chooses a **container type**, the form automatically:

1. **Fills internal dimensions** (Length × Width × Height)
2. **Sets maximum weight capacity**
3. **Locks all dimension fields** (read-only)
4. **Displays green alert**: "Standard container dimensions auto-filled"

### Container Specifications (ISO Standards)

| Container Type | Length (cm) | Width (cm) | Height (cm) | Max Capacity (kg)* |
|----------------|-------------|------------|-------------|-------------------|
| 20' Standard (FCL) | 589 | 235 | 239 | 28,000 |
| 40' Standard (FCL) | 1,203 | 235 | 239 | 30,480 |
| 40' High Cube | 1,203 | 235 | 269 | 30,480 |
| 45' High Cube | 1,355 | 235 | 269 | 32,500 |

**Note:** Max capacity is shown for reference only. **Weight is NOT auto-filled** — user must enter their actual cargo weight.

### UX Behavior:
```
1. User selects "Sea Freight"
2. User selects "40' Container"
3. ✅ Form auto-fills: 1203 × 235 × 239 cm (dimensions only)
4. 🔒 Length, Width, Height are LOCKED (grayed out with lock icons)
5. ✏️ Weight field stays EMPTY and EDITABLE (user enters actual cargo weight)
6. 💚 Green message: "Standard container dimensions applied (ISO)"
   "Enter your actual cargo weight, not the container capacity"
```

---

## ✈️ Air Freight Preset Suggestions

When a user selects **Air Freight** and chooses a **packaging type**, the form:

1. **Suggests typical dimensions** for that packaging type
2. **Leaves fields editable** (not locked)
3. **Displays blue alert**: "Suggested dimensions based on packaging type"
4. **Shows IATA tooltip** with maximum airline limits

### Air Freight Presets

| Packaging Type | Length (cm) | Width (cm) | Height (cm) | Typical Weight (kg) |
|----------------|-------------|------------|-------------|---------------------|
| Pallets (Standard) | 120 | 100 | 160 | 1,000 |
| Pallets (Euro) | 120 | 80 | 150 | 1,000 |
| Drums / Barrels | 60 | 60 | 90 | 250 |
| Boxes / Cartons | 100 | 100 | 80 | 70 |
| Crates | 150 | 120 | 120 | 500 |

### IATA Maximum Limits (Displayed in Tooltip)
- **Max Length**: ≤ 300 cm
- **Max Width**: ≤ 200 cm
- **Max Height**: ≤ 160 cm
- **Max Weight**: ≤ 1,500 kg per piece

*Cargo exceeding these limits requires special charter arrangements.*

### UX Behavior:
```
1. User selects "Air Freight"
2. User selects "Pallets (Standard)"
3. ✅ Form auto-fills: 120 × 100 × 160 cm, 1,000 kg
4. 💫 Fields flash with blue ring animation (1 second)
5. 🔓 Fields are editable (user can modify)
6. 💙 Blue message: "Suggested dimensions — you can modify"
7. ℹ️ Info icon shows IATA limits tooltip

Changing packaging type:
1. User switches from "Pallets (Standard)" to "Pallets (Euro)"
2. ✅ Dimensions instantly update: 120 × 80 × 150 cm, 1,000 kg
3. 💫 Flash animation confirms the update
```

---

## 🛠️ Manual Input Mode

Certain packaging types require **fully manual** dimension entry:

### Sea Freight:
- LCL (Less than Container Load)
- Pallets
- Boxes / Cartons
- Drums / Barrels
- Breakbulk Cargo
- Other (specify)

### Air Freight:
- Bundles (variable size)
- Other (specify)

### UX Behavior:
```
1. User selects packaging type requiring manual input
2. ⚪ No auto-fill occurs
3. ✏️ All dimension fields are blank and editable
4. 💡 Helper text: "Enter full packaged size including pallet or container"
```

---

## 🎨 Visual UX Elements

### 1. **Locked Dimensions Alert (Green)**
```
🔒 Standard container dimensions applied (ISO)
   Enter your actual cargo weight, not the container capacity
```

### 2. **Preset Suggestion Alert (Blue)**
```
🔓 Suggested dimensions based on packaging type
   You can modify these values for your specific cargo
```

### 3. **Air Freight IATA Tooltip**
Hovering over the **ℹ️ info icon** next to "Cargo Dimensions" shows:
```
Standard air freight limits (IATA):
• Max length: ≤ 300 cm
• Max width: ≤ 200 cm
• Max height: ≤ 160 cm
• Max weight: ≤ 1,500 kg per piece

Larger cargo requires special arrangements
```

### 4. **Lock Icons on Fields**
When dimensions are locked, each input field shows a **🔒 lock icon** on the right side.

---

## 📊 Data Flow

### Form State
```typescript
const [dimensionsLocked, setDimensionsLocked] = useState(false);
const [weightLocked, setWeightLocked] = useState(false); // Separate lock for weight
const [dimensionsSource, setDimensionsSource] = useState<'container' | 'preset' | 'manual'>('manual');
```

### Auto-fill Logic (useEffect)
```typescript
useEffect(() => {
  // Sea Freight: Auto-fill and lock DIMENSIONS only (NOT weight)
  if (shipmentType === 'sea' && packagingType in CONTAINER_DIMENSIONS) {
    setFormData({ 
      length, 
      width, 
      height, 
      weight: '' // Clear weight - user enters actual cargo weight
    });
    setDimensionsLocked(true);
    setWeightLocked(false); // Weight stays editable
    setDimensionsSource('container');
  }
  // Air Freight: Suggest presets
  else if (shipmentType === 'air' && packagingType in AIR_FREIGHT_PRESETS) {
    setFormData({ length, width, height, weight }); // from AIR_FREIGHT_PRESETS
    setDimensionsLocked(false);
    setWeightLocked(false);
    setDimensionsSource('preset');
  }
  // Manual input
  else {
    setDimensionsLocked(false);
    setWeightLocked(false);
    setDimensionsSource('manual');
  }
}, [packagingType, shipmentType]);
```

---

## 🌐 Bilingual Support

All new features support **Spanish** and **English**:

| English | Español |
|---------|---------|
| Quantity & Packaging Type | Cantidad y Tipo de Embalaje |
| Standard container dimensions auto-filled | Dimensiones estándar del contenedor aplicadas automáticamente |
| Suggested dimensions based on packaging type | Dimensiones sugeridas basadas en el tipo de embalaje |
| You can modify these values | Puede modificar estos valores |
| Standard air freight limits (IATA) | Límites estándar de carga aérea (IATA) |

---

## 📤 Data Submission

### New Fields Sent to Make.com & Supabase:
```javascript
{
  "packaging_type": "40' Container",  // NEW FIELD
  "quantity": "2 40' Container",       // Enhanced format
  "dimensions": "1203cm x 235cm x 269cm",
  "weight": "30480 kg"
}
```

---

## ✅ Benefits

1. **Saves Time**: Users don't need to look up container specs
2. **Prevents Errors**: Locked fields ensure accurate ISO dimensions
3. **Improves Accuracy**: Pricing calculations use certified measurements
4. **Professional UX**: Industry-standard terminology and visual feedback
5. **Educational**: Tooltips teach users about IATA/ISO standards
6. **Flexible**: Air freight presets are editable for custom cargo

---

## 🧪 Testing Checklist

### Sea Freight Container Flow:
- [ ] Select "Sea Freight"
- [ ] Select "40' Container"
- [ ] Verify dimensions auto-fill: 1203 × 235 × 239 cm
- [ ] Verify **weight field is EMPTY** (not auto-filled)
- [ ] Verify length/width/height are **read-only** with lock icons
- [ ] Verify **weight field is EDITABLE** (no lock icon)
- [ ] Verify green alert displays correct message about cargo weight
- [ ] Verify unit system toggle is disabled
- [ ] Enter actual cargo weight manually
- [ ] Submit form and check Google Sheets receives correct data

### Air Freight Preset Flow:
- [ ] Select "Air Freight"
- [ ] Select "Pallets (Standard)"
- [ ] Verify dimensions auto-fill: 120 × 100 × 160 cm, 1,000 kg
- [ ] Verify **blue ring flash animation** appears on all dimension fields
- [ ] Verify fields are **editable** (no lock icons)
- [ ] Verify blue alert displays
- [ ] Click info icon and verify IATA tooltip appears
- [ ] Change to "Pallets (Euro)" in dropdown
- [ ] Verify dimensions **instantly update** to: 120 × 80 × 150 cm
- [ ] Verify flash animation appears again
- [ ] Change to "Drums / Barrels"
- [ ] Verify dimensions update to: 60 × 60 × 90 cm, 250 kg
- [ ] Modify dimensions manually
- [ ] Submit form and verify data

### Manual Input Flow:
- [ ] Select "Sea Freight" → "LCL"
- [ ] Verify fields are **blank and editable**
- [ ] Enter custom dimensions
- [ ] Submit form and verify data

---

## 🚀 Implementation Summary

### Files Modified:
- `/components/QuoteModal.tsx`

### New Constants Added:
- `CONTAINER_DIMENSIONS` (ISO container specs)
- `AIR_FREIGHT_PRESETS` (Suggested packaging sizes)

### New Icons Used:
- `Lock` (locked dimensions)
- `Unlock` (editable presets)
- `Ship` (sea freight indicator)
- `Plane` (air freight indicator)
- `HelpCircle` (tooltips)

### New Components Used:
- `Tooltip` / `TooltipProvider` / `TooltipContent` / `TooltipTrigger`

---

**Last Updated**: October 29, 2025  
**Version**: 2.0 - Professional Packaging Auto-fill  
**Status**: ✅ Production Ready
