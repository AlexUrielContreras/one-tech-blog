const { timeOfDay } = require('../utils/helpers')


test('return message based on time of day', () => {
   const morning = 6
   const afternoon = 12
   const night = 18

    expect(timeOfDay(morning)).toBe('Good Morning');
    expect(timeOfDay(afternoon)).toBe('Good Afternoon')
    expect(timeOfDay(night)).toBe('Good Night');
});