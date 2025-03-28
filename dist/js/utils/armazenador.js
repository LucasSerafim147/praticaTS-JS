// src/utils/armazenador.ts
export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key) {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item);
        }
        catch (error) {
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
