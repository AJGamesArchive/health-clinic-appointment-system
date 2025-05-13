import Footer from "./Footer";
import Header from "./Header";
import "../../index.css"

interface LayoutProps {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            <Header />
                <div className="layout">
                    {children}
                </div>
            <Footer />
        </div>
    )
};

export default Layout;