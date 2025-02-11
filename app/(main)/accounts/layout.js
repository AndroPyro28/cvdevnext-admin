// styles
import compstyle from '@/app/components.module.css';

// assets

// components
import Sidebar from "./components/sidebar.js";
import Header from "./components/header.js";

export const metadata = {
    title: "CVConnect | Admin - Accounts",
    description: "Integrated solutions for record management.",
};

export default function AccountsLayout({ children }) {
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
