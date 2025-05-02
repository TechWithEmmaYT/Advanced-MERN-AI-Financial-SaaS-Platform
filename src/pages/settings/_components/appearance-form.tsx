import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export function AppearanceForm() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const handleThemeChange = (value: "light" | "dark") => {
    setTheme(value)
    // You can add logic here to actually change the theme in your application
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Theme</h4>
        <p className="text-sm text-muted-foreground">
          Select the theme for the dashboard.
        </p>
        <RadioGroup
          value={theme}
          onValueChange={handleThemeChange}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
        >
          <div>
            <Label className="flex flex-col [&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem value="light" className="sr-only" />
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <p className="!block w-full p-2 text-center font-normal">
                Light
              </p>
            </Label>
          </div>
          <div>
            <Label className="flex flex-col [&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem value="dark" className="sr-only" />
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <p className="block w-full p-2 text-center font-normal">
                Dark
              </p>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button className="mt-4">Update preferences</Button>
    </div>
  )
}