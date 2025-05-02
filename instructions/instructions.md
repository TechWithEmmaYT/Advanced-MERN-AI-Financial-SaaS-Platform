# Project Overview

We are building a **Financial Manager Web App** (similar to Wave or QuickBooks) using **React + Vite**, styled with **TailwindCSS** and components from **Shadcn UI**.  
This application helps business owners or individuals track their financial activities: balance overview, revenue/income, expenses, transaction history, category analysis, and reports sent history.

### Key Technologies:
- React 18 (Vite)
- TypeScript
- TailwindCSS (multi-line format)
- Shadcn UI (Card, Table, Button, Progress, Chart etc.)
- React Router (for page navigation)

# Core Functionalities

## 1. Navbar (Header)
- **Left**: App logo (Placeholder: "Aspera" or project name)
- **Middle**: Menu Items:
  - Home (Dashboard)
  - Transactions
  - Reports
- **Right**:
  - User Avatar/Profile dropdown with **Logout** option

##2. Dashboard Page

  ## 2.1 Top Section (Summary Cards)
  Two-column layout:
  - **Left**:
    Three statistic cards:
    - **Total Balance**
    - **Total Revenue / Income**
    - **Total Expenses**

    Each card displays:
    - Main amount (formatted as currency)
    - Subtitle (e.g., "+$1,587 this month" in green for positive, red for negative)
    - Use Shadcn `Card` component with clear spacing, no shadows, and no hover effects.

  - **Right**:
    - **Account Switcher**:
      - Switch between different bank accounts (optional)
    - **Date Filter**:
      - Custom date range picker or predefined date options
    - **Settings Access**:
      - Quick link to Settings (for example: set report schedule)

  ## 2.2. Main Section
  **Two-Column Layout:**
  - **Left Side (Main Content)**:
    - **Financial Overview Chart**:
      - Line/Area chart showing trends of Total Balance, Revenue, and Expenses
    - **Transaction Table**:
      - Shows transactions: Name, Amount, Date, Category, Status

  - **Right Side (Sidebar)**:
    - **Top Categories Section**:
      - Lists major spending or income categories
      - Each shows name, amount, and a progress bar (relative share)

## 2. Transactions Page
- Full-page transaction table
- Filters:
  - Date range filter
  - Category filter
- Search bar
- Pagination

## 3. Reports Page (Updated)
- Show **Report Sent History**
  - Table Columns:
    - **Report Period** (e.g., April 1–30, 2025)
    - **Sent Date**
    - **Status** (Sent, Failed)
    - **Actions** (e.g., Resend)
- Empty State:
  > “No reports sent yet. Set up your reporting schedule to get started!”

[# Important Notes for Cursor AI]

- Focus on clean, modern UI.
- Use Tailwind multi-line format for classNames.
- Reuse Shadcn UI components.
- Reusable, modular components.
- Dark/Light mode support (optional).
- No authentication for now (use dummy user data).

[# Follow the Current File Structure]
```
src/
```

