import {
  Bug,
  Leaf,
  Wind,
  Beaker,
  Thermometer,
  Cloud,
  Package,
  ShieldCheck,
  CircleCheckBig,
  Droplets,
} from 'lucide-react';

const ICON_WATERPROOF_LIGHT =
  'https://cdn.shopify.com/s/files/1/0555/8049/1971/files/icon-waterproof-light_73e527c3-413c-4882-bb80-556cc1c563eb.png?v=1777392586';

const isImageUrl = (value?: string): boolean =>
  !!value && (value.startsWith('http') || value.startsWith('/') || value.startsWith('./'));

const IconLongLasting = ({ variant }: { variant: 'light' | 'dark' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    className="w-12 h-12"
    style={{ color: variant === 'dark' ? 'currentColor' : '#2d5a3d' }}
    aria-hidden="true"
  >
    <circle cx="60.82" cy="54.12" r="4.26" />
    <path d="M46.92 78.41a28 28 0 1 0-14.08-24.28" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m-12.78-9.04H11.19m27.51-6.72H23.4m15.3 13.44H23.4" />
    <path d="M32.84 54.13a28 28 0 1 1 14.08 24.28m13.9-61.47v14.24m-17.98 1.51 3.08 3.99M33.27 49.27l4.96.87m13.02 30.28 1.72-4.73m17.42 4.73-1.72-4.73m16.39-7.57L80.7 65.6m7.68-16.33-4.88 1.31m-4.69-17.89-3.08 4.03M60.82 49.87V39.6M54.4 16.94h12.84" />
  </svg>
);

const Icon50States = ({ variant }: { variant: 'light' | 'dark' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-12 h-12"
    style={{ color: variant === 'dark' ? 'currentColor' : '#2d5a3d' }}
    aria-hidden="true"
  >
    <path d="M15 25h70v50H15z" fill="currentColor" fillOpacity="0.1" />
    <path d="M15 35h70M15 45h70M15 55h70M15 65h70" />
    <path d="M15 25h30v30H15z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="22" cy="32" r="2" fill="currentColor" />
    <circle cx="30" cy="32" r="2" fill="currentColor" />
    <circle cx="38" cy="32" r="2" fill="currentColor" />
    <circle cx="26" cy="38" r="2" fill="currentColor" />
    <circle cx="34" cy="38" r="2" fill="currentColor" />
    <circle cx="22" cy="44" r="2" fill="currentColor" />
    <circle cx="30" cy="44" r="2" fill="currentColor" />
    <circle cx="38" cy="44" r="2" fill="currentColor" />
    <circle cx="26" cy="50" r="2" fill="currentColor" />
    <circle cx="34" cy="50" r="2" fill="currentColor" />
  </svg>
);

const waterproofIconKeys = new Set([
  'icon-waterproof-light',
  'waterproof',
  'rainproof',
  'weatherproof',
  'droplets',
  'water',
  'rain',
]);

const brandImageByIcon: Record<string, string> = {
  'icon-waterproof-light': ICON_WATERPROOF_LIGHT,
  waterproof: ICON_WATERPROOF_LIGHT,
  rainproof: ICON_WATERPROOF_LIGHT,
  weatherproof: ICON_WATERPROOF_LIGHT,
  droplets: ICON_WATERPROOF_LIGHT,
  water: ICON_WATERPROOF_LIGHT,
  rain: ICON_WATERPROOF_LIGHT,
};

export interface OdinsIconProps {
  icon?: string;
  image?: string;
  alt?: string;
  variant?: 'light' | 'dark';
}

const OdinsIcon = ({ icon, image, alt = '', variant = 'light' }: OdinsIconProps) => {
  const lucideClass = variant === 'dark' ? 'w-10 h-10 text-green-400' : 'w-10 h-10';
  const lucideStyle = variant === 'light' ? { color: '#2d5a3d' } : undefined;
  const strokeWidth = 1.5;

  if (image && isImageUrl(image)) {
    return (
      <img
        src={image}
        alt={alt}
        width={56}
        height={56}
        className="w-14 h-14 object-contain"
        loading="lazy"
      />
    );
  }

  const isWaterproofIcon = !!icon && waterproofIconKeys.has(icon);
  if (isWaterproofIcon) {
    return (
      <img
        src={ICON_WATERPROOF_LIGHT}
        alt={alt}
        width={56}
        height={56}
        className="w-14 h-14 object-contain"
        loading="lazy"
      />
    );
  }

  if (
    icon === 'long-lasting' ||
    icon === 'longlasting' ||
    icon === 'duration'
  ) {
    return <IconLongLasting variant={variant} />;
  }

  switch (icon) {
    case 'bug':
    case 'mosquito':
    case 'insect':
      return <Bug className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'leaf':
    case 'plant':
    case 'biodegradable':
      return <Leaf className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'wind':
    case 'co2':
    case 'mask':
      return <Wind className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'beaker':
    case 'flask':
    case 'flask-conical':
      return <Beaker className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'thermometer':
    case 'temperature':
    case 'heat':
      return <Thermometer className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'cloud':
      return <Cloud className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'package':
      return <Package className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'shield-check':
    case 'shield':
    case 'epa':
      return <ShieldCheck className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'check-circle':
    case 'check':
    case 'verified':
      return <CircleCheckBig className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
    case 'clock':
    case 'stopwatch':
    case 'timer':
    case 'duration':
    case '30':
    case '30-days':
    case '30days':
    case 'long-lasting':
    case 'longlasting':
      return <IconLongLasting variant={variant} />;
    case '50-states':
    case '50states':
    case 'legal':
    case 'state':
      return <Icon50States variant={variant} />;
    case 'droplets':
    case 'rain':
    case 'water':
    case 'rainproof':
    case 'weatherproof':
    case 'icon-waterproof-light':
    case 'waterproof':
      return (
        <img
          src={ICON_WATERPROOF_LIGHT}
          alt={alt}
          width={56}
          height={56}
          className="w-14 h-14 object-contain"
          loading="lazy"
        />
      );
    case 'warning-red':
      return (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    case 'flask-amber':
      return (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'clock-orange':
      return (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#ea580c" strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'ban-red':
      return (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth={strokeWidth} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
    default:
      return <Droplets className={lucideClass} strokeWidth={strokeWidth} style={lucideStyle} />;
  }
};

export default OdinsIcon;