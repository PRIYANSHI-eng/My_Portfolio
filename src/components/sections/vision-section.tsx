import { Leaf, Heart, Code, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function VisionSection() {
  return (
    <section id="vision" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
            My <span className="text-gradient">Vision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building next project to support nature and animal welfare through purposeful technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Vision Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card">
              <img
                src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=600&h=400&fit=crop"
                alt="Nature and technology harmony"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-white font-medium">
                    "Every line of code should serve a greater purpose"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                Building for Our Planet
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After seeing the positive impact of CalmWave on mental wellness, I'm ready to tackle 
                our environmental crisis. My next project will combine technology with conservation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EcoTracker will help individuals and organizations measure, reduce, and offset their 
                environmental impact while supporting wildlife conservation efforts worldwide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card border-primary/20">
                <CardContent className="p-4 text-center">
                  <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Carbon Tracking</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-accent/20">
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-sm font-medium">Wildlife Support</div>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="glow-primary w-full sm:w-auto">
              <ArrowRight className="w-5 h-5 mr-2" />
              Follow Development
            </Button>
          </motion.div>
        </div>

        {/* Future Goals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-6">
              Technology for Good Roadmap
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">Mental Wellness</h4>
                <p className="text-sm text-muted-foreground">
                  CalmWave - Supporting 1000+ users with mindfulness and mood tracking
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                  <Leaf className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold">Environmental Impact</h4>
                <p className="text-sm text-muted-foreground">
                  EcoTracker - Coming 2024 to help reduce carbon footprints globally
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold">Open Source Future</h4>
                <p className="text-sm text-muted-foreground">
                  Making all conservation tools freely available to maximize positive impact
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}