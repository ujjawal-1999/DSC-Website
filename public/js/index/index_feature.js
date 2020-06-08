document.querySelector('#feature-close').addEventListener('click',()=>{
    document.getElementsByClassName('feature-black')[0].style.display="none";
    document.getElementById('feature-card-container').style.display="block";
})

const card = document.getElementById('feature-card-expanded');
const featured = document.getElementsByClassName('featured');
const featureHeight=document.getElementById('features').scrollHeight;
var i;
//Looping through all the cards
for(i=0;i<featured.length;i++)
{
    //adding the click event listner
        featured[i].addEventListener('click',function(){
          
         var featuredBlack= document.getElementsByClassName('feature-black')[0];
         featuredBlack.style.display="flex";
         featuredBlack.style.backgroundColor=this.style.backgroundColor;
         
         var id = this.getAttribute('id');
         var cardStyle = getComputedStyle(this);
         console.log(cardStyle.backgroundColor);
         featuredBlack.style.backgroundColor=cardStyle.backgroundColor;
         document.getElementById('feature-close-button').style.color=cardStyle.backgroundColor;
        
         var image = document.getElementsByClassName('featured-image'+id);
         var para = document.getElementsByClassName('featured-para'+id);
         var heading =  document.getElementById('featured-heading'+id);
         
         var paraExpanded= document.getElementById('para-expanded');
         paraExpanded.innerHTML = para[0].textContent;
        
         var headingExpanded= document.getElementById('heading-expanded');
         headingExpanded.innerHTML = heading.textContent;
         headingExpanded.style.color=cardStyle.color;

         var imageExpanded = document.getElementById('image-expanded');
         imageExpanded.src= image[0].getAttribute('src');
           
         if(card.style.display!="none")
              document.getElementById('featured-black').scrollIntoView(true);
             
         document.getElementById('feature-card-container').style.display="none";
         
    })
}
