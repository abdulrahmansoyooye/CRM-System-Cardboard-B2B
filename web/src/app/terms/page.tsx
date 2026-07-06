import { PageHeader } from "@/components/layout/PageHeader";

export default function TermsPage() {
  return (
    <div className="bg-background font-sans">
      <PageHeader
        title="Terms of Service"
        subtitle="Terms governing the use of our platform and services."
      />
      <div className="container mx-auto px-4 lg:px-12 py-24 max-w-4xl">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            By accessing or using this website and its services, you agree to be bound by these Terms of Service. 
            If you do not agree, please refrain from using our platform.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Services</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            CARDBOX provides industrial packaging solutions, including corrugated board manufacturing, 
            custom packaging design, and supply chain consultancy. All service agreements are subject to 
            separate commercial terms.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Intellectual Property</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            All content on this website, including text, graphics, logos, and product specifications, 
            is the property of CARDBOX and protected by applicable intellectual property laws.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Limitation of Liability</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            CARDBOX shall not be liable for any indirect, incidental, or consequential damages arising 
            from the use of our website or services, to the fullest extent permitted by law.
          </p>

          <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">5. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms shall be governed by and construed in accordance with applicable laws. Any disputes 
            shall be resolved through arbitration in accordance with standard commercial practices.
          </p>
        </div>
      </div>
    </div>
  );
}
