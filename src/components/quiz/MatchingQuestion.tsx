import { Box, MenuItem, Select, Typography, Chip } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { MatchingQuestion as MatchingQuestionType } from '../../types/quiz'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setMatchingAnswer } from '../../store/quizSlice'

interface Props {
  question: MatchingQuestionType
  index: number
}

export default function MatchingQuestion({ question, index }: Props) {
  const dispatch = useAppDispatch()
  const submitted = useAppSelector(s => s.quiz.submitted)
  const answers = useAppSelector(s => s.quiz.matchingAnswers[question.id] ?? {})

  const rightOptions = question.pairs.map(p => p.right)

  const getCorrectRight = (left: string) =>
    question.pairs.find(p => p.left === left)?.right ?? ''

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary' }}>
        Вопрос {index} · сопоставление
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.5 }}>
        {question.text}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', mb: 1 }}>
          Правые варианты для выбора:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {rightOptions.map(r => (
            <Chip key={r} label={r} variant="outlined" size="small" />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {question.pairs.map(({ left }) => {
          const selected = answers[left] ?? ''
          const correct = getCorrectRight(left)
          const isRight = selected === correct
          const showFeedback = submitted && selected !== ''

          return (
            <Box
              key={left}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: showFeedback ? (isRight ? 'success.light' : 'error.light') : 'divider',
                bgcolor: showFeedback ? (isRight ? 'rgba(76,175,80,0.06)' : 'rgba(244,67,54,0.06)') : 'background.paper',
                transition: 'all 0.2s ease',
              }}
            >
              <Typography sx={{ flex: '0 0 180px', fontWeight: 600, minWidth: 120 }}>
                {left}
              </Typography>

              <Box sx={{ color: 'text.secondary', fontSize: 18, flexShrink: 0 }}>→</Box>

              <Select
                size="small"
                value={selected}
                onChange={e =>
                  dispatch(setMatchingAnswer({ questionId: question.id, left, right: e.target.value }))
                }
                disabled={submitted}
                displayEmpty
                sx={{ flex: 1, minWidth: 140 }}
              >
                <MenuItem value="" disabled>
                  <Typography color="text.disabled">Выберите...</Typography>
                </MenuItem>
                {rightOptions.map(r => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>

              {showFeedback && (
                isRight
                  ? <CheckCircleIcon sx={{ color: 'success.main', flexShrink: 0 }} />
                  : <CancelIcon sx={{ color: 'error.main', flexShrink: 0 }} />
              )}
            </Box>
          )
        })}
      </Box>

      {submitted && (() => {
        const allCorrect = question.pairs.every(({ left }) => answers[left] === getCorrectRight(left))
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: allCorrect ? 'success.main' : 'error.main' }}>
              {allCorrect ? '✓ Верно!' : '✗ Есть ошибки. Правильные пары:'}
            </Typography>
            {!allCorrect && (
              <Box sx={{ mt: 1 }}>
                {question.pairs.map(({ left, right }) => (
                  <Typography key={left} variant="body2" sx={{ color: 'text.secondary' }}>
                    {left} → <strong>{right}</strong>
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        )
      })()}
    </Box>
  )
}
