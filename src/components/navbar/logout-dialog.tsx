import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogContent,DialogDescription } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";

interface LogoutDialogProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const LogoutDialog = ({ isOpen, setIsOpen }: LogoutDialogProps) => {
    const [isPending, startTransition] = useTransition();
    const handleLogout = () => {
      startTransition(() => {
        setIsOpen(false);
      });
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in
              again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="text-white !bg-red-500" disabled={isPending} type="button" onClick={handleLogout}>
              {isPending && <Loader className="animate-spin" />}
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

export default LogoutDialog