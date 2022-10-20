let todoInput
let errorInfo
let addBtn
let uList
let newTask

let popup // popup
let popInfo // tekst w popupie jak sie doda puisty tekst
let todoToEdit // edytowany w todo
let popupInput // input w popupie
let popupAddBtn // przycisk zatwierdz w popupie
let popupDelBtn // przycisk anuluj w popupie


const main = () => {
    domElements()
    domEvents()
}

const domElements = () => {
    //DOM elements 
    
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector(".btn-add")
    uList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupDelBtn = document.querySelector('.cancel')
    
    
}

const domEvents = () => {
    // DOM events
    
    addBtn.addEventListener('click',addTasks)
    uList.addEventListener('click', clicker)
    popupDelBtn.addEventListener('click',closePOP)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup',checkEnter)
}

const addTasks = () => {
    if(todoInput.value !== "") // jesli wprowadzimy jakis tekst (rozny od pustego strina wykonaj ponizzszy kod)
    {
        newTask = document.createElement('li') // tworzy nowy element do listy z newTask
        newTask.textContent = todoInput.value // pobiera wartosc z input do newTask
        uList.append(newTask)// dodaje newtask do ulist
        errorInfo.textContent = "" // czysci pole errorinfo po dodaniu zadania
        createTools() // dodaje diva z funkcji createTOOLS
        todoInput.value = "" // czysci pole inputa po dodaniu taskja
    }else{
        errorInfo.textContent = 'write a new task!'
    }
    
}

const createTools = () => {
    const newTools = document.createElement('div')
    newTools.classList.add('tools')

    const add = document.createElement('button')
    add.classList.add('complete')
    add.innerHTML = '<i class="fas fa-check"></i>'

    const edit = document.createElement('button')
    edit.classList.add('edit')
    edit.textContent = 'EDIT'

    const del = document.createElement('button')
    del.classList.add('delete')
    del.innerHTML = '<i class="fas fa-times"></i>'

    newTask.append(newTools)
    newTools.append(add, edit, del)
    

    /*
        zmienna newTools tworzy nowy element DIV
        pozniej dodajemy klase tools z css 

        zmienna add,edit,i del tworzy btn z V X i editem
        po czym zostaja dodane za pomoca classlist
        style z css, nastepnie ico za pomoca inner HTML 
        i textcontent

        newtask.append wrzuca naszego NOWEGO diva do nowego elementu na stronie.
        newtools append dodaje dzieci tego diva, czyli buttony add edit i delete.

        w funkcji addTask (powyzej) odpalamy TE funkcje
        aby utworzyc tego diva w przypadku dodania nowego tasku do listy (li)

    */
}


const clicker = (e) => {

    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    }else if(e.target.matches('.edit')){
            openPOP(e)
        }

    else if(e.target.matches('.delete')){
            delToDo(e)
    }
    
}

const openPOP = (e) => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.textContent 
    popup.style.display = 'flex'
    console.log(todoToEdit);

}

const changeTodoText = () => {
    if(popupInput.value !== ''){
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popInfo.textContent = ""
    }else{
        popInfo.textContent = 'musisz podac jakas tresc'
    }
    
}

const closePOP = () => {
    popup.style.display = 'none'
    
}

const delToDo = (e) => {
    e.target.closest('li').remove()

    const allTodos = uList.querySelectorAll('li')
    if(allTodos.length === 0){
        errorInfo.textContent = 'wpisz zadania do listy'
    }
}


const checkEnter = (e) => {
    if(e.key === "Enter"){
        addTasks()
    }
    
}


document.addEventListener('DOMContentLoaded',main) // odpala funkcje tylko i wylacznie po zaladowanbiu strony (DOMContent loaded)