import { ByRole } from "@/components/panel/by-role";
import * as Ops from "@/components/panel/ops";
import { EarningsView } from "@/components/panel/finance";

export default function Page() {
  return <ByRole admin={<Ops.SellerPerformanceScreen title="Platform earnings" />} seller={<EarningsView />} />;
}

