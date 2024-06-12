import { Injectable } from '@angular/core';

class StorageFactory {
  
  private storage = localStorage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  get<T>(key: string, defaultValue: T | null = null): T | null {
    let item = this.storage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return defaultValue;
  }

  set<T>(key: string, item: T): void {
    if (item) {
      this.storage.setItem(key, JSON.stringify(item));
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  has(key: string): boolean {
    return this.get(key) ? true : false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientStorageService {
  local() {
    return new StorageFactory(localStorage);
  }
  session() {
    return new StorageFactory(sessionStorage);
  }
}
