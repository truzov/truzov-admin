"use client";

import { useState } from "react";

import { VideoCamera, Trash } from "@/icons";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import CustomFloatingSelect from "@/components/ui/custom-floating-select";
import StatusSelect, { Option } from "@/components/ui/status-select";
import FileUploader from "@/components/ui/file-uploader";
import DatePicker from "@/components/ui/date-picker";
import Switch from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  { label: "Size", value: "size" },
  { label: "Color", value: "color" },
];

const valueOptions = [
  { label: "L", value: "l" },
  { label: "M", value: "m" },
];

const tagOptions = [
  { label: "Tags", value: "tags" },
  { label: "New Arrival", value: "new" },
  { label: "Best Seller", value: "best" },
];

const statusOptions: Option[] = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

const variantData = Array.from({ length: 2 }).map((_, i) => ({
  skuId: `#7342${3 + i}`,
  variantId: `#V-00${i + 1}`,
  image: `/images/products/${String(i + 1).padStart(2, "0")}.png`,
  color: "Black",
  size: i === 0 ? "L" : "M",
  visible: "1 x 80ml",
  status: "Active",
}));

export default function EditProductForm() {
  const [discountEnabled, setDiscountEnabled] = useState(false);
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [discountDuration, setDiscountDuration] = useState<Date | undefined>();

  // Form State
  const [category, setCategory] = useState("fashion");
  const [productType, setProductType] = useState("physical");
  const [brand, setBrand] = useState("nike");
  const [seller, setSeller] = useState("amazon");
  const [variant, setVariant] = useState("size");
  const [variantValue, setVariantValue] = useState("l");
  const [tags, setTags] = useState<string[]>(["Tags", "Tags"]);

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
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <PageHeader
              title="Edit Product"
              backHref="/products"
              className="gap-4"
            />
          </div>
          <div>
            <StatusSelect
              value={status}
              onChange={setStatus}
              options={statusOptions}
              className="min-w-[100px]"
            />
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20 mb-4 sm:mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput label="Product Name" defaultValue="Product Name" />
            <FloatingInput label="Slug" defaultValue="Slug" />

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
          <div className="mt-6">
            <FloatingTextarea
              label="Short Description"
              className="min-h-[120px]"
            />
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20 mb-4 sm:mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="flex gap-2 mt-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
              >
                <Image
                  src={`/images/products/${String(item).padStart(2, "0")}.png`}
                  width={48}
                  height={48}
                  alt="thumb"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Variant */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Variant</h2>
            <Button variant="primary-outline" size="xs">
              Add More Variant
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
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

          {/* Variant Table */}
          <div className="border border-gray-200 rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
                  <TableHead>SKU ID</TableHead>
                  <TableHead>Variant ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Visible</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variantData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-100 last:border-0 hover:bg-white"
                  >
                    <TableCell className="text-sm text-light-secondary-text">
                      {item.skuId}
                    </TableCell>
                    <TableCell className="text-sm text-light-secondary-text">
                      {item.variantId}
                    </TableCell>
                    <TableCell>
                      <div className="size-8 rounded-lg flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt="variant"
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-light-secondary-text">
                      {item.color}
                    </TableCell>
                    <TableCell className="text-sm text-light-secondary-text">
                      {item.size}
                    </TableCell>
                    <TableCell className="text-sm text-light-secondary-text">
                      {item.visible}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="icon"
                        className="h-8 w-8 text-light-primary-text hover:text-red-500"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-6 border border-gray-500/20 mb-4 sm:mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Tags</h2>
          <div className="space-y-4">
            <CustomFloatingSelect
              label="Select Tags"
              options={tagOptions}
              value=""
              onChange={(value) => handleAddTag(value)}
              placeholder="Select Tags"
              allowCustom={true}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex h-5.5 items-center text-light-secondary-text border rounded-full border-gray-500/20 gap-1 px-3 py-1 text-sm bg-transparent"
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
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-500/20">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg font-bold text-gray-900">Discount</h2>
            <Button variant="primary-outline" size="xs">
              Add New Discount
            </Button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">
                  1 Discount
                </span>
                <Switch
                  checked={discountEnabled}
                  onChange={setDiscountEnabled}
                />
              </div>
              <Button
                variant="icon"
                className="text-light-primary-text hover:text-red-500 transition-colors"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <FloatingInput label="Discount Title" />
              <FloatingInput label="Discount Price" />
              <div className="relative">
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
      </div>
      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 sm:pt-6">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="primary" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
