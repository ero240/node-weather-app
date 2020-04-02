var btn = document.getElementById('btn');
var output = document.getElementById("forecastOutput")
var info = [];


btn.addEventListener('click', (e) => {
    e.preventDefault();
    var address = document.getElementById("address").value;

    output.innerHTML = 'Loading.......';

    console.log(address);
    fetch('http://localhost:3000/weather?address=' + address)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                output.innerHTML = data.error;
            } else {
                for (const property in data) {
                    output.innerHTML += "<b>" + property + "</b>" + " : " + data[property] + "<br>";
                }
            }

        });
})