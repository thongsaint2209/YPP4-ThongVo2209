import { Injectable } from '@nestjs/common';

interface CacheItem<T> {
  data: T;
  expire: number;
}

@Injectable()
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 60; // seconds

  // không có key trong cache
  get<T>(key: string): T | null {
    const item = this.cache.get(key); //Lấy dữ liệu từ cache theo key.
    if (!item) return null;
    if (Date.now() > item.expire) {
      // đã hết hạn
      this.cache.delete(key); // xóa khỏi cache
      return null;
    }
    return item.data; // còn hạn, trả về data
  }

  set<T>(key: string, data: T, ttlSeconds?: number): void {
    const ttl = ttlSeconds ?? this.DEFAULT_TTL;
    this.cache.set(key, { data, expire: Date.now() + ttl * 1000 });
  }

  //CacheService sẽ xem cacheKey có tồn tại trong cache không
  async queryWithCache<T>(
    key: string,
    queryFn: () => Promise<T>,
    ttlSeconds?: number,
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached) return cached;

    const result = await queryFn();
    this.set(key, result, ttlSeconds);
    return result;
  }
}
