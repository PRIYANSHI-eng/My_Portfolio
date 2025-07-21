import { Mail, Github, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContactSection() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Let’s Connect</h2>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {/* Contact Info Section */}
        <div className="space-y-6">
          {[
            {
              icon: Mail,
              title: "Email",
              detail: "chittorapriyanshi10@gmail.com",
              description: "Send me an email anytime",
            },
            {
              icon: Github,
              title: "GitHub",
              detail: "PRIYANSHI-eng",
              description: "Explore my repositories",
              link: "https://github.com/PRIYANSHI-eng?tab=repositories",
            },
            {
              icon: Linkedin,
              title: "LinkedIn",
              detail: "Priyanshi Chittora",
              description: "Connect with me professionally",
              link: "https://www.linkedin.com/in/priyanshi-chittora-aa562931a/",
            },
          ].map(({ icon: Icon, title, detail, description, link }, i) => (
            <div key={i} className="flex items-start gap-4">
              <Icon className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="font-semibold">{title}</p>
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                    {detail}
                  </a>
                ) : (
                  <p className="text-sm text-gray-600">{detail}</p>
                )}
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <form className="space-y-4">
          <Input type="text" placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Why are you reaching out?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project">Project Type</SelectItem>
              <SelectItem value="collab">Collab Request</SelectItem>
              <SelectItem value="college">College Project</SelectItem>
              <SelectItem value="feedback">Portfolio Feedback</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder="Your message..." rows={5} required />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
