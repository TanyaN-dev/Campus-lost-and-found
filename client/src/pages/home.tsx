import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/modern_minimal_illustration_of_a_college_campus_lost_and_found_concept.png";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.1]"
              >
                Lost something? <br />
                <span className="text-primary">Let's find it.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground max-w-md"
              >
                The easiest way to report lost items and find found belongings on campus. Connect with your community.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link href="/report-lost">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white font-semibold h-14 px-8 rounded-full shadow-lg shadow-rose-200">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    I Lost Something
                  </Button>
                </Link>
                <Link href="/report-found">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-14 px-8 rounded-full shadow-lg shadow-emerald-200">
                    <Search className="mr-2 h-5 w-5" />
                    I Found Something
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white rotate-2 hover:rotate-0 transition-transform duration-500"
            >
              <img 
                src={heroImage} 
                alt="Campus Illustration" 
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-2/3 bg-gradient-to-tr from-secondary to-transparent rounded-tr-[100px]" />
      </section>

      {/* Quick Stats / Info */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/items">
            <div className="group p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Browse Items</h3>
              <p className="text-muted-foreground">Check the latest found items reported by students and staff.</p>
              <div className="mt-4 flex items-center text-primary font-medium text-sm">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          </Link>

          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">Report Lost</h3>
            <p className="text-muted-foreground">Create a listing for your lost item so others can contact you.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-border shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">Report Found</h3>
            <p className="text-muted-foreground">Help the community by reporting items you've found on campus.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
