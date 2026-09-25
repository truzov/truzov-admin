import Image from "next/image";

export default function ProductMedia() {
  return (
    <div className="border rounded-2xl border-gray-500/20">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-500/20 py-4 px-4 sm:px-6">
        Media
      </h2>
      <div className="p-4 sm:p-6">
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="size-16 sm:size-25  rounded-lg overflow-hidden"
            >
              <Image
                src={`/images/products/${String(item).padStart(2, "0")}.png`}
                alt="Media"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
