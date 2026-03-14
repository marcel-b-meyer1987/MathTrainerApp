// ROBERT MEYER 

export const readSettingsFromUI = (UI, user) => {
    let settingsArr = Array.from(UI.querySelectorAll("input"));
    // console.log("BEFORE:");
    // console.dir(settingsArr);

    // create settings object with generic properties
    let settingsObj = {
        operators: [],
        numberSpace: 10,
        //maxResult: 10,
        exercisesPerSet: 20,
        autoSave: true,
        negativeNumbers: false,
        decimalResultsAllowed: false
    };
    
    const OPERATIONS = ["+","-","*","/"];

    settingsArr.forEach((setting) => {
        
        switch (setting.type) {
            case "checkbox":
                if (setting.checked == true) {
                    //first, filter out arithmetic operations
                    if (OPERATIONS.includes(setting.id)) {
                        settingsObj.operators.push(setting.id);
                    } else {
                        switch (setting.id) {
                            case "negative-numbers":
                                settingsObj.negativeNumbers = true;
                                break;
                            case "decimal-numbers":
                                settingsObj.decimalResultsAllowed = true;
                                break;
                        }
                    }
                    break;
                }
                break;              

            case "tel":
                switch (setting.id) {
                    case "number-space":
                        settingsObj.numberSpace = parseInt(setting.value);
                        break;
                    case "max-result":
                        settingsObj.maxResult = parseInt(setting.value);
                        break;
                    case "number-exercises":
                        settingsObj.exercisesPerSet = parseInt(setting.value);
                        break;
                }              
        }
    });

    if (!settingsObj.maxResult) 
        settingsObj.maxResult = settingsObj.numberSpace;

    // console.log("AFTER:");
    // console.dir(settingsArr);
    // console.dir(settingsObj);


    console.log(`Settings for user ${user}:`);
    console.dir(settingsObj);

    user.settings = settingsObj;

    // if(!user) {
    //   redirectToLogin(settingsObj);  
    // } else {
    //     user.updateSettings(settingsObj);
    //     if(user.name != "Gast" && user.settings.autosave === true) {
    //         user.saveProfile();
    //     }
    // }

}