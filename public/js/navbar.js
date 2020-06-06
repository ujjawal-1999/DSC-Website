$("#search-icon").click(function() {
    $(".nav").toggleClass("search");
    $(".nav").toggleClass("no-search");
    $(".search-input").toggleClass("search-active");
  });
  
  $('.menu-toggle').click(function(){
     $(".nav").toggleClass("mobile-nav");
     $(this).toggleClass("is-active");
  });

    let filterInput2 = document.getElementById('search1');
    let srh2 = document.getElementById('srh1');
    var flag = 1;
    srh2.addEventListener('click',()=>{
        let ul = document.getElementById('search_list1');
        if(ul.style.display !== "none" || flag ==0){
            ul.style.display = "none";
            flag = 1;
        }
    });
        //add event listener
    filterInput2.addEventListener('keyup',filternames2);

    function filternames2(){
        //get value of input
        let filterValue = document.getElementById('search1').value.toUpperCase();
        //Get names ul
        let ul = document.getElementById('search_list1');
        //get lis from ul
        let li = ul.querySelectorAll('li.collection-item2');
        ul.style.display = 'block';
        //loop through collection item lis

        for(let i=0;i< li.length;i++){
            let a = li[i].getElementsByTagName('a')[0];
            console.log(a,filterValue)
            //if matched

            if(a.innerHTML.toUpperCase().indexOf(filterValue)>-1 && filterValue!=''){
                li[i].style.display = 'block';
            }
            else{
                li[i].style.display = 'none';
            }
        }
        
    }