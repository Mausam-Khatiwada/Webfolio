import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { projects } = await import("@/lib/data");
      setProjects(projects);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
