import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  );
};

export default Layout;
