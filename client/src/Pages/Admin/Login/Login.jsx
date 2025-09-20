import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../../api";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      //console.log(data)
      const res = await api.post("/Auth/login", data);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        // update default Authorization header for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        window.location.href = "/admin";
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full min-h-[60vh] bg-black rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Logo Section */}
        <div className="hidden md:w-1/2 bg-[#1c1c1c] md:flex items-center justify-center p-8">
          <img
            src="/images/web/logo.png"
            alt="Logo"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={submit} className="flex flex-col gap-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full p-3 rounded-md bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D7A0A6]"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full p-3 rounded-md bg-[#333] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D7A0A6] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D7A0A6] focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="h-5 w-5"
                />
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-[#D7A0A6] text-black p-3 rounded-md font-semibold hover:bg-[#A17342] transition-all disabled:opacity-75"
            >
              {processing ? "Logging in..." : "Login"}
            </button>
            {errors.general && (
              <p className="text-sm text-red-500 text-center">
                {errors.general}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
