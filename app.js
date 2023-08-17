const animals = [
    {
        name: 'oslo',
        emoji: '🦧',
        hunger: 50,
        status: '🥰'
    },
    {
        name: 'karen',
        emoji: '🦒',
        hunger: 100,
        status: '🥰'
    },
    {
        name: 'stripes',
        emoji: '🦓',
        hunger: 100,
        status: '🥰'
    }

]


let bankAccount = 0

// #region unrefactored oslo functions
function decreaseOsloHunger() {
    // TODO get Oslo... find Oslo
    // TODO decrease Oslo's hunger
    // TODO update the DOM
    let oslo = animals.find(animal => animal.name == 'oslo')
    oslo.hunger--
    if (oslo.hunger <= 0) {
        oslo.hunger = 0 // NOTE clamp the hunger min 0
    }
    // console.log(oslo)

    // NOTE we abstracted these lines to the updateOslo() fn
    // let osloStatsElem = document.getElementById('osloStats')
    // osloStatsElem.innerText = `${oslo.name} | ${oslo.status} | ${oslo.hunger}`

    updateOslo(oslo)  // because we already found 'oslo' on line 28...we can pass him down to our update fn
}

function feedOslo() {
    // TODO find oslo
    // TODO increase oslo's hunger
    // TODO update DOM 
    // debugger // ANCHOR debugger is a great tool for debugging and pausing your code 
    let oslo = animals.find(animal => animal.name == 'oslo')
    oslo.hunger++
    if (oslo.hunger >= 100) oslo.hunger = 100 // NOTE clamp the hunger max 100
    console.log('feeding oslo', oslo)

    // NOTE we abstracted these lines to the updateOslo() fn
    // let osloStatsElem = document.getElementById('osloStats')
    // osloStatsElem.innerText = `${oslo.name} | ${oslo.status} | ${oslo.hunger}`

    updateOslo(oslo) // because we already found 'oslo' on line 44...we can pass him down to our update fn
}

function updateOslo(oslo) {
    //NOTE we don't need to perform this find anymore bc we are now passing oslo and graddbing his values from the parameter ⬇️⬇️
    // let oslo = animals.find(a => a.name == 'oslo')  
    let osloStatsElem = document.getElementById('osloStats')
    osloStatsElem.innerText = `${oslo.name} | ${oslo.status} | ${oslo.hunger}`
}

// #endregion



// #region refactored animal functions
function feedAnimal(animalName) {
    // TODO need to know what animal I am trying to feed
    // TODO use the 'animalName' to FIND the animal we want to feed
    // TODO increase the found animal's hunger
    // TODO update the DOM
    debugger
    let foundAnimal = animals.find(animal => animal.name == animalName)
    if (foundAnimal.status != '☠️') {
        foundAnimal.hunger++
        if (foundAnimal.hunger >= 100) foundAnimal.hunger = 100
        console.log(animalName, foundAnimal, 'feeding animal')
    }
    updateAnimal(foundAnimal)
}
function decreaseAnimalHunger() {
    // TODO look at all the animals..decrease EACH animals' hunger
    // TODO decrease hunger
    // TODO update DOM
    animals.forEach(animal => {
        animal.hunger--
        if (animal.hunger <= 0) animal.hunger = 0
        // console.log(animal, 'decrease ANIMAL hunger')
        updateAnimal(animal)
    })
}


function updateAnimal(animal) {
    // TODO update animal mood
    // TODO get the HTML elem for the animal we are updating
    // TODO once we get the elem...string interpolate the animal values
    // TODO come back and stop the animal if they are dead

    let animalPenElem = document.getElementById(`${animal.name}`)
    let emoji = animalPenElem.querySelector('.emoji')
    let marquee1 = animalPenElem.querySelector('.marquee1') //NOTE query selector requires CSS selector syntax
    let marquee2 = animalPenElem.querySelector('.marquee2')

    // console.log('animal pen elem', animalPenElem)

    if (animal.status == '☠️') {
        emoji.innerHTML = '🪦'
        marquee1.stop()
        marquee2.stop()
    }
    // console.log('updating animal', animalStatsElem)
    // NOTE we abstracted the update status logic to a separate fn
    updateStatus(animal)

    let animalStatsElem = document.getElementById(`${animal.name}Stats`)
    animalStatsElem.innerText = `${animal.name} | ${animal.status} | ${animal.hunger}`
}

// NOTE single responsibility principle... abstract our 'update status' to its own function
// NOTE this helps with improved readability for others and promotes clean code
function updateStatus(animal) {
    if (animal.hunger > 75) {
        animal.status = '🥰'
    } else if (animal.hunger > 50) {
        animal.status = '🙄'
    } else if (animal.hunger > 25) {
        animal.status = '😐'
    } else if (animal.hunger > 0) {
        animal.status = '😖'
    } else {
        animal.status = '☠️'
    }
}

// #endregion

//   TODO show off the crazy switch statement

function getPaid() {
    // look at the animals' status
    // based off of the animal status... add money to my paycheck
    // deposit paycheck... add the paycheck to our bankAcct
    console.log('getting paid')

    // debugger
    let paycheck = 0
    animals.forEach(animal => {
        switch (animal.status) {
            case '🥰':
                paycheck += 100
                break
            case '🙄':
                paycheck += 75
                break
            case '😐':
                paycheck += 30
                break
            case '😖':
                paycheck += 0
                break
            case '☠️':
                paycheck -= 1000
                break
        }
    })
    console.log('paycheck', paycheck)
    bankAccount += paycheck // deposit the paycheck
    document.getElementById('paycheck').innerText = paycheck.toString()
    document.getElementById('bankAccount').innerText = bankAccount.toString()
}

setInterval(decreaseAnimalHunger, 1000)

setInterval(getPaid, 1000)



//            ⬇️⬇️ 1st arg is the callback fn or 'set of instructions' that we want to happen on the interval
// setInterval(decreaseOsloHunger, 1000)
                            // ⬆️⬆️ 2nd arg is the time between ea. interval or function call...how often do we want this to execute

// NOTE setInterval is a javascript method... takes in a callback or anon fn and executes on a specified delay expressed in miliseconds
// NOTE if we invoke the fn with () it breaks the setInterval


// decreaseOsloHunger()