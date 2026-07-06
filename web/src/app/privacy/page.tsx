import { PageHeader } from "@/components/layout/PageHeader";

export default function PrivacyPage() {
  return (
    <div className="bg-background font-sans">
      <PageHeader
        title="Privacy Policy"
        subtitle="Data protection and privacy governance framework."
      />
      <div className="container mx-auto px-4 lg:px-12 py-24 max-w-4xl">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            We collect information you provide directly, such as when you submit a contact form, request a quote, 
            or apply for a position. This may include your name, email address, phone number, company name, 
            and any other details you choose to share.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Your information is used to respond to inquiries, process quote requests, evaluate job applications, 
            improve our services, and comply with legal obligations. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Data Security</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            We implement industry-standard security measures to protect your personal information from unauthorized 
            access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Your Rights</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            You have the right to access, correct, or delete your personal data held by us. You may also request 
            restriction of processing or data portability where applicable.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">5. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            For privacy-related inquiries, please contact our data protection officer through our 
            <a href="/contact" className="text-accent hover:underline mx-1">contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
