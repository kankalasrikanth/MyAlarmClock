

    //code is wrapped inside a DOMContentLoaded event listener that runs only after html code is loaded
document.addEventListener("DOMContentLoaded", function() {
    //Element References: The code retrieves references to the clock display element, the set alarm button, and the alarm list element
    const clockElement = document.getElementById("clock");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmListElement = document.getElementById("alarm-list");

    let alarms = [];

    // Update the clock every second
    setInterval(updateClock, 1000);
//The updateClock function gets the current time, formats it, updates the clock display, and checks if any alarms are due to ring.
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
//When the set alarm button is clicked, it collects the input values for hours, minutes, seconds, and AM/PM. 
//If any value is missing, an alert is shown. Otherwise, it formats the alarm time, adds it to the alarms array, and updates the alarm list.
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
// The addAlarmToList function creates a new alarm item in the alarm list with a delete button.
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
//The checkAlarms function compares the current time with the alarms in the alarms array. If a match is found,
// it shows an alert and removes the alarm from the list.
    function checkAlarms(currentTime) {
        if (alarms.includes(currentTime)) {
            alert("Alarm ringing!");
            alarms = alarms.filter(alarm => alarm !== currentTime);
            updateAlarmList();
        }
    }
//The updateAlarmList function clears the current alarm list and repopulates it with the remaining alarms.
    function updateAlarmList() {
        alarmListElement.innerHTML = "";
        alarms.forEach(addAlarmToList);
    }
});
