"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import { FloatingInput } from "@/components/ui/floating-input";
import Switch from "@/components/ui/switch";
import { Trash } from "@/icons";
import DatePicker from "@/components/ui/date-picker";
import { toast } from "sonner";

const productOptions = [{ label: "Selected Product", value: "selected" }];
const brandOptions = [{ label: "Brand", value: "brand" }];
const variantOptions = [{ label: "Variant", value: "variant" }];
const hintOptions = [{ label: "Hint", value: "hint" }];
const warehouseOptions = [{ label: "Location/Warehouse", value: "warehouse" }];

export default function AddStockForm() {
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [variant, setVariant] = useState("");
  const [hint, setHint] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [hasDiscount, setHasDiscount] = useState(true);
  const [discountDate, setDiscountDate] = useState<Date | undefined>();

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <PageHeader title="Add Stock" backHref="/products/stocks" />
      </div>
      <div className="space-y-4">
        {/* Product Section */}
        <div className="border border-gray-500/20 rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-bold text-light-primary-text mb-6">
            Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Product */}
            <CustomFloatingSelect
              label="Product"
              options={productOptions}
              value={product}
              onChange={setProduct}
            />

            {/* Hint */}
            <CustomFloatingSelect
              label="Hint"
              options={hintOptions}
              value={hint}
              onChange={setHint}
            />

            {/* Brand */}
            <CustomFloatingSelect
              label="Brand"
              options={brandOptions}
              value={brand}
              onChange={setBrand}
            />

            {/* Variant */}
            <CustomFloatingSelect
              label="Variant"
              options={variantOptions}
              value={variant}
              onChange={setVariant}
            />

            {/* Current Stock Level */}
            <FloatingInput label="Current Stock Level" defaultValue="400" />

            {/* Seller */}
            <FloatingInput label="Seller" defaultValue="Samim store" />
          </div>
        </div>

        {/* Add Stock Section */}
        <div className="border border-gray-500/20 rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
            Add Stock
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 ">
            <FloatingInput label="New Quantity" />
            <FloatingInput label="Unit" />
            <FloatingInput label="Sale Price" />
            <CustomFloatingSelect
              label="Location/Warehouse"
              options={warehouseOptions}
              value={warehouse}
              onChange={setWarehouse}
            />
          </div>
        </div>

        {/* Discount Section */}
        <div className="border border-gray-500/20 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-light-primary-text">
              Discount
            </h2>
            <Button variant="primary-outline" size="xs">
              Add New Discount
            </Button>
          </div>

          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="flex items-center mb-6 justify-between">
              <div className="flex items-center gap-3 ">
                <span className="text-sm font-bold text-light-primary-text">
                  1 Discount
                </span>
                <Switch checked={hasDiscount} onChange={setHasDiscount} />
              </div>
              <Button
                variant="icon"
                className=" hover:text-error transition-colors ml-auto"
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>

            {hasDiscount && (
              <div className="flex flex-col md:flex-row items-center gap-4 ">
                <div className="w-full">
                  <FloatingInput label="Discount Title" />
                </div>
                <div className="w-full">
                  <FloatingInput label="Discount Price" />
                </div>
                <div className="w-full ">
                  <DatePicker
                    label="Discount Duration"
                    date={discountDate}
                    setDate={setDiscountDate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4 sm:pt-6">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => toast.success("Stock saved successfully!")}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
