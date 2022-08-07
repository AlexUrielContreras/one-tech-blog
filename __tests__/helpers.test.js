const { timeOfDay, formatDate, formatPlural, formatTitle } = require('../utils/helpers')


test('return message based on time of day', () => {
   const morning = new Date('08-01-2022 06:00:00').getHours();
   const afternoon = new Date('08-01-2022 12:00:00').getHours();
   const evening = new Date('08-01-2022 18:00:00').getHours();
   const night = new Date('08-01-2022 23:00:00').getHours();

    expect(timeOfDay(morning)).toBe('Good Morning');
    expect(timeOfDay(afternoon)).toBe('Good Afternoon')
    expect(timeOfDay(evening)).toBe('Good Evening');
    expect(timeOfDay(night)).toBe('Good Night')
});


test('returns date and mm/dd/yy format', () => {
    const date = new Date('08-06-2022 11:15:25')

    expect(formatDate(date)).toBe('8/6/2022')
});

test('return the plural word', () => {
    expect(formatPlural('comment', 1)).toBe('comment');
    expect(formatPlural('vote', 2)).toBe("votes")
});

test('shortens the title', () => {
    const longTitle = 'This title would be to big to fix so we shorten it'
    const shortTitle = 'This title is Good'

    expect(formatTitle(longTitle)).toBe('This title would be to big to fix ...');
    expect(formatTitle(shortTitle)).toBe(shortTitle);
})