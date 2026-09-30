import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";

export default function Page() {
  return (
    <div className="space-y-6">
      {(["razorpay", "cashfree", "phonepe", "paypal"] as const).map((g) => (
        <SettingsForm
          key={g}
          settingKey={`payment-${g}`}
          title={g[0].toUpperCase() + g.slice(1)}
          description="Secrets are encrypted on the server and never shown again. Live checkout keeps using the server environment until this gateway is switched over."
          fields={SETTINGS.gateway}
        />
      ))}
    </div>
  );
}

