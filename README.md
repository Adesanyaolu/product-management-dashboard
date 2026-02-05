# Mobile Shopping App

A full-featured React Native shopping application built with Expo, featuring product browsing, cart management, and a complete checkout flow.

## 📱 Features

- **Product Browsing**: Grid layout with search and category filtering
- **Product Details**: Detailed view with quantity selection and add to cart
- **Shopping Cart**: View, update quantities, and remove items
- **Checkout Flow**: Complete form with validation (React Hook Form + Zod)
- **Order Management**: View order history with status tracking
- **Persistent State**: Cart and orders saved to AsyncStorage
- **Responsive Design**: Works on iOS, Android, and Web

## 🛠 Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Styling**: NativeWind v4 (TailwindCSS for React Native)
- **UI Components**: React Native Reusables (shadcn/ui for RN)
- **State Management**: 
  - React Query for server state
  - Context API for cart state
- **Form Validation**: React Hook Form + Zod
- **Storage**: AsyncStorage
- **Icons**: Lucide React Native

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for physical device testing)

### Setup

1. **Clone the repository**
   ```bash
   cd product-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser
   - Scan QR code with Expo Go app on your phone

## 📂 Project Structure

```
product-management-dashboard/
├── app/                          # Expo Router screens
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx           # Product listing
│   │   ├── cart.tsx            # Shopping cart
│   │   ├── orders.tsx          # Order history
│   │   └── profile.tsx         # User profile
│   ├── product/[id].tsx        # Product detail
│   ├── checkout.tsx            # Checkout form
│   └── order-confirmation.tsx  # Order success
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   ├── SearchBar.tsx
│   └── FilterChips.tsx
├── contexts/                    # React Context
│   └── CartContext.tsx         # Cart state management
├── hooks/                       # Custom hooks
│   ├── useProducts.ts          # React Query hooks
│   └── useDebounce.ts
├── services/                    # API layer
│   ├── api.ts
│   └── mockData.ts
├── types/                       # TypeScript types
├── utils/                       # Utilities
│   ├── validation.ts           # Zod schemas
│   └── storage.ts              # AsyncStorage helpers
└── lib/                         # Third-party config
    └── utils.ts                # className utilities
```

## 🎨 Key Features Explained

### Product Listing
- **Search**: Debounced search across product names and descriptions
- **Filters**: Category-based filtering with badge chips
- **Grid Layout**: Responsive 2-column grid with product cards
- **Pull to Refresh**: Refresh product data

### Product Detail
- **Image Display**: Full-width product image with badges (New/Sale)
- **Quantity Selector**: Increment/decrement with stock validation
- **Add to Cart**: Shows current cart quantity if already added
- **Category Badge**: Product category display

### Shopping Cart
- **Item Management**: Update quantities or remove items
- **Price Calculation**: Automatic subtotal, tax (8%), and total
- **Empty State**: Helpful message with CTA to browse products
- **Persistence**: Cart saved to AsyncStorage

### Checkout
- **Form Validation**: 
  - Email validation
  - Phone number validation
  - Address validation (ZIP code format)
  - Required field validation
- **Payment Selection**: Mock payment method selection
- **Order Summary**: Review items and total before purchase
- **Loading State**: Visual feedback during order processing

### Order Confirmation
- **Success Animation**: Check circle icon with success message
- **Order Details**: Order number, total, item count, delivery estimate
- **Shipping Info**: Display shipping address
- **Navigation**: Quick links to orders or continue shopping

### Orders History
- **Order List**: All past orders with status badges
- **Order Details**: Date, items, total, shipping address
- **Empty State**: Helpful message for new users

## 🔧 Configuration

### NativeWind Setup

The app uses NativeWind v4 for styling. Configuration files:

- `tailwind.config.js` - Tailwind configuration with custom theme
- `metro.config.js` - Metro bundler with NativeWind support
- `global.css` - Global styles and CSS variables

### Theme Customization

Edit `global.css` to customize colors:

```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... more variables */
}
```

## 📱 Testing

### Manual Testing Checklist

- [ ] Browse products and search
- [ ] Filter by category
- [ ] View product details
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Complete checkout form
- [ ] Submit order
- [ ] View order confirmation
- [ ] Check orders history
- [ ] Restart app (verify cart persistence)

### Test on Different Devices

- iPhone SE (small screen)
- iPhone 14 Pro (large screen)
- Android (various sizes)
- Web browser

## 🚀 Deployment

### Expo EAS Build

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

4. **Build for Android**
   ```bash
   eas build --platform android
   ```

## 📝 Mock Data

The app uses local mock data (`services/mockData.ts`) with 15 products across 5 categories:
- Electronics
- Clothing
- Home & Kitchen
- Sports
- Books

Product images are sourced from Unsplash.

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Real payment integration (Stripe)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Push notifications for order updates
- [ ] Advanced filtering (price range, ratings)
- [ ] Product recommendations
- [ ] Order tracking
- [ ] Multiple shipping addresses

## 📄 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- **React Native Reusables** - UI component library
- **NativeWind** - TailwindCSS for React Native
- **Expo** - React Native framework
- **Unsplash** - Product images
