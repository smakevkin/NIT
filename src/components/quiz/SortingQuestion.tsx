import { useEffect, useRef, useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { SortingQuestion as SortingQuestionType } from '../../types/quiz'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSortingAnswer } from '../../store/quizSlice'

interface Props {
  question: SortingQuestionType
  index: number
}

export default function SortingQuestion({ question, index }: Props) {
  const dispatch = useAppDispatch()
  const submitted = useAppSelector(s => s.quiz.submitted)
  const savedOrder = useAppSelector(s => s.quiz.sortingAnswers[question.id])

  const [order, setOrder] = useState<string[]>(savedOrder ?? question.items)
  const dragItem = useRef<number | null>(null)
  const dragOver = useRef<number | null>(null)

  // Sync to store whenever local order changes (only before submit)
  useEffect(() => {
    if (!submitted) {
      dispatch(setSortingAnswer({ questionId: question.id, order }))
    }
  }, [order, question.id, dispatch, submitted])

  const handleDragStart = (i: number) => { dragItem.current = i }
  const handleDragEnter = (i: number) => { dragOver.current = i }

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOver.current === null) return
    const updated = [...order]
    const [moved] = updated.splice(dragItem.current, 1)
    updated.splice(dragOver.current, 0, moved)
    dragItem.current = null
    dragOver.current = null
    setOrder(updated)
  }

  const isItemCorrect = (item: string, pos: number) =>
    submitted && question.correctOrder[pos] === item

  const allCorrect = submitted && order.every((item, i) => question.correctOrder[i] === item)

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: 'text.secondary' }}>
        Вопрос {index} · сортировка
      </Typography>
      <Typography variant="h6" sx={{ mb: 1, lineHeight: 1.5 }}>
        {question.text}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {submitted ? 'Ваш порядок:' : 'Перетащите элементы в нужном порядке (сверху = наименьший):'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {order.map((item, i) => (
          <Paper
            key={item}
            variant="outlined"
            draggable={!submitted}
            onDragStart={() => handleDragStart(i)}
            onDragEnter={() => handleDragEnter(i)}
            onDragEnd={handleDragEnd}
            onDragOver={e => e.preventDefault()}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.5,
              cursor: submitted ? 'default' : 'grab',
              userSelect: 'none',
              borderColor: submitted
                ? isItemCorrect(item, i)
                  ? 'success.light'
                  : 'error.light'
                : 'divider',
              bgcolor: submitted
                ? isItemCorrect(item, i)
                  ? 'rgba(76,175,80,0.07)'
                  : 'rgba(244,67,54,0.07)'
                : 'background.paper',
              transition: 'all 0.15s ease',
              '&:hover': submitted ? {} : { borderColor: 'primary.main', bgcolor: 'action.hover' },
              '&:active': submitted ? {} : { cursor: 'grabbing' },
            }}
          >
            <Typography sx={{ color: 'text.disabled', fontWeight: 700, minWidth: 24, fontSize: 13 }}>
              {i + 1}.
            </Typography>

            {!submitted && (
              <DragIndicatorIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
            )}

            <Typography sx={{ flex: 1, fontWeight: 500 }}>{item}</Typography>

            {submitted && (
              isItemCorrect(item, i)
                ? <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                : <CancelIcon sx={{ color: 'error.main', fontSize: 20 }} />
            )}
          </Paper>
        ))}
      </Box>

      {submitted && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: allCorrect ? 'success.main' : 'error.main' }}>
            {allCorrect ? '✓ Верно!' : '✗ Неверно. Правильный порядок:'}
          </Typography>
          {!allCorrect && (
            <Box sx={{ mt: 1 }}>
              {question.correctOrder.map((item, i) => (
                <Typography key={item} variant="body2" sx={{ color: 'text.secondary' }}>
                  {i + 1}. {item}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
