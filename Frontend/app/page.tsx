import Link from "next/link";
import { ArrowRight, PieChart, LayoutDashboard, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Smart prospect pipeline",
    description:
      "Track leads, move deals through stages, and keep follow-ups on time with a clean visual workflow.",
    icon: LayoutDashboard,
  },
  {
    title: "Fast onboarding flow",
    description:
      "Welcome new clients with structured checklists, secure access, and an effortless handoff process.",
    icon: ShieldCheck,
  },
  {
    title: "Insightful analytics",
    description:
      "Spot revenue signals and team velocity with simple dashboards built for CRM teams.",
    icon: PieChart,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-slate-100">
      <div className="relative isolate overflow-hidden px-6 py-10 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,_rgba(95,161,255,0.18),_transparent_55%)] blur-3xl" />
        <div className="absolute right-0 top-20 -z-10 h-72 w-72 rounded-full bg-[#4f7bff]/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm text-slate-300 ring-1 ring-slate-700/80 backdrop-blur">
                Built for modern client teams
              </p>
              <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                  CRM and onboarding with a calm, powerful edge.
                </h1>
                <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Keep every prospect, pipeline update, and onboarding milestone in one elegant workspace—designed
                  for teams that want clarity without clutter.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Get started
                <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-white/10"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.12)] backdrop-blur-sm">
              <span className="mr-2 inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-sky-400" />
              Minimal CRM flow, onboarding faster every week.
            </div>
            <p className="text-sm text-slate-400">Scroll down to view the full product preview and responsive layout.</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
            <section className="space-y-10">
              <div className="rounded-4xl border border-slate-800/90 bg-slate-950/70 p-8 shadow-[0_0_0_1px_rgba(148,163,184,0.06)] backdrop-blur-lg">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Why KALNET CRM</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">A softer, more focused CRM experience.</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  From prospect intake to onboarding completion, the interface is designed to stay calm, fast,
                  and easy to navigate — even when your pipeline grows.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="group rounded-4xl border border-slate-800/90 bg-slate-950/70 p-6 transition hover:border-sky-500/40 hover:bg-slate-900/80"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 transition group-hover:bg-sky-500/15">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="space-y-6 rounded-4xl border border-slate-800/90 bg-slate-950/70 p-8 text-slate-300 shadow-[0_0_0_1px_rgba(148,163,184,0.06)] backdrop-blur-lg">
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/70 px-5 py-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">System insight</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Pipeline health in one view</p>
                </div>
                <div className="rounded-2xl bg-slate-800/90 px-3 py-2 text-sm text-slate-300">Live</div>
              </div>
              <div className="space-y-5">
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">New prospects added</p>
                  <p className="mt-3 text-3xl font-semibold text-white">24</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Average deal velocity</p>
                  <p className="mt-3 text-3xl font-semibold text-white">3.8 days</p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Designed for teams</p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Launch your sales cycle with fewer distractions and a cleaner workspace built around the people you serve.
                </p>
              </div>
            </aside>
          </div>

          <div id="details" className="mt-16 rounded-[2rem] border border-slate-800/90 bg-slate-950/70 p-8 shadow-[0_0_0_1px_rgba(148,163,184,0.06)] backdrop-blur-lg">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-4xl border border-slate-800/80 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Workflow</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Organize every stage</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Group prospects, assign owners, and keep the pipeline moving with minimal setup.
                </p>
              </div>
              <div className="rounded-4xl border border-slate-800/80 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Security</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Protected client data</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Secure onboarding actions and access controls ensure team visibility without extra friction.
                </p>
              </div>
              <div className="rounded-4xl border border-slate-800/80 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Growth</p>
                <h3 className="mt-4 text-xl font-semibold text-white">Insights that matter</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  See progress, pipeline velocity, and onboarding trends at a glance—no noisy dashboards needed.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-slate-800/90 bg-slate-950/80 p-6 sm:flex-row">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Quick preview</p>
                <p className="mt-3 text-2xl font-semibold text-white">Browser-first, mobile-ready design.</p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
              >
                Start your free journey
              </Link>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="#details"
              className="flex flex-col items-center gap-3 text-sm text-slate-400 transition hover:text-slate-100"
            >
              <span className="rounded-full border border-slate-600 p-3">
                <span className="block h-2.5 w-2.5 rounded-full bg-sky-400 animate-bounce" />
              </span>
              Scroll to learn more
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
