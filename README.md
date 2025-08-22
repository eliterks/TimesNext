# DTU Times - Digital Magazine Showcase

A beautiful and responsive CRUD application for managing DTU Times editions with a modern digital magazine interface. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Core CRUD Operations
- **Create**: Add new editions with comprehensive form validation
- **Read**: Browse editions in an elegant grid layout with search and filters
- **Update**: Edit existing editions with real-time validation
- **Delete**: Remove editions with confirmation dialogs

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Interactive Elements**: Hover effects, transitions, and visual feedback
- **Search & Filter**: Find editions quickly with advanced search and category filters
- **Sorting Options**: Sort by date, title, pages, or category
- **Pagination**: Navigate through large collections efficiently

### 🚀 Technical Features
- **Full-Stack**: Built with Next.js API routes for seamless frontend-backend integration
- **Type Safety**: Full TypeScript support for better development experience
- **Real-time Updates**: Instant UI updates without page refreshes
- **Form Validation**: Comprehensive client-side validation with error handling
- **Toast Notifications**: User-friendly success and error messages
- **Optimized Images**: Responsive image handling with proper aspect ratios

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: JSON file-based storage (db.json)
- **Notifications**: React Hot Toast
- **Icons**: Heroicons (SVG)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dtu-times
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
dtu-times/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── editions/
│   │   │       ├── route.ts          # Main editions API
│   │   │       └── [id]/route.ts     # Individual edition API
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page
│   ├── components/
│   │   ├── Header.tsx                # Navigation header
│   │   ├── EditionGrid.tsx           # Editions display grid
│   │   ├── EditionModal.tsx          # Edition details modal
│   │   ├── EditionForm.tsx           # Create/edit form
│   │   ├── SearchAndFilters.tsx      # Search and filter controls
│   │   └── LoadingSpinner.tsx        # Loading indicator
│   ├── services/
│   │   └── api.ts                    # API service functions
│   └── types/
│       └── index.ts                  # TypeScript type definitions
├── db.json                           # Mock database
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🔌 API Endpoints

### Editions API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/editions` | Fetch all editions with optional filters |
| `POST` | `/api/editions` | Create a new edition |
| `GET` | `/api/editions/[id]` | Fetch a specific edition |
| `PUT` | `/api/editions/[id]` | Update an edition |
| `DELETE` | `/api/editions/[id]` | Delete an edition |

### Query Parameters

- `q`: Search query for title/description
- `category`: Filter by category
- `sortBy`: Sort field (date, title, pages, category)
- `order`: Sort order (asc, desc)
- `page`: Page number for pagination
- `limit`: Items per page

### Example API Response

```json
{
  "success": true,
  "data": {
    "editions": [...],
    "total": 25,
    "page": 1,
    "totalPages": 3
  }
}
```

## 🎨 Customization

### Adding New Categories
Edit the `categories` array in `SearchAndFilters.tsx` and `EditionForm.tsx`:

```typescript
const categories = ['Monthly', 'Special', 'Annual', 'Event', 'YourCategory'];
```

### Modifying the Layout
The grid layout can be adjusted in `EditionGrid.tsx`:

```typescript
// Change from 4 columns to 3
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Styling
All styles use Tailwind CSS classes and can be easily modified in the component files.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` directory
- **Railway**: Connect your GitHub repo and deploy
- **Render**: Use the static site option

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Form Validation**: All required fields are validated
- **API Error Handling**: Graceful error messages for failed requests
- **User Feedback**: Toast notifications for all operations
- **Responsive Testing**: Test on various screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for the DTU Times Development Recruitment Task.

## 🙏 Acknowledgments

- **DTU Times Development Team** for the opportunity
- **Next.js** for the amazing framework
- **Tailwind CSS** for the beautiful styling system
- **React Hot Toast** for the notification system

## 📞 Support

If you have any questions or need help with the application, please reach out to the DTU Times Development Team.

---

**Built with ❤️ for DTU Times**
