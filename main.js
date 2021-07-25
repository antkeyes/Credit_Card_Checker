// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

//check digit is calculated by taking sum of sum digits, multiplying by 9, and then modding by 10
//newsum = sum + check digit
//if newSum % 10 is 0 (aka if the total ends in 0) then the number is valid, else invalid.
// Add your functions below:

/*
1. checkNum = last num
2. double num immediately before checkNum, skipping every other left until beginning of arr
2. if doubled numbers are 2 digit numbers, add individual digits
    *** if doubledNum > 9, return doubledNum - 9 *** much easier this way
3. add every number = totalSum
5. if (currSum % 10 == 0) return true (valid CC), else false (invalid CC)
*/
const validateCred = array => {
    let doubledNums = [];
    let unchangedNums = [];
    for (let i = array.length - 2; i >= 0; i -= 2) {
        let doubledNum = array[i] * 2;
        if (doubledNum > 9) {
            doubledNum -= 9;
        }
        doubledNums.push(doubledNum);
    }
    
    for (let i = array.length - 1; i >= 0; i -=2) {
        unchangedNums.push(array[i]);
    }

    let completeArray = doubledNums.concat(unchangedNums);
    let totalSum = completeArray.reduce((a, b) => a + b);

    if (totalSum % 10 == 0) {
        return true;
    } else {
        return false;
    }
}

const findInvalidCards = arrayOfCards => {
    let invalidCards = []
    for (let card of arrayOfCards) {
        if (validateCred(card) == false) {
            invalidCards.push(card);
        }
    }
    return invalidCards;
}

const idIndividualCardCompanies = invalidCards => {
//return array of companies
    let companiesThatMessedUp = [];
    //create companies object to compare against
    const companies = {
        3: 'Amex',
        4: 'Visa',
        5: 'Mastercard',
        6: 'Discover'
    }
    // loop through both the invalid cards and the companies in the companies object
    // if there is a match, add to companiesThatMessedUp
    for (let number of invalidCards) {
        for (let [key, value] of Object.entries(companies)) {
            if (number[0] == key) {
                companiesThatMessedUp.push(value);
            }
        }
    }
    // delete duplicates
    let uniqueCompanies = companiesThatMessedUp.filter((company, index) => {
        return companiesThatMessedUp.indexOf(company) === index;
    })
    return uniqueCompanies;
}



invalidCards = findInvalidCards(batch);

console.log(findInvalidCards(batch));
console.log(idIndividualCardCompanies(invalidCards));
