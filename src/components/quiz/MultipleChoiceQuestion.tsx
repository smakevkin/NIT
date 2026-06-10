import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { MultipleQuestion } from '../../types/quiz'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleMultipleAnswer } from '../../store/quizSlice'

interface Props {
  question: MultipleQuestion
  index: number
}

export default function MultipleChoiceQuestion({ question, index }: Props) {
  const dispatch = useAppDispatch()
  const submitted = useAppSelector(s => s.quiz.submitted)
  const selected = useAppSelector(s => s.quiz.multipleAnswers[question.id] ?? [])

  const isCorrect = (option: string) => question.correctAnswers.includes(option)
  const isSelected = (option: string) => selected.includes(option)

  const getOptionBg = (option: string) => {
    if (!submitted) return 'transparent'
    if (isCorrect(option)) return 'rgba(76,175,80,0.08)'
    if (isSelected(option) && !isCorrect(option)) return 'rgba(244,67,54,0.08)'
    return 'transparent'
  }

  const getBorderColor = (option: string) => {
    if (submitted && isCorrect(option)) return 'success.light'
    if (submitted && isSelected(option) && !isCorrect(option)) return 'error.light'
    return 'divider'
  }

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary' }}>
        Вопрос {index} · несколько правильных ответов
      </Typography>
      <Typography variant="h6" sx={{ mb: 2.5, lineHeight: 1.5 }}>
        {question.text}
      </Typography>

      <Box>
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
              borderColor: getBorderColor(option),
              transition: 'all 0.2s ease',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSelected(option)}
                  onChange={() => dispatch(toggleMultipleAnswer({ questionId: question.id, value: option }))}
                  disabled={submitted}
                  color="primary"
                />
              }
              label={
                <Typography sx={{
                  color: submitted ? (isCorrect(option) ? 'success.main' : isSelected(option) ? 'error.main' : 'inherit') : 'inherit',
                  fontWeight: submitted && isCorrect(option) ? 700 : 400,
                }}>
                  {option}
                </Typography>
              }
              sx={{ flex: 1, m: 0 }}
            />
            {submitted && isCorrect(option) && (
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            )}
            {submitted && isSelected(option) && !isCorrect(option) && (
              <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
            )}
          </Box>
        ))}
      </Box>

      {submitted && (() => {
        const answeredCorrectly =
          question.correctAnswers.every(a => selected.includes(a)) &&
          selected.every(a => question.correctAnswers.includes(a))
        return (
          <Typography variant="body2" sx={{ mt: 1.5, fontWeight: 600, color: answeredCorrectly ? 'success.main' : 'error.main' }}>
            {answeredCorrectly
              ? '✓ Верно!'
              : `✗ Неверно. Правильные ответы: ${question.correctAnswers.join(', ')}`}
          </Typography>
        )
      })()}
    </Box>
  )
}
