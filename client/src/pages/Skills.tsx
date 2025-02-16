import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { skills } = await import("@/lib/data");
      setSkills(skills);
    };
    loadData();
  }, []);

  const categories = skills ? Array.from(new Set(skills.map(skill => skill.category))) : [];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Skills
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
              <div className="space-y-4">
                {skills
                  ?.filter(skill => skill.category === category)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    >
                      <div className="flex justify-between mb-2">
                        <span>{skill.name}</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}