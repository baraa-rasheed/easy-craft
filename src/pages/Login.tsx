


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
         <div className="relative isolate px-6 pt-14 lg:px-8  h-full flex items-center">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#107F62] to-[#107F62] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      <div className="mx-auto max-w-2xl">
        <div className="text-center items-center flex flex-col gap-8">
          <img src={Logo} width={"120%"} alt="easy-craft" />
          <p className="text-2xl leading-8 text-slate-400">
            The easiest way to craft your dashboard: Drag, drop, and design your
            data-driven dashboard.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-6">
            <motion.div whileHover={{ rotate: "-4deg", scale: 1.4 }}>
              <div className="px-8  text-xl uppercase bg-indigo-500 p-3 rounded-md text-white">
                <button onClick={onLogin}>Start Your Journey</button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative isolate px-6 pt-14 lg:px-8  h-full flex items-center">
       <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-40 z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
            <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#50a1f3] to-[#107F62] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        </div>
      </div>
    </div>
  );
}
