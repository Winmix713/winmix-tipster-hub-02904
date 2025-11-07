import type { Metadata } from "next"
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"
import StatisticsCards from "@/components/dashboard/StatisticsCards"
import RecentPredictions from "@/components/dashboard/RecentPredictions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Target, TrendingUp, Cpu, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "WinMix TipsterHub | AI-Powered Football Predictions",
  description: "Advanced AI-powered football prediction platform with comprehensive analytics",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Platform Overview</h2>
        <StatisticsCards />
      </section>

      <section className="container mx-auto px-6 py-12 bg-muted/50">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Smart Predictions</CardTitle>
              <CardDescription>AI-powered match predictions with confidence scores</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/predictions">
                <Button variant="outline" className="w-full bg-transparent">
                  Try Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Deep insights into team performance and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  View Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Cpu className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>AI Models</CardTitle>
              <CardDescription>Multiple models competing for best accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/models">
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Models
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Patterns</CardTitle>
              <CardDescription>Discover historical patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/patterns">
                <Button variant="outline" className="w-full bg-transparent">
                  View Patterns
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent Predictions</h2>
        <RecentPredictions />
      </section>

      <section className="container mx-auto px-6 py-12 text-center bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users making smarter betting decisions with AI-powered predictions
        </p>
        <Link href="/predictions">
          <Button size="lg" className="px-8">
            Make Your First Prediction
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  )
}
