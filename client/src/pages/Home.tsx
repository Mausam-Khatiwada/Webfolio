import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type { Project, Skill } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@/lib/schema";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { ParticleBackground } from "@/components/ParticleBackground";
import profilePic from "../assets/profile.jpg"


export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      const { projects, skills } = await import("@/lib/data");
      setProjects(projects);
      setSkills(skills);
    };
    loadData();
  }, []);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertMessage) => {
    mutation.mutate(data);
  };

  const categories = skills ? Array.from(new Set(skills.map(skill => skill.category))) : [];

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col items-center justify-center py-20 gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Picture */}
            <motion.div 
              className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <img className="rounded-3xl" src={profilePic} alt="" />
              </div>
            </motion.div>

            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 8px hsl(var(--primary))",
                }}
              >
                Mausam Khatiwada
              </motion.h1>
              <motion.h2 
                className="text-1xl md:text-3xl text-muted-foreground mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                A Developer | Tech Enthusiast
              </motion.h2>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                I build exceptional and accessible digital experiences for the web.
              </motion.p>

              <motion.div 
                className="flex justify-center gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a href="https://github.com/Mausam-Khatiwada" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6 hover:text-primary transition-colors" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6 hover:text-primary transition-colors" />
                </a>
                <a href="mailto:mausamkhatiwada98@gmail.com">
                  <Mail className="w-6 h-6 hover:text-primary transition-colors" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-secondary/10 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-primary text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px hsl(var(--primary))",
            }}
          >
            Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.link && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        <a href={project.code} target="_blank" rel="noopener noreferrer">
                            Code
                          </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-primary text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px hsl(var(--primary))",
            }}
          >
            Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-4 capitalize">{category}</h3>
                <div className="space-y-4">
                  {skills
                    ?.filter(skill => skill.category === category)
                    .map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      >
                        <div className="flex justify-between mb-2">
                          <span>{skill.name}</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="bg-primary/20" />
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/10 relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-8 text-primary text-center"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px hsl(var(--primary))",
              }}
            >
              Contact Me
            </motion.h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}