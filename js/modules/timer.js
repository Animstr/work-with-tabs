function timer() {
        //Timer
        let endTime = '2024-09-01';
    
        function getRemainingTime(endDate) {
    
            let time, days, hours, minutes, seconds;
    
            time = Date.parse(endDate) - new Date();
    
            if (time <= 0) {
                document.querySelector('.timer').style.display = 'none';
                document.querySelector('#timer_title').innerHTML = 'Акция окончена!'
            } else {
                days = Math.floor(time/(1000 * 60 * 60 * 24));
                hours = Math.floor((time/(1000 * 60 * 60) % 24));
                minutes = Math.floor((time/(1000 * 60) % 60));
                seconds = Math.floor((time/1000 % 60));
            }
    
            return {
                'time': time,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }
        }
    
        function getZero (num){
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    
        function alertTime(block, endDate) {
            const timeBlock = document.querySelector(block),
                days = timeBlock.querySelector('#days'),
                hours = timeBlock.querySelector('#hours'),
                minutes = timeBlock.querySelector('#minutes'),
                seconds = timeBlock.querySelector('#seconds');
                let timeInterval = setInterval(updateTimer, 1000);
    
                updateTimer();
                
            function updateTimer () {
                let t = getRemainingTime(endDate);
        
                if (t.time <= 0){
                    clearInterval(timeInterval);
                } else {
                    days.innerHTML = getZero(t.days);
                    hours.innerHTML = getZero(t.hours);
                    minutes.innerHTML = getZero(t.minutes);
                    seconds.innerHTML = getZero(t.seconds);    
                }
            }
        }
        
        alertTime('.timer', endTime);
};

module.exports = timer;