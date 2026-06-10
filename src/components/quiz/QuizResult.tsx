import { Box, Button, Paper, Typography, LinearProgress } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useAppDispatch } from '../../store/hooks'
import { resetQuiz } from '../../store/quizSlice'
import { MAX_SCORE } from '../../data/quizQuestions'

interface Props {
  score: number
}

export default function QuizResult({ score }: Props) {
  const dispatch = useAppDispatch()
  const pct = Math.round((score / MAX_SCORE) * 100)

  const Icon =
    pct >= 85 ? EmojiEventsIcon :
    pct >= 50 ? SentimentSatisfiedAltIcon :
    SentimentVeryDissatisfiedIcon

  const color =
    pct >= 85 ? '#4caf50' :
    pct >= 50 ? '#ff9800' :
    '#f44336'

  const message =
    pct >= 85 ? 'Отлично! Вы отлично знаете породы собак.' :
    pct >= 50 ? 'Неплохо! Есть куда расти.' :
    'Попробуйте ещё раз — и вы обязательно улучшите результат.'

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        textAlign: 'center',
        borderRadius: 3,
        borderColor: color,
        borderWidth: 2,
      }}
    >
      <Icon sx={{ fontSize: 64, color, mb: 1 }} />

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        Результат теста
      </Typography>

      <Typography variant="h2" sx={{ fontWeight: 900, color, mb: 0.5 }}>
        {score} / {MAX_SCORE}
      </Typography>

      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
        {pct}%
      </Typography>

      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 12,
          borderRadius: 999,
          mb: 3,
          bgcolor: 'grey.200',
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 999 },
        }}
      />

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        {message}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => dispatch(resetQuiz())}
          sx={{ borderRadius: 999, px: 3 }}
        >
          Пройти тест заново
        </Button>
        <Button variant="outlined" href="#/table" sx={{ borderRadius: 999, px: 3 }}>
          К таблице пород
        </Button>
      </Box>
    </Paper>
  )
}
