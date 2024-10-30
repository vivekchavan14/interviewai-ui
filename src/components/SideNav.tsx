"use client";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export const SideNav = () => {
  const navigate = useNavigate(); // Changed router to navigate for clarity
  const routes = [
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/sign-in",
      label: "Sign In",
    },
    {
      href: "/sign-up",
      label: "Sign Up",
    },
  ];

  const onNavigate = (url: string) => {
    navigate(url); // Use the navigate function directly
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href)} // Using the onNavigate function correctly
              key={route.href}
              className={cn(
                "border border-input text-foreground text-center text-base group flex p-2 w-full justify-start font-normal cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                route.href === "/sign-up" && // Use strict equality (===)
                  "bg-primary/80 text-slate-100 hover:bg-primary hover:text-slate-100"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
