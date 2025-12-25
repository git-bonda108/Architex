# 🏗️ ArchitectPro - Professional Floor Plan Designer

A comprehensive Next.js application for creating professional architectural floor plans with support for complex shapes (L-Shaped, H-Shaped, M-Shaped), real-time preview, and dynamic scaling.

![ArchitectPro](./nextjs_space/public/og-image.png)

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://architect-pro.abacusai.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748)](https://www.prisma.io/)

---

## ✨ Features

### 🏢 Property Types
- **Apartment** - Multi-unit residential buildings
- **Condo** - Individually owned units
- **Villa** - Luxury standalone homes
- **Townhouse** - Multi-level attached homes
- **Duplex** - Two-unit structures
- **Penthouse** - Premium top-floor units
- **Bungalow** - Single-story detached homes

### 📐 Floor Plan Shapes
- **Regular** - Standard linear layout for compact spaces (traditional rectangular floor plan)
- **L-Shaped** - Two perpendicular wings, ideal for corner plots
- **H-Shaped** - Two parallel wings with central bridge
- **M-Shaped** - Central section with two projecting wings

### 📏 Layout Options
- **Studio** - Compact single-room living
- **1 BHK** - One bedroom configuration
- **2 BHK** - Two bedroom layout
- **3 BHK** - Three bedroom design
- **4 BHK** - Four bedroom plan
- **5 BHK+** - Five or more bedrooms

### 🎨 Professional Features
- ✅ **Complex Shape Support** - L, H, M shaped floor plans with visual outline indicators
- ✅ **Zero Room Overlapping** - Advanced anti-overlap algorithms with 0.5m minimum spacing
- ✅ **Uniform Distribution** - Percentage-based room allocation ensures balanced layouts
- ✅ **Real-time Dynamic Scaling** - Rooms scale proportionally when dimensions change
- ✅ **CAD-Quality Rendering** - Professional architectural symbols and annotations
- ✅ **Architectural Elements** - Doors, windows, fixtures, and furniture placement
- ✅ **Dimension Lines** - Automatic annotations with measurements
- ✅ **North Arrow Indicators** - Orientation markers for proper planning
- ✅ **Room Area Calculations** - Automatic calculation and display
- ✅ **Export Options** - PDF/PNG/SVG export (coming soon)
- ✅ **Drainage Controls** - Sewage system and pipe diameter settings

---

## 📚 Documentation

- **[Shape Implementation Guide](./SHAPE_IMPLEMENTATION.md)** - Comprehensive technical documentation on the shape layout algorithms, anti-overlap mechanisms, and room placement logic
- **[Contributing Guide](./CONTRIBUTING.md)** - Developer guidelines, code style, testing, and how to add new features
- **[Backend Architecture](./BACKEND_ARCHITECTURE.md)** - Database schema, API endpoints, and data flow
- **[Deployment Guide](./VERCEL_DEPLOYMENT.md)** - Step-by-step deployment instructions for Vercel
- **[Supabase Setup](./SUPABASE_CONNECTION_GUIDE.md)** - Database connection configuration
- **[API Keys Setup](./API_KEYS_SETUP.md)** - Third-party service integration guide

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **Yarn** (recommended) or npm
- **PostgreSQL** 14+ or Supabase account
- **Git**

### Local Development

```bash
# Clone the repository
git clone https://github.com/git-bonda108/Architex.git
cd Architex/nextjs_space

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# Generate Prisma client
yarn prisma generate

# Run database migrations
yarn prisma db push

# Seed the database with sample templates
yarn prisma db seed

# Start development server
yarn dev
```

The application will be available at `http://localhost:3000`

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14.2** - React framework with App Router
- **React 18.2** - UI library
- **TypeScript 5.2** - Type safety
- **Tailwind CSS 3.3** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon system

### Backend
- **Next.js API Routes** - Serverless backend
- **Prisma 6.7** - Database ORM
- **PostgreSQL** - Relational database

### Rendering
- **SVG** - Vector graphics for floor plans
- **CSS Transitions** - Smooth animations

---

## 🎯 Project Structure

```
nextjs_space/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes
│   │   └── templates/          # Template CRUD endpoints
│   ├── designer/               # Designer page
│   │   └── _components/       # Designer UI components
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/                  # Shared UI components
│   └── ui/                     # shadcn/ui components
├── lib/                         # Utility libraries
│   ├── types.ts                # TypeScript interfaces
│   ├── shape-layout-utils.ts   # Shape generation algorithms
│   ├── floor-plan-utils.ts     # Floor plan utilities
│   ├── architectural-symbols.ts # SVG symbol generators
│   ├── db.ts                   # Prisma client
│   └── utils.ts                # Helper functions
├── prisma/                      # Database schema
│   └── schema.prisma           # Prisma schema definition
├── scripts/                     # Database scripts
│   ├── seed.ts                 # Legacy seed script
│   └── seed_new.ts             # Current seed script
└── public/                      # Static assets
```

---

## 🔧 Key Algorithms

### Shape Generation

The application uses a **section-based approach** to generate complex floor plan shapes:

1. **Section Decomposition**: Complex shapes are broken down into rectangular sections
2. **Room Allocation**: Rooms are assigned to sections based on spatial requirements
3. **Proportional Distribution**: Percentage-based sizing ensures balanced layouts
4. **Boundary Enforcement**: Strict dimension clamping prevents overlapping

**Example: L-Shaped Layout**

```typescript
// Horizontal section: 100% width × 60% height
// - Living Room: 55% of available width
// - Kitchen: 40% of available width

// Vertical section: 60% width × 40% height  
// - Garage: 65% of available width
// - Maid's Room: 30% of available width
```

See [SHAPE_IMPLEMENTATION.md](./SHAPE_IMPLEMENTATION.md) for detailed technical documentation.

---

## 📊 API Reference

### Get Templates

```http
GET /api/templates?bhkType={bhkType}&propertyType={propertyType}
```

**Parameters:**
- `bhkType` (optional): Filter by BHK configuration (e.g., "2BHK", "3BHK")
- `propertyType` (optional): Filter by property type (e.g., "Apartment", "Villa")

**Response:**
```json
{
  "templates": [
    {
      "id": "clx...",
      "name": "2 BHK West Facing",
      "bhkType": "2BHK",
      "propertyType": "Apartment",
      "roomsData": [...],
      "doorsData": [...],
      "windowsData": [...],
      "fixturesData": [...],
      "furnitureData": [...]
    }
  ]
}
```

### Get Template by ID

```http
GET /api/templates/{id}
```

**Response:** Single template object

---

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run with coverage
yarn test --coverage

# Run specific test
yarn test shape-layout-utils.test.ts

# Watch mode
yarn test --watch
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Optional: AI API Keys (for future features)
OPENAI_API_KEY="sk-..."
DEEPSEEK_API_KEY="sk-..."
GROQ_API_KEY="gsk_..."
GEMINI_API_KEY="AIza..."
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Code style and standards
- Development workflow
- Testing guidelines
- Pull request process
- Adding new features (shapes, room types, etc.)

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-shape`
3. Make your changes with clear commit messages
4. Write or update tests
5. Run tests: `yarn test`
6. Push to your branch: `git push origin feature/new-shape`
7. Open a pull request

---

## 📝 Development Commands

```bash
# Development
yarn dev                    # Start dev server
yarn build                  # Production build
yarn start                  # Start production server
yarn lint                   # Run ESLint

# Database
yarn prisma generate        # Generate Prisma client
yarn prisma db push         # Push schema changes
yarn prisma db seed         # Seed database
yarn prisma studio          # Open Prisma Studio

# Testing
yarn test                   # Run tests
yarn test:watch             # Watch mode
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Database connection errors**
```bash
# Solution: Check DATABASE_URL in .env
yarn prisma db pull
```

**Issue: Rooms overlapping in floor plans**
```bash
# Solution: This has been fixed in v2.0 with:
# - Increased padding (0.5m minimum)
# - Strict boundary checking
# - Percentage-based allocation
```

**Issue: Shape outline not visible**
```bash
# Solution: Ensure you're using a non-rectangular shape
# The blue outline only appears for L, H, and M shapes
```

See [SHAPE_IMPLEMENTATION.md](./SHAPE_IMPLEMENTATION.md) for more troubleshooting tips.

---

## 🗺️ Roadmap

- [ ] **Export Functionality**
  - [ ] PDF export with proper scaling
  - [ ] PNG export for presentations
  - [ ] SVG export for further editing
  - [ ] DWG/DXF export for CAD software

- [ ] **Advanced Features**
  - [ ] Multi-floor support
  - [ ] Custom room types
  - [ ] 3D visualization
  - [ ] AI-powered layout suggestions
  - [ ] Furniture library expansion

- [ ] **Collaboration**
  - [ ] User authentication
  - [ ] Save and load designs
  - [ ] Share designs with team members
  - [ ] Version history

- [ ] **Mobile Support**
  - [ ] Responsive design improvements
  - [ ] Touch-friendly controls
  - [ ] Mobile-optimized UI

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Neufert Architects' Data** - Architectural standards and dimensions
- **shadcn/ui** - Beautiful UI components
- **Vercel** - Hosting and deployment platform
- **Supabase** - Database infrastructure

---

## 📧 Contact

- **GitHub**: [@git-bonda108](https://github.com/git-bonda108)
- **Repository**: [Architex](https://github.com/git-bonda108/Architex)
- **Live Demo**: [architect-pro.abacusai.app](https://architect-pro.abacusai.app)

---

**Built with ❤️ by the ArchitectPro Team**
