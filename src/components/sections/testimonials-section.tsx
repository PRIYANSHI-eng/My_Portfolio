import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    content: "Alex delivered exceptional work on our AI-powered platform. His expertise in machine learning and full-stack development helped us launch ahead of schedule. The attention to detail and innovative solutions exceeded our expectations.",
    rating: 5,
    project: "AI Analytics Platform"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, FinanceFlow",
    company: "FinanceFlow",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "Working with Alex was a game-changer for our fintech startup. His deep understanding of both frontend and backend technologies, combined with his business acumen, made our collaboration seamless and highly productive.",
    rating: 5,
    project: "Financial Dashboard"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager, EcoGreen",
    company: "EcoGreen Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "Alex transformed our vision into a beautiful, functional web application. His expertise in React and modern development practices helped us create a platform that our users love. Highly recommended!",
    rating: 5,
    project: "Sustainability Platform"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder, DataViz Pro",
    company: "DataViz Pro",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "The data visualization dashboard Alex built for us is incredibly powerful and user-friendly. His ability to translate complex requirements into elegant solutions is remarkable. Our clients are impressed!",
    rating: 5,
    project: "Data Visualization Tool"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Director, HealthTech Solutions",
    company: "HealthTech Solutions",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    content: "Alex's work on our healthcare platform was outstanding. His attention to security, performance, and user experience made all the difference. The project was delivered on time and within budget.",
    rating: 5,
    project: "Healthcare Management System"
  }
]

export function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients say about working with me.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="glass-card">
              <CardContent className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    {/* Quote Icon */}
                    <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-30" />
                    
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                      "{currentTestimonial.content}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      />
                      <div className="text-center sm:text-left">
                        <div className="font-bold text-lg">{currentTestimonial.name}</div>
                        <div className="text-primary font-medium">{currentTestimonial.role}</div>
                        <div className="text-muted-foreground">{currentTestimonial.company}</div>
                        <div className="text-sm text-accent font-medium mt-1">
                          Project: {currentTestimonial.project}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full hover:glow-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full hover:glow-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Testimonial Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-2 mt-8"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? "bg-primary scale-110" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { label: "Happy Clients", value: "50+" },
              { label: "Projects Completed", value: "100+" },
              { label: "Client Satisfaction", value: "98%" },
              { label: "Repeat Clients", value: "85%" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center glass-card p-6 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}