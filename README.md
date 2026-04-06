# FinanceDash 📊

FinanceDash is a premium, high-performance financial management dashboard built with **React**, **Tailwind CSS**, and **Recharts**. It provides a comprehensive suite for tracking expenses, analyzing spending patterns with interactive visual data, and performing deep-dive comparisons across multiple years and months.

---

## 🚀 Key Features

### 1. Smart Analytics & Visualizations
* **Dynamic Highlights:** Instant summaries for the current month and year.
* **Interactive Donut Charts:** Visual category breakdowns for spending using `recharts`.
* **Peak Insights:** Automatically identifies your highest spending category ("Peak") for any given period.
* **Historical Benchmarking:** Displays historical monthly and yearly averages to help track financial goals.

### 2. Advanced Data Management
* **Comprehensive Filtering:** Filter transactions by Type (Credit/Debit), Category, Year, and Month.
* **Instant Sorting:** Sort your financial history by Date (Newest/Oldest) or Amount (High/Low).
* **Comparison Engine:** A dedicated page to compare any two years or any two months side-by-side with grouped bar charts and trend indicators.
* **LocalStorage Persistence:** Your filters, sorting preferences, and theme choices are saved automatically to your browser.

### 3. Role-Based Access Control (RBAC)
* **Custom Role Popup:** A beautiful, state-driven popup menu to switch between **Viewer** and **Administrator** roles.
* **Admin Suite:** Administrators gain full CRUD (Create, Read, Update, Delete) privileges.
* **Seamless Editing:** Clicking "Edit" on a transaction triggers a smooth scroll back to the input form with pre-filled data.
* **Secure Deletion:** A full-window confirmation modal with backdrop blur to prevent accidental data loss.

### 4. Premium User Interface
* **Zero-Flash Dark Mode:** Optimized implementation using a blocking script in `index.html` to prevent white flashes during page refreshes.
* **Fully Responsive:** Tailored experiences for Mobile, Tablet, and Desktop with a custom hamburger navigation menu.
* **Modern Aesthetics:** Built using Tailwind CSS with smooth transitions and FontAwesome integration.

---

## 🛠️ Tech Stack

* **Framework:** [React 18](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Routing:** [React Router 7](https://reactrouter.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [FontAwesome React](https://fontawesome.com/docs/web/use-with/react/)
* **Charts:** [Recharts](https://recharts.org/)
* **State Management:** React Context API

---

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tejash-exe/FinanceDash
    cd finance-dash
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Required Packages (Reference):**
    If setting up from scratch, ensure these are installed:
    ```bash
    npm i @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome recharts react-router-dom
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```text
src/
├── components/        # UI Components (Navbar, Highlights, Tableview, etc.)
├── context/           # DashboardContext.jsx (Global State & Logic)
├── pages/             # Page Layouts (Dashboard, ComparePage, NotFound)
├── App.jsx            # Routing & Provider Configuration
├── main.jsx           # Entry Point
└── index.css          # Tailwind Imports & Global Transitions
```

---

## 💡 How to Use

* **🌓 Toggle Theme:** Click the **Sun/Moon icon** in the top navigation bar to switch between Light and Dark modes. The application uses a zero-flash script to ensure your preference persists seamlessly across refreshes.
* **🔑 Manage Access Levels:** The dashboard defaults to **Viewer Mode** (read-only). Click the **User icon** in the Navbar to switch to **Administrator Mode**. This unlocks the "Add Transaction" form and enables edit/delete actions across your data.
* **⚖️ Compare Financial Periods:** Navigate to the **Compare** tab to perform a side-by-side analysis. You can select any two specific years or months to visualize spending trends and see calculated percentage differences across all categories.
* **🧹 Reset to Defaults:** To wipe your custom entries and return to the original 35-transaction sample dataset:
    1.  Open your browser console (**F12** or `Cmd + Option + J`).
    2.  Type `localStorage.clear()` and hit Enter.
    3.  Refresh the page.

---

## 📂 Project Structure

```text
src/
├── components/        # UI Components (Navbar, Highlights, Tableview, etc.)
├── context/           # DashboardContext.jsx (Global State & Logic)
├── pages/             # Page Layouts (Dashboard, ComparePage, NotFound)
├── App.jsx            # Routing & Provider Configuration
├── main.jsx           # Entry Point
└── index.css          # Tailwind Imports & Global Transitions