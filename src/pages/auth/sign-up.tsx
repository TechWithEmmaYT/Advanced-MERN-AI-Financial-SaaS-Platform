import SignUpForm from "./_component/signup-form"
import Logo from "@/components/logo/logo"
import dashboardImg from "../../assets/images/dashboard_.png";
import dashboardImgDark from "../../assets/images/dashboard_dark.png";
import { useTheme } from "@/context/theme-provider";


const SignUp = () => {
  const { theme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 md:pt-6">
        <div className="flex justify-center gap-2 md:justify-start">
         <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block -mt-3">
        <div className="absolute inset-0 flex flex-col items-end justify-end pt-8 pl-8">
          <div className="w-full max-w-3xl mx-0 pr-5">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hi, I'm your AI-powered personal finance app, Finora!
            </h1>
            <p className="mt-4 text-gray-600 dark:text-muted-foreground">
            Finora provides insights, monthly reports, CSV import, recurring transactions, all powered by advanced AI technology. 🚀
            </p>
          </div>
          <div className="relative max-w-3xl h-full w-full overflow-hidden mt-3">
          <img
              src={theme === "dark" ? dashboardImgDark : dashboardImg}
              alt="Dashboard"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{
                objectPosition: "left top",
                transform: "scale(1.2)",
                transformOrigin: "left top",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp