# E-Commerce Inventory & Stock Management Dashboard

A responsive single-page application (SPA) built with React and Vite for managing e-commerce product catalogs and stock levels. The project demonstrates component-based architecture, combining modern Functional Components with Hooks alongside legacy Class Components with lifecycle management.

## Live Deployment & Repository

- **Live Deployment:** [https://eyadarshad.github.io/ecommerce-inventory-dashboard/](https://eyadarshad.github.io/ecommerce-inventory-dashboard/)
- **GitHub Repository:** [https://github.com/eyadarshad/ecommerce-inventory-dashboard](https://github.com/eyadarshad/ecommerce-inventory-dashboard)

## Features

- **Component-Based Architecture:** Modular structure separating functional views, class-based modules, and shared container wrappers.
- **Reusable CardWrapper (`props.children`):** Generic container component supporting headers, actions, custom subtitles, and nested children.
- **Class Component & Lifecycle (`AuditLogger`):** Tracks catalog events (`PRODUCT_ADDED`, `STOCK_UPDATED`, `ITEM_DELETED`). Demonstrates `componentDidMount` for storage retrieval, `componentDidUpdate` for persistence and auto-dismissing toast notifications, and `componentWillUnmount` for timer and event listener cleanup.
- **Dynamic JSX & Synthetic Events:** Form inputs, quick stock increment/decrement steppers, item deletion, and search/filter events handled through synthetic DOM events.
- **Conditional Rendering:** Visual badges (`In Stock`, `Low Stock`, `Out of Stock`) and inventory alert banners rendered using ternary operators and logical short-circuiting (`&&`).
- **React Hooks Integration:**
  - `useState`: Product inventories, form inputs, search queries, and category/stock filter state.
  - `useEffect`: LocalStorage state persistence and dynamic document title synchronization (`StockFlow (X Products)`).
  - `useContext`: Global theme management (`light`/`dark`) without prop drilling.
  - `useRef`: Automatic input focus shifting to product title on initial component mount and immediately after form submissions.
  - `useMemo`: Memoized inventory filtering and KPI metric calculations (total items, total units, valuation, low stock count, out of stock count).
  - `useCallback`: Memoized action callbacks (`handleAddProduct`, `handleDeleteProduct`, `handleUpdateStock`, `handleResetFilters`).

## Project Structure

```plaintext
src/
 components/
  class/
   AuditLogger.jsx
  functional/
   ProductForm.jsx
   ProductList.jsx
   ProductCard.jsx
   CardWrapper.jsx
   Header.jsx
   InventoryMetrics.jsx
   ThemeToggle.jsx
 context/
  ThemeContext.jsx
 hooks/
  useLocalStorage.js
 App.jsx
 main.jsx
 index.css
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/eyadarshad/ecommerce-inventory-dashboard.git
   cd ecommerce-inventory-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Theoretical Analysis: Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)

### 1. Fundamental Execution and Initial Page Load Differences
In Client-Side Rendering (CSR), typical of standard Vite and React single-page applications, the web server acts primarily as a static asset host. During the initial request, the browser receives a minimal HTML document shell containing an empty root container alongside bundled JavaScript files. The client device must download, parse, and execute this entire JavaScript bundle before React mounts, initializes state, and renders the Document Object Model (DOM). Consequently, server execution overhead is negligible, but the client experiences a delay known as the Time to Interactive (TTI) or First Contentful Paint (FCP) gap.

In contrast, Server-Side Rendering (SSR), utilized by frameworks like Next.js, executes React component logic on a Node.js or edge server at request time. The server compiles dynamic state, executes initial lifecycle and data fetching routines, and transmits fully populated HTML directly to the browser. The browser immediately paints meaningful markup on the screen. Afterwards, a hydration phase attaches synthetic event listeners to make the page fully interactive.

### 2. Trade-Offs for Enterprise E-Commerce and Inventory Dashboards
Choosing between CSR and SSR involves evaluating performance, search engine optimization (SEO), and infrastructure overhead:

- **SEO and Public Discoverability:** SSR produces crawlable, pre-rendered semantic HTML, which is essential for public e-commerce product catalogs that rely on search indexing and social link previews. For internal or authenticated administrative dashboards (such as this Inventory Management system), SEO is irrelevant because pages sit behind protected authentication walls.
- **Performance Characteristics:** SSR provides a superior First Contentful Paint (FCP) and Largest Contentful Paint (LCP) on cold requests. However, CSR excels in runtime responsiveness; once the initial bundle loads, subsequent route transitions, sorting, and filtering happen client-side instantly without server roundtrips.
- **Hosting and Operational Complexity:** CSR SPAs deploy as pure static assets onto low-cost global CDNs (e.g., GitHub Pages, AWS S3/CloudFront) with virtually zero server management or scaling costs. SSR mandates continuous Node.js runtime servers, introducing compute costs, server maintenance, and cold-start latency under high traffic. For an internal operational dashboard with high user interactivity, CSR provides the most reliable and cost-effective architecture.
