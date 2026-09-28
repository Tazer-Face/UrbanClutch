export function delayFnExe(){
    function delay(fn=()=>{},delay){
        let timer;
        return function(){
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
            }, delay);
        }
    }

    return {delay}
}


    