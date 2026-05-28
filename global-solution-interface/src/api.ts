import axios from "axios";
 
/**
 * BASE_URL aponta para o backend Spring Boot.
 *
 * ATENÇÃO - dependendo de onde o app está rodando:
 * - Expo Web (navegador) → localhost funciona normalmente
 * - iOS Simulator → localhost funciona normalmente
 * - Android Emulator → use 10.0.2.2 no lugar de localhost
 * - Dispositivo físico → use o IP da sua máquina (ex: 192.168.1.100)
 */
const BASE_URL = "http://localhost:8080/api";
 
const api = axios.create({
 baseURL: BASE_URL,
 timeout: 10000,
 headers: {
 "Content-Type": "application/json",
 },
});
 
export default api;

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  },

  async patch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },
};