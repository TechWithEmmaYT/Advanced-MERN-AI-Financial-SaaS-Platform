import { Separator } from "@/components/ui/separator"

const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>
      <Separator />
      
      <div className="w-full">
        {/* Current Plan */}
        {/* Upgrade Options */}
        <div className="mt-0">
          <h1 className="text-lg font-medium mb-2">Support Us</h1>
          <p className="text-base mb-2">
            The Billing feature is part of the{" "}
            <strong>extended version</strong> of this project. It took us{" "}
            <strong>weeks and months</strong> to design, build, and refine.
            <br />By supporting us, you unlock features like{" "}
            <strong> Free trial & Pro payment Monthly/Yearly Plan (w/ Stripe)</strong>, {" "}<strong>Setup Video</strong>, and {" "}
            <strong>Full Source Code</strong>.
           
          </p>
          <p className="text-base mb-2">
            Your support helps us keep creating{" "}
            <strong>free, advanced projects</strong> for the community.
          </p>
          <p className="text-base">
            🛠️ Get access here:{" "}
            <a
              className="text-blue-500 underline"
              href="https://techwithemma.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
             https://bitly.com/techwithemma
            </a>
          </p>
          <br />
          <br />
        </div>
       
      </div>
    </div>
  )
}

export default Billing