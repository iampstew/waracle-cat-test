export function useGlobal() {
    const apiKey : string = import.meta.env.VITE_CAT_API_KEY;
    const subId : string = import.meta.env.VITE_CAT_API_ID;
    const baseUrl : string = import.meta.env.VITE_CAT_API_URL;
    return {
        apiKey,
        baseUrl,
        subId
    }
}