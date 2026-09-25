"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Switch from "../ui/switch";
import { toast } from "sonner";

// Dummy Data matching the screenshot (all Google Analytics for example)
const toolsData = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "Google Analytics",
  description:
    "Delivery usually takes 2–5 business days, depending on your location and the selected shipping method.",
  isEnabled: true,
  placeholder: "Google Analytics Measurement ID",
}));

export default function MarketingToolList() {
  // Store enabled state for each card independently
  const [enabledStates, setEnabledStates] = useState<{
    [key: number]: boolean;
  }>(
    toolsData.reduce(
      (acc, tool) => ({ ...acc, [tool.id]: tool.isEnabled }),
      {},
    ),
  );

  const toggleSwitch = (id: number) => {
    setEnabledStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-2xl w-full p-4 sm:p-6">
      <h3 className="text-xl font-bold text-light-primary-text leading-7 mb-4">
        Marketing Tool
      </h3>

      <div className="space-y-4 sm:space-y-6">
        <div className="border border-gray-500/20 rounded-2xl p-4 sm:p-6">
          <h4 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
            Advanced Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {toolsData.map((tool) => (
              <div key={tool.id} className="bg-gray-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-light-primary-text text-base">
                    {tool.name}
                  </h5>
                  <Switch
                    checked={enabledStates[tool.id]}
                    onChange={() => toggleSwitch(tool.id)}
                  />
                </div>
                <p className="text-sm text-light-secondary-text sm:mb-6 mb-4 leading-5.5">
                  {tool.description}
                </p>
                <input
                  type="text"
                  placeholder={tool.placeholder}
                  className="w-full h-10 px-4 rounded-full border border-gray-500/20 bg-white text-sm placeholder:text-light-disabled-text focus:outline-none "
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => toast.success("Settings saved successfully!")}>
            Save Change
          </Button>
        </div>
      </div>
    </div>
  );
}
