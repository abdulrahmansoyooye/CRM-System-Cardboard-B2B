"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input placeholder="Company Name" />
      <Input placeholder="Contact Person" />

      <Button type="submit">
        Submit Inquiry
      </Button>
    </form>
  );
}
