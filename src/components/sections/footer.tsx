import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const socialLinks = [
  { icon: Github, href: "https://github.com/PRIYANSHI-eng", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/priyanshi-chittora-aa562931a/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:chittorapriyanshi10@gmail.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">Let’s Connect</h2>
          <p className="text-muted-foreground mb-6">
            Creative Full-Stack Developer & AI Innovator passionate about building exceptional digital experiences that make a difference.
          </p>

          <div className="flex justify-center gap-6 mb-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              India
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              chittorapriyanshi10@gmail.com
            </div>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            © 2025 Priyanshi Chittora. Made with ❤️ and React.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
