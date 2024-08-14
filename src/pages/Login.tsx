import Logo from "../assets/logo.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const onLogin = () => {
    setUser({
      email: "hello@gmail.com",
      lastname: "Bar",
      username: "Alex",
      firstname: "Alex",
    });
    navigate("/");
  };

  return (
    <div className="bg-white h-screen items-center justify-center flex">
      <div className="mx-auto max-w-2xl">
        <div className="text-center items-center flex flex-col gap-8">
          <img src={Logo} width={"120%"} alt="easy-craft" />
          <p className="text-2xl leading-8 text-slate-400">
            The easiest way to craft your dashboard: Drag, drop, and design your
            data-driven dashboard.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-6">
            <motion.div whileHover={{ rotate: "-4deg", scale: 1.4 }}>
              <div className="px-8  text-xl uppercase bg-emerald-500 p-3 rounded text-white">
                <button onClick={onLogin}>Start Your Journey</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
