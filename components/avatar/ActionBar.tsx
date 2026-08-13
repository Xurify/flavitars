"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ShuffleIcon,
  RotateCcwIcon,
  DownloadIcon,
  Share2Icon,
  ImageIcon,
  Code2Icon,
  CopyIcon,
  ChevronDownIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface ActionBarProps {
  onRandomize: () => void;
  onReset: () => void;
  onCopyLink: () => void;
  onExport: (format: "png" | "svg") => void;
  onCopySvgUrl: () => void;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onRandomize,
  onReset,
  onCopyLink,
  onExport,
  onCopySvgUrl,
}): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/95 backdrop-blur-md border-t border-border/70">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRandomize}
          className="gap-1.5 font-medium hover:border-primary/50 hover:text-primary active:scale-95"
        >
          <ShuffleIcon className="h-3.5 w-3.5 text-primary" />
          <span>Randomize</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-1.5 font-medium text-muted-foreground hover:text-foreground"
        >
          <RotateCcwIcon className="h-3.5 w-3.5 opacity-70" />
          <span className="hidden xs:inline">Reset</span>
        </Button>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCopyLink}
          className="gap-1.5 font-medium"
        >
          <Share2Icon className="h-3.5 w-3.5 opacity-70" />
          <span>Share</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 font-semibold"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              <span>Export</span>
              <ChevronDownIcon className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Download Artwork</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onExport("png")}>
              <ImageIcon className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="font-semibold">PNG Image</span>
                <span className="text-[10px] text-muted-foreground">High resolution bitmap</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("svg")}>
              <Code2Icon className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <span className="font-semibold">Vector SVG</span>
                <span className="text-[10px] text-muted-foreground">Scalable vector graphic</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onCopySvgUrl}>
              <CopyIcon className="h-4 w-4 opacity-70" />
              <span>Copy API URL</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

