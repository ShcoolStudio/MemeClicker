// Система локализации игры
const translations = {
    ru: {
        // Основные элементы
        gameTitle: "💰 Meme Clicker",
        moneyLabel: "Монеты:",
        incomeLabel: "Доход/сек:",
        
        // Главный экран
        mainTitle: "Meme Clicker",
        mainSubtitle: "Игра-кликер с популярными мемами!",
        playButton: "Играть",
        settingsButton: "Настройки",
        backButton: "Назад",
        clickMemes: "Кликайте по мемам",
        buyCharacters: "Покупайте персонажей",
        playMinigames: "Играйте в мини-игры",
        
        // Магазин
        shopTitle: "🏪 Магазин мемов",
        
        // Улучшения
        upgradesTitle: "⚡ Улучшения",
        
        // Мини-игры
        minigamesTitle: "🎮 Мини-игры",
        puzzleName: "Мем-пазл",
        puzzleCost: "2500 монет",
        puzzleDescription: "Сложный пазл 4x4 за 60 секунд!",
        quizName: "Меме Квиз",
        quizCost: "1500 монет",
        quizDescription: "Угадай мем по описанию!",
        
        // Главный мем
        mainMemeName: "Pepe",
        clickPower: "+1 монета",
        
        // Персонажи
        doge: {
            name: "Дотакэт",
            description: "Верный друг, который приносит монеты каждые 5 секунд"
        },
        lazycat: {
            name: "Ленивый котик",
            description: "Приносит 1 монету каждые 2 секунды"
        },
        nikita: {
            name: "Странствующий Никита",
            description: "Повышает общий заработок на 5%"
        },
        chad: {
            name: "Chad",
            description: "Сильный мем, приносит 2 монеты каждую секунду"
        },
        wojak: {
            name: "Войак",
            description: "Приносит 5 монет каждые 0.5 секунды"
        },
        gigachad: {
            name: "Гигачад",
            description: "Альфа-мем с максимальной продуктивностью"
        },
        
        // Улучшения
        clickBonus1: {
            name: "Бонусный клик",
            description: "Добавляет +1 монету за каждый клик"
        },
        supermanHands: {
            name: "Руки супермена",
            description: "Удваивает мощность кликов"
        },
        clickBonus2: {
            name: "Усиленный клик",
            description: "Добавляет +2 монеты за каждый клик"
        },
        elonTech: {
            name: "Илон-Маск-технологии",
            description: "Утраивает мощность кликов"
        },
        clickBonus5: {
            name: "Супер клик",
            description: "Добавляет +5 монет за каждый клик"
        },
        memePower: {
            name: "Мемная сила",
            description: "Увеличивает доход всех мемов на 10%"
        },
        
        // Модальные окна
        puzzleModalTitle: "🧩 Мем-пазл",
        quizModalTitle: "🎯 Меме Квиз",
        timeLabel: "⏱️ Время:",
        scoreLabel: "🎯 Правильно:",
        streakLabel: "🔥 Серия:",
        
        // Уведомления
        notEnoughMoney: "Недостаточно монет!",
        puzzleWin: "Победа в сложном пазле! Получено {amount} монет и +50% к доходу на 15 минут!",
        quizReward: "Получено {amount} монет!",
        correctAnswer: "Правильно! Серия: {streak}",
        characterBought: "Куплен {name}!",
        upgradeBought: "Куплено улучшение: {name}!",
        
        // Результаты игр
        congratulations: "🎉 Поздравляем!",
        timeUp: "😔 Время вышло!",
        tryAgain: "Попробуйте еще раз!",
        
        // Кнопки
        closeButton: "×",
        
        // Вопросы квиза
        quizQuestions: [
            {
                question: "Этот мем известен своей грустной мордочкой и часто используется для выражения печали",
                options: ["Pepe", "Doge", "Sad Cat", "Wojak"],
                correct: 2
            },
            {
                question: "Классический мем с собакой и разноцветным текстом",
                options: ["Pepe", "Doge", "Grumpy Cat", "Distracted Boyfriend"],
                correct: 1
            },
            {
                question: "Зеленый лягушонок, ставший символом интернет-культуры",
                options: ["Pepe", "Doge", "Kermit", "Frog"],
                correct: 0
            },
            {
                question: "Мем про парня, который смотрит на другую девушку, пока его девушка недовольна",
                options: ["Distracted Boyfriend", "Woman Yelling at Cat", "Drake Pointing", "This is Fine"],
                correct: 0
            },
            {
                question: "Мем с кошкой, которая сидит за столом, пока вокруг все горит",
                options: ["Grumpy Cat", "This is Fine", "Success Kid", "Trollface"],
                correct: 1
            },
            {
                question: "Мем с мальчиком, который показывает большой палец вверх",
                options: ["Success Kid", "Trollface", "Wojak", "Pepe"],
                correct: 0
            },
            {
                question: "Классический тролль с ухмылкой",
                options: ["Trollface", "Pepe", "Wojak", "Doge"],
                correct: 0
            },
            {
                question: "Мем с женщиной, которая кричит на кота за столом",
                options: ["Woman Yelling at Cat", "Distracted Boyfriend", "This is Fine", "Drake Pointing"],
                correct: 0
            },
            {
                question: "Мем с рэпером Drake, который показывает пальцем",
                options: ["Drake Pointing", "Success Kid", "Trollface", "Pepe"],
                correct: 0
            },
            {
                question: "Простой мем с белым лицом, часто используемый для выражения эмоций",
                options: ["Wojak", "Pepe", "Trollface", "Doge"],
                correct: 0
            }
        ]
    },
    
    en: {
        // Основные элементы
        gameTitle: "💰 Meme Clicker",
        moneyLabel: "Coins:",
        incomeLabel: "Income/sec:",
        
        // Главный экран
        mainTitle: "Meme Clicker",
        mainSubtitle: "Clicker game with popular memes!",
        playButton: "Play",
        settingsButton: "Settings",
        backButton: "Back",
        clickMemes: "Click on memes",
        buyCharacters: "Buy characters",
        playMinigames: "Play mini-games",
        
        // Магазин
        shopTitle: "🏪 Meme Shop",
        
        // Улучшения
        upgradesTitle: "⚡ Upgrades",
        
        // Мини-игры
        minigamesTitle: "🎮 Mini-games",
        puzzleName: "Meme Puzzle",
        puzzleCost: "2500 coins",
        puzzleDescription: "Complex 4x4 puzzle in 60 seconds!",
        quizName: "Meme Quiz",
        quizCost: "1500 coins",
        quizDescription: "Guess the meme by description!",
        
        // Главный мем
        mainMemeName: "Pepe",
        clickPower: "+1 coin",
        
        // Персонажи
        doge: {
            name: "Doge",
            description: "Loyal friend who brings coins every 5 seconds"
        },
        lazycat: {
            name: "Lazy Cat",
            description: "Brings 1 coin every 2 seconds"
        },
        nikita: {
            name: "Wandering Nikita",
            description: "Increases total earnings by 5%"
        },
        chad: {
            name: "Chad",
            description: "Strong meme, brings 2 coins every second"
        },
        wojak: {
            name: "Wojak",
            description: "Brings 5 coins every 0.5 seconds"
        },
        gigachad: {
            name: "Gigachad",
            description: "Alpha meme with maximum productivity"
        },
        
        // Улучшения
        clickBonus1: {
            name: "Bonus Click",
            description: "Adds +1 coin per click"
        },
        supermanHands: {
            name: "Superman Hands",
            description: "Doubles click power"
        },
        clickBonus2: {
            name: "Enhanced Click",
            description: "Adds +2 coins per click"
        },
        elonTech: {
            name: "Elon Musk Technology",
            description: "Triples click power"
        },
        clickBonus5: {
            name: "Super Click",
            description: "Adds +5 coins per click"
        },
        memePower: {
            name: "Meme Power",
            description: "Increases all memes income by 10%"
        },
        
        // Модальные окна
        puzzleModalTitle: "🧩 Meme Puzzle",
        quizModalTitle: "🎯 Meme Quiz",
        timeLabel: "⏱️ Time:",
        scoreLabel: "🎯 Correct:",
        streakLabel: "🔥 Streak:",
        
        // Уведомления
        notEnoughMoney: "Not enough coins!",
        puzzleWin: "Victory in complex puzzle! Got {amount} coins and +50% income for 15 minutes!",
        quizReward: "Got {amount} coins!",
        correctAnswer: "Correct! Streak: {streak}",
        characterBought: "Bought {name}!",
        upgradeBought: "Bought upgrade: {name}!",
        
        // Результаты игр
        congratulations: "🎉 Congratulations!",
        timeUp: "😔 Time's up!",
        tryAgain: "Try again!",
        
        // Кнопки
        closeButton: "×",
        
        // Вопросы квиза
        quizQuestions: [
            {
                question: "This meme is known for its sad face and is often used to express sadness",
                options: ["Pepe", "Doge", "Sad Cat", "Wojak"],
                correct: 2
            },
            {
                question: "Classic meme with a dog and colorful text",
                options: ["Pepe", "Doge", "Grumpy Cat", "Distracted Boyfriend"],
                correct: 1
            },
            {
                question: "Green frog that became a symbol of internet culture",
                options: ["Pepe", "Doge", "Kermit", "Frog"],
                correct: 0
            },
            {
                question: "Meme about a guy looking at another girl while his girlfriend is displeased",
                options: ["Distracted Boyfriend", "Woman Yelling at Cat", "Drake Pointing", "This is Fine"],
                correct: 0
            },
            {
                question: "Meme with a cat sitting at a table while everything around is burning",
                options: ["Grumpy Cat", "This is Fine", "Success Kid", "Trollface"],
                correct: 1
            },
            {
                question: "Meme with a boy showing thumbs up",
                options: ["Success Kid", "Trollface", "Wojak", "Pepe"],
                correct: 0
            },
            {
                question: "Classic troll with a smirk",
                options: ["Trollface", "Pepe", "Wojak", "Doge"],
                correct: 0
            },
            {
                question: "Meme with a woman yelling at a cat at the table",
                options: ["Woman Yelling at Cat", "Distracted Boyfriend", "This is Fine", "Drake Pointing"],
                correct: 0
            },
            {
                question: "Meme with rapper Drake pointing",
                options: ["Drake Pointing", "Success Kid", "Trollface", "Pepe"],
                correct: 0
            },
            {
                question: "Simple meme with a white face, often used to express emotions",
                options: ["Wojak", "Pepe", "Trollface", "Doge"],
                correct: 0
            }
        ]
    }
};

// Класс локализации
class Localization {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.translations = translations;
    }
    
    detectLanguage() {
        // Определяем язык из localStorage или браузера
        const savedLang = localStorage.getItem('gameLanguage');
        if (savedLang && this.translations[savedLang]) {
            return savedLang;
        }
        
        // Определяем язык браузера
        const browserLang = navigator.language.split('-')[0];
        return this.translations[browserLang] ? browserLang : 'ru';
    }
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('gameLanguage', lang);
            this.updatePageLanguage();
            return true;
        }
        return false;
    }
    
    getText(key, params = {}) {
        const text = this.translations[this.currentLanguage][key] || 
                    this.translations['ru'][key] || 
                    key;
        
        // Заменяем параметры в тексте
        return text.replace(/\{(\w+)\}/g, (match, param) => {
            return params[param] || match;
        });
    }
    
    updatePageLanguage() {
        // Обновляем атрибут lang у html
        document.documentElement.lang = this.currentLanguage;
        
        // Обновляем все тексты на странице
        this.updateAllTexts();
    }
    
    updateAllTexts() {
        // Обновляем главный экран
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) mainTitle.textContent = this.getText('mainTitle');
        
        const mainSubtitle = document.querySelector('.main-subtitle');
        if (mainSubtitle) mainSubtitle.textContent = this.getText('mainSubtitle');
        
        const playText = document.querySelector('.play-text');
        if (playText) playText.textContent = this.getText('playButton');
        
        const settingsText = document.querySelector('.settings-text');
        if (settingsText) settingsText.textContent = this.getText('settingsButton');
        
        const backText = document.querySelector('.back-text');
        if (backText) backText.textContent = this.getText('backButton');
        
        // Обновляем информацию об игре
        const infoTexts = document.querySelectorAll('.info-text');
        if (infoTexts.length >= 3) {
            infoTexts[0].textContent = this.getText('clickMemes');
            infoTexts[1].textContent = this.getText('buyCharacters');
            infoTexts[2].textContent = this.getText('playMinigames');
        }
        
        // Обновляем основные элементы игрового экрана
        const gameTitle = document.querySelector('.game-title');
        if (gameTitle) gameTitle.textContent = this.getText('gameTitle');
        
        const moneyLabel = document.querySelector('.money-label');
        if (moneyLabel) moneyLabel.textContent = this.getText('moneyLabel');
        
        const incomeLabel = document.querySelector('.income-label');
        if (incomeLabel) incomeLabel.textContent = this.getText('incomeLabel');
        
        // Обновляем заголовки секций
        const shopTitle = document.querySelector('.shop h2');
        if (shopTitle) shopTitle.textContent = this.getText('shopTitle');
        
        const upgradesTitle = document.querySelector('.upgrades h2');
        if (upgradesTitle) upgradesTitle.textContent = this.getText('upgradesTitle');
        
        const minigamesTitle = document.querySelector('.minigames h2');
        if (minigamesTitle) minigamesTitle.textContent = this.getText('minigamesTitle');
        
        // Обновляем мини-игры
        const puzzleName = document.querySelector('#memePuzzleBtn .minigame-name');
        if (puzzleName) puzzleName.textContent = this.getText('puzzleName');
        
        const puzzleCost = document.querySelector('#memePuzzleBtn .minigame-cost');
        if (puzzleCost) puzzleCost.textContent = this.getText('puzzleCost');
        
        const puzzleDescription = document.querySelector('#memePuzzleBtn .minigame-description');
        if (puzzleDescription) puzzleDescription.textContent = this.getText('puzzleDescription');
        
        const quizName = document.querySelector('#memeranBtn .minigame-name');
        if (quizName) quizName.textContent = this.getText('quizName');
        
        const quizCost = document.querySelector('#memeranBtn .minigame-cost');
        if (quizCost) quizCost.textContent = this.getText('quizCost');
        
        const quizDescription = document.querySelector('#memeranBtn .minigame-description');
        if (quizDescription) quizDescription.textContent = this.getText('quizDescription');
        
        // Обновляем главный мем
        const mainMemeName = document.querySelector('.meme-name');
        if (mainMemeName) mainMemeName.textContent = this.getText('mainMemeName');
        
        const clickPower = document.querySelector('.click-power');
        if (clickPower) clickPower.textContent = this.getText('clickPower');
    }
    
    createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLanguage === 'ru' ? 'active' : ''}" data-lang="ru">🇷🇺</button>
            <button class="lang-btn ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">🇺🇸</button>
        `;
        
        // Добавляем обработчики событий
        switcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const lang = e.target.dataset.lang;
                if (this.setLanguage(lang)) {
                    // Обновляем активную кнопку
                    switcher.querySelectorAll('.lang-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    // Обновляем игру
                    if (window.game) {
                        window.game.updateDisplay();
                    }
                }
            }
        });
        
        return switcher;
    }
}

// Создаем глобальный экземпляр локализации
window.localization = new Localization();
