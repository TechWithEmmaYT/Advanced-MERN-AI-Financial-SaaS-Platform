import SignInForm from "./_component/signin-form";
import Logo from "@/components/logo/logo";
//import dashboard from "../../assets/images/dashboard.png";
import dashboardImg from "../../assets/images/dashboard_.png";
import dashboardImgDark from "../../assets/images/dashboard-dark.png";
import { useTheme } from "@/context/theme-provider";

const SignIn = () => {
  const { theme } = useTheme();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 flex flex-col items-end justify-end pt-8 pl-8">
          <div className="w-full max-w-3xl mx-0 pr-5">
            <h1 className="text-3xl font-bold text-gray-900">
              Hi, I'm your AI-powered personal finance app, Finora!
            </h1>
            <p className="mt-4 text-gray-600">
              Finora helps you manage your finances with ease using advanced AI
              technology. 🚀
            </p>
          </div>
          <div className="relative max-w-3xl h-full w-full overflow-hidden mt-3">
            <img
              src={theme === "dark" ? dashboardImgDark : dashboardImg}
              alt="Dashboard"
              className="absolute inset-0 h-full w-full object-cover object-top transform scale-100 dark:brightness-75 dark:grayscale translate-x-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
