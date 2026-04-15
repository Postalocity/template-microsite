# Odin's Innovations - Standard Icon Mapping

## 🎯 Consistent Icon Usage Rules

Use this mapping to ensure icons are consistent across all Odin's pages:

| Concept | Use Instead of | Icon Name | Type |
|---------|----------------|----------|------|
| **Long-lasting/Duration** | clock, stopwatch, timer, hour | `clock` | SVG |
| **Rain/Weather/Water** | cloud, water, rain | `droplet` | SVG |
| **EPA/Protection** | shield | `shield-check` | SVG |
| **USA/Legal** | flag | `flag` | SVG |
| **Natural/Eco** | leaf, recycle | `leaf` | SVG |
| **Verified/Complete** | check, check-circle | `check-circle` | SVG |
| **Detection/Sensing** | eye, radar | `eye` | SVG |
| **Temperature** | thermometer | `temperature` | SVG |
| **Product/Items** | bead, droplet | `droplet` | SVG |

---

## 📋 By Section

### Benefits / Why Odin's
| Feature | Icon | Concept |
|---------|------|---------|
| 30+ Days | `clock` | Duration |
| Weatherproof | `droplet` | Rain/Water |
| Field Tested | `check-circle` | Verified |
| Biodegradable | `leaf` | Natural |
| EPA-Registered | `shield-check` | Protection |
| Made in USA | `flag` | Legal |

### How It Works Steps
| Step Type | Icon | Concept |
|-----------|------|----------|
| Duration | `clock` | Time |
| Application | `droplet` | Liquid |
| Setup | `check-circle` | Step |

### Detection/Science
| Feature | Icon | Concept |
|---------|------|---------|
| CO2 Detection | `eye` | Sensing |
| Lactic Acid | `droplet` | Moisture/Sweat |
| Body Heat | `temperature` | Temperature |

### Trust Badges Section
| Badge | Icon | Concept |
|-------|------|---------|
| EPA-Registered | `shield-check` | Verified Protection |
| Made in USA | `flag` | USA |
| Legal in All States | `map-pin` | Location |
| 30-Day Guarantee | `clock` | Duration |

---

## 🖼️ PNG Images (When to use)

Use PNG benefit images when you want branded icons:

| Use PNG | When |
|---------|------|
| `benefit-30days.png` | Hero/benefits section wants brand-specific |
| `benefit-weatherproof.png` | Hero/benefits section wants brand-specific |
| `benefit-field-tested.png` | Hero/benefits section wants brand-specific |
| `benefit-biodegradable.png` | Hero/benefits section wants brand-specific |

---

## 🔧 Icon Mapping Code

```javascript
const iconMap = {
  // Duration/Long-lasting
  longlasting: Clock,
  duration: Clock,
  clock: Clock,
  stopwatch: Clock,
  timer: Clock,
  hour: Clock,
  
  // Weather/Rain/Water
  weather: Droplets,
  rain: Droplets,
  water: Droplets,
  droplet: Droplets,
  wet: Droplets,
  
  // Protection/EPA
  epa: ShieldCheck,
  protection: ShieldCheck,
  registered: ShieldCheck,
  shieldcheck: ShieldCheck,
  
  // USA/Legal
  usa: Flag,
  legal: Flag,
  flag: Flag,
  
  // Natural/Eco
  natural: Leaf,
  eco: Leaf,
  biodegradable: Leaf,
  leaf: Leaf,
  
  // Verified
  verified: CheckCircle,
  complete: CheckCircle,
  checkcircle: CheckCircle,
  
  // Sensing
  sensing: Eye,
  detection: Eye,
  eye: Eye,
  
  // Temperature
  temperature: Thermometer,
  heat: Thermometer,
  
  // Product
  product: Droplets,
  liquid: Droplets,
  droplet: Droplets,
};
```

---

## ✅ Correct Usage Examples

```javascript
// CORRECT - Long lasting
{ icon: 'clock', title: '30+ Days Protection' }

// CORRECT - Rain/Weather
{ icon: 'droplet', title: 'Rainproof Formula' }

// CORRECT - EPA Registered  
{ icon: 'shield-check', title: 'EPA-Registered Biopesticide' }

// CORRECT - Detection
{ icon: 'eye', title: 'CO2 Detection' }
```

---

## ❌ Incorrect Examples

```javascript
// WRONG - Don't use clock for weather
{ icon: 'clock', title: 'Rainproof' }

// WRONG - Don't use shield for EPA (use shield-check)
{ icon: 'shield', title: 'EPA-Registered' }

// WRONG - Don't use eye for rain
{ icon: 'eye', title: 'Detects Moisture' }
```