import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Code2, 
  Brain, 
  Smartphone, 
  Cloud, 
  Database, 
  Palette,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web application development using modern frameworks and best practices.",
    features: ["React/Next.js Frontend", "Node.js/Python Backend", "RESTful APIs", "Database Design"],
    price: "Starting at $3,000"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
    features: ["Custom AI Models", "Data Analysis", "Predictive Analytics", "NLP Integration"],
    price: "Starting at $5,000"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android platforms.",
    features: ["React Native", "iOS/Android Native", "App Store Deployment", "Push Notifications"],
    price: "Starting at $4,000"
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "Scalable cloud infrastructure design and deployment for optimal performance.",
    features: ["AWS/Azure Setup", "Serverless Functions", "Auto-scaling", "DevOps Integration"],
    price: "Starting at $2,500"
  },
  {
    icon: Database,
    title: "Database Optimization",
    description: "Database design, optimization, and management for high-performance applications.",
    features: ["Performance Tuning", "Migration Services", "Backup Strategies", "Security Hardening"],
    price: "Starting at $1,500"
  },
  {
    icon: Palette,
    title: "UI/UX Consulting",
    description: "User experience design and interface optimization for maximum user engagement.",
    features: ["Design Systems", "User Research", "Prototyping", "Accessibility Audit"],
    price: "Starting at $2,000"
  }
]

export function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            My <span className="text-gradient">Services</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive development services to bring your ideas to life with cutting-edge technology and expert craftsmanship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 glass-card hover:glow-primary h-full">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                    >
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features List */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="pt-4 border-t border-border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-4">
                          {service.price}
                        </div>
                        <Button 
                          className="w-full group"
                          variant="outline"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your <span className="text-gradient">Project</span>?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your requirements and create something amazing together. 
                Free consultation available for all new projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="glow-primary">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline">
                  View Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}