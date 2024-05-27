async function launches() {
  const launches_url = "https://ll.thespacedevs.com/2.0.0/launch/upcoming/?format=json&limit=10";
  const response = await fetch(launches_url);
  const data = await response.json();
  const list_launches = data["results"];

  console.log(list_launches);

  const mainContent = document.getElementById('main-content');

  for (let i = 0; i < list_launches.length; i++) {
    const image_src = list_launches[i]["image"];
    console.log(image_src);

    // Create div element
    let divElement = document.createElement('div');
    divElement.className = 'launches-container';
    mainContent.appendChild(divElement);

    // Create a first column for image
    let col1 = document.createElement('div');
    col1.style.position = "relative"; /* Ensure the description button is positioned correctly */
    col1.style.flex = "0 0 275px"; /* Set flex basis to match the image width */
    col1.style.height = "333px"; /* Set height to match the image height */
    let image_rocket = document.createElement('img');
    image_rocket.className = 'launches-image';
    col1.appendChild(image_rocket);
    let description_button = document.createElement('a');
    description_button.className = 'launches-button';
    col1.appendChild(description_button);
    divElement.appendChild(col1);

    // Create a second column for text content
    let col2 = document.createElement('div');
    col2.className = 'launches-content';
    let rocket_name = document.createElement('h4');
    rocket_name.className = 'launches-rocket-name';
    rocket_name.innerHTML = list_launches[i]["name"];
    let company = document.createElement('h6');
    company.className = 'launches-company-pad';
    company.innerHTML = list_launches[i]["launch_service_provider"]["name"];
    let pad = document.createElement('h6');
    pad.className = 'launches-company-pad';
    pad.innerHTML = list_launches[i]["pad"]["name"];
    let countdown = document.createElement('h1');
    countdown.className = 'launches-countdown';
    countdown.innerHTML = 'T- 00 : 00 : 00 : 00';
    let date_launch = document.createElement('h6');
    date_launch.className = 'launches-date';
    date_launch.innerHTML = new Date(list_launches[i]["net"]).toUTCString();
    let status_column = document.createElement('div');
    status_column.className = 'launches-status-column';
    let status = document.createElement('a');
    status.className = `launches-${list_launches[i]['status']['name'].toLowerCase()}`;
    status.innerHTML = list_launches[i]['status']['name'];

    if (image_src) {
      description_button.innerHTML = 'DESCRIPTION';
      image_rocket.src = image_src;
    } else {
      description_button.style.display = 'none';
      image_rocket.style.display = 'none';
    }

    // Listen to the different buttons
    description_button.addEventListener("mouseover", () => {
      description_button.innerHTML = list_launches[i]['mission'] ? list_launches[i]['mission']['description'] : "Nothing to display.";
    });

    description_button.addEventListener("mouseout", () => {
      description_button.innerHTML = 'DESCRIPTION';
    });

    // Append elements to columns
    col2.appendChild(rocket_name);
    col2.appendChild(company);
    col2.appendChild(pad);
    col2.appendChild(countdown);
    col2.appendChild(date_launch);
    status_column.appendChild(status);
    col2.appendChild(status_column);
    divElement.appendChild(col2);

    // Countdown function
    function countdown_function() {
      const now = new Date().getTime();
      const launchTime = new Date(list_launches[i]["net"]).getTime();
      const distance = launchTime - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.innerHTML = `T- ${days < 10 ? '0' : ''}${days} : ${hours < 10 ? '0' : ''}${hours} : ${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;

      if (distance < 0) {
        clearInterval(interval);
        countdown.innerHTML = "ALREADY LIFTED OFF";
      }
    }

    const interval = setInterval(countdown_function, 1000);
  }
}

document.addEventListener("DOMContentLoaded", launches);
