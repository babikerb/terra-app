import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  FaBiking,
  FaLeaf,
  FaLightbulb,
  FaRecycle,
  FaWater,
} from "react-icons/fa";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdTipsAndUpdates,
} from "react-icons/md";

function TipsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tips = [
    {
      icon: <FaRecycle />,
      title: "Recycling Matters",
      description:
        "Recycling one aluminum can saves enough energy to power a laptop for 3 hours.",
      type: "Fact",
      color: "#4a7c2c",
      gradient: "linear-gradient(135deg, #4a7c2c 0%, #689f38 100%)",
    },
    {
      icon: <FaBiking />,
      title: "Bike to Work",
      description:
        "Biking just 10 miles per week can reduce your carbon footprint by 500 pounds annually.",
      type: "Challenge",
      color: "#2d5016",
      gradient: "linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)",
    },
    {
      icon: <FaLeaf />,
      title: "Plant-Based Meals",
      description:
        "Try Meatless Mondays! Plant-based diets can reduce your carbon footprint by up to 73%.",
      type: "Tip",
      color: "#8bc34a",
      gradient: "linear-gradient(135deg, #8bc34a 0%, #689f38 100%)",
    },
    {
      icon: <FaLightbulb />,
      title: "LED Lighting",
      description:
        "Switching to LED bulbs uses 75% less energy and lasts 25 times longer than incandescent bulbs.",
      type: "Tip",
      color: "#f9a825",
      gradient: "linear-gradient(135deg, #f9a825 0%, #fbc02d 100%)",
    },
    {
      icon: <FaWater />,
      title: "Water Conservation",
      description:
        "A 5-minute shower uses about 10 gallons of water. Cut it to 3 minutes and save 2,500 gallons yearly.",
      type: "Fact",
      color: "#0288d1",
      gradient: "linear-gradient(135deg, #0288d1 0%, #03a9f4 100%)",
    },
  ];

  const nextTip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const prevTip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + tips.length) % tips.length
      );
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const goToTip = (index) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTip();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentTip = tips[currentIndex];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: "linear-gradient(135deg, #4a7c2c 0%, #8bc34a 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <MdTipsAndUpdates style={{ fontSize: 24 }} />
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
          >
            Eco Tips & Facts
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
          >
            Learn something new every day
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: "relative", px: { xs: 0, sm: 5 } }}>
        {!isMobile && (
          <>
            <IconButton
              onClick={prevTip}
              disabled={isAnimating}
              sx={{
                position: "absolute",
                left: -10,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "background.paper",
                boxShadow: 2,
                zIndex: 2,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  boxShadow: 4,
                },
                "&:disabled": {
                  opacity: 0.3,
                },
              }}
            >
              <MdArrowBackIos style={{ marginLeft: "4px" }} />
            </IconButton>

            <IconButton
              onClick={nextTip}
              disabled={isAnimating}
              sx={{
                position: "absolute",
                right: -10,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "background.paper",
                boxShadow: 2,
                zIndex: 2,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  boxShadow: 4,
                },
                "&:disabled": {
                  opacity: 0.3,
                },
              }}
            >
              <MdArrowForwardIos />
            </IconButton>
          </>
        )}

        <Card
          key={currentIndex}
          sx={{
            height: { xs: 320, sm: 340 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
                : "linear-gradient(135deg, #f8fdf4 0%, #e8f5e9 100%)",
            borderRadius: 3,
            border: `2px solid ${currentTip.color}20`,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease-in-out",
            animation: isAnimating ? "none" : "fadeIn 0.5s ease-in",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `${currentTip.color}10`,
              filter: "blur(40px)",
            }}
          />

          <CardContent
            sx={{
              textAlign: "center",
              p: { xs: 3, sm: 4 },
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 60, sm: 80 },
                height: { xs: 60, sm: 80 },
                borderRadius: "50%",
                background: currentTip.gradient,
                color: "white",
                mb: 2.5,
                fontSize: { xs: 28, sm: 40 },
                boxShadow: `0 8px 24px ${currentTip.color}40`,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(5deg)",
                },
              }}
            >
              {currentTip.icon}
            </Box>

            <Typography
              variant="overline"
              sx={{
                background: currentTip.gradient,
                color: "white",
                px: 2.5,
                py: 0.75,
                borderRadius: 2,
                display: "inline-block",
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                letterSpacing: "1px",
                boxShadow: `0 4px 12px ${currentTip.color}30`,
              }}
            >
              {currentTip.type}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                color:
                  theme.palette.mode === "dark" ? "#8bc34a" : currentTip.color,
              }}
            >
              {currentTip.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                minHeight: { xs: "60px", sm: "70px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentTip.description}
            </Typography>
          </CardContent>
        </Card>

        {isMobile && (
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <IconButton
              onClick={prevTip}
              disabled={isAnimating}
              size="small"
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              <MdArrowBackIos style={{ marginLeft: "4px" }} />
            </IconButton>
            <IconButton
              onClick={nextTip}
              disabled={isAnimating}
              size="small"
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              <MdArrowForwardIos />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1.5 }}>
        {tips.map((tip, index) => (
          <Box
            key={index}
            onClick={() => goToTip(index)}
            sx={{
              width: currentIndex === index ? 24 : 10,
              height: 10,
              borderRadius: 5,
              background:
                currentIndex === index
                  ? tip.gradient
                  : theme.palette.action.disabled,
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow:
                currentIndex === index ? `0 2px 8px ${tip.color}40` : "none",
              "&:hover": {
                transform: "scale(1.2)",
                boxShadow: `0 2px 8px ${tip.color}30`,
              },
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}

export default TipsCarousel;
