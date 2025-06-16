# 📱 Responsive Design Standards & Guidelines

## 🎯 Overview

Bu dokümantasyon, React Map uygulaması için Bootstrap 5 tabanlı responsive design standartlarını ve best practices'lerini tanımlar. Mobil-first yaklaşım ve modern web standartları kullanılarak oluşturulmuştur.

---

## 📏 Breakpoint System

### Bootstrap 5 Breakpoints
```scss
// Extra small devices (portrait phones, less than 576px)
$xs: 0;

// Small devices (landscape phones, 576px and up)
$sm: 576px;

// Medium devices (tablets, 768px and up)
$md: 768px;

// Large devices (desktops, 992px and up)
$lg: 992px;

// Extra large devices (large desktops, 1200px and up)
$xl: 1200px;

// Extra extra large devices (larger desktops, 1400px and up)
$xxl: 1400px;
```

### Uygulama Breakpoints
```javascript
export const BREAKPOINTS = {
  mobile: {
    min: 0,
    max: 767,
    description: 'Portrait phones, small landscape phones'
  },
  tablet: {
    min: 768,
    max: 991,
    description: 'Tablets, large phones in landscape'
  },
  desktop: {
    min: 992,
    max: 1199,
    description: 'Small desktops, large tablets'
  },
  largeDesktop: {
    min: 1200,
    max: Infinity,
    description: 'Large desktops and monitors'
  }
}
```

---

## 🔧 CSS Utility Functions

### Responsive Sizing with clamp()
```css
/* Font Sizes */
font-size: clamp(minimum, preferred, maximum);

/* Mobile-first sizing examples */
.heading-primary {
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* 24px → 40px */
}

.heading-secondary {
  font-size: clamp(1.25rem, 3vw, 2rem); /* 20px → 32px */
}

.body-text {
  font-size: clamp(0.875rem, 2.5vw, 1rem); /* 14px → 16px */
}

.small-text {
  font-size: clamp(0.75rem, 2vw, 0.875rem); /* 12px → 14px */
}

/* Spacing */
.responsive-gap {
  gap: clamp(0.5rem, 2vw, 1rem); /* 8px → 16px */
}

.responsive-padding {
  padding: clamp(0.5rem, 2vw, 1.5rem); /* 8px → 24px */
}

.responsive-margin {
  margin: clamp(0.25rem, 1vw, 1rem); /* 4px → 16px */
}
```

### Component Sizing Standards
```css
/* Button Sizes */
.btn-mobile {
  min-width: clamp(36px, 8vw, 48px);
  min-height: clamp(36px, 8vw, 48px);
  padding: clamp(6px, 1.5vw, 10px);
}

.btn-tablet {
  min-width: clamp(40px, 6vw, 50px);
  min-height: clamp(40px, 6vw, 50px);
  padding: clamp(8px, 2vw, 12px);
}

.btn-desktop {
  min-width: clamp(44px, 4vw, 52px);
  min-height: clamp(44px, 4vw, 52px);
  padding: clamp(10px, 1.5vw, 14px);
}

/* Icon Sizes */
.icon-small {
  font-size: clamp(14px, 3vw, 18px);
  width: clamp(14px, 3vw, 18px);
  height: clamp(14px, 3vw, 18px);
}

.icon-medium {
  font-size: clamp(16px, 4vw, 24px);
  width: clamp(16px, 4vw, 24px);
  height: clamp(16px, 4vw, 24px);
}

.icon-large {
  font-size: clamp(20px, 5vw, 32px);
  width: clamp(20px, 5vw, 32px);
  height: clamp(20px, 5vw, 32px);
}
```

---

## 🎨 Component Responsive Patterns

### 1. Panel/Modal Components
```jsx
// MapManagement Panel Example
<div className="position-fixed top-0 start-0 m-1 m-sm-2 m-md-3">
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <div 
          className="card d-flex flex-column"
          style={{
            height: 'calc(100vh - 0.5rem)', // Mobile optimized
            minWidth: 'clamp(280px, 85vw, 320px)',
            maxWidth: 'min(320px, calc(100vw - 1rem))',
          }}
        >
          {/* Content */}
        </div>
      </div>
    </div>
  </div>
</div>
```

### 2. Button Grid Systems
```jsx
// CenterMenuBar Grid Example
<div className="row g-1 g-sm-2">
  {buttons.map((button, index) => (
    <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
      <button 
        className="btn w-100 d-flex flex-column align-items-center"
        style={{
          minHeight: 'clamp(50px, 12vw, 70px)',
          fontSize: 'clamp(9px, 2vw, 11px)',
        }}
      >
        <Icon style={{ fontSize: 'clamp(16px, 4vw, 20px)' }} />
        <span>{button.label}</span>
      </button>
    </div>
  ))}
</div>
```

### 3. Navigation Components
```jsx
// Bottom Navigation Example
<div className="position-fixed bottom-0 start-50 translate-middle-x mb-1 mb-sm-2 mb-md-3">
  <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-auto">
        <div className="d-flex align-items-center gap-1 gap-sm-2">
          {/* Navigation items */}
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 📱 Touch & Mobile Optimizations

### Touch Target Guidelines
```css
/* Apple Human Interface Guidelines & Google Material Design */
.touch-target {
  min-width: 44px;  /* iOS minimum */
  min-height: 44px; /* iOS minimum */
  /* Android recommends 48dp (48px) */
}

.touch-optimized {
  /* Disable text selection */
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  
  /* Remove touch callouts */
  -webkit-touch-callout: none;
  
  /* Remove tap highlight */
  -webkit-tap-highlight-color: transparent;
  
  /* Smooth scrolling on iOS */
  -webkit-overflow-scrolling: touch;
}
```

### Viewport Optimizations
```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#0078d4">
```

### Mobile-Specific CSS
```css
/* Prevent zoom on input focus (iOS) */
input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  font-size: 16px; /* Prevents zoom on iOS */
}

/* Better scroll behavior */
.scroll-container {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

/* Hide scrollbars on mobile */
@media (max-width: 767px) {
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
}
```

---

## 🎯 Layout Patterns

### 1. Mobile-First Grid System
```jsx
// Progressive Enhancement Approach
<div className="row">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns, Large: 4 columns */}
  <div className="col-12 col-md-6 col-lg-4 col-xl-3">
    <ComponentCard />
  </div>
</div>

// Menu Grid Pattern
<div className="row g-1 g-sm-2">
  {/* Mobile: 2 cols, Small: 3 cols, Medium: 4 cols */}
  <div className="col-6 col-sm-4 col-md-3">
    <MenuButton />
  </div>
</div>
```

### 2. Flexible Container Patterns
```jsx
// Auto-width containers
<div className="col-auto">
  <div className="d-flex align-items-center gap-1 gap-sm-2">
    {/* Flexible content */}
  </div>
</div>

// Responsive width containers
<div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
  {/* Progressive width reduction */}
</div>
```

### 3. Stack/Horizontal Switch Pattern
```jsx
// Stack on mobile, horizontal on larger screens
<div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
  <div className="flex-grow-1">Content 1</div>
  <div className="flex-shrink-0">Content 2</div>
</div>
```

---

## 📐 Spacing System

### Bootstrap 5 Spacing Scale
```css
/* rem-based spacing (1rem = 16px) */
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; } /* 4px */
.m-2 { margin: 0.5rem; }  /* 8px */
.m-3 { margin: 1rem; }    /* 16px */
.m-4 { margin: 1.5rem; }  /* 24px */
.m-5 { margin: 3rem; }    /* 48px */

/* Responsive spacing examples */
.mb-1.mb-sm-2.mb-md-3 /* Progressive bottom margin */
.p-2.p-sm-3.p-lg-4    /* Progressive padding */
.gap-1.gap-sm-2       /* Progressive gap in flexbox */
```

### Custom Responsive Spacing
```css
/* Dynamic spacing with clamp() */
.dynamic-spacing {
  margin: clamp(0.25rem, 2vw, 1rem);    /* 4px → 16px */
  padding: clamp(0.5rem, 3vw, 1.5rem);  /* 8px → 24px */
  gap: clamp(0.25rem, 1vw, 0.75rem);    /* 4px → 12px */
}

/* Context-aware spacing */
.mobile-tight {
  padding: 0.5rem;
  gap: 0.25rem;
}

.desktop-comfortable {
  padding: 1.5rem;
  gap: 1rem;
}
```

---

## 🎨 Typography System

### Responsive Typography Scale
```css
/* Heading Scale */
.display-1 { font-size: clamp(2.5rem, 8vw, 5rem); }     /* 40px → 80px */
.display-2 { font-size: clamp(2rem, 6vw, 4.5rem); }     /* 32px → 72px */
.display-3 { font-size: clamp(1.75rem, 5vw, 4rem); }    /* 28px → 64px */

.h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); }         /* 24px → 40px */
.h2 { font-size: clamp(1.25rem, 3vw, 2rem); }          /* 20px → 32px */
.h3 { font-size: clamp(1.125rem, 2.5vw, 1.75rem); }    /* 18px → 28px */
.h4 { font-size: clamp(1rem, 2vw, 1.5rem); }           /* 16px → 24px */
.h5 { font-size: clamp(0.875rem, 1.5vw, 1.25rem); }    /* 14px → 20px */
.h6 { font-size: clamp(0.75rem, 1vw, 1rem); }          /* 12px → 16px */

/* Body Text */
.lead      { font-size: clamp(1rem, 2.5vw, 1.25rem); }  /* 16px → 20px */
.body-lg   { font-size: clamp(0.875rem, 2vw, 1.125rem); } /* 14px → 18px */
.body      { font-size: clamp(0.875rem, 1.5vw, 1rem); }   /* 14px → 16px */
.body-sm   { font-size: clamp(0.75rem, 1vw, 0.875rem); }  /* 12px → 14px */
.caption   { font-size: clamp(0.625rem, 1vw, 0.75rem); }  /* 10px → 12px */
```

### Line Height & Letter Spacing
```css
/* Responsive line heights */
.lh-tight    { line-height: clamp(1.1, 1.2, 1.3); }
.lh-normal   { line-height: clamp(1.3, 1.5, 1.6); }
.lh-relaxed  { line-height: clamp(1.5, 1.6, 1.8); }

/* Letter spacing for different screen sizes */
.tracking-tight  { letter-spacing: clamp(-0.02em, 0, 0.01em); }
.tracking-normal { letter-spacing: clamp(0, 0.01em, 0.02em); }
.tracking-wide   { letter-spacing: clamp(0.02em, 0.05em, 0.1em); }
```

---

## 🔧 Interactive Elements

### Button Responsive States
```css
/* Touch-friendly button sizing */
.btn-responsive {
  /* Base mobile size */
  min-width: 44px;
  min-height: 44px;
  padding: clamp(8px, 2vw, 12px);
  font-size: clamp(14px, 2.5vw, 16px);
  
  /* Tablet adjustments */
  @media (min-width: 768px) {
    min-width: 48px;
    min-height: 48px;
  }
  
  /* Desktop refinements */
  @media (min-width: 992px) {
    min-width: auto;
    min-height: 40px;
    padding: 8px 16px;
  }
}

/* Icon buttons */
.btn-icon {
  aspect-ratio: 1;
  min-width: clamp(36px, 8vw, 48px);
  min-height: clamp(36px, 8vw, 48px);
  padding: clamp(6px, 1.5vw, 10px);
  
  .icon {
    font-size: clamp(14px, 3.5vw, 20px);
  }
}
```

### Form Elements
```css
/* Touch-friendly form inputs */
.form-control-responsive {
  min-height: 44px; /* Touch target */
  font-size: 16px;  /* Prevent zoom on iOS */
  padding: clamp(8px, 2vw, 12px);
  
  @media (min-width: 768px) {
    min-height: 40px;
    font-size: 14px;
  }
}

/* Select dropdowns */
.form-select-responsive {
  min-height: 44px;
  font-size: 16px;
  background-size: clamp(12px, 3vw, 16px);
}
```

---

## 📊 Performance Considerations

### CSS Optimization
```css
/* Use CSS containment for better performance */
.component {
  contain: layout style paint;
}

/* Optimize repaints and reflows */
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* Create new layer */
}

/* Efficient responsive images */
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  loading: lazy;
}
```

### JavaScript Performance
```javascript
// Debounced resize handler
const useResponsiveSize = () => {
  const [size, setSize] = useState(getViewportSize())
  
  useEffect(() => {
    const handleResize = debounce(() => {
      setSize(getViewportSize())
    }, 150)
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return size
}

// Intersection Observer for lazy loading
const useLazyLoad = (ref) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  
  return isVisible
}
```

---

## 🎯 Z-Index Management

### Systematic Z-Index Layers
```javascript
export const Z_INDEX_LAYERS = {
  // Base layers (0-999)
  MAP_CONTAINER: 0,
  MAP_LOGO: 100,
  
  // UI Base layers (1000-1999)
  BASE_UI: 1000,
  CENTER_MENU: 1050,
  CENTER_MENU_BAR: 1060,
  
  // Panel layers (2000-2999)
  MAP_MANAGEMENT: 2000,
  MAP_SEARCH: 2100,
  MAP_SIDEBAR: 2200,
  
  // Control layers (10000-10999)
  MAP_CONTROLS: 10000,
  MEASUREMENT_DISPLAY: 10100,
  
  // Modal layers (20000+)
  MODAL_OVERLAY: 20000,
  INTRO_OVERLAY: 20000,
  NOTIFICATION: 25000
}
```

### Z-Index Best Practices
```css
/* Create stacking contexts */
.stacking-context {
  position: relative;
  z-index: 0;
}

/* Avoid z-index wars */
.modal-backdrop {
  z-index: var(--z-modal-backdrop, 1040);
}

.modal {
  z-index: var(--z-modal, 1050);
}

.tooltip {
  z-index: var(--z-tooltip, 1070);
}
```

---

## 🚀 Implementation Guidelines

### 1. Mobile-First Development
```css
/* ✅ Good: Mobile-first approach */
.component {
  /* Mobile styles (default) */
  padding: 1rem;
  font-size: 14px;
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
    padding: 1.5rem;
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  .component {
    /* Desktop styles */
    padding: 2rem;
    font-size: 18px;
  }
}
```

### 2. Progressive Enhancement
```jsx
// ✅ Good: Progressive enhancement
const Component = () => {
  return (
    <div className="
      col-12          // Mobile: full width
      col-sm-6        // Small: half width
      col-md-4        // Medium: third width
      col-lg-3        // Large: quarter width
      p-2 p-sm-3      // Progressive padding
      mb-2 mb-md-3    // Progressive margin
    ">
      <div className="d-flex flex-column flex-sm-row gap-2">
        Content
      </div>
    </div>
  )
}
```

### 3. Accessibility Considerations
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .component {
    border: 2px solid;
    background: Window;
    color: WindowText;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation: none;
    transition: none;
  }
}

/* Focus indicators */
.btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

---

## 📋 Testing Checklist

### Device Testing Matrix
| Device Category | Screen Size | Viewport | Test Priority |
|----------------|-------------|----------|---------------|
| Mobile Portrait | 375×667 | 375×667 | ⭐⭐⭐ Critical |
| Mobile Landscape | 667×375 | 667×375 | ⭐⭐ High |
| Tablet Portrait | 768×1024 | 768×1024 | ⭐⭐⭐ Critical |
| Tablet Landscape | 1024×768 | 1024×768 | ⭐⭐ High |
| Small Desktop | 1280×720 | 1280×720 | ⭐⭐⭐ Critical |
| Large Desktop | 1920×1080 | 1920×1080 | ⭐⭐ High |

### Responsive Testing Steps
1. **Layout Integrity**
   - [ ] No horizontal scrolling
   - [ ] All content visible
   - [ ] Proper text wrapping
   - [ ] Consistent spacing

2. **Interactive Elements**
   - [ ] Touch targets ≥44px
   - [ ] Hover states work
   - [ ] Focus indicators visible
   - [ ] Buttons properly sized

3. **Typography**
   - [ ] Readable font sizes
   - [ ] Proper line heights
   - [ ] No text overflow
   - [ ] Consistent hierarchy

4. **Performance**
   - [ ] Fast loading
   - [ ] Smooth animations
   - [ ] No layout shifts
   - [ ] Efficient reflows

---

## 🛠️ Development Tools

### Chrome DevTools
```javascript
// Device simulation snippets
const DEVICE_PRESETS = {
  iPhone13: { width: 390, height: 844, deviceScaleFactor: 3 },
  iPadAir: { width: 820, height: 1180, deviceScaleFactor: 2 },
  GalaxyS21: { width: 384, height: 854, deviceScaleFactor: 3 },
  SurfacePro: { width: 912, height: 1368, deviceScaleFactor: 2 }
}

// Responsive breakpoint testing
const testBreakpoints = () => {
  [576, 768, 992, 1200, 1400].forEach(width => {
    window.resizeTo(width, 800)
    console.log(`Testing at ${width}px`)
  })
}
```

### CSS Debugging
```css
/* Responsive debugging */
.debug-responsive::before {
  content: 'XS';
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  z-index: 99999;
}

@media (min-width: 576px) {
  .debug-responsive::before { content: 'SM'; background: orange; }
}

@media (min-width: 768px) {
  .debug-responsive::before { content: 'MD'; background: yellow; color: black; }
}

@media (min-width: 992px) {
  .debug-responsive::before { content: 'LG'; background: green; }
}

@media (min-width: 1200px) {
  .debug-responsive::before { content: 'XL'; background: blue; }
}

@media (min-width: 1400px) {
  .debug-responsive::before { content: 'XXL'; background: purple; }
}
```

---

## 📚 Resources & References

### Official Documentation
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [clamp() Function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)

### Design Guidelines
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Google Material Design](https://material.io/design)
- [Microsoft Fluent Design System](https://www.microsoft.com/design/fluent/)

### Testing Tools
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/)
- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)

---

## 🎉 Conclusion

Bu standartları takip ederek:
- ✅ Tutarlı responsive deneyim
- ✅ Optimum performans
- ✅ Accessibility compliance
- ✅ Maintainable kod yapısı
- ✅ Future-proof tasarım

sağlanır. Her yeni component geliştirilirken bu guideline'ları referans alın ve mobile-first yaklaşımı benimseyin.

---

*Son güncelleme: 2025 - Bootstrap 5.3.x uyumlu* 