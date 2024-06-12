document.addEventListener("DOMContentLoaded", function() {
    const clockElement = document.getElementById("clock");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmListElement = document.getElementById("alarm-list");

    let alarms = [];

    // Update the clock every second
    setInterval(updateClock, 1000);

    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

        const timeString = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)} ${ampm}`;
        clockElement.textContent = timeString;

        checkAlarms(timeString);
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    setAlarmButton.addEventListener("click", function() {
        const hours = document.getElementById("hours").value;
        const minutes = document.getElementById("minutes").value;
        const seconds = document.getElementById("seconds").value;
        const ampm = document.getElementById("am-pm").value;

        if (!hours || !minutes || !seconds) {
            alert("Please enter a valid time.");
            return;
        }

        const alarmTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)} ${ampm}`;
        alarms.push(alarmTime);
        addAlarmToList(alarmTime);
    });

    function addAlarmToList(time) {
        const alarmItem = document.createElement("div");
        alarmItem.classList.add("alarm-item");
        alarmItem.textContent = time;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "ml-2");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            alarms = alarms.filter(alarm => alarm !== time);
            alarmItem.remove();
        });

        alarmItem.appendChild(deleteButton);
        alarmListElement.appendChild(alarmItem);
    }

    function checkAlarms(currentTime) {
        if (alarms.includes(currentTime)) {
            alert("Alarm ringing!");
            alarms = alarms.filter(alarm => alarm !== currentTime);
            updateAlarmList();
        }
    }

    function updateAlarmList() {
        alarmListElement.innerHTML = "";
        alarms.forEach(addAlarmToList);
    }
});
