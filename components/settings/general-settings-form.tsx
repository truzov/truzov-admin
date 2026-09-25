"use client";

import React, { useState } from "react";
import { FloatingInput } from "@/components/ui/floating-input";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";

import FileUploader from "@/components/ui/file-uploader";

export default function GeneralSettingsForm() {
  const [formData, setFormData] = useState({
    fullName: "Carlota",
    email: "hello@riveup.com",
    phone: "+8801721666763",
    country: "BD",
    state: "USA",
    city: "Mississippi",
    address: "Mankato",
    zip: "96522",
    company: "Mankato",
    role: "96522",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-500/20 p-6">
      <h2 className="text-lg leading-7 font-bold text-light-primary-text mb-6">
        Personal Information
      </h2>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column - User Photo Upload */}
        <div className="w-full xl:w-[376px] xl:aspect-square shrink-0">
          <FileUploader
            title="User Photo"
            description="Allowed *.jpeg, *.jpg, *.png, *.gif"
            maxSizeText="Max size of 3.1 MB"
            className="h-full" // Make it taller to match screenshot aspect ratio if needed
          />
        </div>

        {/* Right Column - Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 w-full">
          <FloatingInput
            id="fullName"
            label="Full name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <FloatingInput
            id="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <FloatingInput
            id="phone"
            label="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <CustomFloatingSelect
            label="Country"
            options={[
              { label: "BD", value: "BD" },
              { label: "USA", value: "USA" },
              { label: "UK", value: "UK" },
            ]}
            value={formData.country}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, country: val }))
            }
          />

          <FloatingInput
            id="state"
            label="State/Region"
            value={formData.state}
            onChange={handleChange}
          />

          <FloatingInput
            id="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
          />

          <FloatingInput
            id="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <FloatingInput
            id="zip"
            label="Zip code"
            value={formData.zip}
            onChange={handleChange}
          />

          <FloatingInput
            id="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <FloatingInput
            id="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
