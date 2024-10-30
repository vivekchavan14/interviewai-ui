import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "../components/ui/sheet";
import { SideNav } from "../components/SideNav";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden pr-4">
        <Menu />
      </SheetTrigger>

      <SheetContent side="right" className="p-0 bg-secondary pt-5 w-32">
        <SheetClose className="absolute top-2 right-2">
          {/* Optional: You can provide a close icon here */}
          <span aria-hidden="true">&times;</span>
        </SheetClose>
        <SideNav />
      </SheetContent>
    </Sheet>
  );
};
