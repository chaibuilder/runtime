import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function generateUUID(length: number = 6, chars = "abcdefghijklmnopqrstuvwxyzABCD"): string {
    let result = "";
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
