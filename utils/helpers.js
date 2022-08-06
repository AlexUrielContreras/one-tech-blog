module.exports = {
    timeOfDay: (time) => {
        if (time >= 6 && time < 12) {
            return 'Good Morning'
        } else if (time >= 12 && time < 18) {
            return 'Good Afternoon'
        } else if (time >= 18 && time < 23) {
            return 'Good Evening'
        } else {
            return 'Good Night'
        }
    },

    formatDate: (date) => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`
    },

    formatPlural: (str , num) => {
        if (num === 1 ){
            return str
        }

        return `${str}s`
    }

}