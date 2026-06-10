import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { SingleQuestion } from '../../types/quiz'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSingleAnswer } from '../../store/quizSlice'

interface Props {
  question: SingleQuestion
  index: number
}

export default function SingleChoiceQuestion({ question, index }: Props) {
  const dispatch = useAppDispatch()
  const submitted = useAppSelector(s => s.quiz.submitted)
  const selected = useAppSelector(s => s.quiz.singleAnswers[question.id] ?? '')

  const getOptionColor = (option: string) => {
    if (!submitted) return 'inherit'
    if (option === question.correctAnswer) return 'success.main'
    if (option === selected && option !== question.correctAnswer) return 'error.main'
    return 'inherit'
  }

  const getOptionBg = (option: string) => {
    if (!submitted) return 'transparent'
    if (option === question.correctAnswer) return 'rgba(76,175,80,0.08)'
    if (option === selected && option !== question.correctAnswer) return 'rgba(244,67,54,0.08)'
    return 'transparent'
  }

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary' }}>
        Вопрос {index} · один правильный ответ
      </Typography>
      <Typography variant="h6" sx={{ mb: 2.5, lineHeight: 1.5 }}>
        {question.text}
      </Typography>

      <FormControl component="fieldset" disabled={submitted} sx={{ width: '100%' }}>
        <RadioGroup value={selected} onChange={e => dispatch(setSingleAnswer({ questionId: question.id, value: e.target.value }))}>
          {question.options.map(option => (
            <Box
              key={option}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 0.5,
                bgcolor: getOptionBg(option),
                border: '1px solid',
                borderColor: submitted && option === question.correctAnswer
                  ? 'success.light'
                  : submitted && option === selected
                  ? 'error.light'
                  : 'divider',
                transition: 'all 0.2s ease',
              }}
            >
              <FormControlLabel
                value={option}
                control={<Radio color="primary" />}
                label={
                  <Typography sx={{ color: getOptionColor(option), fontWeight: submitted && option === question.correctAnswer ? 700 : 400 }}>
                    {option}
                  </Typography>
                }
                sx={{ flex: 1, m: 0 }}
              />
              {submitted && option === question.correctAnswer && (
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
              )}
              {submitted && option === selected && option !== question.correctAnswer && (
                <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
              )}
            </Box>
          ))}
        </RadioGroup>
      </FormControl>

      {submitted && (
        <Typography variant="body2" sx={{ mt: 1.5, color: selected === question.correctAnswer ? 'success.main' : 'error.main', fontWeight: 600 }}>
          {selected === question.correctAnswer ? '✓ Верно!' : `✗ Неверно. Правильный ответ: ${question.correctAnswer}`}
        </Typography>
      )}
    </Box>
  )
}
