export const dataText = [
  {
    preview: `Вы находитесь на странице предпросмотра. Здесь можно увидеть как текст будет отображаться в клиентской части сайта`,

    employees: `Функционал Добавить нового сотрудника:
- Открывается окно с полями для заполнения:
   1. Имя
   2. Фамилия
   3. Почта
   4. Пароль
   5. Язык
   6. Роль
- При нажатии “ОК” создается новый сотрудник.
- При нажатии на “Отменить” окно закрывается, и данные не сохраняются.

Функционал Действия:
- При нажатии на “Редактировать” можно изменить язык и роль сотрудника.
- При нажатии “ОК” сохраняются изменения.
- При нажатии на “Отменить” окно закрывается, и данные не сохраняются.
- При нажатии на “Удалить” пользователю выйдет уведомление, “Вы уверены?”
- При нажатии “ОК” сотрудник удаляется.
- При нажатии на “Отменить” окно закрывается, и данные не удаляются.
`,

    feedback: `При открытии страницы “Отзывы” пользователь видит оценки от 1 до 5
Функционал Метки: при нажатии на + пользователю выходит окно с полями для заполнения
  1. Оценка (ставится автоматически, смотря на какой оценки нажат +)
  2. Наименование метки на русском
  3. Наименование метки на казахском
  4. Наименование метки на английском
Можно добавить максимум 5 меток на каждый балл. 
При нажатии на “ОК” данные сохраняются
При нажатии на “Отмена” данные не сохраняется и метка не создается
Если нужноудалить/редактировать отзыв, можно нажать на 3 точки
Функционал Аналитика отзывов. Пользователь видит какие оценки ставили на ответы и среднюю оценку по всем ответам. 
Можно увидеть список всех отзывов, фильтровать их по датам и скачать все отзывы списком.`,

    searchHistory: `История поиска будет заполняться запросами, которые вводили клиенты. 
Для каждого запроса, который будет отображен в таблице, будет предоставлено несколько действий над ними: 
   1) удаление 
   2) добавление
Мы можем отслеживать сколько клиентов ввело в поисковое поле одно и то же слово, и при желании добавить его в список “Ключевые слова” или “Тэг” для дальнейшего их прикрепления к ответам на вопросы.`,

    resources: `Функционал Ресурс необходим для того, чтобы в Ответах клиент мог выбрать для какой платформы и какой компании нужен ответ: Приложение Tradernet, Сайт Tradernet, Клиент АО, Клиент Глобал. 
При нажатии на “Добавить ресурс” пользователю выходит окно с полями для заполнения
   1.	Код
   2.	Наименование ресурса на русском 
   3.	Наименование ресурса на казахском
   4.	Наименование ресурса на английском
При нажатии на “ОК” данные сохраняются и создается новый ресурс
При нажатии на “Отменить” данные не сохраняются и ресурс не создается
При нажатии на галочку рядом с ресурсами пользователь может выбрать определенные ресурсы и удалить выбранные
При нажатии на “Удалить выбранные” пользователю выходит предупреждение “Вы уверены?”
При нажатии на “ОК” выбранные ресурсы удаляются
При нажатии на “Отменить” выбранные данные не удаляются
При нажатии на “Редактировать ресурс” пользователю выходит окно с полями для редактирования с уже заполненными данными, которые можно изменить
При нажатии на “ОК” данные изменяются
При нажатии на “Отменить” измененные данные не сохраняются`,

    newTickets: `Страница Новые тикеты, пользователь видит список всех тикетов
Пользователь может осуществить поиск по теме и почте
При нажатии на + тикет раскрывается
При нажатии на “Обработан” тикет переходит в “Обработанные тикеты”
При нажатии на “Возможность отправки тикетов” можно включать и отключать возможность отправки тикетов с клиентской части
При нажатии на “Скачать тикеты” пользователь может скачать все тикеты
    
В случае если клиент не нашел ответа на свой вопрос, то он может оставить заявку с описанием вопроса, который сохранится на странице “Новые тикеты” для дальнейшей обработки менеджером, а также будет отправлен на почту колл-центра callcenter@ffin.kz, откуда клиенту поступит ответ. Связь с клиентом проводится посредством почты.
    `,

    oldTickets: `Пользователь может осуществить поиск по теме и почте. При нажатии на + тикет раскрывается.`,

    answer: `При нажатии на + пользователь может добавить ресурс к определенному вопросу в зависимости от ответа (есть ли разделение на ресурсы)
При нажатии на Языки пользователь может переключаться между языками и заполнять данные для определенного ресурса и  языка
Заполнение Описание ответа, пользователь может редактировать текст
К вопросу вы можете закрепить похожий запрос, тег, ключевое слово которые будут упрощать поиск вопроса для клиента и пользователя админкой
С админской части можно добавить “Фото инструкцию” путем загрузки пояснительных картинок с компьютера. После нажатия на кнопку “+ Upload” открывается проводник Windows с файлами которые хранятся на компьютере.
Картинки должны быть до 2 мб и в формате png. 
В проводнике выбираете фото и добавляете описание к каждому фото. Например: Как открыть счет. Шаг №1.
Также можно добавить Видео инструкцию. Для этого нужно вставить ссылку URL формата в специальное поле. Далее нужно добавить описание к видео.
После заполнения необходимых данных для фото и видео инструкций необходимо нажать на кнопку “Предпросмотр”.
После перехода на предпросмотр вы можете проверить то, как будет отображаться новая страница и сверить все ли данные были введены корректно.
  
При нажатии на карандаш пользователь может добавить количество кликов для поднятия ответа в списке популярных тем. Самое большое количество кликов определяет ответ на первое место по популярности. Также можно уменьшить количество кликов, если ответ уже не актуален.  
  
Похожий запрос – это блок, который видят клиенты заходя в любой ответ. Сюда добавляются подходящие по смыслу и логике ответы. Например, пользователь читает ответ про то, что такое Акции. Логично в блок Похожие Запросы добавить вопросы, которые спровоцируют клиента пойти дальше: Как начать инвестировать? Как открыть счет? И так далее.
  
Ключевые слова – это то, как клиент ищет свой вопрос на сайте. Каждое ключевое слово, по которому не был найден, ответ падает в раздел История поиска. Выбираем нужное слово и добавляем его в ключевые слова. 
Далее в разделе Редактирование ответа мы можем добавить это ключевое слово к нужному ответу, чтобы в дальнейшем оно отвечала этому запросу от клиентов. 

Теги – предназначены для быстрого и легкого поиска ответов пользователями административной панели. К каждому ответу можно добавить любой тег, который подходит по смысловой нагрузке к ответу. Далее в поиске в админке мы можем по тегам искать все нужные ответы. 
`,
    category: `Страница Тем с подвопросами с описанием, нажав на карандаш пользователь может отредактировать название вопроса и описание вопроса
Так выглядит редактирование вопроса и его описания после нажатия на кнопку редактирования (Карандаш). Отредактированные данные сохраняются сразу после нажатия кнопки “Enter”.`,

    langKey: 'RU'
  },
  {
    preview: `Сіз алдын ала қарау бетіндесіз. Бұл жерде тексттің сайттың клиенттік бөлігінде қалай бейнеленетінін көруге болады`,

    employees: `"Функционал Жаңа қызметкерді қосу" - толтыру үшін өрістері бар терезе ашылады:
    1. Аты
    2. Тегі
    3. Пошта
    4. Құпия сөз
    5. Тіл
    6. Рөлі
"ОК" басқан кезде жаңа қызметкер жасалады.
"Болдырмау" түймешігін басқан кезде терезе жабылады және деректер сақталмайды
Іс-әрекеттер функционалы:
"Түзетуді" басқан кезде қызметкердің тілі мен рөлін өзгертуге болады
"ОК" басқан кезде жаңа қызметкер жасалады
"Болдырмау" түймешігін басқан кезде терезе жабылады және деректер сақталмайды
"Жою" түймешігін басқан кезде пайдаланушыға "Сенімдісіз бе?" деген хабарлама шығады.
"ОК" басқан кезде жаңа қызметкер жасалады
"Болдырмау" түймешігін басқан кезде терезе жабылады және деректер жойылмайды
`,

    feedback: `"Пікірлер" бетін ашқан кезде пайдаланушы 1-ден 5-ке дейінгі бағаны көреді
Белгілер функционалы: + басқан кезде пайдаланушыға толтыру үшін өрістері бар терезе шығады
  1. Бағалау (қандай бағаға + басылғанына байланысты автоматты түрде қойылады)
  2. Орысша белгінің атауы
  3. Қазақша белгінің атауы
  4. Ағылшынша белгінің атауы
Әр балға ең көп дегенде 5 белгі қосуға болады.
"ОК" басқан кезде деректер сақталады
"Болдырмау" түймешігін басқан кезде деректер сақталмайды және белгі жасалмайды
Егер пікірді жою/түзету қажет болса, 3 нүктені басуға болады
Пікірлерді талдаушы функционалы. Пайдаланушы жауаптарға қандай баға қойылғанын және барлық жауаптар бойынша орташа бағаны көреді.
Барлық пікірлердің тізімін көруге, оларды күндері бойынша сүзуге және барлық пікірлерді тізіммен жүктеуге болады.`,

    searchHistory: `Іздеу тарихы клиенттер енгізген сұраулармен толтырылады. Кестеде көрсетілетін әр сұрау үшін олармен жүргізілетін бірнеше әрекет ұсынылады:
     1) жою
     2) қосу
Біз қанша клиенттің іздеу жиег3не бір сөзді енгізгенін бақылай аламыз және оны одан әрі сұрақтарға жауаптарға бекіту үшін "Түйінді сөздер" немесе "Тэг" тізіміне қоса аламыз.`,

    resources: `Ресурс функционалы Жауаптарда клиент қандай платформаны және компанияға қандай жауап қажет екенін таңдай алуы үшін қажет: Tradernet қосымшасы, Tradernet сайты, АҚ Клиенті, Глобал клиенті.
"Ресурс қосу" түймешігін басқан кезде пайдаланушыға толтыру үшін өрістері бар терезе шығады
    1.	Код
    2.	Ресурстың орыс тіліндегі атауы
    3.	Ресурстың қазақ тіліндегі атауы
    4.	Ресурстың ағылшын тіліндегі атауы
"ОК" басқан кезде деректер сақталады және жаңа ресурс құрылады
"Болдырмау" түймешігін басқан кезде деректер сақталмайды және ресурс жасалмайды
Ресурстардың жанында белгі басу кезінде пайдаланушы белгілі бір ресурстарды таңдап, таңдалғандарды жоя алады
"Таңдалғандарды жою" түймешігін басу кезінде пайдаланушыға "Сенімдісіз бе?" деген ескерту шығады.
"ОК" басу кезінде таңдалған ресурстар жойылады
Болдырмау "түймешігін басу кезінде таңдалған деректер жойылмайды
"Ресурсты өңдеу" түймешігін басу кезінде пайдаланушыға өзгертуге болатын деректері толтырылған өңдеуге арналған өрістері бар терезе шығады
"ОК" басу кезінде деректер өзгереді
Болдырмау "түймешігін басу кезінде өзгертілген деректер сақталмайды`,

    newTickets: `"Жаңа тикеттер беті, пайдаланушы барлық тикеттердің тізімін көреді
тақырып және пошта арқылы іздей алады
+ басқан кезде тикен ашылады
"Өңделген" түймешігін басқан кезде тикет "Өңделген тикеттерге" ауысады
"Тикеттерді жіберу мүмкіндігі" түймешігін бақан кезде клиенттік бөліктен тикеттерді жіберу мүмкіндігін қосуға және ажыратуға болады
"Тикеттерді жүктеу" түймешігін басқан кезде пайдаланушы барлық тикеттерді жүктей алады"
    
Егер клиент өз сұрағына жауап таппаса, онда ол менеджердің одан әрі өңдеуі үшін "Жаңа тикеттер" бетінде сақталатын сұрақтың сипаттамасы бар өтінімді қалдыра алады, сондай-ақ клиентке жауап келіп түсетін callcenter@ffin.kz колл-орталығының поштасына жіберіледі. Клиентпен байланыс пошта арқылы жүргізіледі.
    `,

    oldTickets: `Пайдаланушы тақырып және пошта арқылы іздеуді жүзеге асыра алады + басқан кезде тикет ашылады`,

    answer: `"+" басқан кезде пайдаланушы жауабына байланысты белгілі бір сұраққа ресурс қоса алады (ресурстарға бөліну бар ма)
Тілдерді басқан кезде пайдаланушы тілдер арасында ауысып, белгілі бір ресурс пен тіл үшін деректерді толтыра алады
Жауаптың сипаттамасын толтыру, пайдаланушы мәтінді өңдей алады
Сұраққа ұқсас сұрауды, тег, кілт сөзді бекіте аласыз, олар клиент пен пайдаланушы үшін мәселені админкамен іздеуді жеңілдетеді
Админдік бөлімнен компьютерден түсіндірме суреттерді жүктеу арқылы "Фото нұсқаулықты" қосуға болады. "+ Upload" түймешігін басқаннан кейін компьютерде сақталатын файлдары бар Windows өткізгіші ашылады.
Суреттер 2 мб дейін және png форматында болуы тиіс.
Жолсерікте суретті таңдап, әр суретке сипаттама қосасыз. Мысалы: Есепті қалай ашу керек. № 1 қадам.
Бейне нұсқауды да қосуға болады. Бұл үшін арнайы өріске пішімнің URL сілтемесін кірістіру қажет. Одан әрі сипаттаманы бейнеге қосу керек.
Фото және бейне нұсқаулар үшін қажетті деректерді толтырғаннан кейін "Алдын ала қарау" түймешігін басу қажет.
Алдын ала тексеруге өткеннен кейін жаңа беттің қалай көрсетілетінін және барлық деректердің дұрыс енгізілгенін тексеруге болады. 
  
Қарындашты басқан кезде пайдаланушы танымал тақырыптар тізімінде жауапты көтеру үшін түймешіктер санын қоса алады. Ең көп перне басу танымалдылығы бойынша бірінші орындағы жауапты анықтайды. Егер жауап өзекті болмаса, перне басулар санын азайтуға болады.  
  
Ұқсас сұрау - клиенттер кез келген жауапқа кіргенде көретін блок. Бұл жерге мағынасы мен қисыны жағынан лайықты жауаптар қосылады. Мысалы, пайдаланушы Акциялардың не екені туралы жауап оқиды. Осыған ұқсас Сұраулар блогына клиентті ары қарай жүруге итермелейтін мәселелерді қосу қисынды: Инвестициялауды қалай бастауға болады? Шотты қалай ашуға болады? Және тағы сондай сондай.
  
Түйінді сөздер - клиенттің өз мәселесін сайттан қалай іздеуі. Табылмаған әрбір түйінді сөз Іздеу тарихы бөліміне түседі. Қажетті сөзді таңдап, түйінді сөздерге қосамыз.
Бұдан әрі Жауапты түзету бөлімінде біз осы түйінді сөзді, әрі қарай ол клиенттердің осы сұрауына жауап беруі үшін қажет жауапқа қоса аламыз  

Тегтер - әкімшілік тақтаның пайдаланушыларымен жауаптарды жылдам және оңай іздеуге арналған. Әр жауапқа жауаптың мағыналық жүктемесі бойынша сәйкес келетін кез келген тег қосуға болады. Одан әрі админкадан іздеу барысында біз тегтер бойынша барлық қажетті жауаптарды іздей аламыз. 
`,

    category: `Шағын сұрақтар мен сипаттаманы қамтитын Тақырыптар беті қарындашты басу арқылы пайдаланушы сұрақтың атауын және сұрақтың сипаттамасын өңдей алады
Сұрақ пен оның сипаттамасын өңдеу түймешігін (Қарындаш) басқаннан кейін редакциялау осылай көрінеді. Реттелген деректер "Enter" түймешігін басқаннан кейін бірден сақталады.`,

    langKey: 'KZ'
  },
  {
    preview: `You are on the preview page. Here you can see how the text will be displayed in the client part of the site`,

    employees: `"Add a new employee" Functionality - a window opens with fields to complete:
    1. Name
    2. Surname
    3. E-mail
    4. Password
    5. Language
    6. Role
By clicking “OK”, a new employee is created
By clicking “Cancel”, the window closes and the data is not saved
Actions Functionality:
By clicking “Edit”, you can change the language and role of the employee
By clicking “OK”, a new employee is created
By clicking “Cancel”, the window closes and the data is not saved
By clicking “Delete”, the user will be notified “Are you sure?”
By clicking “OK”, a new employee is created
By clicking “Cancel”, the window closes and the data is not deleted.
`,

    feedback: `When opening the “Reviews” page, the user sees ratings from 1 to 5
Tags functionality: by clicking "+", the user is presented with a window with fields to complete
  1. Rating (set automatically, depending on which rating you press "+")
  2. Tag name in Russian
  3. Tag name in Kazakh
  4. Tag name in English
You can add a maximum of 5 tags per point.
By clicking “OK”, the data is saved
By clicking “Cancel”, the data is not saved and the tag is not created
If you need to delete/edit a review, you can click on the 3 dots
Review Functionality analytics. The user sees what ratings were given to the answers and the average rating for all answers.
You can see a list of all reviews, filter them by date and download all reviews as a list.`,

    searchHistory: `The search history will be filled with requests entered by customers. For each request that will be displayed in the table, several actions will be provided:
     1) remove
     2) add 
We can track how many customers entered the same word into the search field, and if desired, add it to the “Keywords” or “Tag” list for further attachment to the answers to questions.`,

    resources: `Resource functionality is necessary to provide, in the Answers, customer with opportunity to choose for which platform and which company the answer is needed: Tradernet app, Tradernet website, JSC Customer, Global Customer.
When clicking “Add resource”, the user is presented with a window with fields to complete:
    1. Code
    2. Name of the resource in Russian
    3. Name of the resource in Kazakh
    4. Name of the resource in English
By clicking “OK”, the data is saved and a new resource is created
By clicking “Cancel,” the data is not saved and the resource is not created
By clicking on the checkmark next to resources, the user can select specific resources or delete selected ones
By clicking “Delete selected”, the user receives a warning “Are you sure?”
By clicking “OK”, the selected resources are deleted
By clicking “Cancel”, the selected data is not deleted
When clicking “Edit resource”, the user is presented with a window with fields for editing with data already completed that can be changed
By clicking “OK”, the data changes
By clicking “Cancel,” the changed data is not saved.`,

    newTickets: `"New tickets" page: the user sees a list of all tickets
The user can search by topic and e-mail
By clicking "+", the ticket opens
By clicking “Processed”, the ticket is transferred to “Processed tickets”
By clicking “Option to send tickets”, you can enable or disable the option to send tickets from the customer side
By clicking “Download tickets”, the user can download all tickets
    
If the customer has not found an answer to the question, customer may leave a request describing the question, which will be saved on the “New tickets” page for further processing by the manager, and will also be sent to the call center e-mail callcenter@ffin.kz, from where the customer will receive a response. Communication with the customer is carried out via e-mail.
    `,

    oldTickets: `The user can search by topic and e-mail
By clicking "+", the ticket opens`,

    answer: `By clicking "+", the user can add a resource to a specific question depending on the answer (whether there is a division into resources)
By clicking Languages, the user can switch between languages and complete data for a specific resource and language
Completing the Description of the response: the user can edit the text
You can attach a similar request, tag, or keyword to a question that will simplify the search for the question for the customer and the admin user
From the admin area you can add “Photo guidance” by uploading explanatory pictures from your computer. By pressing “+ Upload” button, Windows Explorer opens with files saved on the computer.
Pictures must be up to 2 MB and in png format.
In Explorer, select a photo and add a description to each photo. For example: How to open an account.
Step 1.
You can also add Video guidance. To do this, you need to paste the URL format link into a special field. Next, you need to add a description to the video.
After filling out the necessary data for photo and video guidances, you must click on the “Preview” button.
After switching to preview, you can check how the new page will be displayed and check whether all the data was entered correctly.
  
By clicking on the pencil, the user can add the number of clicks to raise the answer in the list of popular topics. The largest number of clicks determines the answer to the first place in popularity. You can also reduce the number of clicks if the answer is no longer relevant. 
  
Similar Request is a block that customers see when entering any response. Answers that are appropriate in meaning and logic are added here. For example, a user reads an answer about what Stocks are. It’s logical to add to the Similar Requests block questions that will incite the customer to go further: How to start investing? How to open an account? And so on.
  
Keywords are how the customer searches for question on the site. For each keyword that was not found, the answer falls into the Search History section. Select the desired word and add it to the keywords. Next, in the Edit Response section, we can add this keyword to the desired response so that in the future it will meet this request from customers.

Tags are intended for quick and easy search of answers by users of the administrative panel. To each answer, you can add any tag that matches the semantic load of the answer. Next, in the search in the admin panel, we can search for all the necessary answers by tags.
`,

    category: `Topics page with sub-questions with descriptions, by clicking on the pencil the user can edit the subject and description of the question.
This is what editing a question and its description looks like after clicking on the edit button (Pencil).
The edited data is saved immediately after pressing the “Enter” button.`,

    langKey: 'EN'
  }
];
