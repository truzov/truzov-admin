import {
  MoneyExchangeIcon,
  MoneyCheckIcon,
  InvoiceIcon,
  BannedIcon,
  TrendUpIcon,
  TrendDownIcon,
} from "@/icons";

const overviewData = [
  {
    title: "Total Withdraws",
    value: "$52,000",
    trend: "+0.1%",
    trendUp: true,
    bgClass: "bg-[rgba(0,171,85,0.12)]", // Light green/cyan
    icon: MoneyExchangeIcon,
  },
  {
    title: "Pending Withdraws",
    value: "$1,285",
    trend: "+0.1%",
    trendUp: true,
    bgClass: "bg-[#EBEBFF]", // Light purple
    icon: MoneyCheckIcon,
  },
  {
    title: "Invoice",
    value: "40",
    trend: "+0.1%",
    trendUp: true,
    bgClass: "bg-[#EAF9DE]", // Light lime
    icon: InvoiceIcon,
  },
  {
    title: "Rejected",
    value: "$500",
    trend: "-0.1%",
    trendUp: false,
    bgClass: "bg-[#FFEBEC]", // Light red
    icon: BannedIcon,
  },
];

export default function WithdrawOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`${item.bgClass} p-4 sm:p-5 rounded-2xl  relative `}
        >
          <div>
            <h3 className="text-sm font-semibold mb-1 text-light-primary-text">
              {item.title}
            </h3>
            <span className="text-2xl font-bold text-light-primary-text">
              {item.value}
            </span>
          </div>
          <span className="inline-flex absolute bottom-5 right-5 items-center gap-1 bg-white px-2 py-1 rounded-full">
            <span
              className={`text-xs font-medium flex items-center gap-1 ${item.trendUp ? "text-primary" : "text-error"}`}
            >
              {item.trendUp ? (
                <TrendUpIcon className="w-3 h-3" />
              ) : (
                <TrendDownIcon className="w-3 h-3" />
              )}
              {item.trend}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
