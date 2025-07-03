import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import supabase from "../services/supabase";
import "./WaitList.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

function WaitList() {
  const { register, handleSubmit, reset } = useForm();
  const [count, setCount] = useState(0);

  const submitEmail = async ({ email }) => {
    const { error } = await supabase
      .from("waitlist_emails")
      .insert([{ email }])
      .select();

    if (error) {
      toast.error("Email already joined or invalid!");
    } else {
      toast.success("You're now on the waitlist 🎉");
      reset();
      totalEmailJoined();
    }
  };

  const totalEmailJoined = async () => {
    const { count, error } = await supabase
      .from("waitlist_emails")
      .select("*", { count: "exact", head: true });

    if (!error && count !== null) {
      setCount(count);
    }
  };

  useEffect(() => {
    totalEmailJoined();
  }, []);

  return (
    <>
      <Navbar />

      <div className="waitlist">
        <div>
          <h1>Unlock Your Developer Potential 🌍</h1>
          <p>
            Kodora is your AI career companion — track skills, generate your dev
            portfolio, and stand out to global recruiters.
          </p>
          <form onSubmit={handleSubmit(submitEmail)}>
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: true })}
            />
            <button type="submit" className="waitlist-btn">
              Join the Waitlist
            </button>
          </form>

          <h2>{count} developers have already joined 🚀</h2>

          <div className="products">
            <div>
              <h3>Skill Tracking</h3>
              <p>Monitor your progress and identify areas of growth.</p>
            </div>
            <div>
              <h3>AI Resume Generation</h3>
              <p>Create professional resumes tailored your dream job.</p>
            </div>
            <div>
              <h3>Interactive Portfolios</h3>
              <p>Showcase your projects with stunming customizable layouts.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WaitList;
