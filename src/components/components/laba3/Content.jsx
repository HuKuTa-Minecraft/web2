import { Paper, Typography } from '@mui/material';

const labTasks = {
  'Лабораторная 1': [
    'Реализовать скрипт, который уведомит о полной загрузке страницы',
    'Реализовать кнопку счетчик, которая будет увеличивать счетчик на "1" и вывести его значение на страницу (button onclick)',
    'Реализовать кнопку счетчик, которая будет уменьшать счетчик на "1" реализовать с помощью listener click',
    {
      title: 'Реализовать форму аутентификации пользователя (<form>)',
      subtasks: [
        'Реализовать скрипт очистки данных формы',
        'Реализовать скрипт отправки данных формы с помощью listener submit.',
        'Без отправки на сервер провести валидацию введенных данных, если login=="admin" & pass=="admin" вывести сообщение об успехе, иначе сообщение о неуспехе',
        'Реализовать скрипт сохранения учетных данных и автоподстановку оных с помощью localStorage'
      ]
    }
  ],
  'Лабораторная 2': [
    'Создать "Hello World" приложение на основе React.',
    'Для создания можно использовать create-react-app или vite',
    'Реализовать компонент кнопку, контейнер и использовать их на странице',
    'Реализовать шаблон страницы и разместить на нем компоненты навигации',
    'Разместить проект в репозиторий в github',
    'Прикрепить текстовый файл с сылкой на проект'
  ],
  'Лабораторная 3': [
    'Продолжаем задание "Реализовать шаблон страницы и разместить на нем компоненты навигации" (Можно использовать готовые библиотеки Mui/Bootstrap и тд)',
    {
      title: 'Продолжаем задание (дополнительно):',
      subtasks: [
        'Реализуем компоненты Header, Footer, Menu и Content',
        'В меню выводим список лабораторных работ',
        'В Content выводим содержимое лабораторной работы'
      ]
    },
    'Разместить проект в репозиторий в github',
    'Прикрепить текстовый файл с сылкой на проект'
  ],
  'Лабораторная 4': [
    'Реализовать изменение темы (день/ночь) используя Context', 
    'useState и useEffect - простые примеры',
    {
      title: 'Дополнительно:',
      subtasks: [
        'useEffect на монтировании и размонтировании страницы'
      ]
    },
    'Внедрить в проект react-router',
    {
      title: 'Дополнительно:',
      subtasks: [
        'В меню проекта реализовать ссылки переходы', 
        'В Content реализовать обработчик роутов'
      ]
    },
    'Внедрить в проект redux'
  ]
};

export default function Content({ lab }) {
  const tasks = lab ? labTasks[lab.title] : [];

  const renderTasks = (tasks) => (
    <ol style={{ paddingLeft: '20px' }}>
      {tasks.map((task, index) => {
        if (typeof task === 'string') {
          return (
            <li key={index}>
              <Typography variant="body2">{task}</Typography>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {task.title}
              </Typography>
              <ul style={{ paddingLeft: '20px' }}>
                {task.subtasks.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Typography variant="body2">{sub}</Typography>
                  </li>
                ))}
              </ul>
            </li>
          );
        }
      })}
    </ol>
  );

  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'left' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {lab?.title || 'Выберите лабораторную работу'}
      </Typography>
      {lab && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Задания:
          </Typography>
          {renderTasks(tasks)}
        </>
      )}
    </Paper>
  );
}
