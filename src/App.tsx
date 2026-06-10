import { useCallback, useEffect, useMemo, useState } from 'react'
import QuizPage from './pages/QuizPage'
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  MobileStepper,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import bullyImg from './assets/bully.png'
import chihuahuaImg from './assets/chihuahua.png'
import cnHoholImg from './assets/cnHohol.png'
import frBulldogImg from './assets/frBulldog.png'
import gerOvcharkaImg from './assets/gerOvcharka.png'
import goldRetriverImg from './assets/goldRetriver.png'
import maltBolonkaImg from './assets/maltBolonka.png'
import mopsImg from './assets/mops.png'
import pudelImg from './assets/pudel.png'
import americanBulldogImg from './assets/americanBulldog.png'

// ─── данные ───────────────────────────────────────────────────────────────────

type Activity = 'низкая' | 'средняя' | 'высокая'
type Grooming = 'простой' | 'средний' | 'сложный'

type Dog = {
  id: string
  name: string
  url: string
  category: string
  origin: string
  weightMin: number
  weightMax: number
  heightMin: number
  heightMax: number
  lifeMin: number
  lifeMax: number
  activity: Activity
  grooming: Grooming
  short: string
  description: string
  temperament: string[]
}

const dogs: Dog[] = [
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    url: gerOvcharkaImg,
    category: 'Служебная',
    origin: 'Германия',
    weightMin: 22,
    weightMax: 40,
    heightMin: 55,
    heightMax: 65,
    lifeMin: 9,
    lifeMax: 13,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Умная, смелая и преданная служебная собака.',
    description:
      'Немецкая овчарка хорошо подходит для дрессировки, охраны и активных прогулок. Это внимательная порода, которой важны регулярные занятия и общение с хозяином.',
    temperament: ['умная', 'преданная', 'энергичная'],
  },
  {
    id: 'french-bulldog',
    name: 'Французский бульдог',
    url: frBulldogImg,
    category: 'Компаньон',
    origin: 'Франция',
    weightMin: 8,
    weightMax: 14,
    heightMin: 24,
    heightMax: 35,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Компактная и дружелюбная порода собак-компаньонов.',
    description:
      'Французский бульдог любит внимание и хорошо чувствует себя в квартире. Он не требует слишком долгих пробежек, но ему нужны спокойные прогулки и игры.',
    temperament: ['дружелюбный', 'игривый', 'общительный'],
  },
  {
    id: 'golden-retriever',
    name: 'Золотистый ретривер',
    url: goldRetriverImg,
    category: 'Охотничья',
    origin: 'Великобритания',
    weightMin: 25,
    weightMax: 34,
    heightMin: 51,
    heightMax: 61,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Добродушная и преданная порода.',
    description:
      'Золотистый ретривер известен мягким характером и любовью к людям. Ему подходят прогулки, обучение командам и игры на свежем воздухе.',
    temperament: ['добрый', 'спокойный', 'обучаемый'],
  },
  {
    id: 'american-bulldog',
    name: 'Американский бульдог',
    url: americanBulldogImg,
    category: 'Охранная',
    origin: 'США',
    weightMin: 27,
    weightMax: 52,
    heightMin: 50,
    heightMax: 71,
    lifeMin: 10,
    lifeMax: 15,
    activity: 'высокая',
    grooming: 'простой',
    short: 'Сильная и энергичная порода собак.',
    description:
      'Американский бульдог — крепкая порода с выраженной привязанностью к семье. Ему нужны движение, воспитание и понятные правила.',
    temperament: ['смелый', 'уверенный', 'активный'],
  },
  {
    id: 'poodle',
    name: 'Пудель',
    url: pudelImg,
    category: 'Декоративная',
    origin: 'Франция',
    weightMin: 5,
    weightMax: 30,
    heightMin: 24,
    heightMax: 60,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Умная и легко обучаемая порода собак.',
    description:
      'Пудели быстро учатся и любят внимание. Шерсть требует регулярного ухода, зато порода хорошо подходит для занятий и трюков.',
    temperament: ['умный', 'артистичный', 'внимательный'],
  },
  {
    id: 'maltese',
    name: 'Мальтийская болонка',
    url: maltBolonkaImg,
    category: 'Декоративная',
    origin: 'Мальта',
    weightMin: 3,
    weightMax: 4,
    heightMin: 20,
    heightMax: 25,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Грациозная декоративная собачка.',
    description:
      'Мальтийская болонка — небольшая собака-компаньон с длинной шерстью. Ей важны бережный уход и спокойная домашняя атмосфера.',
    temperament: ['ласковая', 'весёлая', 'нежная'],
  },
  {
    id: 'bully',
    name: 'Булли',
    url: bullyImg,
    category: 'Компаньон',
    origin: 'США',
    weightMin: 20,
    weightMax: 50,
    heightMin: 33,
    heightMax: 50,
    lifeMin: 8,
    lifeMax: 13,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Мощная и мускулистая порода.',
    description:
      'Булли выглядит крепко, но обычно ориентирован на общение с человеком. Для породы важны социализация, прогулки и спокойное воспитание.',
    temperament: ['уверенный', 'общительный', 'спокойный'],
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    url: chihuahuaImg,
    category: 'Декоративная',
    origin: 'Мексика',
    weightMin: 1,
    weightMax: 3,
    heightMin: 15,
    heightMax: 23,
    lifeMin: 12,
    lifeMax: 16,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Миниатюрная декоративная собака.',
    description:
      'Чихуахуа — маленькая, но яркая по характеру собака. Ей подходят короткие прогулки, тёплая одежда в холодную погоду и аккуратное обращение.',
    temperament: ['смелая', 'живая', 'преданная'],
  },
  {
    id: 'chinese-crested',
    name: 'Китайская хохолка',
    url: cnHoholImg,
    category: 'Декоративная',
    origin: 'Китай',
    weightMin: 3,
    weightMax: 6,
    heightMin: 23,
    heightMax: 33,
    lifeMin: 13,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'средний',
    short: 'Необычная декоративная порода с выразительной внешностью.',
    description:
      'Китайская хохолка любит быть рядом с хозяином и хорошо подходит для квартиры. Ей нужен уход за кожей или шерстью в зависимости от типа.',
    temperament: ['нежная', 'подвижная', 'любопытная'],
  },
  {
    id: 'pug',
    name: 'Мопс',
    url: mopsImg,
    category: 'Компаньон',
    origin: 'Китай',
    weightMin: 6,
    weightMax: 8,
    heightMin: 25,
    heightMax: 33,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'низкая',
    grooming: 'простой',
    short: 'Спокойный и обаятельный домашний компаньон.',
    description:
      'Мопсы любят компанию и спокойные прогулки. Это дружелюбные собаки, которым важно не перегреваться и сохранять умеренную активность.',
    temperament: ['ласковый', 'спокойный', 'общительный'],
  },
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    url: gerOvcharkaImg,
    category: 'Служебная',
    origin: 'Германия',
    weightMin: 22,
    weightMax: 40,
    heightMin: 55,
    heightMax: 65,
    lifeMin: 9,
    lifeMax: 13,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Умная, смелая и преданная служебная собака.',
    description:
      'Немецкая овчарка хорошо подходит для дрессировки, охраны и активных прогулок. Это внимательная порода, которой важны регулярные занятия и общение с хозяином.',
    temperament: ['умная', 'преданная', 'энергичная'],
  },
  {
    id: 'french-bulldog',
    name: 'Французский бульдог',
    url: frBulldogImg,
    category: 'Компаньон',
    origin: 'Франция',
    weightMin: 8,
    weightMax: 14,
    heightMin: 24,
    heightMax: 35,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Компактная и дружелюбная порода собак-компаньонов.',
    description:
      'Французский бульдог любит внимание и хорошо чувствует себя в квартире. Он не требует слишком долгих пробежек, но ему нужны спокойные прогулки и игры.',
    temperament: ['дружелюбный', 'игривый', 'общительный'],
  },
  {
    id: 'golden-retriever',
    name: 'Золотистый ретривер',
    url: goldRetriverImg,
    category: 'Охотничья',
    origin: 'Великобритания',
    weightMin: 25,
    weightMax: 34,
    heightMin: 51,
    heightMax: 61,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Добродушная и преданная порода.',
    description:
      'Золотистый ретривер известен мягким характером и любовью к людям. Ему подходят прогулки, обучение командам и игры на свежем воздухе.',
    temperament: ['добрый', 'спокойный', 'обучаемый'],
  },
  {
    id: 'american-bulldog',
    name: 'Американский бульдог',
    url: americanBulldogImg,
    category: 'Охранная',
    origin: 'США',
    weightMin: 27,
    weightMax: 52,
    heightMin: 50,
    heightMax: 71,
    lifeMin: 10,
    lifeMax: 15,
    activity: 'высокая',
    grooming: 'простой',
    short: 'Сильная и энергичная порода собак.',
    description:
      'Американский бульдог — крепкая порода с выраженной привязанностью к семье. Ему нужны движение, воспитание и понятные правила.',
    temperament: ['смелый', 'уверенный', 'активный'],
  },
  {
    id: 'poodle',
    name: 'Пудель',
    url: pudelImg,
    category: 'Декоративная',
    origin: 'Франция',
    weightMin: 5,
    weightMax: 30,
    heightMin: 24,
    heightMax: 60,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Умная и легко обучаемая порода собак.',
    description:
      'Пудели быстро учатся и любят внимание. Шерсть требует регулярного ухода, зато порода хорошо подходит для занятий и трюков.',
    temperament: ['умный', 'артистичный', 'внимательный'],
  },
  {
    id: 'maltese',
    name: 'Мальтийская болонка',
    url: maltBolonkaImg,
    category: 'Декоративная',
    origin: 'Мальта',
    weightMin: 3,
    weightMax: 4,
    heightMin: 20,
    heightMax: 25,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Грациозная декоративная собачка.',
    description:
      'Мальтийская болонка — небольшая собака-компаньон с длинной шерстью. Ей важны бережный уход и спокойная домашняя атмосфера.',
    temperament: ['ласковая', 'весёлая', 'нежная'],
  },
  {
    id: 'bully',
    name: 'Булли',
    url: bullyImg,
    category: 'Компаньон',
    origin: 'США',
    weightMin: 20,
    weightMax: 50,
    heightMin: 33,
    heightMax: 50,
    lifeMin: 8,
    lifeMax: 13,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Мощная и мускулистая порода.',
    description:
      'Булли выглядит крепко, но обычно ориентирован на общение с человеком. Для породы важны социализация, прогулки и спокойное воспитание.',
    temperament: ['уверенный', 'общительный', 'спокойный'],
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    url: chihuahuaImg,
    category: 'Декоративная',
    origin: 'Мексика',
    weightMin: 1,
    weightMax: 3,
    heightMin: 15,
    heightMax: 23,
    lifeMin: 12,
    lifeMax: 16,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Миниатюрная декоративная собака.',
    description:
      'Чихуахуа — маленькая, но яркая по характеру собака. Ей подходят короткие прогулки, тёплая одежда в холодную погоду и аккуратное обращение.',
    temperament: ['смелая', 'живая', 'преданная'],
  },
  {
    id: 'chinese-crested',
    name: 'Китайская хохолка',
    url: cnHoholImg,
    category: 'Декоративная',
    origin: 'Китай',
    weightMin: 3,
    weightMax: 6,
    heightMin: 23,
    heightMax: 33,
    lifeMin: 13,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'средний',
    short: 'Необычная декоративная порода с выразительной внешностью.',
    description:
      'Китайская хохолка любит быть рядом с хозяином и хорошо подходит для квартиры. Ей нужен уход за кожей или шерстью в зависимости от типа.',
    temperament: ['нежная', 'подвижная', 'любопытная'],
  },
  {
    id: 'pug',
    name: 'Мопс',
    url: mopsImg,
    category: 'Компаньон',
    origin: 'Китай',
    weightMin: 6,
    weightMax: 8,
    heightMin: 25,
    heightMax: 33,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'низкая',
    grooming: 'простой',
    short: 'Спокойный и обаятельный домашний компаньон.',
    description:
      'Мопсы любят компанию и спокойные прогулки. Это дружелюбные собаки, которым важно не перегреваться и сохранять умеренную активность.',
    temperament: ['ласковый', 'спокойный', 'общительный'],
  },
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    url: gerOvcharkaImg,
    category: 'Служебная',
    origin: 'Германия',
    weightMin: 22,
    weightMax: 40,
    heightMin: 55,
    heightMax: 65,
    lifeMin: 9,
    lifeMax: 13,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Умная, смелая и преданная служебная собака.',
    description:
      'Немецкая овчарка хорошо подходит для дрессировки, охраны и активных прогулок. Это внимательная порода, которой важны регулярные занятия и общение с хозяином.',
    temperament: ['умная', 'преданная', 'энергичная'],
  },
  {
    id: 'french-bulldog',
    name: 'Французский бульдог',
    url: frBulldogImg,
    category: 'Компаньон',
    origin: 'Франция',
    weightMin: 8,
    weightMax: 14,
    heightMin: 24,
    heightMax: 35,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Компактная и дружелюбная порода собак-компаньонов.',
    description:
      'Французский бульдог любит внимание и хорошо чувствует себя в квартире. Он не требует слишком долгих пробежек, но ему нужны спокойные прогулки и игры.',
    temperament: ['дружелюбный', 'игривый', 'общительный'],
  },
  {
    id: 'golden-retriever',
    name: 'Золотистый ретривер',
    url: goldRetriverImg,
    category: 'Охотничья',
    origin: 'Великобритания',
    weightMin: 25,
    weightMax: 34,
    heightMin: 51,
    heightMax: 61,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Добродушная и преданная порода.',
    description:
      'Золотистый ретривер известен мягким характером и любовью к людям. Ему подходят прогулки, обучение командам и игры на свежем воздухе.',
    temperament: ['добрый', 'спокойный', 'обучаемый'],
  },
  {
    id: 'american-bulldog',
    name: 'Американский бульдог',
    url: americanBulldogImg,
    category: 'Охранная',
    origin: 'США',
    weightMin: 27,
    weightMax: 52,
    heightMin: 50,
    heightMax: 71,
    lifeMin: 10,
    lifeMax: 15,
    activity: 'высокая',
    grooming: 'простой',
    short: 'Сильная и энергичная порода собак.',
    description:
      'Американский бульдог — крепкая порода с выраженной привязанностью к семье. Ему нужны движение, воспитание и понятные правила.',
    temperament: ['смелый', 'уверенный', 'активный'],
  },
  {
    id: 'poodle',
    name: 'Пудель',
    url: pudelImg,
    category: 'Декоративная',
    origin: 'Франция',
    weightMin: 5,
    weightMax: 30,
    heightMin: 24,
    heightMax: 60,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Умная и легко обучаемая порода собак.',
    description:
      'Пудели быстро учатся и любят внимание. Шерсть требует регулярного ухода, зато порода хорошо подходит для занятий и трюков.',
    temperament: ['умный', 'артистичный', 'внимательный'],
  },
  {
    id: 'maltese',
    name: 'Мальтийская болонка',
    url: maltBolonkaImg,
    category: 'Декоративная',
    origin: 'Мальта',
    weightMin: 3,
    weightMax: 4,
    heightMin: 20,
    heightMax: 25,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Грациозная декоративная собачка.',
    description:
      'Мальтийская болонка — небольшая собака-компаньон с длинной шерстью. Ей важны бережный уход и спокойная домашняя атмосфера.',
    temperament: ['ласковая', 'весёлая', 'нежная'],
  },
  {
    id: 'bully',
    name: 'Булли',
    url: bullyImg,
    category: 'Компаньон',
    origin: 'США',
    weightMin: 20,
    weightMax: 50,
    heightMin: 33,
    heightMax: 50,
    lifeMin: 8,
    lifeMax: 13,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Мощная и мускулистая порода.',
    description:
      'Булли выглядит крепко, но обычно ориентирован на общение с человеком. Для породы важны социализация, прогулки и спокойное воспитание.',
    temperament: ['уверенный', 'общительный', 'спокойный'],
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    url: chihuahuaImg,
    category: 'Декоративная',
    origin: 'Мексика',
    weightMin: 1,
    weightMax: 3,
    heightMin: 15,
    heightMax: 23,
    lifeMin: 12,
    lifeMax: 16,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Миниатюрная декоративная собака.',
    description:
      'Чихуахуа — маленькая, но яркая по характеру собака. Ей подходят короткие прогулки, тёплая одежда в холодную погоду и аккуратное обращение.',
    temperament: ['смелая', 'живая', 'преданная'],
  },
  {
    id: 'chinese-crested',
    name: 'Китайская хохолка',
    url: cnHoholImg,
    category: 'Декоративная',
    origin: 'Китай',
    weightMin: 3,
    weightMax: 6,
    heightMin: 23,
    heightMax: 33,
    lifeMin: 13,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'средний',
    short: 'Необычная декоративная порода с выразительной внешностью.',
    description:
      'Китайская хохолка любит быть рядом с хозяином и хорошо подходит для квартиры. Ей нужен уход за кожей или шерстью в зависимости от типа.',
    temperament: ['нежная', 'подвижная', 'любопытная'],
  },
  {
    id: 'pug',
    name: 'Мопс',
    url: mopsImg,
    category: 'Компаньон',
    origin: 'Китай',
    weightMin: 6,
    weightMax: 8,
    heightMin: 25,
    heightMax: 33,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'низкая',
    grooming: 'простой',
    short: 'Спокойный и обаятельный домашний компаньон.',
    description:
      'Мопсы любят компанию и спокойные прогулки. Это дружелюбные собаки, которым важно не перегреваться и сохранять умеренную активность.',
    temperament: ['ласковый', 'спокойный', 'общительный'],
  },
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    url: gerOvcharkaImg,
    category: 'Служебная',
    origin: 'Германия',
    weightMin: 22,
    weightMax: 40,
    heightMin: 55,
    heightMax: 65,
    lifeMin: 9,
    lifeMax: 13,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Умная, смелая и преданная служебная собака.',
    description:
      'Немецкая овчарка хорошо подходит для дрессировки, охраны и активных прогулок. Это внимательная порода, которой важны регулярные занятия и общение с хозяином.',
    temperament: ['умная', 'преданная', 'энергичная'],
  },
  {
    id: 'french-bulldog',
    name: 'Французский бульдог',
    url: frBulldogImg,
    category: 'Компаньон',
    origin: 'Франция',
    weightMin: 8,
    weightMax: 14,
    heightMin: 24,
    heightMax: 35,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Компактная и дружелюбная порода собак-компаньонов.',
    description:
      'Французский бульдог любит внимание и хорошо чувствует себя в квартире. Он не требует слишком долгих пробежек, но ему нужны спокойные прогулки и игры.',
    temperament: ['дружелюбный', 'игривый', 'общительный'],
  },
  {
    id: 'golden-retriever',
    name: 'Золотистый ретривер',
    url: goldRetriverImg,
    category: 'Охотничья',
    origin: 'Великобритания',
    weightMin: 25,
    weightMax: 34,
    heightMin: 51,
    heightMax: 61,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Добродушная и преданная порода.',
    description:
      'Золотистый ретривер известен мягким характером и любовью к людям. Ему подходят прогулки, обучение командам и игры на свежем воздухе.',
    temperament: ['добрый', 'спокойный', 'обучаемый'],
  },
  {
    id: 'american-bulldog',
    name: 'Американский бульдог',
    url: americanBulldogImg,
    category: 'Охранная',
    origin: 'США',
    weightMin: 27,
    weightMax: 52,
    heightMin: 50,
    heightMax: 71,
    lifeMin: 10,
    lifeMax: 15,
    activity: 'высокая',
    grooming: 'простой',
    short: 'Сильная и энергичная порода собак.',
    description:
      'Американский бульдог — крепкая порода с выраженной привязанностью к семье. Ему нужны движение, воспитание и понятные правила.',
    temperament: ['смелый', 'уверенный', 'активный'],
  },
  {
    id: 'poodle',
    name: 'Пудель',
    url: pudelImg,
    category: 'Декоративная',
    origin: 'Франция',
    weightMin: 5,
    weightMax: 30,
    heightMin: 24,
    heightMax: 60,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Умная и легко обучаемая порода собак.',
    description:
      'Пудели быстро учатся и любят внимание. Шерсть требует регулярного ухода, зато порода хорошо подходит для занятий и трюков.',
    temperament: ['умный', 'артистичный', 'внимательный'],
  },
  {
    id: 'maltese',
    name: 'Мальтийская болонка',
    url: maltBolonkaImg,
    category: 'Декоративная',
    origin: 'Мальта',
    weightMin: 3,
    weightMax: 4,
    heightMin: 20,
    heightMax: 25,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Грациозная декоративная собачка.',
    description:
      'Мальтийская болонка — небольшая собака-компаньон с длинной шерстью. Ей важны бережный уход и спокойная домашняя атмосфера.',
    temperament: ['ласковая', 'весёлая', 'нежная'],
  },
  {
    id: 'bully',
    name: 'Булли',
    url: bullyImg,
    category: 'Компаньон',
    origin: 'США',
    weightMin: 20,
    weightMax: 50,
    heightMin: 33,
    heightMax: 50,
    lifeMin: 8,
    lifeMax: 13,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Мощная и мускулистая порода.',
    description:
      'Булли выглядит крепко, но обычно ориентирован на общение с человеком. Для породы важны социализация, прогулки и спокойное воспитание.',
    temperament: ['уверенный', 'общительный', 'спокойный'],
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    url: chihuahuaImg,
    category: 'Декоративная',
    origin: 'Мексика',
    weightMin: 1,
    weightMax: 3,
    heightMin: 15,
    heightMax: 23,
    lifeMin: 12,
    lifeMax: 16,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Миниатюрная декоративная собака.',
    description:
      'Чихуахуа — маленькая, но яркая по характеру собака. Ей подходят короткие прогулки, тёплая одежда в холодную погоду и аккуратное обращение.',
    temperament: ['смелая', 'живая', 'преданная'],
  },
  {
    id: 'chinese-crested',
    name: 'Китайская хохолка',
    url: cnHoholImg,
    category: 'Декоративная',
    origin: 'Китай',
    weightMin: 3,
    weightMax: 6,
    heightMin: 23,
    heightMax: 33,
    lifeMin: 13,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'средний',
    short: 'Необычная декоративная порода с выразительной внешностью.',
    description:
      'Китайская хохолка любит быть рядом с хозяином и хорошо подходит для квартиры. Ей нужен уход за кожей или шерстью в зависимости от типа.',
    temperament: ['нежная', 'подвижная', 'любопытная'],
  },
  {
    id: 'pug',
    name: 'Мопс',
    url: mopsImg,
    category: 'Компаньон',
    origin: 'Китай',
    weightMin: 6,
    weightMax: 8,
    heightMin: 25,
    heightMax: 33,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'низкая',
    grooming: 'простой',
    short: 'Спокойный и обаятельный домашний компаньон.',
    description:
      'Мопсы любят компанию и спокойные прогулки. Это дружелюбные собаки, которым важно не перегреваться и сохранять умеренную активность.',
    temperament: ['ласковый', 'спокойный', 'общительный'],
  },
  {
    id: 'german-shepherd',
    name: 'Немецкая овчарка',
    url: gerOvcharkaImg,
    category: 'Служебная',
    origin: 'Германия',
    weightMin: 22,
    weightMax: 40,
    heightMin: 55,
    heightMax: 65,
    lifeMin: 9,
    lifeMax: 13,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Умная, смелая и преданная служебная собака.',
    description:
      'Немецкая овчарка хорошо подходит для дрессировки, охраны и активных прогулок. Это внимательная порода, которой важны регулярные занятия и общение с хозяином.',
    temperament: ['умная', 'преданная', 'энергичная'],
  },
  {
    id: 'french-bulldog',
    name: 'Французский бульдог',
    url: frBulldogImg,
    category: 'Компаньон',
    origin: 'Франция',
    weightMin: 8,
    weightMax: 14,
    heightMin: 24,
    heightMax: 35,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Компактная и дружелюбная порода собак-компаньонов.',
    description:
      'Французский бульдог любит внимание и хорошо чувствует себя в квартире. Он не требует слишком долгих пробежек, но ему нужны спокойные прогулки и игры.',
    temperament: ['дружелюбный', 'игривый', 'общительный'],
  },
  {
    id: 'golden-retriever',
    name: 'Золотистый ретривер',
    url: goldRetriverImg,
    category: 'Охотничья',
    origin: 'Великобритания',
    weightMin: 25,
    weightMax: 34,
    heightMin: 51,
    heightMax: 61,
    lifeMin: 10,
    lifeMax: 12,
    activity: 'высокая',
    grooming: 'средний',
    short: 'Добродушная и преданная порода.',
    description:
      'Золотистый ретривер известен мягким характером и любовью к людям. Ему подходят прогулки, обучение командам и игры на свежем воздухе.',
    temperament: ['добрый', 'спокойный', 'обучаемый'],
  },
  {
    id: 'american-bulldog',
    name: 'Американский бульдог',
    url: americanBulldogImg,
    category: 'Охранная',
    origin: 'США',
    weightMin: 27,
    weightMax: 52,
    heightMin: 50,
    heightMax: 71,
    lifeMin: 10,
    lifeMax: 15,
    activity: 'высокая',
    grooming: 'простой',
    short: 'Сильная и энергичная порода собак.',
    description:
      'Американский бульдог — крепкая порода с выраженной привязанностью к семье. Ему нужны движение, воспитание и понятные правила.',
    temperament: ['смелый', 'уверенный', 'активный'],
  },
  {
    id: 'poodle',
    name: 'Пудель',
    url: pudelImg,
    category: 'Декоративная',
    origin: 'Франция',
    weightMin: 5,
    weightMax: 30,
    heightMin: 24,
    heightMax: 60,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Умная и легко обучаемая порода собак.',
    description:
      'Пудели быстро учатся и любят внимание. Шерсть требует регулярного ухода, зато порода хорошо подходит для занятий и трюков.',
    temperament: ['умный', 'артистичный', 'внимательный'],
  },
  {
    id: 'maltese',
    name: 'Мальтийская болонка',
    url: maltBolonkaImg,
    category: 'Декоративная',
    origin: 'Мальта',
    weightMin: 3,
    weightMax: 4,
    heightMin: 20,
    heightMax: 25,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'сложный',
    short: 'Грациозная декоративная собачка.',
    description:
      'Мальтийская болонка — небольшая собака-компаньон с длинной шерстью. Ей важны бережный уход и спокойная домашняя атмосфера.',
    temperament: ['ласковая', 'весёлая', 'нежная'],
  },
  {
    id: 'bully',
    name: 'Булли',
    url: bullyImg,
    category: 'Компаньон',
    origin: 'США',
    weightMin: 20,
    weightMax: 50,
    heightMin: 33,
    heightMax: 50,
    lifeMin: 8,
    lifeMax: 13,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Мощная и мускулистая порода.',
    description:
      'Булли выглядит крепко, но обычно ориентирован на общение с человеком. Для породы важны социализация, прогулки и спокойное воспитание.',
    temperament: ['уверенный', 'общительный', 'спокойный'],
  },
  {
    id: 'chihuahua',
    name: 'Чихуахуа',
    url: chihuahuaImg,
    category: 'Декоративная',
    origin: 'Мексика',
    weightMin: 1,
    weightMax: 3,
    heightMin: 15,
    heightMax: 23,
    lifeMin: 12,
    lifeMax: 16,
    activity: 'средняя',
    grooming: 'простой',
    short: 'Миниатюрная декоративная собака.',
    description:
      'Чихуахуа — маленькая, но яркая по характеру собака. Ей подходят короткие прогулки, тёплая одежда в холодную погоду и аккуратное обращение.',
    temperament: ['смелая', 'живая', 'преданная'],
  },
  {
    id: 'chinese-crested',
    name: 'Китайская хохолка',
    url: cnHoholImg,
    category: 'Декоративная',
    origin: 'Китай',
    weightMin: 3,
    weightMax: 6,
    heightMin: 23,
    heightMax: 33,
    lifeMin: 13,
    lifeMax: 15,
    activity: 'средняя',
    grooming: 'средний',
    short: 'Необычная декоративная порода с выразительной внешностью.',
    description:
      'Китайская хохолка любит быть рядом с хозяином и хорошо подходит для квартиры. Ей нужен уход за кожей или шерстью в зависимости от типа.',
    temperament: ['нежная', 'подвижная', 'любопытная'],
  },
  {
    id: 'pug',
    name: 'Мопс',
    url: mopsImg,
    category: 'Компаньон',
    origin: 'Китай',
    weightMin: 6,
    weightMax: 8,
    heightMin: 25,
    heightMax: 33,
    lifeMin: 12,
    lifeMax: 15,
    activity: 'низкая',
    grooming: 'простой',
    short: 'Спокойный и обаятельный домашний компаньон.',
    description:
      'Мопсы любят компанию и спокойные прогулки. Это дружелюбные собаки, которым важно не перегреваться и сохранять умеренную активность.',
    temperament: ['ласковый', 'спокойный', 'общительный'],
  },
]

const carouselDogs = [dogs[0], dogs[1], dogs[2], dogs[3], dogs[4]]
const smallItems = [dogs[2], dogs[5]]
const bigItems = [dogs[1], dogs[4], dogs[3]]
const smallItems2 = [dogs[6], dogs[7]]

const activityScore: Record<Activity, number> = {
  низкая: 1,
  средняя: 2,
  высокая: 3,
}

// ─── роутинг без дополнительных зависимостей ─────────────────────────────────

type Route =
  | { page: 'home' }
  | { page: 'table' }
  | { page: 'chart' }
  | { page: 'quiz' }
  | { page: 'dog'; id: string }

type PageKey = Route['page']

function getRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, '').split('?')[0]
  const [page, id] = path.split('/')

  if (page === 'table') return { page: 'table' }
  if (page === 'chart') return { page: 'chart' }
  if (page === 'quiz') return { page: 'quiz' }
  if (page === 'dogs' && id) return { page: 'dog', id }

  return { page: 'home' }
}

// ─── общие компоненты ─────────────────────────────────────────────────────────

function Navbar({ activePage }: { activePage: PageKey }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [search, setSearch] = useState('')

  const goToSearchResult = () => {
    const value = search.trim().toLowerCase()
    if (!value) return

    const found = dogs.find(dog =>
      [dog.name, dog.category, dog.origin, dog.short].some(field =>
        field.toLowerCase().includes(value),
      ),
    )

    if (found) {
      window.location.hash = `#/dogs/${found.id}`
      setSearch('')
    } else {
      window.location.hash = `#/table?search=${encodeURIComponent(value)}`
    }
  }

  const navButtonSx = {
    fontWeight: 600,
    borderRadius: 999,
    px: 2,
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: '#f8f9fa' }}>
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
        <Button href="#/" color={activePage === 'home' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Главная
        </Button>
        <Button href="#/table" color={activePage === 'table' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Таблица
        </Button>
        <Button href="#/chart" color={activePage === 'chart' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Диаграмма
        </Button>
        <Button href="#/quiz" color={activePage === 'quiz' ? 'primary' : 'inherit'} sx={navButtonSx}>
          Тест
        </Button>

        <Button
          color={activePage === 'dog' ? 'primary' : 'inherit'}
          onClick={e => setAnchorEl(e.currentTarget)}
          endIcon={<span style={{ fontSize: 10 }}>▼</span>}
          sx={navButtonSx}
        >
          Породы
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {dogs.map(dog => (
            <MenuItem
              key={dog.id}
              component="a"
              href={`#/dogs/${dog.id}`}
              onClick={() => setAnchorEl(null)}
            >
              {dog.name}
            </MenuItem>
          ))}
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        <TextField
          size="small"
          placeholder="Найти породу"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') goToSearchResult()
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    sx={{ ml: 0.5, minWidth: 'auto', px: 1.5 }}
                    onClick={goToSearchResult}
                  >
                    Поиск
                  </Button>
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { xs: '100%', sm: 260 } }}
        />
      </Toolbar>
    </AppBar>
  )
}

function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto' }}>
        {subtitle}
      </Typography>
    </Box>
  )
}

function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 2, mt: 4, borderTop: '1px solid #e0e0e0' }}>
      <Typography variant="body2" color="text.secondary">
        Макевкин СС Б9123-02.03.03тп
      </Typography>
    </Box>
  )
}

// ─── главная страница ─────────────────────────────────────────────────────────

function Carousel() {
  const [active, setActive] = useState(0)
  const total = carouselDogs.length
  const next = useCallback(() => setActive(a => (a + 1) % total), [total])
  const prev = () => setActive(a => (a - 1 + total) % total)

  useEffect(() => {
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [next])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 360, md: 500 }, overflow: 'hidden', bgcolor: '#000' }}>
      {carouselDogs.map((dog, i) => (
        <Box
          key={dog.id}
          component="a"
          href={`#/dogs/${dog.id}`}
          aria-label={`Открыть страницу породы ${dog.name}`}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: i === active ? 1 : 0,
            pointerEvents: i === active ? 'auto' : 'none',
            transition: 'opacity 0.6s ease',
          }}
        >
          <Box
            component="img"
            src={dog.url}
            alt={dog.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75))',
            }}
          />
          <Box sx={{ position: 'absolute', left: { xs: 24, md: 64 }, bottom: { xs: 42, md: 64 }, color: '#fff' }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {dog.name}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 520, mt: 1 }}>
              {dog.short}
            </Typography>
          </Box>
        </Box>
      ))}

      <IconButton
        onClick={prev}
        sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
      >
        <KeyboardArrowRight />
      </IconButton>

      <MobileStepper
        variant="dots"
        steps={total}
        position="static"
        activeStep={active}
        nextButton={null}
        backButton={null}
        sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', bgcolor: 'transparent', '& .MuiMobileStepper-dot': { bgcolor: 'rgba(255,255,255,0.5)' }, '& .MuiMobileStepper-dotActive': { bgcolor: '#fff' } }}
      />
    </Box>
  )
}

function SmallItems({ items }: { items: Dog[] }) {
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={3} sx={{ justifyContent: 'space-evenly' }}>
        {items.map(item => (
          <Grid key={item.name} size={{ xs: 12, sm: 5 }}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Box
                component="a"
                href={`#/dogs/${item.id}`}
                sx={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit' }}
              >
                <Box
                  component="img"
                  src={item.url}
                  alt={item.name}
                  sx={{ height: 92, width: 140, objectFit: 'cover', borderRadius: 2, mb: 1, transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.04)' } }}
                />
              </Box>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.short}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function BigItems() {
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {bigItems.map(item => (
          <Grid key={item.name} size={{ xs: 12, sm: 4 }}>
            <Card sx={{ bgcolor: '#2196F3', color: '#fff', height: '100%' }}>
              <CardActionArea component="a" href={`#/dogs/${item.id}`} sx={{ height: '100%', color: 'inherit' }}>
                <CardMedia component="img" image={item.url} alt={item.name} sx={{ height: 210, objectFit: 'cover' }} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>{item.name}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>{item.short}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, textDecoration: 'underline', textAlign: 'right' }}>
                    Подробнее
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function HomePage() {
  return (
    <>
      <Carousel />
      <SmallItems items={smallItems} />
      <BigItems />
      <SmallItems items={smallItems2} />
    </>
  )
}

// ─── таблица с фильтрацией, сортировкой и настройкой столбцов ─────────────────

type Order = 'asc' | 'desc'
type ColumnId = 'image' | 'name' | 'category' | 'origin' | 'weight' | 'height' | 'life' | 'activity' | 'grooming'
type SortColumnId = Exclude<ColumnId, 'image'>

type Column = {
  id: ColumnId
  label: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  render: (dog: Dog) => React.ReactNode
}

const columns: Column[] = [
  {
    id: 'image',
    label: 'Фото',
    render: dog => (
      <Box component="a" href={`#/dogs/${dog.id}`} sx={{ display: 'inline-flex' }}>
        <Box component="img" src={dog.url} alt={dog.name} sx={{ width: 82, height: 56, objectFit: 'cover', borderRadius: 1 }} />
      </Box>
    ),
  },
  { id: 'name', label: 'Порода', sortable: true, render: dog => <strong>{dog.name}</strong> },
  { id: 'category', label: 'Тип', sortable: true, render: dog => dog.category },
  { id: 'origin', label: 'Страна', sortable: true, render: dog => dog.origin },
  { id: 'weight', label: 'Вес', sortable: true, align: 'right', render: dog => `${dog.weightMin}–${dog.weightMax} кг` },
  { id: 'height', label: 'Рост', sortable: true, align: 'right', render: dog => `${dog.heightMin}–${dog.heightMax} см` },
  { id: 'life', label: 'Жизнь', sortable: true, align: 'right', render: dog => `${dog.lifeMin}–${dog.lifeMax} лет` },
  { id: 'activity', label: 'Активность', sortable: true, render: dog => <Chip size="small" label={dog.activity} /> },
  { id: 'grooming', label: 'Уход', sortable: true, render: dog => dog.grooming },
]

function average(min: number, max: number) {
  return (min + max) / 2
}

function getSortValue(dog: Dog, orderBy: SortColumnId): string | number {
  switch (orderBy) {
    case 'weight':
      return average(dog.weightMin, dog.weightMax)
    case 'height':
      return average(dog.heightMin, dog.heightMax)
    case 'life':
      return average(dog.lifeMin, dog.lifeMax)
    case 'activity':
      return activityScore[dog.activity]
    case 'grooming':
      return dog.grooming
    default:
      return dog[orderBy]
  }
}

function TablePage() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] ?? '')
  const initialSearch = params.get('search') ?? ''
  const [query, setQuery] = useState(initialSearch)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [originFilter, setOriginFilter] = useState('all')
  const [activityFilter, setActivityFilter] = useState('all')
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<SortColumnId>('name')
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnId, boolean>>({
    image: true,
    name: true,
    category: true,
    origin: true,
    weight: true,
    height: true,
    life: true,
    activity: true,
    grooming: true,
  })

  const categoryOptions = useMemo(() => Array.from(new Set(dogs.map(dog => dog.category))).sort(), [])
  const originOptions = useMemo(() => Array.from(new Set(dogs.map(dog => dog.origin))).sort(), [])
  const activityOptions = useMemo(() => Array.from(new Set(dogs.map(dog => dog.activity))).sort(), [])

  const filteredDogs = useMemo(() => {
    const value = query.trim().toLowerCase()

    return dogs
      .filter(dog => categoryFilter === 'all' || dog.category === categoryFilter)
      .filter(dog => originFilter === 'all' || dog.origin === originFilter)
      .filter(dog => activityFilter === 'all' || dog.activity === activityFilter)
      .filter(dog => {
        if (!value) return true

        return [dog.name, dog.category, dog.origin, dog.short, dog.description, ...dog.temperament]
          .some(field => field.toLowerCase().includes(value))
      })
      .sort((first, second) => {
        const a = getSortValue(first, orderBy)
        const b = getSortValue(second, orderBy)
        const result = typeof a === 'number' && typeof b === 'number'
          ? a - b
          : String(a).localeCompare(String(b), 'ru')

        return order === 'asc' ? result : -result
      })
  }, [activityFilter, categoryFilter, order, orderBy, originFilter, query])

  const shownColumns = columns.filter(column => visibleColumns[column.id])
  const visibleCount = Object.values(visibleColumns).filter(Boolean).length

  const toggleColumn = (id: ColumnId) => {
    setVisibleColumns(current => {
      if (current[id] && visibleCount <= 1) return current
      return { ...current, [id]: !current[id] }
    })
  }

  const handleSort = (id: SortColumnId) => {
    const isAsc = orderBy === id && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(id)
  }

  return (
    <Container sx={{ py: 3 }}>
      <PageTitle
        title="Таблица пород"
        subtitle="Здесь можно фильтровать данные, сортировать строки и выбирать, какие столбцы показывать. Фото в таблице ведут на динамические страницы пород."
      />

      <Paper sx={{ p: 2, mb: 3 }} variant="outlined">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Поиск"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Название, страна, характер..."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2.5 }}>
            <TextField
              fullWidth
              select
              label="Тип"
              value={categoryFilter}
              onChange={event => setCategoryFilter(event.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {categoryOptions.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2.5 }}>
            <TextField
              fullWidth
              select
              label="Страна"
              value={originFilter}
              onChange={event => setOriginFilter(event.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {originOptions.map(origin => <MenuItem key={origin} value={origin}>{origin}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <TextField
              fullWidth
              select
              label="Активность"
              value={activityFilter}
              onChange={event => setActivityFilter(event.target.value)}
            >
              <MenuItem value="all">Все</MenuItem>
              {activityOptions.map(activity => <MenuItem key={activity} value={activity}>{activity}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Управление столбцами
        </Typography>
        <FormGroup row>
          {columns.map(column => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={visibleColumns[column.id]}
                  onChange={() => toggleColumn(column.id)}
                  disabled={visibleColumns[column.id] && visibleCount <= 1}
                />
              }
              label={column.label}
            />
          ))}
        </FormGroup>
      </Paper>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
        <Typography variant="body1" color="text.secondary">
          Найдено пород: <strong>{filteredDogs.length}</strong>
        </Typography>
        <Button variant="outlined" href="#/chart">
          Открыть диаграмму
        </Button>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {shownColumns.map(column => (
                <TableCell key={column.id} align={column.align ?? 'left'} sx={{ fontWeight: 700 }}>
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id as SortColumnId)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDogs.map(dog => (
              <TableRow key={dog.id} hover>
                {shownColumns.map(column => (
                  <TableCell key={column.id} align={column.align ?? 'left'}>
                    {column.render(dog)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {!filteredDogs.length && (
              <TableRow>
                <TableCell colSpan={shownColumns.length} align="center" sx={{ py: 6 }}>
                  Ничего не найдено. Измените фильтры или поисковый запрос.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

// ─── динамическая страница по клику на рисунки ────────────────────────────────

function DogPage({ id }: { id: string }) {
  const dog = dogs.find(item => item.id === id)

  if (!dog) {
    return (
      <Container sx={{ py: 6 }}>
        <PageTitle title="Порода не найдена" subtitle="Такой страницы нет. Можно вернуться к таблице и выбрать породу из списка." />
        <Button variant="contained" href="#/table">Перейти к таблице</Button>
      </Container>
    )
  }

  const stats = [
    { label: 'Тип', value: dog.category },
    { label: 'Страна', value: dog.origin },
    { label: 'Вес', value: `${dog.weightMin}–${dog.weightMax} кг` },
    { label: 'Рост', value: `${dog.heightMin}–${dog.heightMax} см` },
    { label: 'Продолжительность жизни', value: `${dog.lifeMin}–${dog.lifeMax} лет` },
    { label: 'Активность', value: dog.activity },
  ]

  return (
    <Box>
      <Box
        sx={{
          minHeight: { xs: 380, md: 540 },
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.78)), url(${dog.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >
        <Container sx={{ py: { xs: 5, md: 7 } }}>
          <Chip label="Динамическая страница" sx={{ bgcolor: 'rgba(255,255,255,0.9)', mb: 2 }} />
          <Typography variant="h2" component="h1" sx={{ fontWeight: 900, mb: 1 }}>
            {dog.name}
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 680 }}>
            {dog.short}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 2 }}>
                Описание породы
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                {dog.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Характер
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {dog.temperament.map(item => <Chip key={item} label={item} color="primary" variant="outlined" />)}
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 800, mb: 2 }}>
                Характеристики
              </Typography>
              <Stack spacing={1.5}>
                {stats.map(stat => (
                  <Box key={stat.label} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Typography color="text.secondary">{stat.label}</Typography>
                    <Typography sx={{ fontWeight: 700, textAlign: 'right' }}>{stat.value}</Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Button fullWidth variant="contained" href="#/table">К таблице</Button>
                <Button fullWidth variant="outlined" href="#/chart">К диаграмме</Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

// ─── страница с диаграммой ────────────────────────────────────────────────────

function ChartPage() {
  const chartData = dogs
    .map(dog => ({
      id: dog.id,
      name: dog.name,
      value: average(dog.lifeMin, dog.lifeMax),
      label: `${dog.lifeMin}–${dog.lifeMax} лет`,
    }))
    .sort((a, b) => b.value - a.value)

  const maxValue = Math.max(...chartData.map(item => item.value))
  const categoryStats = Array.from(new Set(dogs.map(dog => dog.category)))
    .map(category => ({ category, count: dogs.filter(dog => dog.category === category).length }))
    .sort((a, b) => b.count - a.count)

  return (
    <Container sx={{ py: 3 }}>
      <PageTitle
        title="Диаграмма"
        subtitle="Простая диаграмма на MUI показывает среднюю продолжительность жизни пород из проекта. Название породы кликабельно и ведёт на динамическую страницу."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Средняя продолжительность жизни
            </Typography>
            <Stack spacing={2}>
              {chartData.map(item => (
                <Box key={item.id}>
                  <Stack direction="row" spacing={2} sx={{ mb: 0.5, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button href={`#/dogs/${item.id}`} sx={{ justifyContent: 'flex-start', px: 0, textAlign: 'left' }}>
                      {item.name}
                    </Button>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.label}</Typography>
                  </Stack>
                  <Box sx={{ height: 16, bgcolor: 'grey.200', borderRadius: 999, overflow: 'hidden' }}>
                    <Box sx={{ width: `${(item.value / maxValue) * 100}%`, height: '100%', bgcolor: 'primary.main', borderRadius: 999 }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Количество пород по типам
            </Typography>
            <Stack spacing={2}>
              {categoryStats.map(item => (
                <Box key={item.category}>
                  <Stack direction="row" sx={{ mb: 0.5, justifyContent: 'space-between' }}>
                    <Typography>{item.category}</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{item.count}</Typography>
                  </Stack>
                  <Box sx={{ height: 12, bgcolor: 'grey.200', borderRadius: 999, overflow: 'hidden' }}>
                    <Box sx={{ width: `${(item.count / dogs.length) * 100}%`, height: '100%', bgcolor: 'success.main', borderRadius: 999 }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  return (
    <Box id="top" sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      <Navbar activePage={route.page} />
      {route.page === 'home' && <HomePage />}
      {route.page === 'table' && <TablePage />}
      {route.page === 'chart' && <ChartPage />}
      {route.page === 'quiz' && <QuizPage />}
      {route.page === 'dog' && <DogPage id={route.id} />}
      <Footer />
    </Box>
  )
}
