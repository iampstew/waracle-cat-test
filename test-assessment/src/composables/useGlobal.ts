export function useGlobal() {
    const apiKey : string = import.meta.env.VITE_API_KEY || 'default-api-key';
    const subId : string = import.meta.env.VITE_API_SUB_ID || 'default-sub-id';
    return {
        apiKey,
        subId
    }
}