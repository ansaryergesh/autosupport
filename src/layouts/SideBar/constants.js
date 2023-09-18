import users from 'images/users.svg';
import reviews from 'images/message-square-lines.svg';
import organizations from 'images/organizations.svg';
import resources from 'images/resources.svg';
import oldTickets from 'images/oldTickets.svg';
import newTickets from 'images/newTickets.svg';
import search from 'images/search.svg';
import { checkPermissions } from '../../helpers/checkPermission';

export const adminNavItems = [
  {
    name: 'employee',
    path: '/employees',
    icon: users,
  },
  {
    name: 'reviews',
    path: '/feedback',
    icon: reviews,
  },
  {
    name: 'searchHistory',
    path: '/search-history',
    icon: search,
  },
  {
    name: 'resources',
    path: '/resources',
    icon: resources,
  },
  {
    name: 'newTickets',
    path: '/new-tickets',
    icon: newTickets,
  },
  {
    name: 'oldTickets',
    path: '/old-tickets',
    icon: oldTickets,
  },
  checkPermissions(['ROLE_SUPER_ADMIN']) && {
    name: 'organizations',
    path: '/organizations',
    icon: organizations,
  },
];

export const initialMenuItems = [
  {
    id: 'home',
    label: 'Сколько занимает открытие счета1',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
    order: 1,
  },
  {
    id: 'about',
    label: 'Сколько занимает открытие счета2',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
    order: 2,
  },
  {
    id: 'home1',
    label: 'Сколько занимает открытие счета3',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about1',
    label: 'Сколько занимает открытие счета4',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home2',
    label: 'Сколько занимает открытие счета5',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about2',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home3',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about3',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home1',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about1',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home2',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about2',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home3',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about3',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'home',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
  {
    id: 'about',
    label: 'Сколько занимает открытие счета',
    questions: [
      { name: 'Продвинутые функции' },
      { name: 'Веб версия и мобильная' },
      { name: 'Основные фуниции' },
      { name: 'Проблемы с платформой' },
      { name: 'Веб версия и мобильная' },
    ],
  },
];
