const ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

const POEMS = [
  `Не жалею, не зову, не плачу,
Всё пройдет, как с белых яблонь дым.
Увяданья золотом охваченный,
Я не буду больше молодым.
Ты теперь не так уж будешь биться,
Сердце, тронутое холодком,
И страна берёзового ситца
Не заманит шляться босиком.
Дух бродяжий! ты все реже, реже
Расшевеливаешь пламень уст
О моя утраченная свежесть,
Буйство глаз и половодье чувств.`,

  `Буря мглою небо кроет,
Вихри снежные крутя;
То, как зверь, она завоет,
То заплачет, как дитя,
То по кровле обветшалой
Вдруг соломой зашумит,
То, как путник запоздалый,
К нам в окошко застучит.
Наша ветхая лачужка
И печальна, и темна.
Что же ты, моя старушка,
Приумолкла у окна?
Или бури завываньем
Ты, мой друг, утомлена,
Или дремлешь под жужжаньем
Своего веретена?`,

  `Мой дядя самых честных правил,
Когда не в шутку занемог,
Он уважать себя заставил
И лучше выдумать не мог.
Его пример другим наука;
Но, боже мой, какая скука
С больным сидеть и день и ночь,
Не отходя ни шагу прочь!
Какое низкое коварство
Полуживого забавлять,
Ему подушки поправлять,
Печально подносить лекарство,
Вздыхать и думать про себя:
Когда же чёрт возьмёт тебя!`,
];

const CIPHERTEXT = '73 40 82 73 11 65 47 41 24 73 79 36 21 20 56 66 60 99 69 73 97 11 87 36 42 63 77 96 73 61 35 29 97 11 80 11 58 68 73 23 39 48 24 87 48 22 34 26 73 64 60 40 61 77';

const codes = CIPHERTEXT.split(' ');
for (let i = 0; i < codes.length; i++) {
  codes[i] = Number(codes[i]);
}

function getLines(poem) {
  const lines = poem.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 0) {
      result.push(line);
    }
  }
  return result;
}

function onlyLetters(str) {
  const result = [];
  str = str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch >= 'а' && ch <= 'я' || ch === 'ё') {
      result.push(ch);
    }
  }
  return result;
}

function buildMatrix(poem, n) {
  const lines = getLines(poem);

  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = '';
    }
  }

  for (let i = 0; i < n - 1; i++) {
    const letters = lines[i] ? onlyLetters(lines[i]) : [];
    for (let j = 0; j < n && j < letters.length; j++) {
      matrix[i][j] = letters[j];
    }
  }

  const missing = [];
  for (let i = 0; i < ALPHABET.length; i++) {
    const letter = ALPHABET[i];
    let found = false;
    for (let row = 0; row < n - 1; row++) {
      for (let col = 0; col < n; col++) {
        if (matrix[row][col] === letter) {
          found = true;
        }
      }
    }
    if (!found) {
      missing.push(letter);
    }
  }

  const lastRow = missing;
  const nextLine = lines[n - 1] ? onlyLetters(lines[n - 1]) : [];
  for (let k = 0; lastRow.length < n && k < nextLine.length; k++) {
    lastRow.push(nextLine[k]);
  }
  for (let j = 0; j < n && j < lastRow.length; j++) {
    matrix[n - 1][j] = lastRow[j];
  }

  return matrix;
}

function decode(codes, matrix, n) {
  let result = '';

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    let row, col;

    if (n <= 10) {
      const s = String(code).padStart(2, '0');
      row = Number(s[0]);
      col = Number(s[1]);
    } else {
      const s = String(code).padStart(4, '0');
      row = Number(s[0] + s[1]);
      col = Number(s[2] + s[3]);
    }

    if (row < n && col < n && matrix[row][col] !== '') {
      result += matrix[row][col];
    }
  }

  return result;
}

function printMatrix(matrix, n) {
  let header = '     ';
  for (let i = 0; i < n; i++) {
    header += String(i).padStart(3);
  }
  console.log(header);

  for (let i = 0; i < n; i++) {
    let row = '  ' + String(i).padStart(2) + ' ';
    for (let j = 0; j < n; j++) {
      row += (matrix[i][j] || ' ').padStart(3);
    }
    console.log(row);
  }
}

for (let i = 0; i < POEMS.length; i++) {
  for (let n = 9; n <= 10; n++) {
    console.log('Пробуем: Стихотворение ' + (i + 1) + ', n=' + n);

    const matrix = buildMatrix(POEMS[i], n);
    const decoded = decode(codes, matrix, n);

    console.log('  Результат: "' + decoded + '"');
    printMatrix(matrix, n);
    console.log();
  }
}
