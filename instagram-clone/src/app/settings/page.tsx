import SettingsForm from "./SettingsForm";
import { updateSettings } from "./updateSettings";

export default function Settings() {
  return (
    <SettingsForm updateSettings={updateSettings} />
  )
}