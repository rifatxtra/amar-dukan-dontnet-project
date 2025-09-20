import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Contact() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      await axios.post("/contact-submission", data);

      alert("Contact form submission received");

      // Reset form
      setData({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div
      className="w-[100vw] my-5 mx-auto p-6 bg-transparent rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          SEND US A MESSAGE
        </h3>
        <h6 className="text-lg text-white">
          We're here to assist you with any questions, feedback, or support you
          may need.
        </h6>
      </motion.div>

      {/* Form Section */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="first_name"
              className="block text-black font-medium mb-2"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="first_name"
              type="text"
              value={data.first_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>
            )}
          </motion.div>

          {/* Last Name */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <label
              htmlFor="last_name"
              className="block text-black font-medium mb-2"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="last_name"
              type="text"
              value={data.last_name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>
            )}
          </motion.div>
        </div>

        {/* Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label htmlFor="email" className="block text-black font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </motion.div>

          {/* Subject */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <label
              htmlFor="subject"
              className="block text-black font-medium mb-2"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              type="text"
              value={data.subject}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
            )}
          </motion.div>
        </div>

        {/* Phone */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <label htmlFor="phone" className="block text-black font-medium mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <label htmlFor="message" className="block text-black font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows="5"
            value={data.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <button
            type="submit"
            disabled={processing}
            className={`px-6 py-3 bg-black text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              processing ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {processing ? "Sending..." : "Send Message"}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
