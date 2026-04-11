"use client";

import React from "react";
import { FormInput, FormTextarea } from "@/components/dashboard/shared/FormLayout";
import { Globe } from "lucide-react";

interface ContactSettingsProps {
  contact: any;
  setContact: (contact: any) => void;
}

export function ContactSettings({ contact, setContact }: ContactSettingsProps) {
  return (
    <div className="premium-card p-8 space-y-8">
       <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
           <Globe className="w-6 h-6" />
        </div>
        <div>
           <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Comms & Logistics</h2>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Define global contact endpoints</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormInput
          label="Primary Comms Signal (Email)"
          type="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          placeholder="sales@cardbox.demo"
        />
        <FormInput
          label="Interface Frequency (Phone)"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          placeholder="+971 4 123 4567"
        />
        <div className="md:col-span-2">
          <FormTextarea
            label="Physical Logistics Command (Address)"
            rows={4}
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            placeholder="Industrial Area 4, Street 12..."
          />
        </div>
      </div>
    </div>
  );
}
