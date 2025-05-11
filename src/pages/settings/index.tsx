import PageLayout from "@/components/page-layout";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
  } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { Link, Outlet, useLocation } from "react-router-dom";
interface ItemPropsType {
    items:{
        title:string;
    href: string
    }[]
}

const Settings = () => {

const sidebarNavItems = [
    { title: "Account", href: PROTECTED_ROUTES.SETTINGS },
    { title: "Appearance", href: PROTECTED_ROUTES.SETTINGS_APPEARANCE },
    { title: "Billings", href: PROTECTED_ROUTES.SETTINGS_BILLING },
    ]
  return (
    <PageLayout
      title="Settings"
      subtitle="Manage your account settings and set e-mail preferences."
      addMarginTop
    >
    <Card className="border shadow-none">
      <CardContent>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12
         lg:space-y-0 pb-10 pt-2">
          <aside className="mr-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          {/* <Separator orientation="vertical" className=" !h-[500px] !border-gray-200" /> */}
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </CardContent>
    </Card>
    </PageLayout>
  )
}

function SidebarNav({ items }:ItemPropsType) {
    const {pathname} = useLocation()
    return (
        <nav
          className={
            "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      )
  }

export default Settings