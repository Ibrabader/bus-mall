'use strict';

// ================= Global Decleration ==========================
//================================================================
let SectionElement = document.getElementById('Section-img');

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');


let maxAttempt = 10;
let counter = 0;
let votesArr = [];
let seenArr=[];
let namesArray = [];

// ================= Constructor Function ==========================
//==================================================================

function product(name, source) {

    this.name = name;
    this.source = source;
    this.votes = 0;
    this.seen = 0;
    product.productArray.push(this);
    namesArray.push(this.name)
    // votesArr.push(this.votes)

    
}
product.productArray = [];

// ================= Expression ==========================
//========================================================

new product('bag', 'images/bag.jpg')
new product('banana', 'images/banana.jpg')
new product('bathroom', 'images/bathroom.jpg')
new product('boots', 'images/boots.jpg')
new product('breakfast', 'images/breakfast.jpg')
new product('bubblegum', 'images/bubblegum.jpg')
new product('chair', 'images/chair.jpg')
new product('cthulhu', 'images/cthulhu.jpg')
new product('dog-duck', 'images/dog-duck.jpg')
new product('dragon', 'images/dragon.jpg')
new product('pen', 'images/pen.jpg')
new product('pet-sweep', 'images/pet-sweep.jpg')
new product('scissors', 'images/scissors.jpg')
new product('shark', 'images/shark.jpg')
new product('sweep', 'images/sweep.png')
new product('tauntaun', 'images/tauntaun.jpg')
new product('unicorn', 'images/unicorn.jpg')
new product('water-can', 'images/water-can.jpg')
new product('wine-glass', 'images/wine-glass.jpg')

// ================= Random Numbers Function ==========================

function generateRandomIndex() {
    return Math.floor(Math.random() * product.productArray.length);
}


let leftImage;
let middleImage;
let rightImage;

let previousShown =[];

// ================= Render Image Function ==========================
//===================================================================

function RenderThreeImages() {
    leftImage = generateRandomIndex();
    middleImage = generateRandomIndex();
    rightImage = generateRandomIndex();
    // console.log(leftImage);
    // console.log(middleImage);
    // console.log(rightImage);

// ============== No double itration or same image at a time ============

   
    while ( leftImage === middleImage||previousShown.includes(leftImage) || rightImage === middleImage||previousShown.includes(rightImage) || rightImage === leftImage||previousShown.includes(middleImage))
     {
        leftImage = generateRandomIndex();
        rightImage = generateRandomIndex();
        middleImage = generateRandomIndex();
    }
    previousShown=[leftImage,middleImage,rightImage]

    product.productArray[leftImage].seen++;
    product.productArray[middleImage].seen++;
    product.productArray[rightImage].seen++;
    leftImageElement.src = product.productArray[leftImage].source;
    middleImageElement.src = product.productArray[middleImage].source;
    rightImageElement.src = product.productArray[rightImage].source;

}

RenderThreeImages();

// ================= Event Listener to the section  ==========================
//============================================================================
SectionElement.addEventListener('click', ImageClick);

function ImageClick(event) {

    console.log(event.target.id);

    if (counter >= maxAttempt) {
        //  renderList();              
        document.getElementById('viewResult');
        // document.getElementById('Section-img').style.display = "none";

    } else {

        counter++;

        if (event.target.id === 'left-image') {
            product.productArray[leftImage].votes++;

        }
        else if (event.target.id === 'right-image') {
            product.productArray[rightImage].votes++;
        }
        else if (event.target.id === 'middle-image') {
            product.productArray[middleImage].votes++;

        } RenderThreeImages();




    }
}



let resultButton = document.getElementById('viewResult');
resultButton.addEventListener('click', HandleShow);

function HandleShow() {
    renderList();
    RenderChart();
    resultButton.removeEventListener('click', HandleShow);
}



/*===================Local Storage =====================*/
/*======================================================*/


let stringArrayOfProduct;
function GetResultsToLs(){

    stringArrayOfProduct = JSON.stringify(product.productArray)
   localStorage.setItem('products',stringArrayOfProduct)

// console.log(stringArrayOfProduct);
}


let dataArray;
function RetriveResult() {

    

   
 dataArray = JSON.parse( localStorage.getItem('products'));
 if(dataArray !== null){
product.productArray = dataArray;}


}


// =================== Render List =========================//

function renderList() {
    let resultElement = document.getElementById('result');
    let ul = document.createElement('ul')
    resultElement.appendChild(ul);

    for (let i = 0; i < product.productArray.length; i++) {
        votesArr[i] = product.productArray[i].votes;
        seenArr[i] = product.productArray[i].seen;
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${product.productArray[i].name} has this number of votes ${product.productArray[i].votes} and show for ${product.productArray[i].seen}`
        console.log(product.productArray[i]);
    }
    GetResultsToLs();

    SectionElement.removeEventListener('click', ImageClick);


}



/* ======================== CHARTS ==========================*/

function RenderChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: namesArray,
            datasets: [{
                label: '# of Votes',
                data: votesArr,
                backgroundColor: 
                ['rgba(255, 99, 132, 0.2)',],
                borderColor: 
                ['rgba(255, 99, 132, 1)',  ],
                borderWidth: 1},
            {label: '# of shows',
            data: seenArr,
            backgroundColor: 
            ['rgba(165, 220, 132, 0.2)',],
            borderColor: 
            ['rgba(255, 99, 132, 1)',  ],
            borderWidth: 1

            }
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
RetriveResult();