
import Login from "../components/Login";
import Contact from "../components/Contact";

const Home = () => {
   return (
    <>
      <section
        id="home"
        className="h-screen flex items-center justify-center bg-red-300"
      >
        <h1 className="text-5xl font-bold text-blue-900">Welcome to Home</h1>
      </section>

      <section
        id="about"
        className="h-screen flex items-center justify-center bg-red-200"
      >
        <h1 className="text-5xl font-bold text-blue-900">About Us</h1>
      </section>
      
      
      <Login/>
       <Contact/>
      
    </>
  );
}

export default Home;