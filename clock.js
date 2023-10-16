//POINTERS EN EL DOM
const seconds_pointer = document.querySelector(".seconds_pointer")
const minutes_pointer = document.querySelector(".minutes_pointer")
const hours_pointer = document.querySelector(".hours_pointer")

//CLOCK CONTAINER EN EL DOM
const clock_container = document.querySelector(".clock_container")

//COMPONENTES EN PANTALLA LCD EN EL DOM
let lcd_hours = document.querySelector(".lcd_hours")
let lcd_minutes = document.querySelector(".lcd_minutes")
let lcd_seconds = document.querySelector(".lcd_seconds")
let lcd_ampm = document.querySelector(".lcd_ampm")

//VARIABLES DEL RELOJ
let seconds = 0
let minutes = 0
let hours = 0

//VARIABLE BANDERA PARA CONTROLAR EL INICIO O EL PARO DEL RELOJ
let i = 0


//FUNCION QUE OBTIENE LA HORA ACTUAL 
function getTimeNow(){
    const tm = new Date()       //SE CREA UN NUEVO OBJETO DE TIPO DATE
    seconds = tm.getSeconds()   //GUARDAMOS LOS SEGUNDOS
    minutes = tm.getMinutes()   //GUARDAMOS LOS MINUTOS
    hours = tm.getHours()       //GUARDAMOS LAS HORAS
}


//FUNCION QUE ACTUALIZA LA PANTALLA LCD EN EL DOM
function lcdDisplay(){  
    //CONDICION PARA LAS 12 DEL MEDIODIA Y MINUTOS IGUAL 0
        if(hours === 12 && minutes === 0){
                lcd_ampm.innerHTML = "md"
        }else{
            //CONDICION PARA 12 DEL MEDIODIA Y LOS MINUTOS DIFERENTES DE 0
            if(hours === 12 && minutes !== 0){
                lcd_ampm.innerHTML = "pm"
            }
            else{
                //CONDICION PARA HORAS MAYORES O IGUAL A 13 (HORA CON FORMATO DE 24H)
                if(hours >= 13){
                    lcd_ampm.innerHTML = "pm"
                    hours -=12  //A LA VARIABLE HORA SE LE RESTA 12 PARA CONVERTIRLA EN FORMATO 12H
                }
                else{
                    //CONDICION PARA HORAS MENORES A 12, HORAS DE LA MAÑANA
                    if(hours < 12)
                    {
                        lcd_ampm.innerHTML = "am"
                    }
                }

            }
        }
       
        //CONDICIONES PARA AGREGAR UN CERO A LA IZQUIERDA CUANDO LOS SEGUNDOS, MINUTOS Y HORAS SON DE UN SOLO DIGITO 
        hours < 10? lcd_hours.innerHTML = `0${hours}` : lcd_hours.innerHTML = hours
        minutes < 10? lcd_minutes.innerHTML = `0${minutes}` : lcd_minutes.innerHTML = minutes
        seconds < 10? lcd_seconds.innerHTML = `0${seconds}` : lcd_seconds.innerHTML = seconds
      
    }
    

//FUNCION QUE POSICIONA DE FORMA CORRECTA LOS POINTERS DEL RELOJ EN EL DOM 
function pointersPosition(){
    /*DEFINIMOS VARIABLES DE POSICIONAMIENTO.
        PARA CENTRAR LOS POINTERS EN EL RELOJ DEL DOM, ESTOS INICIALMENTE APUNTAN HACIA
        ABAJO; ES DECIR, APUNTAN INICIALMENTE A LAS 6:30. EN ESTA POSICION ES SU ANGULO CERO,
        ES POR ESO QUE A LAS VARIABLES DE POSICIONAMIENTO SE LES SUMA 180 PARA SIMULAR QUE 
        INICIALMENTE APUNTAN A LAS 12:00, Y A PARTIR DE ALLI CALCULAR CUANTO DE DEBE ROTAR CADA
        POINTER.
    */
    let seconds_pointer_position = seconds*6+180    //EL POINTER DE SEGUNDOS SE ROTA 6 GRADOS POR CADA SEGUNDO. SE LE SUMA 180 PARA HACER EL CALCULO DESDE LA POSICION 12:00
    let minutes_pointer_position = minutes*6+180    //EL POINTER DE MINUTOS SE ROTA 6 GRADOS POR CADA MINUTO. SE LE SUMA 180 PARA HACER EL CALCULO DESDE LA POSICION 12:00
    
    /**
     * EL POINTER DE HORAS TIENE QUE ROTAR 30 GRADOS POR CADA HORA. SIN EMBARGO, PARA QUE EL POINTER
     * SE VEA QUE VA AVANZANDO ENTRE CADA HORA, SE LE SUMA LA CANTIDAD DE MINUTOS MULTIPLICADA POR 0.5.
     * ESTO SE HACE PARA QUE EL POINTER DE HORAS AVANCE CADA MINUTO. 
     * LA LOGICA ES LA SIGUIENTE: ENTRE UNA HORA A OTRA HAY 30 GRADOS, COMO SE VA A ACTUALIZAR CADA MINUTO;
     * ENTONCES, ESOS 30 GRADOS SE DIVIDEN ENTRE 60 QUE ES LA CANTIDAD DE MINUTOS QUE HAY EN UNA HORA, LO 
     * CUAL RESULTA 0.5 GRADOS DE AVANCE CADA MINUTO. AL MULTIPLICAR ESOS 0.5 POR LA CANTIDAD DE MINUTOS QUE 
     * HAN PASADO, SE OBTIENE EL ANGULO CORRECTO EN EL CUAL DEBE IR APUNTANDO EL POINTER EN ESOS 30 GRADOS
     * QUE DEBE IR AVANZANDO ENTRE CADA HORA.
     * SE LE SUMA 180 PARA HACER EL CALCULO DESDE LA POSICION 12:00
     */
    let hours_pointer_position = hours*30+180+minutes*0.5 
    
    
    //SE HACE ROTAR CADA POINTER EN EL DOM PARA QUE APUNTE A LA POSICION CORECTA DE ACUERDO A LA HORA ACTUAL
    seconds_pointer.style.rotate = `${seconds_pointer_position}deg`
    minutes_pointer.style.rotate = `${minutes_pointer_position}deg`
    hours_pointer.style.rotate = `${hours_pointer_position}deg`
}


//FUNCION DE INICIALIZACION DEL PROGRAMA Y ACTUALIZACION DEL TIEMPO
function timeSetting(){
    getTimeNow()
    lcdDisplay()       //LLAMAMOS A LA FUNCION LCD_REFRESH() PARA PRESENTAR LA HORA EN LA PANTALLA LCD 
    pointersPosition()  //LLAMANOS A LA FUNCION POINTERPOSITICON() PARA POSICIONAR CORRECTAMENTE LOS POINTER DEL RELOJ EN EL DOM
}


//SE AGREGA UN EVENTO CLICK PARA DETENER O REANUDAR EL RELOJ CON UN CLICK EN CUALQUIER PARTE DE LA PANTALLA
addEventListener("click", ()=>{
    if(i===0)   //SI SE DA UN CLICK Y LA BANDERA I ESTA EN 0, ENTONCES SE CAMBIA A 1 PARA DETENER EL RELOJ
    {
        i = 1
    }
    else{      //SI SE DA UN CLICK Y LA BANDERA I ESTA EN 1, ENTONCES SE CAMBIA A 0 PARA REANUDAR EL RELOJ
        i = 0
        timeSetting()
    }
})


/**
 * FUNCION TICK(). MARCA EL RITMO DE CADA SEGUNDO.
 * CADA SEGUNDO, SI LA BANDERA I ESTA EN 0, SE OBTIENE LA HORA ACTUAL,
 * SE PRESENTA LA HORA EN LA PANTALLA LCD DEL DOM, Y SE
 * ACTUALIZA LA POSICION DE LOS POINTERS DEL RELOJ EN EL DOM
 */
function tick(){
    t = setInterval(()=>{
       if(i===0){
        timeSetting()
       }

    },1000)
} 


//SE INICIA EL PROGRAMA LLAMANDO LA FUNCION TIMESETTING() Y LUEGO LA FUNCION TICK()
timeSetting()
tick()