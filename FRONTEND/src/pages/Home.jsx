
import Login from "../components/Login";
import Contact from "../components/Contact";
import useAuthStore from "../store/authStore";

const Home = () => {
  const { isLoggedIn, user } = useAuthStore();
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
      
      
        <section
        id="login"
        className="h-screen flex items-center justify-center bg-gray-100"
      >
        {isLoggedIn ? (
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold text-green-700">
              Welcome back, {user?.name || user?.email}
            </h2>
            <p className="text-lg">You are logged in as {user?.role}</p>
          </div>
        ) : (
          <Login />
        )}
      </section>
       <Contact/>
      
    </>
  );
}

export default Home;