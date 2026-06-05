let events = [
    {
        name: "Web Seminar",
        date: "2026-06-20",
        description: "Introduction to Web Development"
    },
    {
        name: "AI Workshop",
        date: "2026-05-10",
        description: "Machine Learning Basics"
    }
];

function displayEvents(filteredEvents = events){

    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    filteredEvents.forEach((event,index)=>{

        let today = new Date();
        let eventDate = new Date(event.date);

        let card = document.createElement("div");

        card.classList.add("card");

        if(eventDate < today){
            card.classList.add("past");
        }

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;

        eventList.appendChild(card);
    });
}

function deleteEvent(index){
    events.splice(index,1);
    displayEvents();
}

document.getElementById("eventForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;
    let description = document.getElementById("eventDescription").value;

    let warning = document.getElementById("warning");

    if(!name || !date || !description){
        warning.textContent = "All fields are required!";
        return;
    }

    warning.textContent = "";

    events.push({
        name,
        date,
        description
    });

    events.sort((a,b)=>new Date(a.date)-new Date(b.date));

    displayEvents();

    document.getElementById("eventForm").reset();
});

document.getElementById("search")
.addEventListener("input",function(){

    let searchText = this.value.toLowerCase();

    let filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchText) ||
        event.date.includes(searchText)
    );

    displayEvents(filtered);
});

displayEvents();