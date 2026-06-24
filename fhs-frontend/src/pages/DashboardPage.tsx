import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  // Mock data
  const score = 75;
  const riskLevel = 'GOOD';
  const scoreBreakdown = [
    { name: 'Revenue', value: 35, color: '#FF3131' },
    { name: 'Stability', value: 22, color: '#081226' },
    { name: 'Compliance', value: 12, color: '#FFB800' },
    { name: 'Growth', value: 6, color: '#8B5CF6' },
  ];

  const revenueData = [
    { month: 'Jan', amount: 1800000 },
    { month: 'Feb', amount: 2100000 },
    { month: 'Mar', amount: 1950000 },
    { month: 'Apr', amount: 2300000 },
    { month: 'May', amount: 2200000 },
    { month: 'Jun', amount: 2400000 },
  ];

  const loanProducts = [
    { name: 'Personal Loan', eligible: true, amount: '₹15 Lakhs', rate: '8.5%' },
    { name: 'Business Loan', eligible: true, amount: '₹50 Lakhs', rate: '9.2%' },
    { name: 'Working Capital', eligible: true, amount: '₹30 Lakhs', rate: '8.8%' },
    { name: 'Home Loan', eligible: false, amount: '—', rate: '—' },
  ];

  const getScoreColor = (score: number) => {
    if (score < 30) return 'from-red-500 to-red-600';
    if (score < 50) return 'from-orange-500 to-orange-600';
    if (score < 70) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  const getRiskBadge = (level: string) => {
    const badges: any = {
      GOOD: { bg: 'bg-green-100', text: 'text-green-800', label: '🟢 GOOD' },
      EXCELLENT: { bg: 'bg-blue-100', text: 'text-blue-800', label: '🔵 EXCELLENT' },
      MEDIUM: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '🟡 MEDIUM' },
      HIGH: { bg: 'bg-red-100', text: 'text-red-800', label: '🔴 HIGH RISK' },
    };
    return badges[level] || badges.GOOD;
  };

  const badge = getRiskBadge(riskLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h1 className="text-white font-bold">Financial Health Score</h1>
              <p className="text-gray-400 text-sm">{user.business_name}</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Score Card */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Score */}
          <div className={`lg:col-span-1 bg-gradient-to-br ${getScoreColor(score)} rounded-2xl p-8 shadow-2xl text-white`}>
            <h2 className="text-gray-100 text-sm font-semibold mb-4">FINANCIAL HEALTH SCORE</h2>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-6xl font-bold">{score}</div>
                <div className="text-lg font-semibold text-white/90">/100</div>
              </div>
              <div className="text-8xl opacity-20">📊</div>
            </div>
            <div className={`${badge.bg} ${badge.text} px-4 py-2 rounded-lg text-center font-semibold text-sm`}>
              {badge.label}
            </div>
            <p className="text-white/80 text-sm mt-4">Last updated: Today</p>
          </div>

          {/* Score Breakdown */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-white font-bold text-lg mb-6">Score Breakdown</h2>
            <div className="space-y-4">
              {scoreBreakdown.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-white font-semibold">{item.value}/{item.name === 'Revenue' ? '40' : item.name === 'Stability' ? '30' : item.name === 'Compliance' ? '20' : '10'}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(item.value / (item.name === 'Revenue' ? 40 : item.name === 'Stability' ? 30 : item.name === 'Compliance' ? 20 : 10)) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-white font-bold text-lg mb-6">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#FF3131" strokeWidth={3} dot={{ fill: '#FF3131', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Score Components */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-white font-bold text-lg mb-6">Score Components</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={scoreBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {scoreBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loan Eligibility */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <h2 className="text-white font-bold text-lg mb-6">Loan Eligibility</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loanProducts.map((loan, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition ${
                  loan.eligible
                    ? 'bg-green-500/10 border-green-500/50 hover:bg-green-500/20'
                    : 'bg-red-500/10 border-red-500/50 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">{loan.name}</h3>
                  {loan.eligible ? <span className="text-lg">✓</span> : <span className="text-lg">✗</span>}
                </div>
                {loan.eligible ? (
                  <>
                    <p className="text-green-400 font-bold text-lg mb-2">{loan.amount}</p>
                    <p className="text-green-300 text-xs">@{loan.rate}</p>
                  </>
                ) : (
                  <p className="text-red-400 text-xs">Not eligible</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Annual Revenue', value: '₹24.0 L', icon: '💵' },
            { label: 'Monthly Avg', value: '₹2.0 L', icon: '📊' },
            { label: 'Growth', value: '+18%', icon: '📈' },
            { label: 'Stability', value: '85%', icon: '🎯' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-white/40 transition">
              <div className="text-2xl mb-2">{metric.icon}</div>
              <p className="text-gray-400 text-xs mb-1">{metric.label}</p>
              <p className="text-white font-bold text-lg">{metric.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
