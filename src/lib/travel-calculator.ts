/**
 * Smart Travel Duration Calculator for Traliber
 * Uses strict calendar-day arithmetic to avoid daylight-saving and timezone off-by-one errors.
 */

export type DurationCategory =
  | 'Same-day trip'
  | 'Weekend'
  | 'Short trip'
  | 'Extended trip'
  | 'Long trip';

export interface TripDurationResult {
  days: number;
  nights: number;
  durationCategory: DurationCategory;
  isValid: boolean;
  error?: string;
  formattedRange?: string;
}

/**
 * Calculates calendar days, nights, and trip category between two YYYY-MM-DD date strings.
 * 
 * Rules:
 * - Same-day trip: 1 calendar day, 0 nights (Departure == Return)
 * - Weekend: 2–3 calendar days
 * - Short trip: 4–7 calendar days
 * - Extended trip: 8–14 calendar days
 * - Long trip: 15+ calendar days
 */
export function calculateTripDuration(
  departureDateStr: string,
  returnDateStr: string
): TripDurationResult {
  if (!departureDateStr || !returnDateStr) {
    return {
      days: 0,
      nights: 0,
      durationCategory: 'Same-day trip',
      isValid: false,
      error: 'Please select both departure and return dates.',
    };
  }

  // Parse YYYY-MM-DD manually to prevent local timezone offsets
  const dParts = departureDateStr.split('-').map(Number);
  const rParts = returnDateStr.split('-').map(Number);

  if (
    dParts.length !== 3 ||
    rParts.length !== 3 ||
    dParts.some(isNaN) ||
    rParts.some(isNaN)
  ) {
    return {
      days: 0,
      nights: 0,
      durationCategory: 'Same-day trip',
      isValid: false,
      error: 'Invalid date format. Expected YYYY-MM-DD.',
    };
  }

  const [dYear, dMonth, dDay] = dParts;
  const [rYear, rMonth, rDay] = rParts;

  // Use Date.UTC to guarantee 86,400,000 ms per calendar day without DST shifts
  const utcDeparture = Date.UTC(dYear, dMonth - 1, dDay);
  const utcReturn = Date.UTC(rYear, rMonth - 1, rDay);

  const diffMs = utcReturn - utcDeparture;
  const diffDays = Math.round(diffMs / 86400000);

  if (diffDays < 0) {
    return {
      days: 0,
      nights: 0,
      durationCategory: 'Same-day trip',
      isValid: false,
      error: 'Return date cannot be earlier than departure date.',
    };
  }

  const nights = diffDays;
  const days = diffDays + 1;

  let durationCategory: DurationCategory;
  if (days === 1) {
    durationCategory = 'Same-day trip';
  } else if (days <= 3) {
    durationCategory = 'Weekend';
  } else if (days <= 7) {
    durationCategory = 'Short trip';
  } else if (days <= 14) {
    durationCategory = 'Extended trip';
  } else {
    durationCategory = 'Long trip';
  }

  // Nicely format the date range
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const depFormatted = `${dDay} ${months[dMonth - 1]} ${dYear}`;
  const retFormatted = `${rDay} ${months[rMonth - 1]} ${rYear}`;
  const formattedRange =
    days === 1 ? depFormatted : `${depFormatted} – ${retFormatted}`;

  return {
    days,
    nights,
    durationCategory,
    isValid: true,
    formattedRange,
  };
}

/**
 * Returns helper description and packing implications for a duration category.
 */
export function getDurationDescription(category: DurationCategory, days: number, nights: number): string {
  switch (category) {
    case 'Same-day trip':
      return '1 calendar day (0 nights). Ideal for single-day transit, daytime interviews, or rapid business trips requiring ultra-compact hygiene touch-ups.';
    case 'Weekend':
      return `${days} days / ${nights} night${nights > 1 ? 's' : ''}. Perfectly covered by the standard Traliber 10-item kit with no mandatory replenishments.`;
    case 'Short trip':
      return `${days} days / ${nights} nights. Standard Traliber kit plus moderate hygiene replenishment considerations (extra wipes, sanitizer refills).`;
    case 'Extended trip':
      return `${days} days / ${nights} nights. Requires additional travel hygiene consumables, spare toilet seat covers, and laundry/paper soap backups.`;
    case 'Long trip':
      return `${days} days / ${nights} nights. Comprehensive multi-week travel setup; recommend multi-pack hygiene supplies and journey comfort items.`;
  }
}

