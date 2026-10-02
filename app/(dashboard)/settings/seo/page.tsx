import { SettingsForm } from "@/components/panel/settings";
import { SETTINGS } from "@/components/panel/settings-fields";

export default function Page() {
  return <SettingsForm settingKey="seo" title="SEO settings" fields={SETTINGS.seo} />;
}

