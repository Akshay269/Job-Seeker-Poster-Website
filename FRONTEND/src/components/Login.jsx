const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Login to Job Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl bg-white p-8 rounded-lg shadow">
        {/* Applicant Login */}
        <div className="space-y-4 border-r md:pr-8">
          <h2 className="text-2xl font-semibold text-blue-700">Applicant Login</h2>
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Login as Applicant
          </button>
        </div>

        {/* HR Login */}
        <div className="space-y-4 md:pl-8">
          <h2 className="text-2xl font-semibold text-green-700">HR / Job Poster Login</h2>
          <input type="email" placeholder="Work Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
            Login as HR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
