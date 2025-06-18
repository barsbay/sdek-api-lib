import { CdekApi, TARIFF_CODES } from '../src';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => jest.fn());
const mockedFetch = fetch as unknown as jest.Mock;

describe('CdekApi', () => {
  const config = { clientId: 'test', clientSecret: 'test' };
  let cdek: CdekApi;

  beforeEach(() => {
    cdek = new CdekApi(config);
    mockedFetch.mockReset();
  });

  it('should authorize and cache token', async () => {
    mockedFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'token', token_type: 'bearer', expires_in: 3600, scope: '', jti: '' }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await cdek.calculateTariff({
      tariff_code: TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE,
      from_location: { code: 1 },
      to_location: { code: 2 },
      packages: [{ weight: 1000 }],
    });
    expect(mockedFetch).toHaveBeenCalled();
  });

  it('should calculate tariff', async () => {
    mockedFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'token', token_type: 'bearer', expires_in: 3600, scope: '', jti: '' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ tariff_code: 136, tariff_name: 'Test', tariff_description: '', delivery_mode: '', delivery_sum: 100, period_min: 1, period_max: 2, weight_calc: 1000, total_sum: 100, currency: 'RUB' }),
      });
    const result = await cdek.calculateTariff({
      tariff_code: 136,
      from_location: { code: 1 },
      to_location: { code: 2 },
      packages: [{ weight: 1000 }],
    });
    expect(result.tariff_code).toBe(136);
    expect(result.total_sum).toBe(100);
  });

  it('should create order', async () => {
    mockedFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'token', token_type: 'bearer', expires_in: 3600, scope: '', jti: '' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ entity: { uuid: 'order-uuid' } }),
      });
    const order = await cdek.createOrder({
      tariff_code: 136,
      recipient: { name: 'Test', phones: [{ number: '+7 123 123-45-67' }] },
      from_location: { code: 1 },
      to_location: { code: 2 },
      packages: [{ number: '1', weight: 1000, items: [{ name: 'Test', ware_key: '1', cost: 100, amount: 1 }] }],
    });
    expect(order.entity.uuid).toBe('order-uuid');
  });
}); 