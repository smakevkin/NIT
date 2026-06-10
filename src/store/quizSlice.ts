import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuizState {
  singleAnswers: Record<string, string>
  multipleAnswers: Record<string, string[]>
  matchingAnswers: Record<string, Record<string, string>>
  sortingAnswers: Record<string, string[]>
  submitted: boolean
  score: number | null
}

const initialState: QuizState = {
  singleAnswers: {},
  multipleAnswers: {},
  matchingAnswers: {},
  sortingAnswers: {},
  submitted: false,
  score: null,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setSingleAnswer(state, action: PayloadAction<{ questionId: string; value: string }>) {
      state.singleAnswers[action.payload.questionId] = action.payload.value
    },
    toggleMultipleAnswer(state, action: PayloadAction<{ questionId: string; value: string }>) {
      const { questionId, value } = action.payload
      const current = state.multipleAnswers[questionId] ?? []
      if (current.includes(value)) {
        state.multipleAnswers[questionId] = current.filter(v => v !== value)
      } else {
        state.multipleAnswers[questionId] = [...current, value]
      }
    },
    setMatchingAnswer(
      state,
      action: PayloadAction<{ questionId: string; left: string; right: string }>,
    ) {
      const { questionId, left, right } = action.payload
      if (!state.matchingAnswers[questionId]) {
        state.matchingAnswers[questionId] = {}
      }
      state.matchingAnswers[questionId][left] = right
    },
    setSortingAnswer(
      state,
      action: PayloadAction<{ questionId: string; order: string[] }>,
    ) {
      state.sortingAnswers[action.payload.questionId] = action.payload.order
    },
    submitQuiz(state, action: PayloadAction<{ score: number }>) {
      state.submitted = true
      state.score = action.payload.score
    },
    resetQuiz() {
      return initialState
    },
  },
})

export const {
  setSingleAnswer,
  toggleMultipleAnswer,
  setMatchingAnswer,
  setSortingAnswer,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions

export default quizSlice.reducer
