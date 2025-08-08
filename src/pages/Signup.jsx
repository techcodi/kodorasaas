import { useForm } from "react-hook-form";
import { useState } from "react";
import supabase from "../services/supabase";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  async function onSubmitEmail(data) {
    setIsAuth(true);
    setMessage("email");
    setError("email", { message: "" });
    setError("password", { message: "" });

    if (data.password !== data.confirmedPassword) {
      setError("confirmedPassword", {
        type: "manual",
        message: "Password do not match.",
      });
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name },
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes("already")) {
        setError("email", {
          type: "manual",
          message: "This email is already registered. Please log in instead.",
        });
      } else {
        setError("email", { type: "manual", message: error.message });
      }
    } else {
      // localStorage.setItem("pendingEmail", data.email);
      setIsAuth(false);
      toast.success("Sign up successful!");
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar />

      <div className="auth">
        <div className="auth-container">
          <h2>Create your Kodora account</h2>
          <form onSubmit={handleSubmit(onSubmitEmail)}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@gmail\.com$/,
                  message: "Only valid email addresses are allowed",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <small style={{ display: "block", width: "100%", color: "red" }}>
                {errors.email.message}
              </small>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && (
              <small
                className="input-error"
                style={{ display: "block", width: "100%", color: "red" }}
              >
                {errors.password.message}
              </small>
            )}
            <label htmlFor="confirmedPassword">Comfirm Password</label>

            <input
              type="password"
              {...register("confirmedPassword", { required: true })}
              placeholder="Confirm password"
            />
            {errors.confirmedPassword && (
              <small
                className="input-error"
                style={{ display: "block", width: "100%", color: "red" }}
              >
                {errors.confirmedPassword.message}
              </small>
            )}
            <button type="submit">
              {isAuth ? (
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Sign up"
              )}
            </button>

            <p>
              Already have an account?
              <Link to="/login" style={{ color: "#1f09ff", fontWeight: "600" }}>
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
