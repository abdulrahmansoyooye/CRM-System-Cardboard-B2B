"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function ContactForm() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <div className="bg-secondary/50 p-8 border border-border rounded-sm">

      <h3 className="text-2xl font-bold mb-8">
        INQUIRY FORM
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">

        <Input required placeholder="Company Name" />
        <Input required placeholder="Contact Person" />

        <Input type="email" required placeholder="Email Address" />
        <Input type="tel" required placeholder="Phone Number" />

        <textarea
          required
          rows={5}
          className="w-full border rounded-md p-3"
          placeholder="Message"
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
        >
          SUBMIT INQUIRY
        </Button>

      </form>
    </div>
  );
}
