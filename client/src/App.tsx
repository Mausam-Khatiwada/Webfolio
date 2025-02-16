import React, { useState } from 'react';
import { Route, Switch, Router } from 'wouter'; // Update with Router component from wouter
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { CLIMode } from "@/components/CLIMode";

// Pages
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Skills from '@/pages/Skills';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

const BASE_URL = '/portfolio'; // Update with your actual GitHub repository name

export default function App() {
  const [mode, setMode] = useState<"ui" | "cli">("ui");
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar mode={mode} onModeChange={setMode} />
        {mode === "cli" ? (
          <CLIMode />
        ) : (
          <Router base={BASE_URL}>  {/* Set the basename to your repo */}
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/projects" component={Projects} />
              <Route path="/skills" component={Skills} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        )}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
