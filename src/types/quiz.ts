export type QuestionType = 'single' | 'multiple' | 'matching' | 'sorting'

export interface SingleQuestion {
  id: string
  type: 'single'
  text: string
  options: string[]
  correctAnswer: string
}

export interface MultipleQuestion {
  id: string
  type: 'multiple'
  text: string
  options: string[]
  correctAnswers: string[]
}

export interface MatchingPair {
  left: string
  right: string
}

export interface MatchingQuestion {
  id: string
  type: 'matching'
  text: string
  pairs: MatchingPair[]
}

export interface SortingQuestion {
  id: string
  type: 'sorting'
  text: string
  items: string[]          // shuffled display order
  correctOrder: string[]   // correct order
}

export type Question = SingleQuestion | MultipleQuestion | MatchingQuestion | SortingQuestion
