# CRM заявки

Учебная CRM для работы с заявками на курсы: таблица с фильтрами по статусу и продукту, добавление заявки через форму, редактирование и удаление. React Router с HashRouter, уведомления через toast.

Серверный слой заменён на локальный мок: демо-данные хранятся в `localStorage` посетителя, все CRUD-операции работают на клиенте, при первом запуске данные засеиваются из `src/data/applications.json`.

## Стек

React 18, Create React App, React Router 7, Bootstrap 5, react-toastify.

## Запуск

```bash
npm install
npm start      # http://localhost:3000
```

Команды: `npm run build` (сборка в `build/`, относительные пути через `homepage: "."`).

## Структура

- `src/components/` — App (состояние заявок и CRUD), Navbar, формы добавления и редактирования, таблица, панели фильтров
- `src/pages/` — страницы Form, Table, Edit
- `src/components/App/styles/` — стили по файлам: reset, layout (левая панель и шапка), project-nav, utilities (отступы), собираются через `index.css`
- `src/custom/mockServer.js` — локальный слой данных вместо json-server: чтение и запись в `localStorage` с небольшой задержкой, как у сетевого запроса
- `src/data/applications.json` — демо-данные (11 заявок), сид для первого запуска. Имена, телефоны и почты вымышленные, почты на зарезервированных для примеров доменах `example.*`
- `public/` — фавиконка в `img/favicons/` и аватар в `img/avatars/`

## Деплой

GitHub Pages раздаёт корень ветки `main`, туда коммитится содержимое `build/`. Сайт: <https://gitmaxm.github.io/react-crm/>.
