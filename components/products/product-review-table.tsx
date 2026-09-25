"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { SearchIcon, Eye, Trash, MessageAdd, StarIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import CustomSelect, { Option } from "@/components/ui/custom-select";
import SearchInput from "../common/search-input";
import DeleteModal from "../ui/delete-modal";

// Mock Data
interface ProductReview {
  id: string; // e.g. #73423
  productName: string;
  productImage?: string; // URL or null for placeholder
  user: string;
  review: string;
  rating: number; // 0-5
  date: string;
}

const productNames = [
  "Lumberjack Jacket",
  "Denim Jeans",
  "Running Shoes",
  "Leather Belt",
  "Cotton T-Shirt",
  "Summer Hat",
];
const users = ["Jackob", "Alice", "Michael", "Sarah", "David", "Emily"];
const reviews = [
  "Good Fresh quality Product.",
  "Highly recommended!",
  "Average, could be better.",
  "Loved the material.",
  "Not exactly what I expected.",
  "Perfect fit, fast shipping.",
];

const reviewsData: ProductReview[] = Array(8)
  .fill(null)
  .map((_, i) => {
    const imageNum = (i % 24) + 1;

    return {
      id: `#${73423 + i}`,
      productName: productNames[i % productNames.length],
      productImage: `/images/products/${String(imageNum).padStart(2, "0")}.png`,
      user: users[i % users.length],
      review: reviews[i % reviews.length],
      rating: ((i * 1.5) % 5) + 1, // varied ratings
      date: `1${i + 1} Sept, 2027`,
    };
  });

const ratingOptions: Option[] = [
  { label: "Rating", value: "" },
  { label: "5 Stars", value: "5" },
  { label: "4 Stars", value: "4" },
  { label: "3 Stars", value: "3" },
  { label: "2 Stars", value: "2" },
  { label: "1 Star", value: "1" },
];

const dateOptions: Option[] = [
  { label: "Date", value: "" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function ProductReviewTable() {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<Option | null>(null);
  const [dateFilter, setDateFilter] = useState<Option | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Toggle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReviews(reviewsData.map((_, i) => `${i}`)); // Using index as key for demo
    } else {
      setSelectedReviews([]);
    }
  };

  // Toggle single selection
  const handleSelectRow = (index: string, checked: boolean) => {
    if (checked) {
      setSelectedReviews((prev) => [...prev, index]);
    } else {
      setSelectedReviews((prev) => prev.filter((id) => id !== index));
    }
  };

  const isAllSelected =
    reviewsData.length > 0 && selectedReviews.length === reviewsData.length;

  // Render Stars Helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center ">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= Math.floor(rating);
          const isHalf = !isFull && star === Math.ceil(rating);

          return (
            <StarIcon
              key={star}
              className={cn(
                "w-5 h-5",
                isFull
                  ? "text-warning"
                  : isHalf
                    ? "text-gray-500 opacity-50"
                    : "text-gray-500",
              )}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl w-full">
      <div className="p-4 sm:p-6 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl mb-4 sm:mb-6 font-bold text-light-primary-text leading-7.5">
            Product Review
          </h3>

          {/* Top Search & Filter Section Layout based on Products List */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
            {/* Search */}
            <SearchInput />

            {/* Filters */}
            <div className="flex items-center gap-3 ">
              <div className="min-w-[140px]">
                <CustomSelect
                  value={ratingFilter}
                  onChange={setRatingFilter}
                  options={ratingOptions}
                  placeholder="Rating"
                />
              </div>
              <div className="min-w-[140px]">
                <CustomSelect
                  value={dateFilter}
                  onChange={setDateFilter}
                  options={dateOptions}
                  placeholder="Date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-y border-gray-500/20">
            <TableHead className="w-[50px] pl-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviewsData
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20 hover:bg-gray-50/50"
              >
                <TableCell className="pl-6 whitespace-nowrap">
                  <Checkbox
                    checked={selectedReviews.includes(`${index}`)}
                    onCheckedChange={(checked) =>
                      handleSelectRow(`${index}`, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-normal text-sm text-light-secondary-text whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg overflow-hidden">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-sm text-light-secondary-text">
                      {item.productName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-light-secondary-text whitespace-nowrap">
                  {item.user}
                </TableCell>
                <TableCell className="max-w-[200px] truncate text-light-secondary-text">
                  {item.review}
                </TableCell>
                <TableCell>{renderStars(item.rating)}</TableCell>
                <TableCell className="text-light-secondary-text whitespace-nowrap">
                  {item.date}
                </TableCell>
                <TableCell className="pr-6 whitespace-nowrap">
                  <div className="flex items-center  gap-1">
                    <Button variant="icon" className="hover:text-primary">
                      <Eye className="size-4" />
                    </Button>
                    <Button variant="icon" className="hover:text-primary">
                      <MessageAdd className="size-4" />
                    </Button>
                    <Button
                      variant="icon"
                      className="hover:text-error"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="p-4 sm:p-6 border-t border-gray-500/20 flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(reviewsData.length / 6)}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
