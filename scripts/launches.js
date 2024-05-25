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
  
      const name = list_launches[i]["name"];
      const company_name = list_launches[i]["launch_service_provider"]["name"];
      const pad_location = list_launches[i]["pad"]["name"];
      let description_API = list_launches[i]['mission'] ? list_launches[i]['mission']['description'] : "Nothing to display.";
      console.log(description_API);
      const go_tbd_success = list_launches[i]['status']['name'];
  
      const launch_time = list_launches[i]["net"];
      const launch_time_formatted = `${launch_time[5]}${launch_time[6]}/${launch_time[8]}${launch_time[9]}/${launch_time[0]}${launch_time[1]}${launch_time[2]}${launch_time[3]}-${launch_time[11]}${launch_time[12]}${launch_time[13]}${launch_time[14]}${launch_time[15]}${launch_time[16]}${launch_time[17]}${launch_time[18]} UTC+0`;
  
      // Create a first column for image
      let col1 = document.createElement('div');
      col1.style.position = "relative"; /* Ensure the description button is positioned correctly */
      col1.className = 'col-sm-6';
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
      rocket_name.innerHTML = name;
      let company = document.createElement('h6');
      company.className = 'launches-company-pad';
      company.innerHTML = company_name;
      let pad = document.createElement('h6');
      pad.className = 'launches-company-pad';
      pad.innerHTML = pad_location;
      let countdown = document.createElement('h1');
      countdown.className = 'launches-countdown';
      countdown.innerHTML = 'T- 00 : 00 : 00 : 00';
      let date_launch = document.createElement('h6');
      date_launch.className = 'launches-date';
      date_launch.innerHTML = launch_time_formatted;
      let status_column = document.createElement('div');
      status_column.className = 'launches-status-column';
      let status = document.createElement('a');
      status.className = `launches-${go_tbd_success.toLowerCase()}`;
      status.innerHTML = go_tbd_success;
  
      if (image_src) {
        description_button.innerHTML = 'DESCRIPTION';
        image_rocket.src = image_src;
      } else {
        description_button.style.display = 'none';
        image_rocket.style.display = 'none';
      }
  
      // Listen to the different buttons
      description_button.addEventListener("mouseover", () => {
        description_button.innerHTML = description_API;
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
        const today = new Date();
        const dateTime_parsed = Date.parse(today);
        const launch_time_parsed = Date.parse(launch_time);
        const difference = (launch_time_parsed - dateTime_parsed) / 1000;
  
        function secondsToDhms(seconds) {
          seconds = Number(seconds);
          const d = Math.floor(seconds / (3600 * 24));
          const h = Math.floor((seconds % (3600 * 24)) / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = Math.floor(seconds % 60);
  
          const dDisplay = d < 10 ? `T- 0${d} : ` : `T- ${d} : `;
          const hDisplay = h < 10 ? `0${h} : ` : `${h} : `;
          const mDisplay = m < 10 ? `0${m} : ` : `${m} : `;
          const sDisplay = s < 10 ? `0${s}` : s;
  
          return d < 0 || h < 0 || m < 0 || s < 0 ? 'ALREADY LIFTED OFF' : `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`;
        }
  
        countdown.innerHTML = secondsToDhms(difference);
      }
  
      // Update the countdown every second
      setInterval(countdown_function, 1000);
    }
  }
  
  document.addEventListener("DOMContentLoaded", launches);
  