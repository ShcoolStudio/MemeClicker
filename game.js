// Игровые данные и состояние
class GameState {
    constructor() {
        this.money = 0;
        this.clickPower = 1;
        this.clickBonus = 0; // Дополнительные монеты за клик
        this.totalIncome = 0;
        this.ownedMemes = {};
        this.upgrades = {};
        this.totalClicks = 0;
        this.totalEarned = 0;
        this.incomeBonus = 1; // Множитель дохода от мини-игр
        this.incomeBonusTime = 0; // Время окончания бонуса
    }

    // Сохранение в localStorage
    save() {
        const saveData = {
            money: this.money,
            clickPower: this.clickPower,
            clickBonus: this.clickBonus,
            totalIncome: this.totalIncome,
            ownedMemes: this.ownedMemes,
            upgrades: this.upgrades,
            totalClicks: this.totalClicks,
            totalEarned: this.totalEarned,
            incomeBonus: this.incomeBonus,
            incomeBonusTime: this.incomeBonusTime
        };
        localStorage.setItem('memeClickerSave', JSON.stringify(saveData));
    }

    // Загрузка из localStorage
    load() {
        const saveData = localStorage.getItem('memeClickerSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            
            // Проверяем на "зараженные" сохранения с нереальными значениями
            if (data.clickPower > 1000 || data.money > 1000000000) {
                console.warn('Обнаружено сохранение с нереальными значениями. Сбрасываем...');
                localStorage.removeItem('memeClickerSave');
                // Показываем уведомление игроку
                setTimeout(() => {
                    alert('⚠️ Обнаружена проблема с сохранением игры!\n\nВаш прогресс был сброшен из-за технической ошибки.\nИгра теперь работает корректно. Извините за неудобства!');
                }, 1000);
                return false;
            }
            
            this.money = data.money || 0;
            this.clickPower = data.clickPower || 1;
            this.clickBonus = data.clickBonus || 0;
            this.totalIncome = data.totalIncome || 0;
            this.ownedMemes = data.ownedMemes || {};
            this.upgrades = data.upgrades || {};
            this.totalClicks = data.totalClicks || 0;
            this.totalEarned = data.totalEarned || 0;
            this.incomeBonus = data.incomeBonus || 1;
            this.incomeBonusTime = data.incomeBonusTime || 0;
            return true;
        }
        return false;
    }
}

// Данные персонажей-мемов
const MEME_CHARACTERS = [
    {
        id: 'doge',
        name: 'Дотакэт',
        emoji: '🐕',
        basePrice: 10,
        baseIncome: 1,
        incomeInterval: 5000, // 5 секунд
        description: 'Верный друг, который приносит монеты каждые 5 секунд',
        multiplier: 1.15 // Множитель цены при покупке
    },
    {
        id: 'lazycat',
        name: 'Ленивый котик',
        emoji: '🐱',
        basePrice: 50,
        baseIncome: 1,
        incomeInterval: 2000, // 2 секунды
        description: 'Приносит 1 монету каждые 2 секунды',
        multiplier: 1.2
    },
    {
        id: 'nikita',
        name: 'Странствующий Никита',
        emoji: '🚶‍♂️',
        basePrice: 100,
        baseIncome: 0,
        incomeInterval: 0,
        description: 'Повышает общий заработок на 5%',
        multiplier: 1.25,
        bonusType: 'percentage',
        bonusValue: 0.05
    },
    {
        id: 'chad',
        name: 'Chad',
        emoji: '💪',
        basePrice: 500,
        baseIncome: 2,
        incomeInterval: 1000, // 1 секунда
        description: 'Сильный мем, приносит 2 монеты каждую секунду',
        multiplier: 1.3
    },
    {
        id: 'wojak',
        name: 'Войак',
        emoji: '😢',
        basePrice: 1000,
        baseIncome: 5,
        incomeInterval: 500, // 0.5 секунды
        description: 'Печальный, но очень продуктивный мем',
        multiplier: 1.35
    },
    {
        id: 'gigachad',
        name: 'Гигачад',
        emoji: '🦍',
        basePrice: 5000,
        baseIncome: 15,
        incomeInterval: 1000, // 1 секунда
        description: 'Альфа-мем с максимальной продуктивностью',
        multiplier: 1.4
    }
];

// Данные улучшений
const UPGRADES = [
    {
        id: 'click_bonus_1',
        name: 'Бонусный клик',
        emoji: '💰',
        description: 'Добавляет +1 монету за каждый клик',
        basePrice: 50,
        effect: 'clickBonus',
        effectValue: 1,
        multiplier: 2,
        stackable: true
    },
    {
        id: 'superman_hands',
        name: 'Руки супермена',
        emoji: '🦸‍♂️',
        description: 'Удваивает мощность кликов',
        basePrice: 100,
        effect: 'clickPower',
        effectValue: 2,
        multiplier: 2.5
    },
    {
        id: 'click_bonus_2',
        name: 'Усиленный клик',
        emoji: '💎',
        description: 'Добавляет +2 монеты за каждый клик',
        basePrice: 200,
        effect: 'clickBonus',
        effectValue: 2,
        multiplier: 2.2,
        stackable: true
    },
    {
        id: 'elon_tech',
        name: 'Илон-Маск-технологии',
        emoji: '🚀',
        description: 'Утраивает мощность кликов',
        basePrice: 500,
        effect: 'clickPower',
        effectValue: 3,
        multiplier: 3
    },
    {
        id: 'click_bonus_5',
        name: 'Супер клик',
        emoji: '💪',
        description: 'Добавляет +5 монет за каждый клик',
        basePrice: 1000,
        effect: 'clickBonus',
        effectValue: 5,
        multiplier: 2.5,
        stackable: true
    },
    {
        id: 'meme_power',
        name: 'Мемная сила',
        emoji: '⚡',
        description: 'Увеличивает доход всех мемов на 10%',
        basePrice: 2000,
        effect: 'incomeMultiplier',
        effectValue: 1.1,
        multiplier: 2.8
    },
    {
        id: 'click_bonus_10',
        name: 'Мега клик',
        emoji: '🌟',
        description: 'Добавляет +10 монет за каждый клик',
        basePrice: 5000,
        effect: 'clickBonus',
        effectValue: 10,
        multiplier: 3,
        stackable: true
    }
];

// Основной класс игры
class MemeClickerGame {
    constructor() {
        this.gameState = new GameState();
        this.incomeInterval = null;
        this.init();
    }

    init() {
        // Загружаем сохранение
        if (this.gameState.load()) {
            console.log('Игра загружена из сохранения');
            this.restoreUpgrades();
        }

        this.setupEventListeners();
        this.setupShop();
        this.setupUpgrades();
        this.startIncomeLoop();
        this.updateDisplay();
        this.addBackgroundMemes();
        
        // Инициализируем мини-игры
        this.initializeMiniGames();
        
        // Автосохранение каждые 30 секунд
        setInterval(() => this.gameState.save(), 30000);
    }

    initializeMiniGames() {
        // Инициализируем мини-игры после загрузки DOM
        setTimeout(() => {
            console.log('Initializing mini-games...');
            try {
                this.memePuzzle = new MemePuzzle(this);
                console.log('MemePuzzle initialized:', this.memePuzzle);
            } catch (error) {
                console.error('Error initializing MemePuzzle:', error);
            }
            
            try {
                this.memeQuizGame = new MemeQuizGame(this);
                console.log('MemeQuizGame initialized:', this.memeQuizGame);
            } catch (error) {
                console.error('Error initializing MemeQuizGame:', error);
            }
        }, 100);
    }

    restoreUpgrades() {
        // Сбрасываем базовые значения перед восстановлением
        this.gameState.clickPower = 1;
        this.gameState.clickBonus = 0;
        
        // Восстанавливаем эффекты улучшений при загрузке
        Object.keys(this.gameState.upgrades).forEach(upgradeId => {
            const upgrade = UPGRADES.find(u => u.id === upgradeId);
            const owned = this.gameState.upgrades[upgradeId];
            
            if (upgrade && owned > 0) {
                if (upgrade.effect === 'clickPower') {
                    this.gameState.clickPower *= Math.pow(upgrade.effectValue, owned);
                } else if (upgrade.effect === 'clickBonus') {
                    this.gameState.clickBonus += upgrade.effectValue * owned;
                }
            }
        });
    }

    setupEventListeners() {
        const mainMeme = document.getElementById('mainMeme');
        mainMeme.addEventListener('click', (e) => this.handleClick(e));
        
        // Поддержка touch для мобильных устройств
        mainMeme.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleClick(e);
        });
    }

    handleClick(event) {
        const earnings = this.gameState.clickPower + this.gameState.clickBonus;
        this.gameState.money += earnings;
        this.gameState.totalClicks++;
        this.gameState.totalEarned += earnings;

        this.showClickEffect(event, `+${earnings}`);
        this.updateDisplay();
        this.gameState.save();
    }

    showClickEffect(event, text) {
        const container = document.getElementById('clickEffects');
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.textContent = text;

        // Позиционируем эффект относительно клика
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;

        container.appendChild(effect);

        // Удаляем эффект после анимации
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1000);
    }

    setupShop() {
        const shopGrid = document.getElementById('shopGrid');
        shopGrid.innerHTML = '';

        MEME_CHARACTERS.forEach(meme => {
            const item = this.createShopItem(meme);
            shopGrid.appendChild(item);
        });
    }

    createShopItem(meme) {
        const item = document.createElement('button');
        item.className = 'shop-item';
        
        const owned = this.gameState.ownedMemes[meme.id] || 0;
        const price = this.calculatePrice(meme, owned);
        const canAfford = this.gameState.money >= price;

        item.disabled = !canAfford;

        item.innerHTML = `
            <div class="item-header">
                <span class="item-emoji">${meme.emoji}</span>
                <span class="item-name">${meme.name}</span>
                <span class="item-price">${this.formatNumber(price)}</span>
            </div>
            <div class="item-description">${meme.description}</div>
            <div class="item-stats">
                ${owned > 0 ? `Куплено: ${owned}` : ''}
                ${meme.bonusType === 'percentage' ? 
                    `Бонус: +${(meme.bonusValue * 100)}%` : 
                    `Доход: ${meme.baseIncome}/сек`
                }
            </div>
        `;

        item.addEventListener('click', () => this.buyMeme(meme.id));

        return item;
    }

    setupUpgrades() {
        const upgradesGrid = document.getElementById('upgradesGrid');
        upgradesGrid.innerHTML = '';

        UPGRADES.forEach(upgrade => {
            const item = this.createUpgradeItem(upgrade);
            upgradesGrid.appendChild(item);
        });
    }

    createUpgradeItem(upgrade) {
        const item = document.createElement('button');
        item.className = 'upgrade-item';
        
        const owned = this.gameState.upgrades[upgrade.id] || 0;
        const price = this.calculateUpgradePrice(upgrade, owned);
        const canAfford = this.gameState.money >= price;

        // Для stackable улучшений не блокируем после покупки
        if (upgrade.stackable) {
            item.disabled = !canAfford;
        } else {
            item.disabled = !canAfford || owned > 0;
        }

        item.innerHTML = `
            <div class="item-header">
                <span class="item-emoji">${upgrade.emoji}</span>
                <span class="item-name">${upgrade.name}</span>
                <span class="item-price">${this.formatNumber(price)}</span>
            </div>
            <div class="item-description">${upgrade.description}</div>
            <div class="item-stats">
                ${owned > 0 ? `Куплено: ${owned}${upgrade.stackable ? ' раз' : ' ✓'}` : 'Не куплено'}
            </div>
        `;

        item.addEventListener('click', () => this.buyUpgrade(upgrade.id));

        return item;
    }

    buyMeme(memeId) {
        const meme = MEME_CHARACTERS.find(m => m.id === memeId);
        const owned = this.gameState.ownedMemes[memeId] || 0;
        const price = this.calculatePrice(meme, owned);

        if (this.gameState.money >= price) {
            this.gameState.money -= price;
            this.gameState.ownedMemes[memeId] = (this.gameState.ownedMemes[memeId] || 0) + 1;
            
            this.updateDisplay();
            this.setupShop();
            this.addBackgroundMeme(meme);
            this.showNotification(`Куплен ${meme.name}!`);
            this.gameState.save();
        }
    }

    buyUpgrade(upgradeId) {
        const upgrade = UPGRADES.find(u => u.id === upgradeId);
        const owned = this.gameState.upgrades[upgradeId] || 0;
        const price = this.calculateUpgradePrice(upgrade, owned);

        // Проверяем возможность покупки
        const canBuy = this.gameState.money >= price && 
                      (upgrade.stackable || owned === 0);

        if (canBuy) {
            this.gameState.money -= price;
            this.gameState.upgrades[upgradeId] = (this.gameState.upgrades[upgradeId] || 0) + 1;
            
            // Применяем эффект улучшения
            if (upgrade.effect === 'clickPower') {
                this.gameState.clickPower *= upgrade.effectValue;
            } else if (upgrade.effect === 'clickBonus') {
                this.gameState.clickBonus += upgrade.effectValue;
            }
            
            this.updateDisplay();
            this.setupUpgrades();
            this.showNotification(`Куплено улучшение: ${upgrade.name}!`);
            this.gameState.save();
        }
    }

    calculatePrice(meme, owned) {
        return Math.floor(meme.basePrice * Math.pow(meme.multiplier, owned));
    }

    calculateUpgradePrice(upgrade, owned) {
        if (owned > 0) return Infinity;
        return Math.floor(upgrade.basePrice * Math.pow(upgrade.multiplier, owned));
    }

    calculateTotalIncome() {
        let income = 0;
        let percentageBonus = 0;

        // Считаем доход от мемов
        Object.keys(this.gameState.ownedMemes).forEach(memeId => {
            const meme = MEME_CHARACTERS.find(m => m.id === memeId);
            const owned = this.gameState.ownedMemes[memeId];
            
            if (meme.bonusType === 'percentage') {
                percentageBonus += meme.bonusValue * owned;
            } else if (meme.baseIncome > 0 && meme.incomeInterval > 0) {
                // Правильный расчет: доход в секунду = (доход за интервал * количество) / интервал в секундах
                income += (meme.baseIncome * owned) / (meme.incomeInterval / 1000);
            }
        });

        // Применяем процентные бонусы
        income *= (1 + percentageBonus);

        // Применяем улучшения
        if (this.gameState.upgrades.meme_power) {
            income *= 1.1;
        }

        // Применяем временные бонусы от мини-игр
        if (this.gameState.incomeBonusTime > Date.now()) {
            income *= this.gameState.incomeBonus;
        } else {
            // Бонус истек
            this.gameState.incomeBonus = 1;
            this.gameState.incomeBonusTime = 0;
        }

        return income;
    }

    startIncomeLoop() {
        if (this.incomeInterval) {
            clearInterval(this.incomeInterval);
        }

        this.incomeInterval = setInterval(() => {
            const income = this.calculateTotalIncome();
            if (income > 0) {
                this.gameState.money += income;
                this.gameState.totalEarned += income;
                this.updateDisplay();
                this.gameState.save();
            }
        }, 1000);
    }

    updateDisplay() {
        // Обновляем деньги
        document.getElementById('money').textContent = this.formatNumber(this.gameState.money);
        
        // Обновляем доход
        const income = this.calculateTotalIncome();
        document.getElementById('income').textContent = this.formatNumber(income);
        this.gameState.totalIncome = income;

        // Обновляем магазин и улучшения
        this.setupShop();
        this.setupUpgrades();

        // Обновляем силу клика
        const clickPowerElement = document.querySelector('.click-power');
        const totalClickPower = this.gameState.clickPower + this.gameState.clickBonus;
        clickPowerElement.textContent = `+${totalClickPower} монет`;
    }

    addBackgroundMemes() {
        Object.keys(this.gameState.ownedMemes).forEach(memeId => {
            const meme = MEME_CHARACTERS.find(m => m.id === memeId);
            const owned = this.gameState.ownedMemes[memeId];
            
            for (let i = 0; i < owned; i++) {
                this.addBackgroundMeme(meme);
            }
        });
    }

    addBackgroundMeme(meme) {
        const container = document.getElementById('backgroundMemes');
        const backgroundMeme = document.createElement('div');
        backgroundMeme.className = 'background-meme';
        backgroundMeme.textContent = meme.emoji;
        
        // Случайная позиция
        backgroundMeme.style.left = Math.random() * 100 + '%';
        backgroundMeme.style.top = Math.random() * 100 + '%';
        backgroundMeme.style.animationDelay = Math.random() * 6 + 's';
        
        container.appendChild(backgroundMeme);
    }

    showNotification(message) {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.floor(num).toString();
    }
}

// Класс мем-пазла
class MemePuzzle {
    constructor(game) {
        this.game = game;
        this.timeLeft = 30;
        this.score = 0;
        this.maxScore = 9;
        this.timer = null;
        this.currentMeme = null;
        this.correctOrder = [];
        this.puzzlePieces = [];
        this.isGameActive = false;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const puzzleBtn = document.getElementById('memePuzzleBtn');
        const modal = document.getElementById('puzzleModal');
        const closeBtn = document.getElementById('closePuzzle');

        console.log('MemePuzzle setupEventListeners - puzzleBtn:', puzzleBtn);
        console.log('MemePuzzle setupEventListeners - modal:', modal);
        console.log('MemePuzzle setupEventListeners - closeBtn:', closeBtn);

        if (!puzzleBtn || !modal || !closeBtn) {
            console.error('MemePuzzle: Required DOM elements not found');
            return;
        }

        puzzleBtn.addEventListener('click', () => {
            console.log('MemePuzzle button clicked!');
            this.startGame();
        });
        closeBtn.addEventListener('click', () => this.closeGame());
        
        // Закрытие по клику вне модального окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeGame();
            }
        });

        console.log('MemePuzzle event listeners attached successfully');
        
        // Проверяем стили кнопки
        const computedStyle = window.getComputedStyle(puzzleBtn);
        console.log('Button display:', computedStyle.display);
        console.log('Button visibility:', computedStyle.visibility);
        console.log('Button pointer-events:', computedStyle.pointerEvents);
    }

    startGame() {
        console.log('MemePuzzle startGame called');
        
        // Проверяем, хватает ли денег
        if (this.game.gameState.money < 2500) {
            this.game.showNotification('Недостаточно монет! Нужно 2500 монет.');
            return;
        }

        // Снимаем плату
        this.game.gameState.money -= 2500;
        this.game.updateDisplay();

        // Открываем модальное окно
        const modal = document.getElementById('puzzleModal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.error('Puzzle modal not found');
            return;
        }
        
        // Сбрасываем состояние игры
        this.timeLeft = 30;
        this.score = 0;
        this.isGameActive = true;
        
        // Выбираем случайный мем
        this.currentMeme = this.getRandomMeme();
        
        // Создаем пазл
        this.createPuzzle();
        
        // Запускаем таймер
        this.startTimer();
    }

    getRandomMeme() {
        const memes = [
            { emoji: '🐸', name: 'Pepe', pattern: ['🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸', '🐸'] },
            { emoji: '🐕', name: 'Doge', pattern: ['🐕', '🐕', '🐕', '🐕', '🐕', '🐕', '🐕', '🐕', '🐕'] },
            { emoji: '💪', name: 'Chad', pattern: ['💪', '💪', '💪', '💪', '💪', '💪', '💪', '💪', '💪'] },
            { emoji: '😢', name: 'Wojak', pattern: ['😢', '😢', '😢', '😢', '😢', '😢', '😢', '😢', '😢'] }
        ];
        
        return memes[Math.floor(Math.random() * memes.length)];
    }

    createPuzzle() {
        const puzzleGrid = document.getElementById('puzzleGrid');
        puzzleGrid.innerHTML = '';

        // Создаем правильный порядок
        this.correctOrder = [...this.currentMeme.pattern];
        
        // Создаем перемешанный порядок
        const shuffledOrder = [...this.correctOrder].sort(() => Math.random() - 0.5);
        
        // Создаем кусочки пазла
        this.puzzlePieces = [];
        shuffledOrder.forEach((emoji, index) => {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.textContent = emoji;
            piece.dataset.index = index;
            piece.addEventListener('click', () => this.clickPiece(index));
            
            puzzleGrid.appendChild(piece);
            this.puzzlePieces.push(piece);
        });

        this.updateScore();
    }

    clickPiece(index) {
        if (!this.isGameActive) return;

        const piece = this.puzzlePieces[index];
        const clickedEmoji = piece.textContent;
        const correctEmoji = this.correctOrder[index];

        if (clickedEmoji === correctEmoji) {
            // Правильно!
            piece.classList.add('correct');
            piece.style.pointerEvents = 'none';
            this.score++;
            this.updateScore();
            
            // Проверяем победу
            if (this.score === this.maxScore) {
                this.winGame();
            }
        } else {
            // Неправильно
            piece.classList.add('wrong');
            setTimeout(() => {
                piece.classList.remove('wrong');
            }, 500);
        }
    }

    updateScore() {
        document.getElementById('puzzleScore').textContent = `${this.score}/${this.maxScore}`;
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('puzzleTimer').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame(false);
            }
        }, 1000);
    }

    winGame() {
        this.isGameActive = false;
        clearInterval(this.timer);
        
        // Награда за победу
        const bonus = Math.floor(this.game.gameState.totalIncome * 0.2); // 20% от дохода
        this.game.gameState.money += bonus;
        
        // Временный бонус к доходу
        this.game.gameState.incomeBonus = 1.2; // +20% к доходу
        this.game.gameState.incomeBonusTime = Date.now() + (10 * 60 * 1000); // 10 минут
        
        this.showResult(true, bonus);
        this.game.updateDisplay();
        this.game.showNotification(`🎉 Победа! Получено ${bonus} монет и +20% к доходу на 10 минут!`);
    }

    endGame(won) {
        this.isGameActive = false;
        clearInterval(this.timer);
        
        if (!won) {
            this.showResult(false, 0);
        }
    }

    showResult(won, reward) {
        const resultDiv = document.getElementById('puzzleResult');
        const resultText = document.getElementById('puzzleResultText');
        const resultReward = document.getElementById('puzzleResultReward');
        
        resultDiv.style.display = 'block';
        
        if (won) {
            resultText.textContent = '🎉 Поздравляем!';
            resultReward.textContent = `Вы получили ${reward} монет и +20% к доходу на 10 минут!`;
        } else {
            resultText.textContent = '😔 Время вышло!';
            resultReward.textContent = 'Попробуйте еще раз!';
        }
    }

    closeGame() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        document.getElementById('puzzleModal').style.display = 'none';
        document.getElementById('puzzleResult').style.display = 'none';
        
        this.isGameActive = false;
    }
}

// Класс игры Меме Квиз
class MemeQuizGame {
    constructor(game) {
        this.game = game;
        this.timeLeft = 60;
        this.score = 0;
        this.streak = 0;
        this.currentQuestion = 0;
        this.maxQuestions = 10;
        this.isGameActive = false;
        this.timer = null;
        
        this.questions = [
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
        ];
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const btn = document.getElementById('memeranBtn');
        const modal = document.getElementById('memeranModal');
        const closeBtn = document.getElementById('closeMemeran');
        
        if (btn) {
            btn.addEventListener('click', () => this.startGame());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeGame());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeGame();
                }
            });
        }
    }
    
    startGame() {
        console.log('MemeQuizGame startGame called');
        
        // Проверяем, хватает ли денег
        if (this.game.gameState.money < 1500) {
            this.game.showNotification('Недостаточно монет! Нужно 1500 монет.');
            return;
        }
        
        // Снимаем плату
        this.game.gameState.money -= 1500;
        this.game.updateDisplay();
        
        // Открываем модальное окно
        const modal = document.getElementById('memeranModal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.error('MemeQuiz modal not found');
            return;
        }
        
        // Сбрасываем состояние игры
        this.timeLeft = 60;
        this.score = 0;
        this.streak = 0;
        this.currentQuestion = 0;
        this.isGameActive = true;
        
        // Обновляем отображение
        this.updateDisplay();
        
        // Показываем первый вопрос
        this.showQuestion();
        
        // Запускаем таймер
        this.startTimer();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    showQuestion() {
        if (this.currentQuestion >= this.maxQuestions) {
            this.endGame();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        const questionElement = document.getElementById('memeranQuestion');
        const optionsElement = document.getElementById('memeranOptions');
        
        if (questionElement) {
            questionElement.textContent = question.question;
        }
        
        if (optionsElement) {
            optionsElement.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'memeran-option';
                button.textContent = option;
                button.addEventListener('click', () => this.selectAnswer(index));
                optionsElement.appendChild(button);
            });
        }
    }
    
    selectAnswer(selectedIndex) {
        if (!this.isGameActive) return;
        
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.memeran-option');
        
        // Отключаем все кнопки
        options.forEach(btn => {
            btn.disabled = true;
            btn.style.pointerEvents = 'none';
        });
        
        // Показываем правильный ответ
        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            this.score++;
            this.streak++;
            this.game.showNotification(`Правильно! Серия: ${this.streak}`);
        } else {
            options[selectedIndex].classList.add('wrong');
            options[question.correct].classList.add('correct');
            this.streak = 0;
        }
        
        this.updateDisplay();
        
        // Переходим к следующему вопросу через 1.5 секунды
        setTimeout(() => {
            this.currentQuestion++;
            if (this.isGameActive) {
                this.showQuestion();
            }
        }, 1500);
    }
    
    updateDisplay() {
        const timerElement = document.getElementById('memeranTimer');
        const scoreElement = document.getElementById('memeranScore');
        const streakElement = document.getElementById('memeranStreak');
        
        if (timerElement) {
            timerElement.textContent = this.timeLeft;
        }
        
        if (scoreElement) {
            scoreElement.textContent = `${this.score}/${this.maxQuestions}`;
        }
        
        if (streakElement) {
            streakElement.textContent = this.streak;
        }
    }
    
    endGame() {
        this.isGameActive = false;
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Рассчитываем награду
        let reward = 0;
        let resultText = '';
        
        if (this.score >= 8) {
            reward = 5000;
            resultText = 'Отлично! Вы настоящий знаток мемов!';
        } else if (this.score >= 6) {
            reward = 3000;
            resultText = 'Хорошо! Неплохое знание мемов!';
        } else if (this.score >= 4) {
            reward = 1500;
            resultText = 'Неплохо! Есть куда расти!';
        } else {
            reward = 500;
            resultText = 'Попробуйте еще раз!';
        }
        
        // Добавляем бонус за серию
        if (this.streak >= 5) {
            reward += Math.floor(this.streak * 100);
            resultText += ` Бонус за серию ${this.streak}!`;
        }
        
        // Показываем результат
        this.showResult(resultText, reward);
        
        // Даем награду
        this.game.gameState.money += reward;
        this.game.updateDisplay();
        this.game.showNotification(`Получено ${reward} монет!`);
    }
    
    showResult(text, reward) {
        const resultElement = document.getElementById('memeranResult');
        const resultTextElement = document.getElementById('memeranResultText');
        const resultRewardElement = document.getElementById('memeranResultReward');
        
        if (resultTextElement) {
            resultTextElement.textContent = text;
        }
        
        if (resultRewardElement) {
            resultRewardElement.textContent = `Награда: ${reward} монет`;
        }
        
        if (resultElement) {
            resultElement.style.display = 'block';
        }
    }
    
    closeGame() {
        const modal = document.getElementById('memeranModal');
        const resultElement = document.getElementById('memeranResult');
        
        if (modal) {
            modal.style.display = 'none';
        }
        
        if (resultElement) {
            resultElement.style.display = 'none';
        }
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.isGameActive = false;
    }
}

// Запускаем игру когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MemeClickerGame();
    
    // Добавляем тестовую функцию в глобальную область
    window.testMemePuzzle = () => {
        console.log('Testing MemePuzzle...');
        const btn = document.getElementById('memePuzzleBtn');
        console.log('Button found:', btn);
        if (btn) {
            btn.click();
        }
    };
    
    // Автоматически тестируем через 2 секунды
    setTimeout(() => {
        console.log('Auto-testing MemePuzzle in 2 seconds...');
    }, 2000);
    
    // Добавляем функцию сброса сохранения в глобальную область
    window.resetSave = () => {
        localStorage.removeItem('memeClickerSave');
        location.reload();
    };
});
