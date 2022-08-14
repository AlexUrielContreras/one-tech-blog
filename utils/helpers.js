module.exports = {
    timeOfDay: (currentTime) => {
      console.log(currentTime)
        if (currentTime >= 6 && currentTime < 12) {
            return 'Good Morning'
        } else if (currentTime >= 12 && currentTime < 18) {
            return 'Good Afternoon'
        } else if (currentTime >= 18 && currentTime < 23) {
            return 'Good Evening'
        } else {
            return 'Good Night'
        }
    },

    formatDate: (date) => {
        const today = new Date().getDate();
        const posted = new Date(date).getDate()

        if (posted === today) return 'posted Today'
        
        return `on ${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    formatPlural: (str , num) => {
        if (num === 1 ) return str;

        return `${str}s`;
    },

    formatTitle: (title) => {
        const check = title.split(' ');

        if (check.length <= 6 ) return title;
    
        const newTitle = check.slice(0, 8).join(' ');
        return `${newTitle} ...`

    }

}