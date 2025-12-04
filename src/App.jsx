import { useEffect, useState } from "react";
import {
  FaBicycle,
  FaCheck,
  FaFire,
  FaLeaf,
  FaLightbulb,
  FaPalette,
  FaPlus,
  FaRecycle,
  FaSeedling,
  FaTimes,
  FaTrash,
  FaTrophy,
  FaWater,
} from "react-icons/fa";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TerraApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [username, setUsername] = useState("Demo User");
  const [userStats, setUserStats] = useState({
    points: 450,
    streak: 7,
    level: 5,
  });
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Use reusable water bottle",
      icon: "water",
      points: 10,
      completed: false,
    },
    {
      id: 2,
      name: "Recycle properly",
      icon: "recycle",
      points: 15,
      completed: false,
    },
    {
      id: 3,
      name: "Bike instead of drive",
      icon: "bicycle",
      points: 20,
      completed: false,
    },
    {
      id: 4,
      name: "Use LED bulbs",
      icon: "lightbulb",
      points: 10,
      completed: false,
    },
    {
      id: 5,
      name: "Compost food scraps",
      icon: "seedling",
      points: 15,
      completed: false,
    },
  ]);
  const [progressData, setProgressData] = useState([
    { date: "Mon", points: 45 },
    { date: "Tue", points: 60 },
    { date: "Wed", points: 50 },
    { date: "Thu", points: 75 },
    { date: "Fri", points: 65 },
    { date: "Sat", points: 80 },
    { date: "Sun", points: 75 },
  ]);
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "First Step",
      icon: FaSeedling,
      unlocked: true,
      desc: "Complete your first habit",
    },
    {
      id: 2,
      name: "Week Warrior",
      icon: FaFire,
      unlocked: true,
      desc: "7 day streak",
    },
    {
      id: 3,
      name: "Eco Champion",
      icon: FaTrophy,
      unlocked: false,
      desc: "Reach 500 points",
    },
    {
      id: 4,
      name: "Master Recycler",
      icon: FaRecycle,
      unlocked: false,
      desc: "Recycle 20 times",
    },
  ]);
  const [showBadgePopup, setShowBadgePopup] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [currentTip, setCurrentTip] = useState(0);
  const [themeColor, setThemeColor] = useState("#2d5016");

  const tips = [
    "💡 Use reusable shopping bags to reduce plastic waste",
    "🌱 Start composting your food scraps at home",
    "💧 Take shorter showers to conserve water",
    "🚴 Bike or walk for short trips instead of driving",
    "♻️ Recycle properly by cleaning containers first",
    "🌿 Switch to LED bulbs to save energy",
    "🛍️ Buy local produce to reduce carbon footprint",
  ];

  const iconMap = {
    water: FaWater,
    recycle: FaRecycle,
    bicycle: FaBicycle,
    lightbulb: FaLightbulb,
    seedling: FaSeedling,
  };

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((h) => {
        if (h.id === id && !h.completed) {
          const newPoints = userStats.points + h.points;
          setUserStats({
            ...userStats,
            points: newPoints,
            level: Math.floor(newPoints / 100) + 1,
          });

          if (newPoints >= 500 && !badges[2].unlocked) {
            const newBadges = [...badges];
            newBadges[2].unlocked = true;
            setBadges(newBadges);
            setShowBadgePopup(newBadges[2]);
            setTimeout(() => setShowBadgePopup(null), 3000);
          }

          return { ...h, completed: true };
        }
        return h;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: newHabitName,
          icon: "seedling",
          points: 10,
          completed: false,
        },
      ]);
      setNewHabitName("");
      setShowAddHabit(false);
    }
  };

  const levelProgress = ((userStats.points % 100) / 100) * 100;

  const bgColor = darkMode ? "#0f0f0f" : "#fafafa";
  const paperColor = darkMode ? "#1a1a1a" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#1a1a1a";
  const secondaryText = darkMode ? "#a0a0a0" : "#666666";
  const borderColor = darkMode ? "#2a2a2a" : "#e5e5e5";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: themeColor,
          color: "white",
          padding: "20px 24px",
          borderBottom: `1px solid ${darkMode ? "#333" : "#ddd"}`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/assets/images/terra-favicon.png"
                alt="Terra favicon"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                Terra
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  opacity: 0.85,
                  fontWeight: 500,
                }}
              >
                Sustainable Living Tracker
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "10px",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
            >
              {darkMode ? (
                <MdBrightness7 size={20} />
              ) : (
                <MdBrightness4 size={20} />
              )}
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "10px",
                width: "44px",
                height: "44px",
                cursor: "pointer",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
            >
              <FaPalette size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}
      >
        {/* Welcome */}
        <div
          style={{
            backgroundColor: paperColor,
            padding: "32px",
            borderRadius: "16px",
            marginBottom: "24px",
            border: `1px solid ${borderColor}`,
          }}
        >
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "32px",
              fontWeight: 700,
              color: themeColor,
              letterSpacing: "-0.5px",
            }}
          >
            Welcome back, {username}!
          </h2>
          <p
            style={{
              margin: "0 0 32px 0",
              color: secondaryText,
              fontSize: "15px",
            }}
          >
            Every small action counts towards a sustainable future 🌱
          </p>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                backgroundColor: darkMode ? "#252525" : "#f5f5f5",
                padding: "24px",
                borderRadius: "12px",
                textAlign: "center",
                border: `1px solid ${borderColor}`,
              }}
            >
              <FaTrophy
                size={28}
                color={themeColor}
                style={{ marginBottom: "12px" }}
              />
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  margin: "8px 0",
                  letterSpacing: "-1px",
                }}
              >
                {userStats.points}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: secondaryText,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Points
              </div>
            </div>
            <div
              style={{
                backgroundColor: darkMode ? "#252525" : "#f5f5f5",
                padding: "24px",
                borderRadius: "12px",
                textAlign: "center",
                border: `1px solid ${borderColor}`,
              }}
            >
              <FaLeaf
                size={28}
                color="#8bc34a"
                style={{ marginBottom: "12px" }}
              />
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  margin: "8px 0",
                  letterSpacing: "-1px",
                }}
              >
                {userStats.level}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: secondaryText,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Level
              </div>
            </div>
            <div
              style={{
                backgroundColor: darkMode ? "#252525" : "#f5f5f5",
                padding: "24px",
                borderRadius: "12px",
                textAlign: "center",
                border: `1px solid ${borderColor}`,
              }}
            >
              <FaFire
                size={28}
                color="#ff9800"
                style={{ marginBottom: "12px" }}
              />
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  margin: "8px 0",
                  letterSpacing: "-1px",
                }}
              >
                {userStats.streak}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: secondaryText,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Day Streak
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: secondaryText }}>Level Progress</span>
              <span style={{ fontWeight: 600, color: textColor }}>
                {userStats.points % 100} / 100 XP
              </span>
            </div>
            <div
              style={{
                height: "10px",
                backgroundColor: darkMode ? "#252525" : "#e5e5e5",
                borderRadius: "6px",
                overflow: "hidden",
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${levelProgress}%`,
                  backgroundColor: themeColor,
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div
          style={{
            backgroundColor: paperColor,
            padding: "28px",
            borderRadius: "16px",
            marginBottom: "24px",
            textAlign: "center",
            border: `1px solid ${borderColor}`,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: secondaryText,
              marginBottom: "16px",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            💡 Sustainability Tip
          </div>
          <div
            style={{
              fontSize: "17px",
              fontWeight: 500,
              marginBottom: "20px",
              lineHeight: "1.6",
              color: textColor,
            }}
          >
            {tips[currentTip]}
          </div>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {tips.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    currentTip === index
                      ? themeColor
                      : darkMode
                      ? "#333"
                      : "#d1d5db",
                  transition: "all 0.3s ease",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Habits */}
          <div
            style={{
              backgroundColor: paperColor,
              padding: "28px",
              borderRadius: "16px",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                Today's Habits
              </h3>
              <button
                onClick={() => setShowAddHabit(true)}
                style={{
                  backgroundColor: themeColor,
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "opacity 0.2s",
                }}
              >
                <FaPlus size={14} /> Add
              </button>
            </div>

            {showAddHabit && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "20px",
                  backgroundColor: darkMode ? "#252525" : "#f5f5f5",
                  borderRadius: "12px",
                  border: `1px solid ${borderColor}`,
                }}
              >
                <input
                  type="text"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="Enter habit name..."
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginBottom: "12px",
                    borderRadius: "10px",
                    border: `1px solid ${borderColor}`,
                    backgroundColor: paperColor,
                    color: textColor,
                    fontSize: "15px",
                    fontFamily: "inherit",
                  }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={addHabit}
                    style={{
                      flex: 1,
                      backgroundColor: "#4caf50",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Add Habit
                  </button>
                  <button
                    onClick={() => setShowAddHabit(false)}
                    style={{
                      flex: 1,
                      backgroundColor: darkMode ? "#333" : "#999",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {habits.map((habit) => {
                const Icon = iconMap[habit.icon] || FaSeedling;
                return (
                  <div
                    key={habit.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "18px",
                      backgroundColor: darkMode ? "#252525" : "#f5f5f5",
                      borderRadius: "12px",
                      border: habit.completed
                        ? `2px solid ${themeColor}`
                        : `1px solid ${borderColor}`,
                    }}
                  >
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      disabled={habit.completed}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        border: `2px solid ${
                          habit.completed
                            ? themeColor
                            : darkMode
                            ? "#444"
                            : "#ccc"
                        }`,
                        backgroundColor: habit.completed
                          ? themeColor
                          : "transparent",
                        color: "white",
                        cursor: habit.completed ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {habit.completed && <FaCheck size={14} />}
                    </button>
                    <Icon
                      size={20}
                      color={habit.completed ? themeColor : secondaryText}
                      style={{ flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 500,
                          textDecoration: habit.completed
                            ? "line-through"
                            : "none",
                          opacity: habit.completed ? 0.6 : 1,
                          fontSize: "15px",
                        }}
                      >
                        {habit.name}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: secondaryText,
                          marginTop: "2px",
                        }}
                      >
                        +{habit.points} points
                      </div>
                    </div>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#ff5252",
                        cursor: "pointer",
                        padding: "8px",
                        flexShrink: 0,
                      }}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress */}
          <div
            style={{
              backgroundColor: paperColor,
              padding: "28px",
              borderRadius: "16px",
              border: `1px solid ${borderColor}`,
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                }}
              >
                Weekly Progress
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: secondaryText }}>
                Total this week:{" "}
                <span style={{ fontWeight: 600, color: themeColor }}>
                  {progressData.reduce((sum, d) => sum + d.points, 0)} points
                </span>
              </p>
            </div>

            {/* Legend for chart */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "3px",
                    backgroundColor: themeColor,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "13px",
                    color: secondaryText,
                    fontWeight: 500,
                  }}
                >
                  Daily Points
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: themeColor,
                    border: `2px solid ${paperColor}`,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "13px",
                    color: secondaryText,
                    fontWeight: 500,
                  }}
                >
                  Peak: {Math.max(...progressData.map((d) => d.points))} pts
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={progressData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={borderColor}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke={secondaryText}
                  style={{ fontSize: "13px", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke={secondaryText}
                  style={{ fontSize: "13px", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: paperColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: "10px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    boxShadow: darkMode
                      ? "0 4px 12px rgba(0,0,0,0.3)"
                      : "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{
                    fontWeight: 600,
                    marginBottom: "4px",
                    color: textColor,
                  }}
                  itemStyle={{ color: themeColor, fontWeight: 500 }}
                  formatter={(value) => [`${value} points`, "Earned"]}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke={themeColor}
                  strokeWidth={3}
                  dot={{
                    fill: paperColor,
                    stroke: themeColor,
                    strokeWidth: 3,
                    r: 5,
                  }}
                  activeDot={{
                    fill: themeColor,
                    stroke: paperColor,
                    strokeWidth: 3,
                    r: 7,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginTop: "20px",
                paddingTop: "20px",
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: secondaryText,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  Average
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: textColor,
                  }}
                >
                  {Math.round(
                    progressData.reduce((sum, d) => sum + d.points, 0) /
                      progressData.length
                  )}
                </div>
                <div style={{ fontSize: "11px", color: secondaryText }}>
                  pts/day
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: secondaryText,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  Best Day
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: themeColor,
                  }}
                >
                  {
                    progressData[
                      progressData.reduce(
                        (max, d, i, arr) =>
                          d.points > arr[max].points ? i : max,
                        0
                      )
                    ].date
                  }
                </div>
                <div style={{ fontSize: "11px", color: secondaryText }}>
                  {Math.max(...progressData.map((d) => d.points))} pts
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: secondaryText,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  Trend
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color:
                      progressData[6].points > progressData[0].points
                        ? "#4caf50"
                        : "#ff5252",
                  }}
                >
                  {progressData[6].points > progressData[0].points ? "↑" : "↓"}{" "}
                  {Math.abs(progressData[6].points - progressData[0].points)}
                </div>
                <div style={{ fontSize: "11px", color: secondaryText }}>
                  vs start
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div
            style={{
              backgroundColor: paperColor,
              padding: "28px",
              borderRadius: "16px",
              border: `1px solid ${borderColor}`,
              gridColumn: "span 2",
            }}
          >
            <h3
              style={{
                margin: "0 0 24px 0",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Badges
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "16px",
              }}
            >
              {badges.map((badge) => {
                const BadgeIcon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    style={{
                      padding: "24px",
                      backgroundColor: darkMode ? "#252525" : "#f5f5f5",
                      borderRadius: "12px",
                      textAlign: "center",
                      opacity: badge.unlocked ? 1 : 0.4,
                      border: badge.unlocked
                        ? `2px solid ${themeColor}`
                        : `1px solid ${borderColor}`,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "16px",
                      }}
                    >
                      <BadgeIcon
                        size={40}
                        color={badge.unlocked ? "#ffd700" : secondaryText}
                      />
                    </div>
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: "6px",
                        fontSize: "15px",
                      }}
                    >
                      {badge.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: secondaryText,
                        lineHeight: "1.4",
                        marginBottom: "12px",
                        flex: 1,
                      }}
                    >
                      {badge.desc}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: badge.unlocked ? themeColor : "transparent",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        minHeight: "16px",
                      }}
                    >
                      {badge.unlocked ? "UNLOCKED ✓" : "​"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {showBadgePopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: paperColor,
            padding: "48px",
            borderRadius: "20px",
            boxShadow: darkMode
              ? "0 20px 60px rgba(0,0,0,0.5)"
              : "0 20px 60px rgba(0,0,0,0.15)",
            zIndex: 1000,
            textAlign: "center",
            border: `1px solid ${borderColor}`,
            animation: "popIn 0.3s ease",
            maxWidth: "400px",
          }}
        >
          <div style={{ fontSize: "72px", marginBottom: "20px" }}>🏆</div>
          <h2
            style={{
              margin: "0 0 12px 0",
              fontSize: "28px",
              color: themeColor,
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Badge Unlocked!
          </h2>
          <p style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: 600 }}>
            {showBadgePopup.name}
          </p>
          <p style={{ margin: 0, color: secondaryText, fontSize: "15px" }}>
            {showBadgePopup.desc}
          </p>
        </div>
      )}

      {/* Customization */}
      {showProfileModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowProfileModal(false)}
        >
          <div
            style={{
              backgroundColor: paperColor,
              padding: "36px",
              borderRadius: "20px",
              maxWidth: "450px",
              width: "100%",
              position: "relative",
              border: `1px solid ${borderColor}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: textColor,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                transition: "background-color 0.2s",
              }}
            >
              <FaTimes size={20} />
            </button>
            <h2
              style={{
                margin: "0 0 28px 0",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Customize Profile
            </h2>

            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: 600,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: secondaryText,
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: `1px solid ${borderColor}`,
                  backgroundColor: darkMode ? "#252525" : "#fafafa",
                  color: textColor,
                  fontSize: "15px",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "14px",
                  fontWeight: 600,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: secondaryText,
                }}
              >
                Theme Color
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "14px",
                }}
              >
                {[
                  "#2d5016",
                  "#1976d2",
                  "#7b1fa2",
                  "#d32f2f",
                  "#f57c00",
                  "#00796b",
                  "#5d4037",
                  "#c2185b",
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => setThemeColor(color)}
                    style={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "12px",
                      backgroundColor: color,
                      border:
                        themeColor === color
                          ? "3px solid white"
                          : `1px solid ${borderColor}`,
                      cursor: "pointer",
                      boxShadow:
                        themeColor === color
                          ? "0 4px 12px rgba(0,0,0,0.2)"
                          : "none",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              style={{
                width: "100%",
                backgroundColor: themeColor,
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "16px",
                transition: "opacity 0.2s",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        button:hover {
          opacity: 0.9;
        }
        input:focus {
          outline: none;
          border-color: ${themeColor};
        }
      `}</style>
    </div>
  );
}
