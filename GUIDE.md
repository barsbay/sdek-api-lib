# 🚀 Гайд по использованию CDEK API TypeScript SDK

Полное руководство по работе с библиотекой для интеграции с API СДЭК v2.0.

## 📋 Содержание

1. [Быстрый старт](#быстрый-старт)
2. [Установка и настройка](#установка-и-настройка)
3. [Основные концепции](#основные-концепции)
4. [Работа с калькулятором](#работа-с-калькулятором)
5. [Управление заказами](#управление-заказами)
6. [Работа с локациями](#работа-с-локациями)
7. [Пункты выдачи](#пункты-выдачи)
8. [Курьерские услуги](#курьерские-услуги)
9. [Обработка ошибок](#обработка-ошибок)
10. [Лучшие практики](#лучшие-практики)
11. [Часто задаваемые вопросы](#часто-задаваемые-вопросы)

---

## 🚀 Быстрый старт

### 1. Установка

```bash
npm install sdek-api-lib
```

### 2. Базовая настройка

```typescript
import { CdekApi } from 'sdek-api-lib';

const cdek = new CdekApi({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});
```

### 3. Первый запрос

```typescript
// Расчет стоимости доставки
const tariff = await cdek.calculateTariff({
  tariff_code: 136, // Посылка склад-склад
  from_location: { code: 44 }, // Москва
  to_location: { code: 137 },  // Санкт-Петербург
  packages: [{
    weight: 1000, // 1 кг
    length: 30,
    width: 20,
    height: 10,
  }],
});

console.log(`Стоимость: ${tariff.delivery_sum} ${tariff.currency}`);
console.log(`Срок: ${tariff.period_min}-${tariff.period_max} дней`);
```

---

## ⚙️ Установка и настройка

### Получение учетных данных

1. Зарегистрируйтесь в [личном кабинете СДЭК](https://api.cdek.ru/account)
2. Создайте новое приложение
3. Получите `clientId` и `clientSecret`

### Настройка переменных окружения

Создайте файл `.env`:

```bash
# Конфигурация API СДЭК
CDEK_CLIENT_ID=your-client-id
CDEK_CLIENT_SECRET=your-client-secret
CDEK_BASE_URL=https://api.cdek.ru
CDEK_TIMEOUT=30000
```

### Инициализация с переменными окружения

```typescript
import dotenv from 'dotenv';
import { CdekApi } from 'sdek-api-lib';

dotenv.config();

const cdek = new CdekApi({
  clientId: process.env.CDEK_CLIENT_ID!,
  clientSecret: process.env.CDEK_CLIENT_SECRET!,
  baseUrl: process.env.CDEK_BASE_URL,
  timeout: process.env.CDEK_TIMEOUT ? Number(process.env.CDEK_TIMEOUT) : undefined,
});
```

### Переключение между средами

```typescript
// Рабочая среда (по умолчанию)
cdek.setProductionMode();

// Тестовая среда
cdek.setTestMode();
```

---

## 🧠 Основные концепции

### Структура запросов

Все запросы к API СДЭК имеют типизированную структуру:

```typescript
// Пример запроса расчета
interface TariffRequest {
  tariff_code?: number;        // Код тарифа
  from_location: Location;     // Адрес отправления
  to_location: Location;       // Адрес получения
  packages: Package[];         // Упаковки
  services?: Service[];        // Дополнительные услуги
  date?: string;              // Дата отгрузки
  currency?: string;          // Валюта
  lang?: string;              // Язык
}
```

### Локации

Локации могут быть заданы разными способами:

```typescript
// По коду города
const location = { code: 44 }; // Москва

// По адресу
const location = { 
  address: 'Москва, Красная площадь, 1',
  postal_code: '109012'
};

// По координатам
const location = {
  coordinates: {
    latitude: 55.7558,
    longitude: 37.6176
  }
};
```

### Упаковки и товары

```typescript
const package = {
  number: '1',           // Номер упаковки
  weight: 1000,          // Вес в граммах
  length: 30,            // Длина в см
  width: 20,             // Ширина в см
  height: 10,            // Высота в см
  items: [               // Товары в упаковке
    {
      name: 'Товар',
      ware_key: 'SKU-001',
      cost: 1000,        // Стоимость за единицу
      amount: 2,         // Количество
      weight: 500,       // Вес единицы в граммах
    }
  ]
};
```

---

## 🧮 Работа с калькулятором

### Расчет по конкретному тарифу

```typescript
const tariff = await cdek.calculateTariff({
  tariff_code: 136, // Посылка склад-склад
  from_location: { code: 44 },
  to_location: { code: 137 },
  packages: [{
    weight: 2000,
    length: 40,
    width: 30,
    height: 20,
  }],
  services: [
    { code: 'INSURANCE', parameter: 5000 } // Страхование на 5000 руб
  ],
  date: '2024-01-15', // Дата планируемой отгрузки
});

console.log(`Тариф: ${tariff.tariff_name}`);
console.log(`Стоимость: ${tariff.delivery_sum} ${tariff.currency}`);
console.log(`Срок: ${tariff.period_min}-${tariff.period_max} дней`);
console.log(`Общая стоимость: ${tariff.total_sum} ${tariff.currency}`);
```

### Расчет по всем доступным тарифам

```typescript
const allTariffs = await cdek.calculateTariffList({
  from_location: { code: 44 },
  to_location: { code: 137 },
  packages: [{
    weight: 1000,
    length: 30,
    width: 20,
    height: 10,
  }],
});

console.log(`Доступно ${allTariffs.length} тарифов:`);
allTariffs.forEach(tariff => {
  console.log(`${tariff.tariff_name}: ${tariff.total_sum} ${tariff.currency}`);
});
```

### Популярные коды тарифов

```typescript
// Основные тарифы
const TARIFFS = {
  PACKAGE_WAREHOUSE_TO_WAREHOUSE: 136,    // Посылка склад-склад
  PACKAGE_WAREHOUSE_TO_DOOR: 137,         // Посылка склад-дверь
  PACKAGE_DOOR_TO_WAREHOUSE: 138,         // Посылка дверь-склад
  PACKAGE_DOOR_TO_DOOR: 139,              // Посылка дверь-дверь
  EXPRESS_WAREHOUSE_TO_WAREHOUSE: 233,    // Экспресс склад-склад
  EXPRESS_WAREHOUSE_TO_DOOR: 234,         // Экспресс склад-дверь
  EXPRESS_DOOR_TO_WAREHOUSE: 235,         // Экспресс дверь-склад
  EXPRESS_DOOR_TO_DOOR: 236,              // Экспресс дверь-дверь
};
```

---

## 📦 Управление заказами

### Создание заказа

```typescript
const order = await cdek.createOrder({
  tariff_code: 136,
  number: 'ORDER-001', // Номер заказа в вашей системе
  recipient: {
    name: 'Иванов Иван Иванович',
    phones: [{ number: '+7 923 123-45-67' }],
    email: 'ivanov@example.com',
  },
  from_location: { 
    code: 44,
    address: 'Москва, ул. Тверская, 1'
  },
  to_location: { 
    code: 137,
    address: 'Санкт-Петербург, Невский пр., 1'
  },
  packages: [{
    number: '1',
    weight: 2000,
    length: 40,
    width: 30,
    height: 20,
    items: [
      {
        name: 'Ноутбук',
        ware_key: 'LAPTOP-001',
        cost: 50000,
        amount: 1,
        weight: 2000,
      }
    ],
  }],
  services: [
    { code: 'INSURANCE', parameter: 50000 }
  ],
});

console.log(`Заказ создан: ${order.entity.uuid}`);
```

### Получение информации о заказе

```typescript
// По UUID заказа
const orderInfo = await cdek.getOrder('order-uuid');

// По номеру СДЭК
const orderInfo = await cdek.getOrderByCdekNumber('CDEK-123456');

console.log(`Статус: ${orderInfo.statuses[0]?.name}`);
console.log(`Получатель: ${orderInfo.recipient.name}`);
console.log(`Вес: ${orderInfo.weight} г`);
```

### Изменение заказа

```typescript
const updatedOrder = await cdek.updateOrder('order-uuid', {
  recipient: {
    name: 'Петров Петр Петрович',
    phones: [{ number: '+7 923 987-65-43' }],
  },
  comment: 'Обновленные данные получателя',
});
```

### Удаление заказа

```typescript
await cdek.deleteOrder('order-uuid');
console.log('Заказ удален');
```

---

## 🗺️ Работа с локациями

### Поиск регионов

```typescript
// Все регионы России
const regions = await cdek.getRegions('RU');

// С пагинацией
const regions = await cdek.getRegions('RU', 50, 0); // 50 записей, первая страница

regions.forEach(region => {
  console.log(`${region.region} (код: ${region.region_code})`);
});
```

### Поиск городов

```typescript
// По названию
const cities = await cdek.getCities({
  city: 'Москва',
  size: 10,
});

// По региону
const cities = await cdek.getCities({
  region_code: 77, // Московская область
  size: 100,
});

// По стране
const cities = await cdek.getCities({
  country_codes: 'RU,KZ',
  size: 50,
});

cities.forEach(city => {
  console.log(`${city.city} (код: ${city.code}, регион: ${city.region})`);
});
```

### Получение кода города

```typescript
async function getCityCode(cdek: CdekApi, cityName: string): Promise<number | null> {
  const cities = await cdek.getCities({
    city: cityName,
    size: 1,
  });
  
  return cities.length > 0 ? cities[0].code : null;
}

const moscowCode = await getCityCode(cdek, 'Москва'); // 44
const spbCode = await getCityCode(cdek, 'Санкт-Петербург'); // 137
```

---

## 🏪 Пункты выдачи

### Поиск пунктов выдачи

```typescript
// Сначала найдем код города
const cities = await cdek.getCities({
  city: 'Москва',
  size: 1,
});

if (cities.length > 0) {
  const cityCode = cities[0].code;
  
  // Поиск ПВЗ с фильтрами
  const deliveryPoints = await cdek.getDeliveryPoints({
    city_code: cityCode,
    have_cash: true,        // С наличной оплатой
    have_cashless: true,    // С безналичной оплатой
    is_dressing_room: true, // С примерочной
    take_only: true,        // Только для получения
    weight_max: 5000,       // Максимальный вес 5 кг
  });

  console.log(`Найдено ${deliveryPoints.length} пунктов выдачи:`);
  deliveryPoints.forEach(point => {
    console.log(`${point.name}: ${point.location.address}`);
    console.log(`  Тип: ${point.type}`);
    console.log(`  Режим работы: ${point.work_time}`);
    console.log(`  Телефон: ${point.phones?.[0]?.number}`);
  });
}
```

### Фильтры для поиска ПВЗ

```typescript
interface DeliveryPointFilter {
  city_code?: number;           // Код города
  postal_code?: string;         // Почтовый индекс
  country_code?: string;        // Код страны
  region_code?: number;         // Код региона
  have_cashless?: boolean;      // С безналичной оплатой
  have_cash?: boolean;          // С наличной оплатой
  allowed_cod?: boolean;        // Разрешен наложенный платеж
  is_dressing_room?: boolean;   // С примерочной
  weight_max?: number;          // Максимальный вес
  lang?: string;                // Язык
  take_only?: boolean;          // Только для получения
  type?: string;                // Тип ПВЗ
}
```

### Типы пунктов выдачи

```typescript
// POSTAMAT - постаматы (автоматизированные пункты)
// PVZ - пункты выдачи заказов (обычные офисы)
// PICKUP_POINT - пункты самовывоза
```

---

## 🚚 Курьерские услуги

### Создание заявки на вызов курьера

```typescript
const courierRequest = await cdek.createCourierRequest({
  intake_date: '2024-01-15',
  intake_time_from: '10:00',
  intake_time_to: '18:00',
  lunch_time_from: '13:00',
  lunch_time_to: '14:00',
  weight: 2000,
  length: 40,
  width: 30,
  height: 20,
  comment: 'Хрупкие предметы, обращаться осторожно',
  sender: {
    name: 'Менеджер склада',
    phones: [{ number: '+7 383 123-45-67' }],
    email: 'warehouse@example.com',
  },
  from_location: {
    code: 270,
    address: 'Новосибирск, ул. Складская, 10',
  },
  need_call: true, // Необходимость звонка курьера
});

console.log(`Заявка создана: ${courierRequest.entity.uuid}`);
```

### Получение информации о заявке

```typescript
const courierInfo = await cdek.getCourierRequest('request-uuid');
console.log(`Статус: ${courierInfo.state}`);
console.log(`Дата: ${courierInfo.intake_date}`);
```

### Удаление заявки

```typescript
await cdek.deleteCourierRequest('request-uuid');
console.log('Заявка удалена');
```

---

## ⚠️ Обработка ошибок

### Основные типы ошибок

```typescript
try {
  const tariff = await cdek.calculateTariff(request);
} catch (error) {
  if (error instanceof Error) {
    const message = error.message;
    
    if (message.includes('401')) {
      console.error('Ошибка авторизации. Проверьте clientId и clientSecret');
    } else if (message.includes('400')) {
      console.error('Некорректный запрос. Проверьте параметры');
    } else if (message.includes('404')) {
      console.error('Ресурс не найден');
    } else if (message.includes('429')) {
      console.error('Превышен лимит запросов');
    } else if (message.includes('500')) {
      console.error('Ошибка сервера СДЭК');
    } else {
      console.error('Неизвестная ошибка:', message);
    }
  }
}
```

### Создание обработчика ошибок

```typescript
class CdekErrorHandler {
  static handle(error: unknown): void {
    if (error instanceof Error) {
      const message = error.message;
      
      switch (true) {
        case message.includes('401'):
          console.error('🔐 Ошибка авторизации');
          console.error('Проверьте правильность clientId и clientSecret');
          break;
          
        case message.includes('400'):
          console.error('📝 Некорректный запрос');
          console.error('Проверьте параметры запроса');
          break;
          
        case message.includes('404'):
          console.error('🔍 Ресурс не найден');
          break;
          
        case message.includes('429'):
          console.error('⏱️ Превышен лимит запросов');
          console.error('Подождите некоторое время');
          break;
          
        default:
          console.error('❌ Неизвестная ошибка:', message);
      }
    }
  }
}

// Использование
try {
  const result = await cdek.calculateTariff(request);
} catch (error) {
  CdekErrorHandler.handle(error);
}
```

---

## 🎯 Лучшие практики

### 1. Кэширование кодов городов

```typescript
class CityCodeCache {
  private static cache = new Map<string, number>();
  
  static async getCityCode(cdek: CdekApi, cityName: string): Promise<number | null> {
    if (this.cache.has(cityName)) {
      return this.cache.get(cityName)!;
    }
    
    const cities = await cdek.getCities({
      city: cityName,
      size: 1,
    });
    
    if (cities.length > 0) {
      const code = cities[0].code;
      this.cache.set(cityName, code);
      return code;
    }
    
    return null;
  }
}
```

### 2. Валидация данных перед отправкой

```typescript
function validateOrderData(order: OrderRequest): string[] {
  const errors: string[] = [];
  
  if (!order.recipient.name) {
    errors.push('Не указано имя получателя');
  }
  
  if (!order.recipient.phones?.length) {
    errors.push('Не указан телефон получателя');
  }
  
  if (!order.packages?.length) {
    errors.push('Не указаны упаковки');
  }
  
  order.packages?.forEach((pkg, index) => {
    if (!pkg.items?.length) {
      errors.push(`В упаковке ${index + 1} нет товаров`);
    }
  });
  
  return errors;
}

// Использование
const orderData = { /* ... */ };
const errors = validateOrderData(orderData);

if (errors.length > 0) {
  console.error('Ошибки валидации:', errors);
  return;
}

const order = await cdek.createOrder(orderData);
```

### 3. Retry механизм для неустойчивых запросов

```typescript
async function retryRequest<T>(
  request: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await request();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      if (error instanceof Error && error.message.includes('429')) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      
      throw error;
    }
  }
  
  throw new Error('Max retries exceeded');
}

// Использование
const tariff = await retryRequest(() => 
  cdek.calculateTariff(request)
);
```

### 4. Логирование запросов

```typescript
class CdekLogger {
  static logRequest(method: string, endpoint: string, data?: any): void {
    console.log(`📤 ${method} ${endpoint}`);
    if (data) {
      console.log('📋 Данные:', JSON.stringify(data, null, 2));
    }
  }
  
  static logResponse(response: any): void {
    console.log('📥 Ответ:', JSON.stringify(response, null, 2));
  }
  
  static logError(error: Error): void {
    console.error('❌ Ошибка:', error.message);
  }
}
```

### 5. Конфигурация для разных сред

```typescript
interface EnvironmentConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  timeout: number;
}

const configs: Record<string, EnvironmentConfig> = {
  development: {
    clientId: process.env.CDEK_DEV_CLIENT_ID!,
    clientSecret: process.env.CDEK_DEV_CLIENT_SECRET!,
    baseUrl: 'https://api.edu.cdek.ru',
    timeout: 30000,
  },
  production: {
    clientId: process.env.CDEK_PROD_CLIENT_ID!,
    clientSecret: process.env.CDEK_PROD_CLIENT_SECRET!,
    baseUrl: 'https://api.cdek.ru',
    timeout: 30000,
  },
};

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

const cdek = new CdekApi(config);
```

---

## ❓ Часто задаваемые вопросы

### Q: Как получить коды городов?

**A:** Используйте метод `getCities()`:

```typescript
const cities = await cdek.getCities({ city: 'Москва' });
const cityCode = cities[0]?.code; // 44
```

### Q: Почему не находятся пункты выдачи?

**A:** Проверьте:
1. Правильность кода города
2. Слишком строгие фильтры
3. Попробуйте поиск без фильтров

```typescript
// Сначала без фильтров
const allPoints = await cdek.getDeliveryPoints({ city_code: cityCode });

// Затем с фильтрами
const filteredPoints = await cdek.getDeliveryPoints({
  city_code: cityCode,
  have_cash: true,
});
```

### Q: Как переключиться между тестовой и рабочей средой?

**A:** Используйте методы переключения:

```typescript
cdek.setTestMode();    // Тестовая среда
cdek.setProductionMode(); // Рабочая среда
```

### Q: Что делать при ошибке 401?

**A:** Проверьте:
1. Правильность `clientId` и `clientSecret`
2. Активность учетной записи в личном кабинете СДЭК
3. Права доступа к API

### Q: Как правильно задать размеры упаковки?

**A:** Размеры указываются в сантиметрах:

```typescript
const package = {
  weight: 1000,    // Вес в граммах
  length: 30,      // Длина в см
  width: 20,       // Ширина в см
  height: 10,      // Высота в см
};
```

### Q: Можно ли создавать заказы без реальных товаров?

**A:** Да, для тестирования можно использовать тестовые данные:

```typescript
const testItem = {
  name: 'Тестовый товар',
  ware_key: 'TEST-001',
  cost: 100,
  amount: 1,
  weight: 100,
};
```

---

## 📚 Дополнительные ресурсы

- [Официальная документация СДЭК API](https://api.cdek.ru/v2/)
- [Личный кабинет СДЭК](https://api.cdek.ru/account)
- [Примеры использования](./examples/)
- [Тесты](./tests/)

---

## 🤝 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [FAQ](#часто-задаваемые-вопросы)
2. Посмотрите [примеры](./examples/)
3. Запустите тесты: `npm test`
4. Создайте issue в репозитории

**Удачной интеграции с API СДЭК! 🚀** 