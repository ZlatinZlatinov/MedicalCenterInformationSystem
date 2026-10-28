# Agent log

One entry per agent session, newest at the bottom. Be honest: what went wrong is the useful part.

<!-- Copy this block for each session:

## YYYY-MM-DD · <short title>
- Goal:
- Delegated:
- Checkpoints:
- Went wrong:
- Changed by hand:

-->

## 2026-10-14 · Първоначално свързване на MCP сървъра и тестване на инструментите
- Goal: Свързване на Gemini CLI с локалния MCP сървър и проверка на регистрацията на инструментите.
- Delegated: Подадох въпрос към Gemini без да назовавам инструмент: "What does lecture 7 cover?", за да тествам дали моделът автоматично ще повика find_lecture.
- Checkpoints: Използвах командата /mcp за потвърждаване на връзката към my-project и пуснах самопроверката check.mjs.
- Went wrong: Моделът поиска изрично потвърждение преди всяко извикване на инструмент; при грешен номер на лекция първоначално върна грешка на ниво протокол вместо резултат.
- Changed by hand: Добавих обработка на несъществуваща лекция с връщане на textResult и флаг isError: true в mcp-server/server.js.

## 2026-10-14 · Експеримент с описанието на find_lecture
- Goal: Провеждане на експеримента за промяна на описанието (description) на инструмента find_lecture.
- Delegated: Подадох отново същия въпрос "What does lecture 7 cover?" след промяна на текста на описанието в server.js.
- Checkpoints: Проследих поведението на модела, проверих логовете got: в конзолата и отчетох токените чрез /stats.
- Went wrong: Първоначално описанието беше прекалено подробно и моделът се колебаеше дали да изисква потвърждение от потребителя.
- Changed by hand: Съкратих описанието на инструмента в mcp-server/server.js, записах трите изречения с изводи в mcp-server/README.md и попълних токените в USAGE.md.

## 2026-10-27 · Финална проверка на изискванията и документацията на Упражнение 1
- Goal: Проверка на изпълнението на всички стъпки от 1 до 12 според заданието на Упражнение 1 и завършване на документацията.
- Delegated: Анализ на PDF заданието, валидиране на самопроверката (check.mjs) и сверяване на съдържанието на mcp-server/README.md, AGENT_LOG.md и USAGE.md.
- Checkpoints: Стартиране на node mcp-server/check.mjs -- npm run --silent mcp (12/12 проверки преминати) и проверка на Git статуса.
- Went wrong: В README.md транскриптът от ръчната сесия беше непълен (отрязан в началото), а експериментът с описанието и AGENT_LOG.md не бяха попълнени.
- Changed by hand: Възстанових пълния Session transcript, добавих изводите от експеримента с описанието и попълних логовете и токените за сесиите.
