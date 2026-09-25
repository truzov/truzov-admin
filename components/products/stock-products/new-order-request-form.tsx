"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import { FloatingInput } from "@/components/ui/floating-input";
import { toast } from "sonner";

const productOptions = [{ label: "Product", value: "product" }];
const categoryOptions = [{ label: "Category", value: "category" }];
const brandOptions = [{ label: "Brand", value: "brand" }];
const variantOptions = [{ label: "Variant", value: "variant" }];
const orderTypeOptions = [{ label: "Order Type", value: "type" }];
const priorityOptions = [{ label: "Priority", value: "priority" }];
const supplierOptions = [{ label: "Supplier", value: "supplier" }];
const warehouseOptions = [{ label: "Location/Warehouse", value: "warehouse" }];

export default function NewOrderRequestForm() {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [variant, setVariant] = useState("");
  const [orderType, setOrderType] = useState("");
  const [priority, setPriority] = useState("");
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4  sm:mb-6">
        <PageHeader title="New Order Request" backHref="/products/stocks" />
      </div>

      <div className="space-y-4">
        {/* Product Section */}
        <div className="border border-gray-500/20 p-4 sm:p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
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

            {/* Category */}
            <CustomFloatingSelect
              label="Category"
              options={categoryOptions}
              value={category}
              onChange={setCategory}
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
        <div className="border border-gray-500/20 p-4 sm:p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-light-primary-text mb-4 sm:mb-6">
            Add Stock
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Quantity" />
            <FloatingInput label="Unit" />

            <CustomFloatingSelect
              label="Order Type"
              options={orderTypeOptions}
              value={orderType}
              onChange={setOrderType}
            />

            <CustomFloatingSelect
              label="Priority"
              options={priorityOptions}
              value={priority}
              onChange={setPriority}
            />

            <CustomFloatingSelect
              label="Supplier"
              options={supplierOptions}
              value={supplier}
              onChange={setSupplier}
            />

            <CustomFloatingSelect
              label="Location/Warehouse"
              options={warehouseOptions}
              value={warehouse}
              onChange={setWarehouse}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => toast.success("Order request saved successfully!")}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
