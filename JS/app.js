'use strict';

let SectionElement = document.getElementById('Section-img');

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');


let maxAttempt=5;
let counter=1;


function product (name,source){

    this.name=name;
    this.source=source;
    this.votes=0;
    this.seen=0;
    product.productArray.push(this);

}

product.productArray=[];

new product ('bag','images/bag.jpg')
new product ('banana','images/banana.jpg')
new product ('bathroom','images/bathroom.jpg')
new product ('boots','images/boots.jpg')
new product ('breakfast','images/breakfast.jpg')
new product ('bubblegum','images/bubblegum.jpg')
new product ('chair','images/chair.jpg')
new product ('cthulhu','images/cthulhu.jpg')
new product ('dog-duck','images/dog-duck.jpg')
new product ('dragon','images/dragon.jpg')
new product ('pen','images/pen.jpg')
new product ('pet-sweep','images/pet-sweep.jpg')
new product ('scissors','images/scissors.jpg')
new product ('shark','images/shark.jpg')
new product ('sweep','images/sweep.png')
new product ('tauntaun','images/tauntaun.jpg')
new product ('unicorn','images/unicorn.jpg')
new product ('water-can','images/water-can.jpg')
new product ('wine-glass','images/wine-glass.jpg')

console.log(product.productArray);

function generateRandomIndex(){
    return Math.floor(Math.random() * product.productArray.length);}

let leftImage;
let middleImage;
let rightImage;



function RenderThreeImages () {
    leftImage = generateRandomIndex();
    middleImage= generateRandomIndex();
    rightImage= generateRandomIndex();
    // console.log(leftImage);
    // console.log(middleImage);
    // console.log(rightImage);

    while(leftImage === middleImage){
    leftImage = generateRandomIndex();}
    while(rightImage === middleImage){
        rightImage = generateRandomIndex();}
    while(rightImage === leftImage){
            rightImage = generateRandomIndex();}



    product.productArray[leftImage].seen++;
    product.productArray[middleImage].seen++;
    product.productArray[rightImage].seen++;
    leftImageElement.src = product.productArray[leftImage].source;
    middleImageElement.src = product.productArray[middleImage].source;
    rightImageElement.src = product.productArray[rightImage].source;

}

RenderThreeImages();
// console.log(leftImage);
// console.log(middleImage);
// console.log(rightImage);

// console.log(product.productArray[leftImage].source);

// leftImageElement.addEventListener('click',ImageClick);
// rightImageElement.addEventListener('click',ImageClick);
// middleImageElement.addEventListener('click',ImageClick);

SectionElement.addEventListener('click',ImageClick);




function ImageClick(event){
    
    console.log(event.target.id);

    if(counter >= maxAttempt){
        //  renderList();              
        document.getElementById('viewResult').style.display = "block";
        // document.getElementById('Section-img').style.display = "none";
        
    } else { 
        
        counter ++ ;

            if(event.target.id === 'left-image'){
             product.productArray[leftImage].votes++;
        
            }
            else if(event.target.id ==='right-image'){
                product.productArray[rightImage].votes++;
            }
            else if(event.target.id ==='middle-image'){
                product.productArray[middleImage].votes++;
                
            }RenderThreeImages(); 
                
            }
        }
        let resultButton = document.getElementById('viewResult');
        resultButton.addEventListener('click',renderList);

function renderList(){
    let resultElement = document.getElementById('result');
    let ul = document.createElement('ul')
    resultElement.appendChild(ul);

    for(let i = 0 ; i <product.productArray.length; i++){
      let li = document.createElement('li');
      ul.appendChild(li);
      li.textContent = `${product.productArray[i].name} has this number of votes ${product.productArray[i].votes} and show for ${product.productArray[i].seen}`
    }
    SectionElement.removeEventListener('click',ImageClick);


  }




//   console.log(ImageClick(event));
// ImageClick();
console.log(product.productArray);

