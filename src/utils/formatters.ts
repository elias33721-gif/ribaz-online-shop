const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] ?? digit);
}

export function formatTaka(amount: number): string {
  const formatted = Math.round(amount).toLocaleString('en-IN');
  return `৳ ${toBengaliNumber(formatted)}`;
}

export function isValidBdPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+]/g, '');
  // Accept 01XXXXXXXXX or 8801XXXXXXXXX
  return /^(?:88)?01[3-9]\d{8}$/.test(cleaned);
}
