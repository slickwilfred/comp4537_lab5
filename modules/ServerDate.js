class ServerDate {
    constructor(){}

    getDate(){
        const dateObj = new Date();
        const month = this.getMonth(dateObj.getMonth());
        const day = dateObj.getDate();
        const date = `${month} ${day}`;
        return date;
    }

    getMonth(month) {
        switch (month){
            case 0:
                return 'January';
            case 1: 
                return 'February';
            case 2: 
                return 'March';
            case 3: 
                return 'April';
            case 4: 
                return 'May';
            case 5: 
                return 'June';
            case 6: 
                return 'July';
            case 7: 
                return 'August';
            case 8: 
                return 'September';
            case 9: 
                return 'October';
            case 10: 
                return 'November';
            case 11: 
                return 'December';
            default:
                return 'Error';     
        }
    }
}

module.exports = ServerDate;