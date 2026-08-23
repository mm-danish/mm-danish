'use client';

import * as React from 'react';
import { RefreshCw, Lock, Eye, Users, MousePointerClick, Activity, ArrowUpRight } from 'lucide-react';
import type { AnalyticsStats } from '@/lib/analytics/types';

export default function DashboardPage() {
  const [pin, setPin] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [stats, setStats] = React.useState<AnalyticsStats | null>(null);

  const fetchStats = async (currentPin: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/analytics/stats?pin=${currentPin}`);
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      const data = await res.json();
      setStats(data);
      setIsAuthenticated(true);
      sessionStorage.setItem('dashboard_pin', currentPin);
    } catch (err) {
      setError('Invalid PIN or failed to load stats');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const savedPin = sessionStorage.getItem('dashboard_pin');
    if (savedPin) {
      setPin(savedPin);
      fetchStats(savedPin);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(pin);
  };

  if (!isAuthenticated || !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md space-y-8 rounded-3xl border border-border bg-card/50 p-10 backdrop-blur-xl shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <Lock className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Admin Dashboard</h2>
            <p className="text-muted-foreground mt-2 text-sm">Enter PIN to access analytics</p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-2xl tracking-widest text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••"
                autoFocus
              />
            </div>
            {error && <p className="text-center text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !pin}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"
            >
              {loading ? 'Authenticating...' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 lg:p-24 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            Real-Time Analytics
          </h1>
          <p className="text-muted-foreground mt-2">Tracking portfolio engagement and visitor metrics</p>
        </div>
        <button
          onClick={() => fetchStats(pin)}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-border bg-card/30 px-4 py-2 text-foreground hover:bg-muted transition-all disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Views" value={stats.overview.totalViews} icon={<Eye />} />
        <KpiCard title="Unique Visitors" value={stats.overview.uniqueVisitors} icon={<Users />} />
        <KpiCard title="Views Today" value={stats.overview.todayViews} icon={<Activity />} />
        <KpiCard title="Views (Last 7d)" value={stats.overview.weekViews} icon={<MousePointerClick />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Insights Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section Health Advisor */}
          <section className="rounded-3xl border border-border bg-card/20 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Section Health & Improvement Advisor</h2>
            <div className="space-y-6">
              {stats.sections.map((sec) => (
                <div key={sec.section} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm">
                  <div className="flex-1">
                    <h3 className="font-bold capitalize text-lg text-primary">#{sec.section}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{sec.recommendation}</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="block text-muted-foreground">Reach</span>
                      <span className="font-medium text-foreground">{sec.reachRate}%</span>
                    </div>
                    <div>
                      <span className="block text-muted-foreground">Avg Dwell</span>
                      <span className="font-medium text-foreground">{(sec.avgDwellMs / 1000).toFixed(1)}s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Conversions */}
          <section className="rounded-3xl border border-border bg-card/20 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">CTA Conversions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.ctas.map((cta) => (
                <div key={cta.label} className="flex items-center justify-between p-4 rounded-xl bg-background border border-border shadow-sm">
                  <span className="font-medium text-foreground">{cta.displayName}</span>
                  <span className="text-xl font-bold text-primary">{cta.clicks}</span>
                </div>
              ))}
              {stats.ctas.length === 0 && (
                <p className="text-muted-foreground col-span-2">No CTA clicks recorded yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Top Pages */}
          <section className="rounded-3xl border border-border bg-card/20 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Top Pages</h2>
            <div className="space-y-4">
              {stats.topPages.map((page) => (
                <div key={page.path} className="flex items-center justify-between group">
                  <a href={page.path} target="_blank" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 truncate max-w-[200px] transition-colors">
                    {page.path}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <span className="text-sm font-medium text-foreground">{page.views}</span>
                </div>
              ))}
              {stats.topPages.length === 0 && <p className="text-muted-foreground text-sm">No pageviews yet.</p>}
            </div>
          </section>

          {/* Referrers */}
          <section className="rounded-3xl border border-border bg-card/20 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Top Referrers</h2>
            <div className="space-y-4">
              {stats.referrers.map((ref) => (
                <div key={ref.referrer} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground capitalize">{ref.referrer}</span>
                  <span className="text-sm font-medium text-foreground">{ref.visits}</span>
                </div>
              ))}
              {stats.referrers.length === 0 && <p className="text-muted-foreground text-sm">No referrers yet.</p>}
            </div>
          </section>
          
          {/* Devices */}
          <section className="rounded-3xl border border-border bg-card/20 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-6">Devices</h2>
            <div className="space-y-4">
              {stats.devices.map((dev) => (
                <div key={dev.device} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground capitalize">{dev.device}</span>
                  <span className="text-sm font-medium text-foreground">{dev.count}</span>
                </div>
              ))}
              {stats.devices.length === 0 && <p className="text-muted-foreground text-sm">No device data yet.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card/20 p-6 shadow-sm">
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="p-2 rounded-lg bg-muted text-foreground">{icon}</div>
        <span className="font-medium">{title}</span>
      </div>
      <div className="text-4xl font-bold text-foreground">{value.toLocaleString()}</div>
    </div>
  );
}
