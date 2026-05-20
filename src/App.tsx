import { useState, useEffect, useCallback } from 'react'
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  Menu, MenuItem, TextField, InputAdornment, Grid,
  Card, CardContent, CardMedia, IconButton, MobileStepper,
  Paper
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

const carouselImages = [
  { url: gerOvcharkaImg, label: 'Немецкая овчарка' },
  { url: frBulldogImg, label: 'Французский бульдог' },
  { url: goldRetriverImg, label: 'Золотистый ретривер' },
  { url: americanBulldogImg, label: 'Американский бульдог' },
  { url: pudelImg, label: 'Пудель' },
]

const smallItems = [
  {
    name: 'Золотистый ретривер',
    url: goldRetriverImg,
    text: 'Добродушная и преданная порода'
  },
  {
    name: 'Мальтийская болонка',
    url: maltBolonkaImg,
    text: 'Грациозная декоративная собачка'
  },
]

const bigItems = [
  {
    name: 'Французский бульдог',
    url: frBulldogImg,
    text: 'Французский бульдог — компактная и дружелюбная порода собак-компаньонов.',
  },
  {
    name: 'Пудель',
    url: pudelImg,
    text: 'Пудель — умная и легко обучаемая порода собак.',
  },
  {
    name: 'Американский бульдог',
    url: americanBulldogImg,
    text: 'Американский бульдог — сильная и энергичная порода собак.',
  },
]

const smallItems2 = [
  {
    name: 'Булли',
    url: bullyImg,
    text: 'Мощная и мускулистая порода'
  },
  {
    name: 'Чихуахуа',
    url: chihuahuaImg,
    text: 'Миниатюрная декоративная собака'
  },
]

// ─── компоненты ───────────────────────────────────────────────────────────────

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: '#f8f9fa' }}>
      <Toolbar sx={{ gap: 1, flexWrap: 'wrap' }}>
        <Button color="inherit" href="#top" sx={{ fontWeight: 600 }}>
          Домашняя страница
        </Button>

        <Button
          color="inherit"
          onClick={e => setAnchorEl(e.currentTarget)}
          endIcon={<span style={{ fontSize: 10 }}>▼</span>}
        >
          Другие страницы
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem component="a" href="#" onClick={() => setAnchorEl(null)}>Булли</MenuItem>
          <MenuItem component="a" href="#" onClick={() => setAnchorEl(null)}>Китайская хохолка</MenuItem>
          <MenuItem component="a" href="#" onClick={() => setAnchorEl(null)}>Чихуахуа</MenuItem>
        </Menu>

        <Box sx={{ flexGrow: 1 }} />

        <TextField
          size="small"
          placeholder="Найти"
          variant="outlined"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button size="small" variant="outlined" color="success" sx={{ ml: 0.5, minWidth: 'auto', px: 1.5 }}>
                    Поиск
                  </Button>
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 220 }}
        />
      </Toolbar>
    </AppBar>
  )
}

function Carousel() {
  const [active, setActive] = useState(0)
  const total = carouselImages.length
  const next = useCallback(() => setActive(a => (a + 1) % total), [total])
  const prev = () => setActive(a => (a - 1 + total) % total)

  useEffect(() => {
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [next])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 500, overflow: 'hidden', bgcolor: '#000' }}>
      {carouselImages.map((img, i) => (
        <Box
          key={img.url}
          component="img"
          src={img.url}
          alt={img.label}
          sx={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        />
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
        variant="dots" steps={total} position="static" activeStep={active}
        nextButton={null} backButton={null}
        sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', bgcolor: 'transparent', '& .MuiMobileStepper-dot': { bgcolor: 'rgba(255,255,255,0.5)' }, '& .MuiMobileStepper-dotActive': { bgcolor: '#fff' } }}
      />
    </Box>
  )
}

function SmallItems({ items }: { items: typeof smallItems }) {
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={3} sx={{ justifyContent: 'space-evenly' }}>
        {items.map(item => (
          <Grid key={item.name} size={{ xs: 12, sm: 5 }}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Box component="img" src={item.url} alt={item.name}
                sx={{ height: 80, width: 'auto', objectFit: 'cover', mb: 1 }}
                onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/120x80/2196F3/fff?text=${encodeURIComponent(item.name)}` }}
              />
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.text}</Typography>
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
              <CardMedia component="img" image={item.url} alt={item.name}
                sx={{ height: 200, objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/400x200/1565C0/fff?text=${encodeURIComponent(item.name)}` }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{item.name}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{item.text}</Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, textDecoration: 'underline', cursor: 'pointer', textAlign: 'right' }}
                >
                  Подробнее
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
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

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Box id="top">
      <Navbar />
      <Carousel />
      <SmallItems items={smallItems} />
      <BigItems />
      <SmallItems items={smallItems2} />
      <Footer />
    </Box>
  )
}
