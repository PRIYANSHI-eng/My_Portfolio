import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "CalmWave",
    description: "A mental wellness web app offering relaxing music and guided meditation. Built to support users' emotional health with a calming, minimal interface.",
    image: "/assets/calmwave-preview.png", // Replace with your screenshot
    technologies: ["React", "Tailwind CSS", "JavaScript", "OpenAI API"],
    category: "Full-Stack",
    github: "https://github.com/kalviumcommunity/S63_Priyanshi_Capstone_CalmWave",
    live: "https://deluxe-pony-f64836.netlify.app/",
    featured: true
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal portfolio to showcase my projects, skills, and journey as a developer focused on using tech for good — especially nature and animal welfare.",
    image: "/assets/portfolio-preview.png", // Replace with real image
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    category: "Full-Stack",
    github: "https://github.com/PRIYANSHI-eng/My_Portfolio",
    live: "https://priyanshi.vercel.app",
    featured: true
  },
]
const categories = ["All", "Full-Stack", "Frontend", "Backend"]

export function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = projects.filter(project => 
    selectedCategory === "All" || project.category === selectedCategory
  )

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my portfolio of innovative projects that showcase cutting-edge technology and creative problem-solving.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              <Filter className="mr-2 h-4 w-4" />
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden glass-card hover:glow-primary">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, delay: 0.8 }}
  className="text-center mt-12"
>
  <Button variant="outline" size="lg" className="group" asChild>
    <a
      href="https://github.com/PRIYANSHI-eng?tab=repositories"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
      View More on GitHub
    </a>
  </Button>
</motion.div>

      </div>
    </section>
  )
}