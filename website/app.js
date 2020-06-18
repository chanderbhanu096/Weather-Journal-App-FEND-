/* Global Variables */
const projectData = [];
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '42322ca1f37cc617f098b1b4f1d46722';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {

    // get user input values
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
        .then(function(userData) {

            // add data to POST request
            updateData('/add', {
                date: newDate,
                temp: userData,
                content: content
            })

            .then(function() {
                updateUI('/all');
            })
        });

}


/* Function to GET Web API Data*/
const getWeather = async(baseURL, zip, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(baseURL + zip + ",us&appid=" + apiKey);
    try {
        // userData equals to the result of fetch function

        const userData = await res.json();

        return userData.main.temp;

    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const updateData = async(url = '', data = {}) => {
    console.log(data);
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};

//printing out the out on the client side
const updateUI = async(url = '') => {
    const final = await fetch(url);
    try {
        const finalResult = await final.json();
        const length = finalResult['length'];
        document.getElementById('date').innerHTML = `date: ${finalResult[length-1]['date']}`;
        document.getElementById('temp').innerHTML = `Temperature: ${finalResult[length-1]['temp']}`;
        document.getElementById('content').innerHTML = `Your Response: ${finalResult[length-1]['content']}`;
    } catch (error) {
        console.log(error);
    }
}