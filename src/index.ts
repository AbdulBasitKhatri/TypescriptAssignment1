const xhr = new XMLHttpRequest();
const table = document.getElementById("table")! as HTMLTableElement;
const errorBlock = document.getElementById("errorBlock")! as HTMLDivElement;

table.style.display = "none";
errorBlock.style.display = "none";

xhr.onerror = function(){
		//Show Error On HTML Page
		errorBlock.style.display = "block";
		errorBlock.innerHTML = `</br>Unknown Error Occured! </br></br>Please Check Your Internet Connectivity!`;
}
xhr.onload = function() { 
 if(xhr.status != 200){
		//Show Error On HTML Page
		errorBlock.style.display = "block";
		errorBlock.innerHTML = `Error </br> ${xhr.status} </br> ${xhr.statusText}`;
	}
 else{
		//First Parse Into JSON
		const parsedRes = JSON.parse(xhr.response);
		//Alert If No Results Are Found!
		if(parsedRes.length < 1){
			errorBlock.style.display = "block";
			errorBlock.innerHTML = "Sorry, No Results Were Found!";
		}
		else{
			//Show Results
			table.style.display = "block";
			for(let i of parsedRes){
				let trow = document.createElement("tr");
					let tId = document.createElement("td");
					tId.innerText = i.id;
					let tTitle = document.createElement("td");
          tTitle.innerText = i.title;
					let tDesc = document.createElement("td");
          tDesc.innerText = i.description;
					let tPrice = document.createElement("td");
          tPrice.innerText = i.price;
				trow.appendChild(tId);
				trow.appendChild(tTitle);
				trow.appendChild(tDesc);
				trow.appendChild(tPrice);
				table.appendChild(trow);
			}
		}
	}
}
xhr.timeout = 10000;
xhr.open("GET", "https://fakestoreapi.com/products");
xhr.send();
