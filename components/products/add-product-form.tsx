"use client";

import { useState } from "react";
import { VideoCamera, Trash } from "@/icons";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";
import FileUploader from "@/components/ui/file-uploader";
import DatePicker from "@/components/ui/date-picker";
import Switch from "@/components/ui/switch";
import { toast } from "sonner";

const categoryOptions = [
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
];

const productTypeOptions = [
  { label: "Physical", value: "physical" },
  { label: "Digital", value: "digital" },
];

const brandOptions = [
  { label: "Nike", value: "nike" },
  { label: "Adidas", value: "adidas" },
];

const sellerOptions = [
  { label: "Amazon", value: "amazon" },
  { label: "Ebay", value: "ebay" },
];

const variantOptions = [
  { label: "Color", value: "color" },
  { label: "Size", value: "size" },
];

const valueOptions = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
];

const tagOptions = [
  { label: "New Arrival", value: "new" },
  { label: "Best Seller", value: "best" },
];

const statusOptions: Option[] = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

export default function AddProductForm() {
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [discountDuration, setDiscountDuration] = useState<Date | undefined>();

  // Form State
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [brand, setBrand] = useState("");
  const [seller, setSeller] = useState("");
  const [variant, setVariant] = useState("");
  const [variantValue, setVariantValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full bg-white rounded-2xl mx-auto p-4 sm:p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <PageHeader title="Create Product" backHref="/products" />
          </div>
          <div className="w-28">
            <StatusSelect
              value={status}
              onChange={setStatus}
              options={statusOptions}
            />
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-4 sm:p-6  border border-gray-500/20">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FloatingInput label="Product Name" />
            <FloatingInput label="Slug" />
            <CustomFloatingSelect
              label="Category"
              options={categoryOptions}
              value={category}
              onChange={setCategory}
            />
            <CustomFloatingSelect
              label="Product Type"
              options={productTypeOptions}
              value={productType}
              onChange={setProductType}
            />
            <CustomFloatingSelect
              label="Brand"
              options={brandOptions}
              value={brand}
              onChange={setBrand}
            />

            <CustomFloatingSelect
              label="Seller"
              options={sellerOptions}
              value={seller}
              onChange={setSeller}
            />
          </div>
          <div className="mt-4 sm:mt-6">
            <FloatingTextarea label="Short Description" className="h-32" />
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-2xl p-4 sm:p-6  border border-gray-500/20">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">
            Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FileUploader
              title="Upload Cover photo"
              maxSizeText="Max size of 3.1 MB"
            />
            <FileUploader
              title="Upload Product photo"
              maxSizeText="Max size of 3.1 MB"
            />
            <FileUploader
              title="Upload Video"
              maxSizeText="Max size of 5.1 MB"
              accept=".mp4,.mov,.avi,.wmv"
              description="Allowed *.MP4, .MOV, .AVI, .WMV"
              icon={<VideoCamera />}
            />
          </div>
        </div>

        {/* Variant */}
        <div className="bg-white rounded-2xl p-4 sm:p-6  border border-gray-500/20">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-bold text-gray-900">Variant</h2>
            <Button variant="primary-outline" size="xs">
              Add More Variant
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <CustomFloatingSelect
              label="Select Variant"
              options={variantOptions}
              value={variant}
              onChange={setVariant}
            />
            <CustomFloatingSelect
              label="Value"
              options={valueOptions}
              value={variantValue}
              onChange={setVariantValue}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-4 sm:p-6  border border-gray-500/20">
          <h2 className="text-lg font-bold text-gray-900 mb-4 sm:mb-6">Tags</h2>
          <div className="space-y-4">
            <CustomFloatingSelect
              label="Select Tags"
              options={tagOptions}
              value=""
              onChange={(value) => handleAddTag(value)}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-5.5 items-center text-light-secondary-text border rounded-full border-gray-500/20 gap-1 px-3 py-1 text-sm  bg-transparent"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-light-primary-text hover:text-error transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Discount */}
        <div className="bg-white rounded-2xl p-4 sm:p-6  border border-gray-500/20">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-bold text-gray-900">Discount</h2>
            <Button variant="primary-outline" size="xs">
              Add New Discount
            </Button>
          </div>

          <div className="bg-gray-100  rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-light-primary-text">
                  1 Discount
                </span>
                <Switch
                  checked={discountEnabled}
                  onChange={setDiscountEnabled}
                />
              </div>
              <Button
                variant="icon"
                size="xs"
                className="text-light-primary-text hover:text-error transition-colors"
              >
                <Trash className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <FloatingInput
                label="Discount Title"
                className="bg-transparent"
              />
              <FloatingInput label="Discount Price" />
              <DatePicker
                label="Discount Duration"
                date={discountDuration}
                setDate={setDiscountDuration}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 sm:pt-6">
        <Button variant="outline">Cancel</Button>
        <Button
          variant="primary"
          onClick={() => toast.success("Product saved successfully!")}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
