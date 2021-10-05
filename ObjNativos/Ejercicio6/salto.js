const bt = document.querySelector("#ir");
bt.addEventListener('click', go)

function go(){
    let e1 = document.querySelector("#saltos").value;
    history.go(e1);
}
