import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { PenLineIcon, LightbulbIcon, UsersIcon } from "lucide-react";
import PublicHeader from "../components/PublicHeader.jsx";
import PublicFooter from "../components/PublicFooter.jsx";

const features = [
    {
        icon: PenLineIcon,
        title: "Write Your Stories",
        description:
            "Share your thoughts, experiences, and expertise with the world. Our intuitive editor makes writing a breeze.",
    },
    {
        icon: LightbulbIcon,
        title: "Discover New Ideas",
        description:
            "Explore diverse perspectives and fresh insights from writers around the globe. Find inspiration every day.",
    },
    {
        icon: UsersIcon,
        title: "Join Our Community",
        description:
            "Connect with like-minded individuals, engage in meaningful discussions, and grow together as creators.",
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <PublicHeader />

            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Where Ideas Come to{" "}
                        <span className="text-primary">Life</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        A platform for writers, thinkers, and dreamers. Share
                        your stories, discover new perspectives, and connect
                        with a community of creators.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link to="/login">Start Writing</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link to="/login">Explore Blogs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Choose BlogSite?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PublicFooter />
        </div>
    );
}
