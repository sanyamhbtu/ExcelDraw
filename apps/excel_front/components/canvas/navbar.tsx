"use client";

import { useState } from "react";
import {
  Square,
  Diamond,
  Circle,
  Minus,
  Pencil,
  Eraser,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tool } from "../Canvas";
type ToolName = "rectangle" | "rhombus" | "circle" | "line" | "pencil" | "eraser";

export interface DrawingToolbarProps {
  setSelectedTool: React.Dispatch<React.SetStateAction<Tool>>;
}


const tools = [
  { id: "rectangle", icon: Square, label: "Rectangle" },
  { id: "rhombus", icon: Diamond, label: "Rhombus" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "line", icon: Minus, label: "Line" },
  { id: "pencil", icon: Pencil, label: "Pencil" },
  { id: "eraser", icon: Eraser, label: "Eraser" },
] as const;
export function DrawingToolbar({setSelectedTool} :DrawingToolbarProps) {
  const [selectedToolInside, setSelectedToolInside] = useState<ToolName>("pencil");
  const [isOpen, setIsOpen] = useState(false);
  
  const toolButtonClass = (toolId: ToolName) => cn(
    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
    "bg-background/10 backdrop-blur-sm border border-border/50",
    "hover:bg-accent hover:border-accent-foreground/20",
    "focus:outline-none focus:ring-2 focus:ring-accent-foreground/20",
    {
      "ring-2 ring-accent-foreground": selectedToolInside === toolId,
      "hover:shadow-[0_0_20px_rgba(191,0,255,0.7)]": true,
      "shadow-[0_0_10px_rgba(0,242,255,0.5)]": selectedToolInside === toolId,
    }
  );


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[rgb(20,20,35)] to-[rgb(45,10,80)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={toolButtonClass("pencil" as ToolName)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            {tools.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedToolInside(id)
                  if(label === "Circle"){
                    setSelectedTool("circle")
                  }else if(label === "Eraser"){
                    setSelectedTool("eraser")
                  }else if(label === "Line"){
                    setSelectedTool("line")
                  }else if (label === "Pencil"){
                    setSelectedTool("pencil")
                  }else if (label === "Rectangle"){
                    setSelectedTool("rect")
                  }else if (label === "Rhombus"){
                    setSelectedTool("rhombus")
                  }
                }}
                className={toolButtonClass(id)}
                aria-label={label}
                title={label}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden lg:inline">{label}</span>
              </button>
            ))}
            
          </div>
          {/* Right side controls */}
          <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full border border-zinc-200 bg-red-900 flex items-center justify-center">
                 User
                </div>
          </div>

          
          
        </div>

        {/* Mobile navigation */}
        <div
          className={cn(
            "sm:hidden transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {tools.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setSelectedToolInside(id)}
                className={cn(
                  toolButtonClass(id),
                  "w-full justify-start"
                )}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            ))}
            
          </div>
          
        </div>
      </div>
    </nav>
  );
}