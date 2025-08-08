import { useState } from "react";
import Navbar from "../components/Navbar";
import supabase from "../services/supabase";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  async function onSubmitLogin(data) {
    setIsLogin(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("invalid login")) {
        setError("password", {
          type: "manual",
          message: "Incorrect password. Please try again.",
        });
      } else {
        setError("email", { type: "manual", message: error.message });
      }
    } else {
      setIsLogin(false);
      toast.success("✅Login successful!");
      navigate("/dashboard");
    }
  }

  return (
    <>
      <Navbar />

      <div className="auth login">
        <div className="auth-container">
          <h2>Welcome Back 👋</h2>
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small style={{ display: "block", width: "100%", color: "red" }}>
                {errors.email.message}
              </small>
            )}

            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <small
                className="input-error"
                style={{ display: "block", width: "100%", color: "red" }}
              >
                {errors.password.message}
              </small>
            )}

            <button type="submit" disabled={isLogin}>
              {isLogin ? (
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <p>
              Don't have an account?
              <Link
                to="/signup"
                style={{ color: "#1f09ff", fontWeight: "600" }}
              >
                Sign Up
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
