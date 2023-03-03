
export class StorageUtil {
    public static save<T>(key: string, value: T): void{
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static read<T>(key: string): T | undefined {
        const value = sessionStorage.getItem(key);
        try {
            if (value){
                return JSON.parse(value) as T;
            }
            return undefined;
        } catch (error) {
            console.error(error);
            sessionStorage.removeItem(key);
            return undefined
        }
    }

    public static delete<T>(key: string): void {
        sessionStorage.removeItem(key);
    }
}