import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const variantData = Array.from({ length: 4 }).map((_, i) => ({
  skuId: `#7342${3 + i}`,
  variantId: `#V-00${i + 1}`,
  image: `/images/products/${String(i + 1).padStart(2, "0")}.png`,
  color: ["Black", "White", "Blue", "Red"][i % 4],
  size: ["S", "M", "L", "XL"][i % 4],
  visible: "1 x 80ml",
  status: i % 3 === 0 ? "Draft" : "Active",
}));

export default function ProductVariantTable() {
  return (
    <div className="border rounded-2xl border-gray-500/20">
      <h2 className="text-lg font-bold  px-4 sm:px-6 py-4">Variant</h2>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-y border-gray-500/20">
              <TableHead>SKU ID</TableHead>
              <TableHead>Variant ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variantData.map((item, index) => (
              <TableRow
                key={index}
                className="border-b last:border-0 border-gray-500/20  hover:bg-gray-50/50"
              >
                <TableCell className="whitespace-nowrap">
                  {item.skuId}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.variantId}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="size-8 rounded-lg">
                    <Image
                      src={item.image}
                      alt="variant"
                      width={32}
                      height={32}
                      className="object-contain rounded-lg"
                    />
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.color}
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.size}</TableCell>
                <TableCell className="text-sm font-medium text-light-secondary-text">
                  {item.visible}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge
                    variant={item.status === "Active" ? "success" : "warning"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
