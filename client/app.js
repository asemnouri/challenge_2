let jsonData = document.getElementById("jsonData")
let button = document.getElementById("button")


let data;



const submit = (e) => {
    e.preventDefault()

    console.log(data)
}
const onChange = (e) => {
    data = e.target.value

}

button.addEventListener('click', submit)
jsonData.addEventListener("change", onChange)

