import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export function SearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setOpen(true);
    document.addEventListener("toggle-search", handleToggle);
    return () => document.removeEventListener("toggle-search", handleToggle);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              id="search"
              placeholder="Search articles..."
              className="h-9 w-full"
              autoFocus
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}