import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { post } from "../api/Endpoint";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const formHandler = async (data) => {
    setLoading(true);
    try {
      const response = await post("/auth/signup", data, { withCredentials: true });

      if (response.status === 201 || response.status === 200) {
        setUser(response?.data?.user);
        toast.success(response?.data?.message || "Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="signup-form w-[90%] sm:w-[25%] bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-6">Signup</h1>

        <form onSubmit={handleSubmit(formHandler)} className="flex flex-col gap-4">

          {/* Username */}
          <div>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full border-b px-2 py-2 bg-transparent outline-none focus:border-purple-500"
              type="text"
              placeholder="Username..."
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              className="w-full border-b px-2 py-2 bg-transparent outline-none focus:border-purple-500"
              type="email"
              placeholder="Email..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...register("password", { required: "Password is required" })}
              className="w-full border-b px-2 py-2 bg-transparent outline-none focus:border-purple-500"
              type="password"
              placeholder="Password..."
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-4 py-2 rounded-lg w-full font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline text-purple-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
