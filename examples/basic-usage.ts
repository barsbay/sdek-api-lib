import { CdekApi } from '../src';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.CDEK_CLIENT_ID || '';
const clientSecret = process.env.CDEK_CLIENT_SECRET || '';
const baseUrl = process.env.CDEK_BASE_URL;
const timeout = process.env.CDEK_TIMEOUT ? Number(process.env.CDEK_TIMEOUT) : undefined;

async function main() {
  console.log('🚀 Базовый пример работы с API СДЭК\n');

  // Инициализация клиента
  const cdek = new CdekApi({
    clientId,
    clientSecret,
    ...(baseUrl ? { baseUrl } : {}),
    ...(timeout ? { timeout } : {}),
  });

  try {
    // 1. Расчет стоимости доставки
    console.log('📦 Пример 1: Расчет стоимости доставки');
    console.log('От: Новосибирск (код 270)');
    console.log('До: Москва (код 44)');
    console.log('Вес: 1 кг, размеры: 30x20x10 см\n');

    const tariff = await cdek.calculateTariff({
      tariff_code: 136, // Посылка склад-склад
      from_location: { code: 270 }, // Новосибирск
      to_location: { code: 44 },    // Москва
      packages: [{ 
        weight: 1000, 
        length: 30, 
        width: 20, 
        height: 10 
      }],
    });

    console.log('✅ Расчет выполнен успешно:');
    console.log(`   Тариф: ${tariff.tariff_code} (${tariff.tariff_name})`);
    console.log(`   Стоимость доставки: ${tariff.delivery_sum} ${tariff.currency}`);
    console.log(`   Срок доставки: ${tariff.period_min}-${tariff.period_max} дней`);
    console.log(`   Общая стоимость: ${tariff.total_sum} ${tariff.currency}`);
    console.log(`   Расчетный вес: ${tariff.weight_calc} г\n`);

    // 2. Поиск пунктов выдачи
    console.log('🏪 Пример 2: Поиск пунктов выдачи в Москве');
    
    // Сначала найдем код города Москва
    const moscowCities = await cdek.getCities({
      city: 'Москва',
      size: 1,
    });
    
    if (Array.isArray(moscowCities) && moscowCities.length > 0) {
      const moscowCode = moscowCities[0].code;
      console.log(`📍 Найден код города Москва: ${moscowCode}`);
      
      const deliveryPoints = await cdek.getDeliveryPoints({
        city_code: moscowCode,
        have_cash: true, // С возможностью оплаты наличными
        take_only: true, // Только для получения
      });

      console.log(`✅ Найдено ${Array.isArray(deliveryPoints) ? deliveryPoints.length : 0} пунктов выдачи:`);
      if (Array.isArray(deliveryPoints) && deliveryPoints.length > 0) {
        deliveryPoints.slice(0, 3).forEach((point, index) => {
          console.log(`   ${index + 1}. ${point.name || 'Без названия'}`);
          console.log(`      Адрес: ${point.location?.address || 'Не указан'}`);
          console.log(`      Тип: ${point.type || 'Не указан'}`);
        });
      } else {
        console.log('   Пункты выдачи не найдены с указанными параметрами');
      }
    } else {
      console.log('❌ Не удалось найти город Москва');
    }

    console.log('\n🎉 Базовый пример выполнен успешно!');
    console.log('💡 Для работы с реальными данными замените clientId и clientSecret на ваши учетные данные');

  } catch (error) {
    console.error('❌ Ошибка при выполнении примера:', error instanceof Error ? error.message : String(error));
  }
}

main().catch(console.error); 