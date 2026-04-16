import Login from "./login";
import Signup from "./signup";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#020617] to-[#0f172a] px-4">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
          alt="gym"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative flex gap-8">
        <Login />
        <Signup />
      </div>

    </div>
  );
};

export default AuthPage;