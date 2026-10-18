import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoUrl from "@/assets/techthrust-logo.png";

export default function Footer() {
  return (
    <footer className="relative border-t border-glass-border bg-background/60 mt-20">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-40" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Tech Thrust" className="h-20 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">Engineering Digital Growth for Global Brands.</p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-cyan" /> Ajman Free Zone, UAE</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan" /> info@tech-thrust.com</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-cyan" /> +971 585203369</p>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Web Development</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Mobile App Development</Link></li>
            <li><Link to="/services" className="hover:text-foreground">SEO & SEM</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Google Ads</Link></li>
            <li><Link to="/services" className="hover:text-foreground">META Campaigns</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Startup-as-a-Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">AI Products</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/ai-products" className="hover:text-foreground">AI Voice Calling Agents</Link></li>
            <li><Link to="/ai-products" className="hover:text-foreground">Outbound Sales Automation</Link></li>
            <li><Link to="/ai-products" className="hover:text-foreground">Inbound Call Handling</Link></li>
            <li><Link to="/ai-products" className="hover:text-foreground">AI Business Automation</Link></li>
            <li><Link to="/ai-products" className="hover:text-foreground">CRM Automation</Link></li>
            <li><Link to="/ai-products" className="hover:text-foreground">Custom AI Workflows</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><a href="https://velynora.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">VELYNORA</a></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.linkedin.com/company/111976846/admin/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full glass hover:border-cyan/40 hover:text-cyan transition"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <p>© 2026 Tech Thrust Digital Solutions FZC. All Rights Reserved.</p>
          <p>Registered in Ajman Free Zone, UAE</p>
        </div>
      </div>
    </footer>
  );
}
