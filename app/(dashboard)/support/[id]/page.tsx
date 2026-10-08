"use client";

import { useParams } from "next/navigation";
import { TicketScreen } from "@/components/panel/comms";

export default function TicketDetailsPage() {
  return <TicketScreen id={String(useParams().id)} />;
}
