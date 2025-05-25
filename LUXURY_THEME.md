# Luxury Theme Documentation

## Overview

SmellSmith features a sophisticated luxury goldish color palette designed specifically for professional users in the luxury perfume sector. The theme provides both light and dark modes with premium visual effects and consistent styling throughout the application.

## Color Palette

### Primary Gold Colors
- **Gold**: `hsl(43, 96%, 56%)` - Primary brand color with rich golden hue
- **Gold Dark**: `hsl(42, 88%, 45%)` - Deeper gold for contrast and depth
- **Gold Light**: `hsl(44, 87%, 85%)` - Soft gold for backgrounds and highlights
- **Gold Muted**: `hsl(42, 55%, 75%)` - Subtle gold for secondary elements

### Luxury Accent Colors
- **Champagne**: `hsl(48, 75%, 88%)` - Elegant champagne tone
- **Bronze**: `hsl(30, 85%, 45%)` - Rich bronze for contrast
- **Rose Gold**: `hsl(15, 85%, 75%)` - Warm rose gold accent
- **Platinum**: `hsl(210, 8%, 85%)` - Cool platinum gray

### Theme Variations

#### Light Theme
- Background: `hsl(50, 40%, 98%)` - Warm white with subtle gold undertone
- Foreground: `hsl(45, 25%, 15%)` - Dark brown for text
- Cards: `hsl(48, 100%, 99%)` - Pure white with gold hint
- Muted: `hsl(45, 12%, 94%)` - Light gray with warmth

#### Dark Theme
- Background: `hsl(45, 15%, 8%)` - Rich dark brown
- Foreground: `hsl(48, 60%, 94%)` - Warm light text
- Cards: `hsl(45, 20%, 10%)` - Dark card backgrounds
- Muted: `hsl(45, 8%, 15%)` - Dark muted elements

## Component Variants

### Button Variants

#### Luxury Buttons
```css
.luxury {
  background: linear-gradient(to right, hsl(var(--gold)), hsl(var(--gold-dark)));
  color: hsl(var(--gold-foreground));
  box-shadow: 0 0 20px hsl(var(--shadow-gold));
  border: 1px solid hsl(var(--gold) / 0.2);
}
```

#### Luxury Outline
```css
.luxury-outline {
  border: 2px solid hsl(var(--gold));
  color: hsl(var(--gold));
  background: transparent;
}
```

#### Luxury Ghost
```css
.luxury-ghost {
  color: hsl(var(--gold));
  background: transparent;
  hover:background: hsl(var(--gold) / 0.1);
}
```

### Card Variants

#### LuxuryCard
- Gradient background from card to champagne
- Gold border with subtle opacity
- Shadow with gold tint
- Hover effects with enhanced shadows

#### PremiumCard
- Luxury gradient background
- Double gold border
- Shimmer effect on hover
- Backdrop blur for depth

### Badge Variants

#### Luxury Badge
```css
.badge-luxury {
  background: linear-gradient(to right, hsl(var(--gold)), hsl(var(--gold-light)));
  color: hsl(var(--gold-foreground));
  box-shadow: 0 0 8px hsl(var(--shadow-gold));
}
```

## Visual Effects

### Shadows
- **Gold Shadow**: `0 0 20px hsl(var(--shadow-gold))`
- **Gold Subtle**: `0 0 8px hsl(var(--shadow-gold))`
- **Luxury Shadow**: `0 10px 40px hsl(var(--shadow-warm))`

### Animations

#### Luxury Pulse
```css
@keyframes luxury-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}
```

#### Gold Shimmer
```css
@keyframes gold-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
```

#### Elegant Fade In
```css
@keyframes elegant-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Gradient Backgrounds

#### Luxury Gradient
```css
.gradient-luxury {
  background: linear-gradient(135deg,
    hsl(var(--background)) 0%,
    hsl(var(--card)) 25%,
    hsl(var(--champagne)) 75%,
    hsl(var(--gold-light)) 100%
  );
}
```

#### Gold Gradient
```css
.gradient-gold {
  background: linear-gradient(135deg,
    hsl(var(--gold-dark)) 0%,
    hsl(var(--gold)) 50%,
    hsl(var(--gold-light)) 100%
  );
}
```

## Layout Implementation

### Navbar
- Gradient header with gold accents
- Animated brand name with gold gradient text
- Hover effects on navigation links with gold underlines
- Theme toggle with smooth transitions

### Sidebar
- Gradient background with luxury feel
- Active states with gold highlighting
- Smooth transitions on hover and focus
- Luxury pulse animation on collapse button

### Main Content
- Gradient luxury background
- Elegant fade-in animation for content
- Premium card layouts with gold accents

## Theme Toggle

The application includes a sophisticated theme toggle component:

### Standard Theme Toggle
- Gold-accented button with icon transitions
- Smooth color transitions between light/dark
- Hover effects with gold glow

### Luxury Theme Toggle
- Pill-shaped toggle with gradient backgrounds
- Active state highlighting
- Smooth animations between states

## Typography

### Font Hierarchy
- Headers use semibold weight with tight tracking
- Gold accent classes for highlighting important text
- Optimized font rendering with antialiasing

### Text Colors
- Primary text: Foreground color variables
- Gold accents: Various gold shades for hierarchy
- Muted text: Subtle variations for secondary content

## Accessibility

### Contrast Ratios
- All color combinations meet WCAG AA standards
- Enhanced focus states with gold outlines
- Clear visual hierarchy with proper contrast

### Focus Management
- Custom focus rings with gold coloring
- Keyboard navigation support
- Screen reader friendly implementations

## Best Practices

### Color Usage
1. Use gold sparingly for maximum impact
2. Maintain contrast ratios for readability
3. Apply luxury effects consistently across components
4. Use subtle animations to enhance user experience

### Component Composition
1. Combine luxury variants for premium feel
2. Layer shadows and gradients thoughtfully
3. Ensure responsive behavior across devices
4. Test in both light and dark themes

### Performance
1. CSS animations use transform and opacity
2. Hardware acceleration for smooth transitions
3. Minimal repaints during theme switches
4. Optimized gradient usage

## Implementation Examples

### Premium Dashboard Card
```tsx
<PremiumCard className="group">
  <CardHeader>
    <div className="flex items-center space-x-3">
      <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-white" />
      </div>
      <div>
        <CardTitle className="text-lg font-semibold">Premium Feature</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">Luxury experience</p>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <Button variant="luxury" className="w-full">
      Explore Premium
    </Button>
  </CardContent>
</PremiumCard>
```

### Luxury Navigation Item
```tsx
<Link
  href="/premium"
  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-500 after:to-amber-500 hover:after:w-full after:transition-all after:duration-300"
>
  Premium Collections
</Link>
```

## Browser Support

- Modern browsers with CSS custom properties support
- Gradient and backdrop-filter support required
- Smooth animation performance on 60fps displays
- Responsive design for mobile and desktop

## Future Enhancements

1. Additional luxury color variants
2. More sophisticated animation sequences
3. Seasonal theme variations
4. Enhanced accessibility features
5. Performance optimizations for mobile devices