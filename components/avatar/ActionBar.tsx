import { Button } from "@/components/ui/button";
import { Shuffle, RotateCcw, Download, Link2, LucideIcon, FileImage, FileCode } from "lucide-react";
import { cn } from "@/lib/utils/strings";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ActionBarProps {
  onRandomize: () => void;
  onReset: () => void;
  onCopyLink: () => void;
  onExport: (format: "png" | "svg") => void;
}

interface ActionConfig {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onRandomize, onReset, onCopyLink, onExport }) => {
  const actions: ActionConfig[] = [
    { label: "Random", icon: Shuffle, onClick: onRandomize },
    { label: "Reset", icon: RotateCcw, onClick: onReset },
    { label: "Share", icon: Link2, onClick: onCopyLink },
  ];

  return (
    <div className="grid grid-cols-4 items-stretch border-t-2 border-border overflow-hidden">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="default"
          onClick={action.onClick}
          className={cn(
            "h-14 border-0",
            "border-r-2",
            "hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          )}
        >
          <action.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          <span className="inline-block">{action.label}</span>
        </Button>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className={cn("h-14 border-0", "hover:bg-primary hover:text-primary-foreground transition-all duration-200")}
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            <span className="font-black inline-block">Export</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 border-2 border-border rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <DropdownMenuItem
            onClick={() => onExport("png")}
            className="flex items-center gap-2 cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground px-4 py-3 font-bold uppercase text-[10px] tracking-wider transition-colors"
          >
            <FileImage className="h-4 w-4" />
            <span>Export as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onExport("svg")}
            className="flex items-center gap-2 cursor-pointer hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground px-4 py-3 font-bold uppercase text-[10px] tracking-wider transition-colors"
          >
            <FileCode className="h-4 w-4" />
            <span>Export as SVG</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
