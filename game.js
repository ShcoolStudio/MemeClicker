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
            totalEarned: this.totalEarned
        };
        localStorage.setItem('memeClickerSave', JSON.stringify(saveData));
    }

    // Загрузка из localStorage
    load() {
        const saveData = localStorage.getItem('memeClickerSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            this.money = data.money || 0;
            this.clickPower = data.clickPower || 1;
            this.clickBonus = data.clickBonus || 0;
            this.totalIncome = data.totalIncome || 0;
            this.ownedMemes = data.ownedMemes || {};
            this.upgrades = data.upgrades || {};
            this.totalClicks = data.totalClicks || 0;
            this.totalEarned = data.totalEarned || 0;
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
        baseIncome: 0, // Процентный бонус
        incomeInterval: 0,
        description: 'Даёт 1% бонус ко всему заработку',
        multiplier: 1.2,
        bonusType: 'percentage',
        bonusValue: 0.01
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
        incomeInterval: 3000,
        description: 'Сильный мем, приносит 2 монеты каждые 3 секунды',
        multiplier: 1.3
    },
    {
        id: 'wojak',
        name: 'Войак',
        emoji: '😢',
        basePrice: 1000,
        baseIncome: 5,
        incomeInterval: 4000,
        description: 'Печальный, но продуктивный мем',
        multiplier: 1.35
    },
    {
        id: 'gigachad',
        name: 'Гигачад',
        emoji: '🦍',
        basePrice: 5000,
        baseIncome: 15,
        incomeInterval: 2000,
        description: 'Альфа-мем с высокой продуктивностью',
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
        }

        this.setupEventListeners();
        this.setupShop();
        this.setupUpgrades();
        this.startIncomeLoop();
        this.updateDisplay();
        this.addBackgroundMemes();
        
        // Автосохранение каждые 30 секунд
        setInterval(() => this.gameState.save(), 30000);
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
            } else {
                income += (meme.baseIncome * owned * 1000) / meme.incomeInterval;
            }
        });

        // Применяем процентные бонусы
        income *= (1 + percentageBonus);

        // Применяем улучшения
        if (this.gameState.upgrades.meme_power) {
            income *= 1.1;
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

// Запускаем игру когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MemeClickerGame();
});
