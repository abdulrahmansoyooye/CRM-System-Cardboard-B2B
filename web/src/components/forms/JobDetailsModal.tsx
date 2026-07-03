"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  Send,
  ChevronRight,
  FileText
} from "lucide-react";
import { submitApplication } from "@/lib/api";
import { TJob } from "@/types";

export function JobDetailsModal({ job }: { job: TJob }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    jobId: job._id,
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    resume: "", // This will be a URL or text in this simplified version
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await submitApplication({
        jobId: formData.jobId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        resumeFile: formData.resume,
        notes: [
          formData.linkedin ? `LinkedIn: ${formData.linkedin}` : null,
          formData.message ? `Cover Letter: ${formData.message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      setIsSubmitted(true);
    } catch (err) {
      setError("Protocal failure in transmission. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setIsApplying(false);
        setIsSubmitted(false);
        setError(null);
      }
    }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative z-10 shrink-0 border-2 border-primary text-primary hover:bg-primary hover:text-white font-black tracking-[0.3em] text-[10px] rounded-none h-14 px-10 transition-all uppercase group/btn"
        >
          VIEW PROTOCOL
          <ChevronRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white border-4 border-primary rounded-none p-0 overflow-hidden">
        {!isApplying ? (
          <div className="flex flex-col h-full">
            <div className="p-10 bg-secondary/30 border-b border-border">
              <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-4">RECRUITMENT PROTOCOL // 00{job._id.slice(-3)}</div>
              <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-[0.9] mb-8">
                {job.title}
              </h2>
              <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-accent" />
                  {job.department}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  {job.type}
                </span>
              </div>
            </div>
            
            <div className="p-10 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-10">
                <section>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-4">
                    <span className="w-8 h-px bg-accent" />
                    Operational Overview
                  </h4>
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-tight">
                    {job.description}
                  </p>
                </section>
                
                {job.requirements && job.requirements.length > 0 && (
                  <section>
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-4">
                      <span className="w-8 h-px bg-accent" />
                      Required Skillsets
                    </h4>
                    <ul className="space-y-4">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex gap-4 items-start text-xs font-black text-primary uppercase tracking-tight italic">
                          <span className="w-2 h-2 mt-1 bg-accent shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>

            <div className="p-10 border-t border-border flex justify-end">
              <Button 
                onClick={() => setIsApplying(true)}
                className="bg-primary text-primary-foreground h-16 px-12 font-black tracking-[0.3em] text-xs rounded-none hover:bg-accent transition-all uppercase"
              >
                INITIALIZE APPLICATION
              </Button>
            </div>
          </div>
        ) : isSubmitted ? (
          <div className="p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-10">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-3xl font-black text-primary tracking-tighter uppercase mb-6">
              APPLICATION TRANSMITTED
            </h3>
            <p className="text-muted-foreground font-bold text-sm uppercase tracking-tight max-w-xs mx-auto mb-12">
              Our recruitment neural network is processing your credentials. A human specialist will contact you if parameters align.
            </p>
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="border-2 border-primary h-14 px-10 font-black tracking-[0.2em] text-[10px] rounded-none uppercase"
            >
              CLOSE TERMINAL
            </Button>
          </div>
        ) : (
          <div className="p-10">
            <div className="mb-10 flex items-center justify-between">
              <h3 className="text-2xl font-black text-primary tracking-tighter uppercase">Personnel Requisition</h3>
              <Button 
                variant="ghost" 
                onClick={() => setIsApplying(false)}
                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent"
              >
                ← Back to Details
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Full Name *</label>
                  <Input 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    className="h-12 border-border focus-visible:ring-accent rounded-none bg-secondary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Email Address *</label>
                  <Input 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    className="h-12 border-border focus-visible:ring-accent rounded-none bg-secondary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Phone Number *</label>
                  <Input 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="h-12 border-border focus-visible:ring-accent rounded-none bg-secondary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">LinkedIn / Portfolio URL</label>
                  <Input 
                    name="linkedin" 
                    value={formData.linkedin} 
                    onChange={handleChange}
                    className="h-12 border-border focus-visible:ring-accent rounded-none bg-secondary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Resume URL / Repository Link *</label>
                <div className="relative">
                  <Input 
                    name="resume" 
                    required 
                    value={formData.resume} 
                    onChange={handleChange}
                    placeholder="https://"
                    className="h-12 border-border focus-visible:ring-accent rounded-none bg-secondary/20 pl-12"
                  />
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Operational Statement (Cover Letter)</label>
                <Textarea 
                  name="message" 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleChange}
                  className="border-border focus-visible:ring-accent rounded-none bg-secondary/20 resize-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-widest">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-primary text-primary-foreground font-black tracking-[0.3em] text-xs rounded-none hover:bg-accent transition-all group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-4 animate-spin" />
                    UPLOADING DATA...
                  </>
                ) : (
                  <>
                    SUBMIT TO HUMAN RESOURCES
                    <Send className="w-5 h-5 ml-4 group-hover:translate-x-3 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
