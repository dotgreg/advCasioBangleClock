console.log("woop");
const textarea = document.getElementById("tasks")
const logsDiv = document.getElementById("logs")
const log = (str) => {logsDiv.innerHTML = " - " + str + "<br/>" + logsDiv.innerHTML}

const syncToBangle = (fileName, jsonObj) => {
		if (jsonObj.tasks) {
				// chunk it in arr of 11 chars 
				console.log(1, jsonObj.tasks);
				jsonObj.tasks = jsonObj.tasks.match(/.{1,11}/g).join("\n")
				console.log(2, jsonObj.tasks);
		}
		const content = JSON.stringify(jsonObj)
		log(`waiting for it `);
		// connection.write("reset();\n", function() {
		setTimeout(function() {
				log(`writing "${content}" to ${fileName}`);
				Puck.eval(`require("Storage").writeJSON("${fileName}", ${content})`,function(x) {
						log(1, x);


				})
		})
}

var connection;
const syncToBangleold = (fileName, jsonObj) => {
		// disconnect if connected already
		if (connection) {
				connection.close();
				connection = undefined;
		}
		// Connect
		Puck.connect(function(c) {
				if (!c) {
						// alert("Couldn't connect!");
						log("couldnot connect");
						return;
				}
				connection = c;
				// Handle the data we get back, and call 'onLine'
				// whenever we get a line
				var buf = "";
				connection.on("data", function(d) {
						buf += d;
						var l = buf.split("\n");
						buf = l.pop();
						l.forEach(line => {
								console.log(3, line);
								log(line)
						});
				});
				// First, reset the Bangle
				// connection.write("reset();\n", function() {
				// 		// Wait for it to reset itself
				// 		setTimeout(function() {
				// 				// Now upload our code to it
				// 				connection.write("\x03\x10if(1){"+BANGLE_CODE+"}\n",
				// 												 function() { console.log("Ready..."); });
				// 		}, 1500);
				// });
				if (jsonObj.tasks) {
						// chunk it in arr of 11 chars 
						console.log(1, jsonObj.tasks);
						jsonObj.tasks = jsonObj.tasks.match(/.{1,11}/g).join("\n")
						console.log(2, jsonObj.tasks);
				}
				const content = JSON.stringify(jsonObj)
				log(`waiting for it `);
				// connection.write("reset();\n", function() {
				setTimeout(function() {
						log(`writing "${content}" to ${fileName}`);
						Puck.eval(`require("Storage").writeJSON("${fileName}", ${content})`,function(x) {
								log(1, x);


						})

						// connection.write(`require("Storage").writeJSON("${fileName}", ${JSON.stringify(jsonObj)})`, function(res) {
						// 		console.log(1, res);
						// 		connection.write(`require("storage").readjson("testjson.json")`, function(res2) {
						// 				console.log(2, res2);
						// 		})
						// })
				}, 100)
				// })
		});
}

const getFromLs = () => {
		textarea.value = localStorage.getItem('tasks');
}
const setLs = () => {
		localStorage.setItem('tasks', textarea.value);
}
const onTextAreaChange = () => {
		setLs(textarea.value)
}
getFromLs()


const toUpload = {
		"tasks":"",
		"weather":[[12,0], [14,1], [22,2], [33,3]]
}

const mainLogic = () => {
		toUpload.tasks = textarea.value
		console.log(11, toUpload);
		syncToBangle("advCasioData.json", toUpload)
}
document.getElementById("btnConnect").addEventListener("click", mainLogic);
// document.getElementById("tasks").
// lets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchylets put that thingy on my watchy
