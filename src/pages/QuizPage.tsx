import { Box, Button, Container, Divider, LinearProgress, Paper, Typography } from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import type { MatchingQuestion as MatchingQuestionType, MultipleQuestion, SingleQuestion, SortingQuestion as SortingQuestionType } from '../types/quiz'
import { questions, MAX_SCORE } from '../data/quizQuestions'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { submitQuiz } from '../store/quizSlice'
import SingleChoiceQuestion from '../components/quiz/SingleChoiceQuestion'
import MultipleChoiceQuestion from '../components/quiz/MultipleChoiceQuestion'
import MatchingQuestion from '../components/quiz/MatchingQuestion'
import SortingQuestion from '../components/quiz/SortingQuestion'
import QuizResult from '../components/quiz/QuizResult'

// ─── Score calculation ────────────────────────────────────────────────────────

function calcScore(state: ReturnType<typeof import('../store/store').store.getState>['quiz']) {
  let score = 0

  for (const q of questions) {
    if (q.type === 'single') {
      if (state.singleAnswers[q.id] === q.correctAnswer) score++
    } else if (q.type === 'multiple') {
      const sel = state.multipleAnswers[q.id] ?? []
      const correct = q.correctAnswers
      if (
        correct.length === sel.length &&
        correct.every(a => sel.includes(a)) &&
        sel.every(a => correct.includes(a))
      ) score++
    } else if (q.type === 'matching') {
      const answers = state.matchingAnswers[q.id] ?? {}
      const allCorrect = q.pairs.every(({ left, right }) => answers[left] === right)
      if (allCorrect) score++
    } else if (q.type === 'sorting') {
      const order = state.sortingAnswers[q.id] ?? []
      const correct = q.correctOrder.every((item, i) => order[i] === item)
      if (correct) score++
    }
  }

  return score
}

// ─── QuizPage ─────────────────────────────────────────────────────────────────

export default function QuizPage() {
  const dispatch = useAppDispatch()
  const quizState = useAppSelector(s => s.quiz)
  const submitted = quizState.submitted
  const score = quizState.score

  const handleSubmit = () => {
    const computed = calcScore(quizState)
    dispatch(submitQuiz({ score: computed }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const answeredCount =
    Object.keys(quizState.singleAnswers).length +
    Object.keys(quizState.multipleAnswers).length +
    Object.keys(quizState.matchingAnswers).length +
    Object.keys(quizState.sortingAnswers).length

  const progress = Math.min(Math.round((answeredCount / questions.length) * 100), 100)

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <AssignmentTurnedInIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
          Тест по породам собак
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
          {questions.length} вопросов трёх типов: выбор варианта, сопоставление и сортировка
        </Typography>
      </Box>

      {/* ─── Progress bar (only before submit) ──────────────────────────── */}
      {!submitted && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Прогресс заполнения
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {answeredCount} / {questions.length}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 999 }}
          />
        </Box>
      )}

      {/* ─── Result card (after submit) ──────────────────────────────────── */}
      {submitted && score !== null && (
        <Box sx={{ mb: 4 }}>
          <QuizResult score={score} />
        </Box>
      )}

      {/* ─── Questions ───────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {questions.map((q, idx) => (
          <Paper key={q.id} variant="outlined" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3 }}>
            {q.type === 'single' && (
              <SingleChoiceQuestion question={q as SingleQuestion} index={idx + 1} />
            )}
            {q.type === 'multiple' && (
              <MultipleChoiceQuestion question={q as MultipleQuestion} index={idx + 1} />
            )}
            {q.type === 'matching' && (
              <MatchingQuestion question={q as MatchingQuestionType} index={idx + 1} />
            )}
            {q.type === 'sorting' && (
              <SortingQuestion question={q as SortingQuestionType} index={idx + 1} />
            )}
          </Paper>
        ))}
      </Box>

      {/* ─── Submit button ───────────────────────────────────────────────── */}
      {!submitted && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ borderRadius: 999, px: 5, py: 1.5, fontSize: 16, fontWeight: 700 }}
            >
              Завершить тест
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1.5 }}>
            После отправки ответы нельзя изменить
          </Typography>
        </Box>
      )}

      {/* ─── Score summary at bottom (after submit) ──────────────────────── */}
      {submitted && score !== null && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Итоговый балл: <strong>{score} из {MAX_SCORE}</strong>
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{ mt: 1.5, borderRadius: 999 }}
          >
            К результатам ↑
          </Button>
        </Box>
      )}
    </Container>
  )
}
