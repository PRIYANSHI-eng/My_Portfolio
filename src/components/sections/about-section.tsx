import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
  { name: "React.js", level: 80 },
  { name: "JavaScript (ES6+)", level: 75 },
  { name: "Node.js & Express", level: 70 },
  { name: "Python", level: 65 },
  { name: "Java", level: 60 },
  { name: "TypeScript", level: 60 }, // still developing
  { name: "MongoDB", level: 65 },
  { name: "Tailwind CSS", level: 80 },
  { name: "Git & GitHub", level: 85 },
];


const technologies = [
  "React.js",
  "Tailwind CSS",
  "JavaScript (ES6+)",
  "Node.js",
  "Express.js",
  "MongoDB",
  "OpenAI API",
  "Git & GitHub"
];


export function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile & Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center p-1">
                    <img 
                      src="/lovable-uploads/741d9cf0-35b9-4431-9725-bbdee70c1c6e.png" 
                      alt="Priyanshi Chittora - Profile Picture"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Priyanshi Chittora</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
  I'm a passionate second-year Computer Science student driven by curiosity and purpose. I love building web apps that are not only functional but also meaningful. My recent project, <strong>CalmWave</strong>, is a therapy-focused app built with React, Tailwind, and AI integration ,designed to improve mental well-being.
</p>

<p className="text-muted-foreground leading-relaxed mb-6">
  I'm deeply interested in the intersection of technology, nature, and human emotion. Whether it's experimenting with AI tools, learning new frameworks, or supporting social impact through code, I’m always exploring how tech can be a force for good. Currently, I'm honing my full-stack skills and contributing to open source whenever I can.
</p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">🎯 Problem Solver</Badge>
                      <Badge variant="secondary">🚀 Innovation Focused</Badge>
                      <Badge variant="secondary">🌟 Team Player</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Skills Progress */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full glow-primary"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
{ label: "Lines of Code", value: "Still Counting..." },
{ label: "Cups of Chai", value: "200+" },
{ label: "Projects Built", value: "1 Passion Project" },
{ label: "GitHub Commits", value: "500+" }

              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center p-4 glass-card rounded-lg"
                >
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}