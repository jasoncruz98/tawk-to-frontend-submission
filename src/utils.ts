const pluralRules = new Intl.PluralRules('en-US');

export function pluralize(count: number, singular: string, plural: string) {
    const grammaticalNumber = pluralRules.select(count);
    switch (grammaticalNumber) {
        case 'one':
            return count + ' ' + singular;
        case 'other':
            return count + ' ' + plural;
        default:
            throw new Error('Unknown: ' + grammaticalNumber);
    }
}

export function daysAgo(utcTimestamp: string): string {
  const date: Date = new Date(utcTimestamp);
  const now: Date = new Date();
  const diffInMs: number = now.getTime() - date.getTime();
  const diffInDays: number = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays === 0 ? 'Last updated today' : `Last updated ${pluralize(diffInDays, 'day', 'days')} ago`;
}

export function noOfArticles(totalArticles: number): string {
  return totalArticles === 0 ? 'No articles' : `${pluralize(totalArticles, 'article', 'articles')}`;
}