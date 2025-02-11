// styles
import compstyle from '@/app/components.module.css';

// assets

// components
import Sidebar from "./components/sidebar.js";
import Header from "./components/header.js";

export const metadata = {
    title: "CVConnect | Admin - Transactions",
    description: "Integrated solutions for record management.",
    charset: "utf-8", // This sets the charset meta tag
};

export default function TransactionsLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={compstyle.main_container}>
            <Sidebar />
            <div className={compstyle.main_ui_container}>
                <Header />
                {children}
            </div>
        </main>
      </body>
    </html>
  );
}
