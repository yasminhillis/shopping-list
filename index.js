import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://champions-d4fc8-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings);

const database = getDatabase(app)

const textArea = document.getElementsByTagName('textarea')[0];

const publishButton = document.getElementsByTagName('button')[0];

const endorsementsDiv = document.getElementsByTagName('div')[0];
console.log(endorsementsDiv)

const endorsmentsInDB = ref(database, 'endorsement')

// console.log(textArea.value)
// console.log(publishButton)

publishButton.addEventListener('click', function () {
    push(endorsmentsInDB, textArea.value)
    textArea.value = ''
})


onValue(endorsmentsInDB, function (snapshot) {
    // console.log(snapshot.val())
    clear(endorsementsDiv)
    const endorsements = Object.values(snapshot.val());
    // console.log(endorsements)
    for (let i = 0; i < endorsements.length; i++) {
        // console.log(endorsements[i])
        appendItemToDiv(endorsements[i])
        // endorsementsUL.innerHTML += `${element}${endorsements[i]}</li>`
    }

    
    
    // endorsementsDiv.innerHTML = endorsements
})

function clear(element) {
    element.innerHTML = ''
}


function appendItemToDiv(value) {
    var element = document.createElement('div');
    element.textContent = value
    element.classList.add('endorsement')
    endorsementsDiv.append(element)
}
