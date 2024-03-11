import { Switch } from "@nextui-org/react";

// eslint-disable-next-line arrow-body-style
export const SwitchMode = () => {
  return (
    <div className="bg-white p-12 rounded-lg shadow-sm h-40 flex items-center">
      <Switch defaultSelected color="secondary" classNames={{
        startContent: "bg-red-500"
      }}>
        Estado del bot
      </Switch>
    </div>
  )
}