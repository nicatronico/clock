const seconds_pointer = document.querySelector(".seconds_pointer")
const minutes_pointer = document.querySelector(".minutes_pointer")
const hours_pointer = document.querySelector(".hours_pointer")

const clock_container = document.querySelector(".clock_container")

seconds_pointer_position = 180
minutes_pointer_position = 180
hours_pointer_position = 180

let i = 0
let seconds = 0
let minutes = 0
let hours = 0

function secondChange(){
        if(i===0){
            seconds_pointer_position = seconds_pointer_position + 6
            seconds_pointer.style.rotate = `${seconds_pointer_position}deg` 
            if(seconds < 59)           {
                seconds++
            }
            else{
                seconds=0
                minuteChange()
            }
             
        }
            
}

function minuteChange(){
    if(i===0){
        minutes_pointer_position = minutes_pointer_position + 6
        minutes_pointer.style.rotate = `${minutes_pointer_position}deg`            
        if(minutes < 59)           {
            minutes++
        }
        else{
            minutes=0
            hoursChange()
        }
    }
        
}

function hoursChange(){
    if(i===0){
        hours_pointer_position = hours_pointer_position + 30
        hours_pointer.style.rotate = `${hours_pointer_position}deg`            
       
    }
        
}


addEventListener("click", ()=>{
    if(i===0)
    {
        i = 1
    }
    else{
        i = 0
    }
})

function tick(){
    t = setInterval(()=>{
        secondChange()
    },1000)
} 

tick()