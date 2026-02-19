import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = new Date(startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
  
  if (!endDate) {
    return `${start} - Present`;
  }
  
  const end = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
  
  return `${start} - ${end}`;
}

export function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  let totalMonths = years * 12 + months;
  const totalYears = Math.floor(totalMonths / 12);
  totalMonths = totalMonths % 12;
  
  if (totalYears > 0 && totalMonths > 0) {
    return `${totalYears} year${totalYears > 1 ? 's' : ''} ${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
  } else if (totalYears > 0) {
    return `${totalYears} year${totalYears > 1 ? 's' : ''}`;
  } else {
    return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
  }
}

