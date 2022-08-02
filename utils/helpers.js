function timeOfDay(date) {
    if (date >= 6 && date < 12) {
        return 'Good Morning'
    } else if (date >= 12 && date < 18) {
        return 'Good Afternoon'
    } else {
        return 'Good Night'
    }
};


module.exports = { timeOfDay };