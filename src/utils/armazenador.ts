// src/utils/armazenador.ts
export function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Erro ao analisar item do armazenamento local: ${key}`, error);
            return null;
        }
    }
    return null;
}

export const Armazenador = {
    setItem,
    getItem
};