addEventListener("DOMContentLoaded", initialize);
const ul = document.querySelector("ul");

//load data from crud-crud
function initialize(){
    //get data from server
    axios
        .get("https://crudcrud.com/api/7ad95db6c8564296955516730af9b455/MovieBooking")
        .then((res)=> {
            console.log("got data")
            for(let i=0; i<res.data.length; i++){
                display(res.data[i]);
            }
        })
        .catch((err)=>console.log(err));
}

// form data collection
const bookingForm = document.querySelector("#bookingForm"); // Form - username/seat

bookingForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    
    //userDetails
    const name = event.target.username.value;
    const seat = event.target.seatNo.value;

    const userDetails ={
        username: name,
        seatNumber: seat
    }
    const IsEdit = sessionStorage.getItem('edit'); //check if edit clicked
    if(IsEdit){
        update(IsEdit, userDetails);
    }else{
        //Post to server
        axios
        .post("https://crudcrud.com/api/7ad95db6c8564296955516730af9b455/MovieBooking", userDetails)
        .then((res)=>{
            // display(userDetails);
            console.log(res)
        })
        .catch((err)=> console.log(err));
    }
    /// DISPLAY ELEMENTS AFTER ADDING TO BE ADDED//
    
});


//Display data

function display(user){
    //Creating List element
    const li = document.createElement("li");
    li.textContent= user.username +" - "+ user.seatNumber;
    ul.appendChild(li);
    
    //Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener('click', ()=>{ deleteUser(user._id, li)});
    li.appendChild(deleteBtn);
    
    //Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent="E";
    editBtn.addEventListener('click', ()=>{ editUser(user)});
    li.appendChild(editBtn);
}

function deleteUser(user_id, li){
    axios
        .delete(`https://crudcrud.com/api/7ad95db6c8564296955516730af9b455/MovieBooking/${user_id}`)
        .then((res)=>{
            console.log("deleted")
            console.log(res);
        })
        .catch((err)=> console.log(err));
    
    li.remove(); //remove list from ui
}

function editUser(user){
    document.querySelector("#username").value = user.username;
    document.querySelector("#seatNo").value = user.seatNumber;
    submitBtnToggle();

    sessionStorage.setItem('edit', user._id);
}
function update(IsEdit, user){
    axios
        .put(`https://crudcrud.com/api/7ad95db6c8564296955516730af9b455/MovieBooking/${IsEdit}`, user)
        .then((res)=> {console.log(res)
            console.log("update")
        })
        .catch((err)=> console.log(err));
    
    document.querySelector("#username").value = "";
    document.querySelector("#seatNo").value = "";
    submitBtnToggle();
    sessionStorage.clear();
}
function submitBtnToggle(){ //not significant
    let btn = document.querySelector("#submitBtn");

    if(btn.innerHTML == "Update"){
        btn.innerHTML = "Book";
    }else{
        btn.innerHTML = "Update";
    }
}

// CHECK SLOT

const checkSlot = document.querySelector("#checkSlot");

checkSlot.addEventListener('submit', (e)=>{
    e.preventDefault();

    // const ul = document.querySelector("ul");
    // ul.remove(); //removes lists
    
    //new List
    const div = document.querySelector("#List");
    const list= document.createElement("ul");
    div.appendChild(list);


    const targ = e.target.find_slot.value;
    ////////////////
    axios
        .get("https://crudcrud.com/api/7ad95db6c8564296955516730af9b455/MovieBooking")
        .then((res)=> {
            console.log("found");
            for(let i=0; i<res.data.length; i++){
                if(targ == res.data[i].seatNumber){
                    const li = document.createElement("li");
                    li.textContent= res.data[i].username +" - "+ res.data[i].seatNumber;
                    list.appendChild(li);
                }
            }
        })
        .catch((err)=>console.log(err));

    //////////////// 
    
})