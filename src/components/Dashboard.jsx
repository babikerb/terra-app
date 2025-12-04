import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTrophy } from "react-icons/fa";
import { IoTrendingUp } from "react-icons/io5";
import { supabase } from "../config/supabase";
import HabitTracker from "./HabitTracker";
import ProgressChart from "./ProgressChart";
import TipsCarousel from "./TipsCarousel";

function Dashboard({ userId }) {
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    habitsCompleted: 0,
    badges: 0,
  });

  useEffect(() => {
    fetchUserStats();
  }, [userId]);

  const fetchUserStats = async () => {
    const { data: userData } = await supabase
      .from("users")
      .select("points")
      .eq("id", userId)
      .single();

    const { data: habitsData, count } = await supabase
      .from("habits")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .eq("completed", true);

    const { count: badgesCount } = await supabase
      .from("badges")
      .select("*", { count: "exact" })
      .eq("user_id", userId);

    setUserStats({
      totalPoints: userData?.points || 0,
      habitsCompleted: count || 0,
      badges: badgesCount || 0,
    });
  };

  const StatCard = ({ icon, title, value, color }) => (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <span
            style={{
              color: color === "#FFD700" ? "#FFD700" : color,
              fontSize: 24,
            }}
          >
            {icon}
          </span>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 600, color: color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<FaTrophy />}
            title="Eco Points"
            value={userStats.totalPoints}
            color="#2d5016"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<FaCheckCircle />}
            title="Habits Completed"
            value={userStats.habitsCompleted}
            color="#4a7c2c"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            icon={<IoTrendingUp />}
            title="Badges Earned"
            value={userStats.badges}
            color="#689f38"
          />
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Habits */}
        <Grid item xs={12} lg={6}>
          <HabitTracker userId={userId} onStatsUpdate={fetchUserStats} />
        </Grid>

        {/* Progress */}
        <Grid item xs={12} lg={6}>
          <ProgressChart userId={userId} />
        </Grid>

        {/* Tips */}
        <Grid item xs={12}>
          <TipsCarousel />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
