// styles
import compstyle from '@/app/components.module.css';

// assets

// components
import Sidebar from "./components/sidebar.js";
import Header from "./components/header.js";

export const metadata = {
    title: "CVConnect | Admin - Properties",
    description: "Integrated solutions for record management.",
};

export default function PropertiesLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className={compstyle.main_container}>
            <Sidebar />
            <div className={compstyle.main_ui_container}>
                <Header />
                
                <div className=' flex justify-center items-center w-full h-[91%]'>
                  {children}
                </div>
            </div>
        </main>
      </body>
    </html>
  );
}
