// Article rotation logic - changes articles every 7 days

import { articleSets } from '../data/articles';

/**
 * Gets the current article set based on the current date
 * Articles rotate every 7 days
 */
export function getCurrentArticleSet() {
  // Reference date: November 12, 2024 (when the system was implemented)
  const referenceDate = new Date('2024-11-12').getTime();
  const currentDate = new Date().getTime();
  
  // Calculate how many 7-day periods have passed since reference date
  const millisIn7Days = 7 * 24 * 60 * 60 * 1000;
  const periodsPassed = Math.floor((currentDate - referenceDate) / millisIn7Days);
  
  // Use modulo to cycle through article sets
  const setIndex = periodsPassed % articleSets.length;
  
  return articleSets[setIndex];
}

/**
 * Gets how many days until the next article rotation
 */
export function getDaysUntilNextRotation(): number {
  const referenceDate = new Date('2024-11-12').getTime();
  const currentDate = new Date().getTime();
  
  const millisIn7Days = 7 * 24 * 60 * 60 * 1000;
  const timeSinceReference = currentDate - referenceDate;
  const timeInCurrentPeriod = timeSinceReference % millisIn7Days;
  const timeUntilNextPeriod = millisIn7Days - timeInCurrentPeriod;
  
  return Math.ceil(timeUntilNextPeriod / (24 * 60 * 60 * 1000));
}

/**
 * Finds an article by its slug from all article sets
 */
export function getArticleBySlug(slug: string) {
  for (const set of articleSets) {
    const article = set.find(a => a.slug === slug);
    if (article) {
      return article;
    }
  }
  return null;
}
