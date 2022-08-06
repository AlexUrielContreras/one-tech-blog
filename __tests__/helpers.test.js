const { timeOfDay, formatDate, formatPlural } = require('../utils/helpers')


test('return message based on time of day', () => {
   const morning = 6
   const afternoon = 12
   const evening = 18
   const night = 2

    expect(timeOfDay(morning)).toBe('Good Morning');
    expect(timeOfDay(afternoon)).toBe('Good Afternoon')
    expect(timeOfDay(evening)).toBe('Good Evening');
    expect(timeOfDay(night)).toBe('Good Night')
});


test('returns date and mm/dd/yy format', () => {

    const date = new Date('08-06-2022 11:15:25')

    expect(formatDate(date)).toBe('6/8/2022')
});

test('return the plural word', () => {
    expect(formatPlural('comment', 1)).toBe('comment');
    expect(formatPlural('vote', 2)).toBe("vote's")
})