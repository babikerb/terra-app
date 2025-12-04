import { Award, Calendar, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function ProgressChart({ userId, darkMode = false }) {
  const [progressData, setProgressData] = useState([]);
  const [viewMode, setViewMode] = useState('combined'); // 'combined', 'habits', 'points'
  const [stats, setStats] = useState({ totalHabits: 0, totalPoints: 0, avgHabits: 0, trend: 0 });

  useEffect(() => {
    fetchProgressData();
  }, [userId]);

  const fetchProgressData = () => {
    const demoData = [];
    const baseHabits = 3;
    const basePoints = 35;
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variance = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
      const habits = Math.max(1, Math.floor(baseHabits * variance + (6 - i) * 0.3));
      const points = Math.floor(habits * 12 + Math.random() * 15);
      
      demoData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        habits: habits,
        points: points,
      });
    }
    
    setProgressData(demoData);

    const totalHabits = demoData.reduce((sum, day) => sum + day.habits, 0);
    const totalPoints = demoData.reduce((sum, day) => sum + day.points, 0);
    const avgHabits = (totalHabits / demoData.length).toFixed(1);
    const trend = demoData.length > 1 
      ? ((demoData[demoData.length - 1].points - demoData[0].points) / demoData[0].points * 100).toFixed(1)
      : 0;
    
    setStats({ totalHabits, totalPoints, avgHabits, trend });
  };

  const themeColor = darkMode ? '#8bc34a' : '#2d5016';
  const bgColor = darkMode ? '#2d2d2d' : '#ffffff';
  const cardBg = darkMode ? '#1a1a1a' : '#f8fdf4';
  const textColor = darkMode ? '#e0e0e0' : '#333333';
  const secondaryText = darkMode ? '#aaa' : '#666';
  const gridColor = darkMode ? '#444' : '#e8f5e9';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: bgColor,
          padding: '16px',
          border: `2px solid ${themeColor}`,
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', color: themeColor, fontSize: '13px' }}>
            {payload[0].payload.fullDate}
          </div>
          {viewMode === 'combined' || viewMode === 'habits' ? (
            <div style={{ fontSize: '14px', color: textColor, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: themeColor }}></div>
              <span><strong>{payload[0].value}</strong> habits completed</span>
            </div>
          ) : null}
          {viewMode === 'combined' || viewMode === 'points' ? (
            <div style={{ fontSize: '14px', color: textColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8bc34a' }}></div>
              <span><strong>{payload[viewMode === 'points' ? 0 : 1].value}</strong> points earned</span>
            </div>
          ) : null}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ 
      background: bgColor, 
      padding: '32px', 
      borderRadius: '20px', 
      boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(45,80,22,0.08)',
      height: '100%',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <TrendingUp size={28} color={themeColor} />
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: textColor }}>
              Your Progress
            </h2>
          </div>
          <p style={{ margin: 0, color: secondaryText, fontSize: '14px' }}>
            Last 7 days of sustainability tracking
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', background: cardBg, padding: '6px', borderRadius: '12px' }}>
          {[
            { id: 'combined', label: 'All' },
            { id: 'habits', label: 'Habits' },
            { id: 'points', label: 'Points' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                background: viewMode === mode.id ? themeColor : 'transparent',
                color: viewMode === mode.id ? 'white' : secondaryText,
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
                transition: 'all 0.2s ease',
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          background: `linear-gradient(135deg, ${themeColor} 0%, #4a7c2c 100%)`, 
          padding: '20px', 
          borderRadius: '16px',
          color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.9 }}>
            <Target size={16} />
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Habits</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.totalHabits}</div>
        </div>

        <div style={{ 
          background: cardBg, 
          padding: '20px', 
          borderRadius: '16px',
          border: `2px solid ${darkMode ? '#333' : '#e8f5e9'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: secondaryText }}>
            <Award size={16} />
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Points</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: themeColor }}>{stats.totalPoints}</div>
        </div>

        <div style={{ 
          background: cardBg, 
          padding: '20px', 
          borderRadius: '16px',
          border: `2px solid ${darkMode ? '#333' : '#e8f5e9'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: secondaryText }}>
            <Calendar size={16} />
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily Avg</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: textColor }}>{stats.avgHabits}</div>
          <div style={{ fontSize: '12px', color: secondaryText, marginTop: '4px' }}>habits/day</div>
        </div>

        <div style={{ 
          background: cardBg, 
          padding: '20px', 
          borderRadius: '16px',
          border: `2px solid ${darkMode ? '#333' : '#e8f5e9'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: secondaryText }}>
            <TrendingUp size={16} />
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trend</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: stats.trend >= 0 ? '#4caf50' : '#ff5252' }}>
            {stats.trend >= 0 ? '+' : ''}{stats.trend}%
          </div>
          <div style={{ fontSize: '12px', color: secondaryText, marginTop: '4px' }}>vs. start</div>
        </div>
      </div>

      {progressData.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '80px 20px', 
          background: cardBg,
          borderRadius: '16px',
          border: `2px dashed ${darkMode ? '#444' : '#c8e6c9'}`,
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: textColor, marginBottom: '8px' }}>
            No progress data yet
          </div>
          <div style={{ fontSize: '14px', color: secondaryText }}>
            Complete habits to see your progress chart!
          </div>
        </div>
      ) : (
        <div style={{ 
          background: cardBg, 
          padding: '24px', 
          borderRadius: '16px',
          border: `2px solid ${darkMode ? '#333' : '#e8f5e9'}`,
        }}>
          <ResponsiveContainer width="100%" height={320}>
            {viewMode === 'combined' ? (
              <LineChart data={progressData}>
                <defs>
                  <linearGradient id="colorHabits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColor} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8bc34a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8bc34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} strokeOpacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  stroke={secondaryText}
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis 
                  stroke={secondaryText}
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="habits"
                  stroke={themeColor}
                  strokeWidth={3}
                  dot={{ fill: themeColor, r: 6, strokeWidth: 2, stroke: bgColor }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: bgColor }}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#8bc34a"
                  strokeWidth={3}
                  dot={{ fill: '#8bc34a', r: 6, strokeWidth: 2, stroke: bgColor }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: bgColor }}
                />
              </LineChart>
            ) : (
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={viewMode === 'habits' ? themeColor : '#8bc34a'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={viewMode === 'habits' ? themeColor : '#8bc34a'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} strokeOpacity={0.5} />
                <XAxis 
                  dataKey="date" 
                  stroke={secondaryText}
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <YAxis 
                  stroke={secondaryText}
                  style={{ fontSize: '13px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={viewMode === 'habits' ? 'habits' : 'points'}
                  stroke={viewMode === 'habits' ? themeColor : '#8bc34a'}
                  strokeWidth={3}
                  fill="url(#areaGradient)"
                  dot={{ fill: viewMode === 'habits' ? themeColor : '#8bc34a', r: 6, strokeWidth: 2, stroke: bgColor }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: bgColor }}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ 
        marginTop: '24px', 
        padding: '20px', 
        background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}05 100%)`,
        borderRadius: '16px',
        border: `2px solid ${themeColor}30`,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>💡</div>
          <div>
            <div style={{ fontWeight: 700, color: textColor, marginBottom: '4px', fontSize: '14px' }}>
              Pro Tip
            </div>
            <div style={{ fontSize: '14px', color: secondaryText, lineHeight: '1.6' }}>
              {stats.trend >= 0 
                ? "You're on an upward trend! Keep up the great work and try to maintain this momentum."
                : "Your activity has decreased slightly. Set a daily reminder to build consistency!"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;