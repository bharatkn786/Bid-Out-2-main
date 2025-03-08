// document.addEventListener('DOMContentLoaded', function () {
//     const closeConsentBtn = document.getElementById('closeConsentBtn');
//     const blurContainer = document.getElementById('blurContainer');
//     const consentBox = document.getElementById('consentBox');

    

//     closeConsentBtn.addEventListener('click', function () {
//         blurContainer.style.display = 'none';
//         consentBox.style.display = 'none';
//         enableScroll();
//     });

//     // Function to disable scrolling when the consent box is open
//     function disableScroll() {
//         document.body.style.overflow = 'hidden';
//     }

//     // Function to enable scrolling when the consent box is closed
//     function enableScroll() {
//         document.body.style.overflow = 'auto';
//     }

//     // Listen for clicks outside the consent box
//     window.addEventListener('click', function (event) {
//         if (event.target === blurContainer) {
//             blurContainer.style.display = 'none';
//             consentBox.style.display = 'none';
//             enableScroll();
//         }
//     });

//     const bidButton = document.querySelector('.bid_button');
//     bidButton.addEventListener('click', function (event) {
//         event.preventDefault();
//         placeBid();
//     });

//     // Function to place a new bid
//     function placeBid() {
//         const newBid = parseInt(document.getElementById('newBid').value);
//         const bidAmount = parseInt(document.getElementById('bidAmount').innerHTML);
//         if (!isNaN(newBid)) {
//             if (newBid >= bidAmount) {
//                 blurContainer.style.display = 'block';
//                 consentBox.style.display = 'block';
//                 disableScroll(); // Disable scrolling when consent box is open
//             }
//         } else {
//             alert('Please enter a valid bid amount.');
//         }
//     }


//     let slideIndex = 1;
// showSlides(slideIndex); // Show the first slide by default

// // Function to go to the next or previous slide
// function plusSlides(n) {
//     showSlides(slideIndex += n); // Increment or decrement the slide index
// }

// // Function to go to the specific slide
// function currentSlide(n) {
//     showSlides(slideIndex = n); // Set the slide index directly
// }

// // Function to show the slides
// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName("mySlides"); // Get all elements with the class 'mySlides'
//     let dots = document.getElementsByClassName("card"); // Get all the navigation dots
//     let captionText = document.getElementById("caption"); // Get the caption element
    
//     // If n exceeds the number of slides, reset to the first slide
//     if (n > slides.length) { slideIndex = 1; }
//     // If n is less than 1, set the index to the last slide
//     if (n < 1) { slideIndex = slides.length; }

//     // Hide all slides initially
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none"; // Hide all slides
//     }

//     // Remove the active class from all dots
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", ""); // Remove 'active' class from all dots
//     }

//     // Show the current slide
//     slides[slideIndex - 1].style.display = "block"; // Display the current slide
//     dots[slideIndex - 1].className += " active"; // Mark the current dot as active
//     captionText.innerHTML = dots[slideIndex - 1].alt; // Set the caption text to the alt of the active dot
// }

// });



// // const firebaseConfig = {
// //     apiKey: "AIzaSyAa4ajMh58EvQoERAjHWbZOQdkwmZ4aLic",
// //     authDomain: "bid-out.firebaseapp.com",
// //     databaseURL: "https://bid-out-default-rtdb.firebaseio.com",
// //     projectId: "bid-out",
// //     storageBucket: "bid-out.appspot.com",
// //     messagingSenderId: "885816897061",
// //     appId: "1:885816897061:web:2d61ae7f3d1caf682d59cc"
// // };

// // firebase.initializeApp(firebaseConfig);

// // const database = firebase.database();
// // const bidRef = database.ref('bids');

// // Update current bid on the screen
// function updateCurrentBid(bid) {
//     document.getElementById('bidAmount').innerText = bid;
// }

// // Listen for changes in bid value
// bidRef.orderByChild('timestamp').on('child_added', (snapshot) => {
//     const bid = snapshot.val().amount;
//     updateCurrentBid(bid);
//     addToBidTable(snapshot.val());
// });

// // Function to add a new entry to the bid table
// function addToBidTable(data) {
//     const bidTableBody = document.getElementById('bidTableBody');
//     const row = bidTableBody.insertRow(0);
//     const amountCell = row.insertCell(0);
//     const timeCell = row.insertCell(1);
//     amountCell.textContent = '$' + data.amount;
//     timeCell.textContent = new Date(data.timestamp).toLocaleString();
// }

// // Function to place a new bid
// function placeBid() {
//     const newBid = parseInt(document.getElementById('newBid').value);
//     const bidAmount = parseInt(document.getElementById('bidAmount').innerHTML)
//     if (!isNaN(newBid)) {
//         if (newBid >= bidAmount) {
//             myFunction();
//             // alert('hello')
//             document.getElementById('blurContainer').style.display = 'block';
//             document.getElementById('consentBox').style.display = 'block';
//             bidRef.push({
//                 amount: newBid,
//                 timestamp: firebase.database.ServerValue.TIMESTAMP
//             });
//         } else { 
//             alert(`Bid amount entered can't be less than or equal to current Bid`)
//         }
//     } else {
//         alert('Please enter a valid bid amount.');
//     }
// }

// // speak aloud
// let isReading = false;
// let speech;

// const text = document.getElementById('text').innerText;
// const readButton = document.getElementById('readButton');

// readButton.addEventListener('click', () => {
//     if (!isReading) {
//         speech = new SpeechSynthesisUtterance();
//         speech.text = text;
//         speech.volume = 1;
//         speech.rate = 1;
//         speech.pitch = 1;
//         speech.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google UK English Female'); // You may need to adjust this voice name based on available options
//         window.speechSynthesis.speak(speech);
//         isReading = true;
//         readButton.innerText = "Stop Reading";
//     } else {
//         window.speechSynthesis.cancel();
//         isReading = false;
//         readButton.innerText = "Read Text";
//     }
// });

// // for description part
// function showGraph(){
//     document.getElementById('graph').style.display = 'block';
//     document.getElementById('descriptionSection').style.display = 'none';
//     document.getElementById('bidHistory').style.display = 'none';
//     document.getElementById('bidProduct').style.display = 'none';
//     document.getElementById('bidReview').style.display = 'none';
// }
// function showDescription() {
//     document.getElementById('graph').style.display = 'none';
//     document.getElementById('descriptionSection').style.display = 'block';
//     document.getElementById('bidHistory').style.display = 'none';
//     document.getElementById('bidProduct').style.display = 'none';
//     document.getElementById('bidReview').style.display = 'none';
// }
// function showHistory(){
//     document.getElementById('graph').style.display = 'none';
//     document.getElementById('descriptionSection').style.display = 'none';
//     document.getElementById('bidHistory').style.display = 'block';
//     document.getElementById('bidProduct').style.display = 'none';
//     document.getElementById('bidReview').style.display = 'none';
// }
// function showProducts() {
//     document.getElementById('graph').style.display = 'none';
//     document.getElementById('descriptionSection').style.display = 'none';
//     document.getElementById('bidHistory').style.display = 'none';
//     document.getElementById('bidReview').style.display = 'none';
//     document.getElementById('bidProduct').style.display = 'block';
// }
// function showReview(){
//     document.getElementById('graph').style.display = 'none';
//     document.getElementById('descriptionSection').style.display = 'none';
//     document.getElementById('bidHistory').style.display = 'none';
//     document.getElementById('bidReview').style.display = 'block';
//     document.getElementById('bidProduct').style.display = 'none';
// }

// function myFunction() {
//     let email1 = prompt("Enter email")
//     emailjs.send("service_0bbnqrh","template_8yzn4ue",{
//         email: email1,
//         });
//     // alert("send")
//     return 0;
// }



document.addEventListener('DOMContentLoaded', function () {
     // Slide functionality
     let slideIndex = 1;
     showSlides(slideIndex);
 
     function plusSlides(n) {
         showSlides(slideIndex += n);
     }
 
     function currentSlide(n) {
         showSlides(slideIndex = n);
     }
 
     function showSlides(n) {
         let i;
         let slides = document.getElementsByClassName("mySlides");
         let dots = document.getElementsByClassName("card");
         let captionText = document.getElementById("caption");
         if (n > slides.length) {slideIndex = 1}
         if (n < 1) {slideIndex = slides.length}
         for (i = 0; i < slides.length; i++) {
             slides[i].style.display = "none";
         }
         for (i = 0; i < dots.length; i++) {
             dots[i].className = dots[i].className.replace(" active", "");
         }
         slides[slideIndex-1].style.display = "block";
         dots[slideIndex-1].className += " active";
         captionText.innerHTML = dots[slideIndex-1].alt;
     }
 

   
    // Consent box functionality
    const closeConsentBtn = document.getElementById('closeConsentBtn');
    const blurContainer = document.getElementById('blurContainer');
    const consentBox = document.getElementById('consentBox');

    closeConsentBtn.addEventListener('click', function () {
        blurContainer.style.display = 'none';
        consentBox.style.display = 'none';
        enableScroll();
    });

    // Function to disable scrolling when the consent box is open
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Function to enable scrolling when the consent box is closed
    function enableScroll() {
        document.body.style.overflow = 'auto';
    }

    // Listen for clicks outside the consent box
    window.addEventListener('click', function (event) {
        if (event.target === blurContainer) {
            blurContainer.style.display = 'none';
            consentBox.style.display = 'none';
            enableScroll();
        }
    });

    // Bid button functionality
    const bidButton = document.querySelector('.bid_button');
    bidButton.addEventListener('click', function (event) {
        event.preventDefault();
        placeBid();
    });

     // MetaMask & Web3 initialization
    // if (typeof window.ethereum !== 'undefined') {
    //     // Initialize Web3
    //     const web3 = new Web3(window.ethereum);

    //     // Request account access
    //     ethereum.request({ method: 'eth_requestAccounts' })
    //         .then(accounts => {
    //             const userAddress = accounts[0]; // Get the user's address
    //             console.log(`Connected with address: ${userAddress}`);

    //             // You can now interact with the Ethereum network
    //             web3.eth.getBalance(userAddress)
    //                 .then(balance => {
    //                     console.log(`Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    //                 });
    //         })
    //         .catch(err => {
    //             alert('Please connect to MetaMask!');
    //         });
    // } else {
    //     alert('Please install MetaMask!');
    // }


    // Firebase setup
    // const firebaseConfig = {
    //     apiKey: "AIzaSyAa4ajMh58EvQoERAjHWbZOQdkwmZ4aLic",
    //     authDomain: "bid-out.firebaseapp.com",
    //     databaseURL: "https://bid-out-default-rtdb.firebaseio.com",
    //     projectId: "bid-out",
    //     storageBucket: "bid-out.appspot.com",
    //     messagingSenderId: "885816897061",
    //     appId: "1:885816897061:web:2d61ae7f3d1caf682d59cc"
    // };

    // firebase.initializeApp(firebaseConfig);
    // const database = firebase.database();
    // const bidRef = database.ref('bids');

    // Update current bid on the screen
    function updateCurrentBid(bid) {
        document.getElementById('bidAmount').innerText = bid;
    }

    // Listen for changes in bid value
    bidRef.orderByChild('timestamp').on('child_added', (snapshot) => {
        const bid = snapshot.val().amount;
        updateCurrentBid(bid);
        addToBidTable(snapshot.val());
    });

    // Function to add a new entry to the bid table
    function addToBidTable(data) {
        const bidTableBody = document.getElementById('bidTableBody');
        const row = bidTableBody.insertRow(0);
        const amountCell = row.insertCell(0);
        const timeCell = row.insertCell(1);
        amountCell.textContent = '$' + data.amount;
        timeCell.textContent = new Date(data.timestamp).toLocaleString();
    }

    // Combined placeBid function
    function placeBid() {
        const newBid = parseInt(document.getElementById('newBid').value);
        const bidAmount = parseInt(document.getElementById('bidAmount').innerHTML);

        if (!isNaN(newBid)) {
            if (newBid >= bidAmount) {
                blurContainer.style.display = 'block';
                consentBox.style.display = 'block';
                disableScroll(); // Disable scrolling when consent box is open

                // Push bid to Firebase
                // bidRef.push({
                //     amount: newBid,
                //     timestamp: firebase.database.ServerValue.TIMESTAMP
                // });
            } else { 
                alert(`Bid amount entered can't be less than or equal to current Bid`);
            }
        } else {
            alert('Please enter a valid bid amount.');
        }
    }

    // Speech synthesis functionality
    let isReading = false;
    let speech;

    const text = document.getElementById('text').innerText;
    const readButton = document.getElementById('readButton');

    readButton.addEventListener('click', () => {
        if (!isReading) {
            speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            // Ensure voices are loaded
            speechSynthesis.addEventListener('voiceschanged', function() {
                const voices = speechSynthesis.getVoices();
                speech.voice = voices.find(voice => voice.name === 'Google UK English Female');
            });

            window.speechSynthesis.speak(speech);
            isReading = true;
            readButton.innerText = "Stop Reading";
        } else {
            window.speechSynthesis.cancel();
            isReading = false;
            readButton.innerText = "Read Text";
        }
    });

   
    // Sections display functionality
    function showGraph(){
        document.getElementById('graph').style.display = 'block';
        document.getElementById('descriptionSection').style.display = 'none';
        document.getElementById('bidHistory').style.display = 'none';
        document.getElementById('bidProduct').style.display = 'none';
        document.getElementById('bidReview').style.display = 'none';
    }

    function showDescription() {
        document.getElementById('graph').style.display = 'none';
        document.getElementById('descriptionSection').style.display = 'block';
        document.getElementById('bidHistory').style.display = 'none';
        document.getElementById('bidProduct').style.display = 'none';
        document.getElementById('bidReview').style.display = 'none';
    }

    function showHistory(){
        document.getElementById('graph').style.display = 'none';
        document.getElementById('descriptionSection').style.display = 'none';
        document.getElementById('bidHistory').style.display = 'block';
        document.getElementById('bidProduct').style.display = 'none';
        document.getElementById('bidReview').style.display = 'none';
    }

    function showProducts() {
        document.getElementById('graph').style.display = 'none';
        document.getElementById('descriptionSection').style.display = 'none';
        document.getElementById('bidHistory').style.display = 'none';
        document.getElementById('bidReview').style.display = 'none';
        document.getElementById('bidProduct').style.display = 'block';
    }

    function showReview(){
        document.getElementById('graph').style.display = 'none';
        document.getElementById('descriptionSection').style.display = 'none';
        document.getElementById('bidHistory').style.display = 'none';
        document.getElementById('bidReview').style.display = 'block';
        document.getElementById('bidProduct').style.display = 'none';
    }

    // Send email on bid action
    function myFunction() {
        let email1 = prompt("Enter email");
        emailjs.send("service_0bbnqrh", "template_8yzn4ue", {
            email: email1,
        });
        return 0;
    }
    
});
