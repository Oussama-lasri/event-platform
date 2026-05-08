import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";

function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-10 text-white">
        <p className="mb-2 text-sm uppercase tracking-widest text-slate-300">Event management platform</p>
        <h1 className="text-4xl font-bold">Run modern events from one workspace</h1>
        <p className="mt-3 max-w-2xl text-slate-200">
          Manage events, registrations, and team operations with a clean SaaS-style dashboard.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/events">
            <Button variant="secondary">Explore events</Button>
          </Link>
          <Link to="/register">
            <Button>Get started</Button>
          </Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {["Smart filtering", "Secure JWT auth", "Team dashboards"].map((item) => (
          <Card key={item}>
            <h3 className="font-semibold text-slate-900">{item}</h3>
            <p className="text-sm text-slate-600">Built to scale with your backend API architecture.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default Home;
