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

export function formatDateToReadableString(dateString: string | undefined): string {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function weeksSince(dateString: string | undefined): string {
  if (!dateString) {
    return "this week";
  }

  const oneWeek = 7 * 24 * 60 * 60 * 1000; // milliseconds in one week
  const currentDate = new Date();
  const givenDate = new Date(dateString);

  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  const differenceInWeeks = Math.floor(differenceInTime / oneWeek);

  if (differenceInWeeks === 0) {
    return "this week";
  } else if (differenceInWeeks === 1) {
    return "1 week ago";
  } else {
    return `${differenceInWeeks} weeks ago`;
  }
}