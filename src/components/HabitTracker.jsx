import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaTrophy } from 'react-icons/fa';
import { MdAdd, MdDelete } from 'react-icons/md';
import { supabase } from '../config/supabase';

function HabitTracker({ userId, onStatsUpdate }) {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [showBadgeDialog, setShowBadgeDialog] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchHabits();
  }, [userId]);

  const fetchHabits = async () => {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setHabits(data);
    }
  };

  const addHabit = async () => {
    if (!newHabitName.trim()) return;

    const { data, error } = await supabase
      .from('habits')
      .insert([
        {
          user_id: userId,
          name: newHabitName,
          points: 10,
          completed: false,
        },
      ])
      .select();

    if (data) {
      setHabits([...data, ...habits]);
      setNewHabitName('');
      showSnackbar('Habit added successfully!', 'success');
    }
  };

  const toggleHabit = async (habit) => {
    const newCompleted = !habit.completed;
    const pointChange = newCompleted ? habit.points : -habit.points;

    const { error: habitError } = await supabase
      .from('habits')
      .update({
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null,
      })
      .eq('id', habit.id);

    const { data: userData } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single();

    const newPoints = (userData?.points || 0) + pointChange;

    await supabase
      .from('users')
      .update({ points: newPoints })
      .eq('id', userId);

    if (newCompleted) {
      await checkBadgeMilestones(newPoints);
    }

    fetchHabits();
    onStatsUpdate();

    showSnackbar(
      newCompleted ? `+${habit.points} Eco Points earned!` : 'Habit unchecked',
      'success'
    );
  };

  const checkBadgeMilestones = async (points) => {
    const badges = [
      { threshold: 50, name: 'Eco Beginner', description: 'Earned 50 points!' },
      { threshold: 100, name: 'Green Warrior', description: 'Earned 100 points!' },
      { threshold: 250, name: 'Sustainability Champion', description: 'Earned 250 points!' },
      { threshold: 500, name: 'Earth Guardian', description: 'Earned 500 points!' },
    ];

    for (const badge of badges) {
      if (points >= badge.threshold) {
        const { data: existing } = await supabase
          .from('badges')
          .select('*')
          .eq('user_id', userId)
          .eq('name', badge.name)
          .single();

        if (!existing) {
          await supabase.from('badges').insert([
            {
              user_id: userId,
              name: badge.name,
              description: badge.description,
              icon: '🏆',
            },
          ]);

          setEarnedBadge(badge);
          setShowBadgeDialog(true);
          break;
        }
      }
    }
  };

  const deleteHabit = async (habitId) => {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', habitId);

    if (!error) {
      fetchHabits();
      showSnackbar('Habit deleted', 'info');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Daily Eco Habits
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a new eco-friendly habit..."
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addHabit()}
        />
        <Button
          variant="contained"
          onClick={addHabit}
          startIcon={<MdAdd />}
          sx={{ minWidth: 120 }}
        >
          Add
        </Button>
      </Box>

      <List>
        {habits.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            <Typography>No habits yet. Add your first eco-friendly habit above!</Typography>
          </Box>
        ) : (
          habits.map((habit) => (
            <ListItem
              key={habit.id}
              sx={{
                mb: 1,
                bgcolor: habit.completed ? 'success.light' : 'background.paper',
                borderRadius: 2,
                border: 1,
                borderColor: habit.completed ? 'success.main' : 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  bgcolor: habit.completed ? 'success.light' : 'action.hover',
                },
              }}
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteHabit(habit.id)}>
                  <MdDelete />
                </IconButton>
              }
            >
              <ListItemIcon>
                <IconButton onClick={() => toggleHabit(habit)}>
                  {habit.completed ? (
                    <FaCheckCircle style={{ color: '#4caf50' }} />
                  ) : (
                    <FaRegCircle />
                  )}
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={habit.name}
                secondary={
                  <Chip
                    label={`${habit.points} points`}
                    size="small"
                    color={habit.completed ? 'success' : 'default'}
                    sx={{ mt: 0.5 }}
                  />
                }
                sx={{
                  textDecoration: habit.completed ? 'line-through' : 'none',
                  opacity: habit.completed ? 0.7 : 1,
                }}
              />
            </ListItem>
          ))
        )}
      </List>

      <Dialog open={showBadgeDialog} onClose={() => setShowBadgeDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <FaTrophy style={{ fontSize: 60, color: '#FFD700', marginBottom: 8 }} />
          <Typography variant="h5">Badge Earned!</Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {earnedBadge?.name}
          </Typography>
          <Typography color="text.secondary">
            {earnedBadge?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBadgeDialog(false)} variant="contained">
            Awesome!
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default HabitTracker;