class DateFormatter {
    constructor({ date, dateType, monthType, dateDelimiter, timeDelimiter, hourFormat, dateAndTimeDelimiter }) {
        this.dateString = new Date(date);

        // accept: short_date [DD/MM/YY] | full_date [DD/M**M/YYYY]
        this.dateType = dateType;

        // accept: short_name [MMM] | full_month [M**M]
        this.monthType = monthType;

        this.dateDelimiter = dateDelimiter;
        this.timeDelimiter = timeDelimiter;

        // accept: 12h [hh am/pm] | 24h [hh]
        this.hourFormat = hourFormat;
        this.datDelimiter = dateAndTimeDelimiter;

        this.year = this.dateString.getFullYear();
        this.month = this.dateString.getMonth();
        this.date = this.dateString.getDate();
        this.hour = this.dateString.getHours();
        this.minute = this.dateString.getMinutes();
        this.second = this.dateString.getSeconds();

        return this;
    }

    formatYear() {
        if (this.dateType === 'short_date') {
            return this.year.toString().slice(2);
        }
        
        return this.year;
    }

    formatMonth() {
        if (this.dateType === 'short_date') {
            return `0${(this.month + 1)}`.slice(-2);
        }

        let monthName = '';

        switch(this.month) {
            case 0: monthName = 'January'; break;
            case 1: monthName = 'February'; break;
            case 2: monthName = 'March'; break;
            case 3: monthName = 'April'; break;
            case 4: monthName = 'May'; break;
            case 5: monthName = 'June'; break;
            case 6: monthName = 'July'; break;
            case 7: monthName = 'August'; break;
            case 8: monthName = 'September'; break;
            case 9: monthName = 'October'; break;
            case 10: monthName = 'November'; break;
            case 11: monthName = 'December'; break;
        }

        if (this.monthType === 'short_name') {
            return monthName.slice(0,3);
        }

        return monthName;
    }

    formatDate() {
        if (this.dateType === 'short_date') {
            return `0${this.date+1}`.slice(-2);
        }

        return this.date;
    }

    formatTime() {
        let currentHour = this.hour + 1;

        if (this.hourFormat === '12h') {
            currentHour = currentHour > 12 ? currentHour - 12 : currentHour;
        }

        return [
            `0${currentHour}`.slice(-2),
            `0${this.minute+1}`.slice(-2),
            `0${this.second+1}`.slice(-2)
        ];
    }

    formatWith({dateFormat, timeFormat}) {
        let yearPos = dateFormat.indexOf('Y');
        let monthPos = dateFormat.indexOf('M');
        let datePos = dateFormat.indexOf('D');
        let hourPos = timeFormat.indexOf('h');
        let minutePos = timeFormat.indexOf('m');
        let secondPos = timeFormat.indexOf('s');

        let dateHolder = new Array(3);
        let timeHolder = new Array(3);
        let time = this.formatTime();
        
        dateHolder[yearPos] = [yearPos, this.formatYear()];
        dateHolder[monthPos] = [monthPos, this.formatMonth()];
        dateHolder[datePos] = [datePos, this.formatDate()];
        timeHolder[hourPos] = [hourPos, time[0]];
        timeHolder[minutePos] = [minutePos, time[1]];
        timeHolder[secondPos] = [secondPos, time[2]];

        let dateString = this.getString(dateHolder, this.dateDelimiter);
        let timeString = this.getString(timeHolder, this.timeDelimiter);

        return `${dateString} ${this.datDelimiter} ${timeString}`;
    }

    getString(array, delimiter) {
        return array
            .sort((a, b) => a[0] - b[0])
            .map(d => d[1])
            .join(delimiter);
    }
}

module.exports = DateFormatter;