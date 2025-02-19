const input = document.getElementById("modelNumberInput");
const modelNumTable = document.getElementById("model-config-form");
const lengthMessage = document.getElementById("model-number-message");
const digitMessage = document.getElementById("digit-message");

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("config-button").click();
  }
});

// User Input
function submitInput() {
  // value
  const inputValue = input.value;

  // validating full model number and only letters & numbers
  if (inputValue.length === 40 && onlyLettesAndNumbers(inputValue)) {

    lengthMessage.style.display = 'none';
    modelNumTable.style.display = 'block';

    // upcasing the input
    let modelNumber = inputValue.toUpperCase();

    // spliting the input into individual characters
    const modelNumberSplit = modelNumber.split("");
    
    // selecting each character
    systemType(modelNumberSplit[0], modelNumberSplit[9], modelNumberSplit[10]);
    efficiency(modelNumberSplit[1]);
    refrigerant(modelNumberSplit[2]);
    tonnage(modelNumberSplit[3], modelNumberSplit[4], modelNumberSplit[5]);
    voltage(modelNumberSplit[7]);
    OutsideAir(modelNumberSplit[13], modelNumberSplit[9], modelNumberSplit[10])
    indoorFanType(modelNumberSplit[14], modelNumberSplit[3], modelNumberSplit[4], modelNumberSplit[5], modelNumberSplit[7], modelNumberSplit[9], modelNumberSplit[11], modelNumberSplit[12], modelNumberSplit[21], modelNumberSplit[38]);
    spaceController(modelNumberSplit[20], modelNumberSplit[14]);
    hotGasReheatDehum(modelNumberSplit[21]);
    supplyAndReturnSmokeDetector(modelNumberSplit[23]);
    systemMonitorControls(modelNumberSplit[24]);
    lowAmbient(modelNumberSplit[28]);
    DATSensor(modelNumberSplit[9], modelNumberSplit[13], modelNumberSplit[14], modelNumberSplit[21], modelNumberSplit[24]);
    notInstalledNote(modelNumberSplit[10], modelNumberSplit[13]);
    gasHeat(modelNumberSplit[9], modelNumberSplit[0], modelNumberSplit[2], modelNumberSplit[3], modelNumberSplit[4], modelNumberSplit[5], modelNumberSplit[10]);
    electricHeat(modelNumberSplit[0], modelNumberSplit[2], modelNumberSplit[9], modelNumberSplit[10])
    heatPumpAndDualFuel(modelNumberSplit[0], modelNumberSplit[2], modelNumberSplit[9], modelNumberSplit[10])
    
    // Clearing the message and displaying the configurations
    lengthMessage.style.display = 'none';
    modelNumTable.style.display = 'block';
  } else if (inputValue.length != 40) {
    // displaying model number message
    lengthMessage.style.display = 'block';
  }
  
}

// validating input
function onlyLettesAndNumbers(input) {
  let validateInput = /^[A-Za-z0-9]*$/.test(input)
  if (validateInput) {
    digitMessage.style.display = 'none';
    return validateInput;
  } else {
    digitMessage.style.display = 'block';
  }
}

// Defaulted Values
document.getElementById("refrig-circuit").innerHTML = "Single Manifold";
document.getElementById("frostat").innerHTML = "Installed";
document.getElementById("auto-stop").innerHTML = "Not Installed";
document.getElementById("alarm-indicator").innerHTML = "Not Installed";
document.getElementById("supply-tempering").innerHTML = "Disabled";
document.getElementById("demand-manag").innerHTML = "None";
document.getElementById("co2-sensor").innerHTML = "Not Installed";
document.getElementById("dcv").innerHTML = "Disabled";
document.getElementById("ventilation").innerHTML = "Not Installed";

// System Type
function systemType(digitOne) {
  switch (digitOne) {
    case "Y":
      document.getElementById("refrig-system").innerHTML = "Cooling Only";
      break;

    case "T":
      document.getElementById("refrig-system").innerHTML = "Cooling Only";
      break;

    case "W":
    case "D":
      document.getElementById("refrig-system").innerHTML = "Heat Pump";
      break;

    default:
      document.getElementById("refrig-system").innerHTML = "Verify Digit One";
      break;
  }
}

// Efficiency
function efficiency(digitTwo) {
  switch (digitTwo) {
    case "S":
      document.getElementById("efficiency").innerHTML = "Standard Efficiency";
      break;

    case "H":
      document.getElementById("efficiency").innerHTML = "High Efficiency";
      break;

    case "Z":
      document.getElementById("efficiency").innerHTML = "Ultra High Efficiency";
      break;

    default:
      document.getElementById("efficiency").innerHTML = "Verify Digit Two";
      break;
  }
}

// Refrigerant
function refrigerant(digitThree) {
  switch (digitThree) {
    case "J":
      document.getElementById("refrig-type").innerHTML = "R410A";
      break;

    case "K":
      document.getElementById("refrig-type").innerHTML = "R454B";
      break;
  }
}

// Tonnage
function tonnage(digitFour, digitFive, digitSix) {
  switch (digitFour + digitFive + digitSix) {
    case "036":
      document.getElementById("tonnage").innerHTML = "3 Ton";
      break;

    case "048":
      document.getElementById("tonnage").innerHTML = "4 Ton";
      break;

    case "060":
      document.getElementById("tonnage").innerHTML = "5 Ton";
      break;

    case "072":
      document.getElementById("tonnage").innerHTML = "6 Ton";
      break;

    case "090":
      document.getElementById("tonnage").innerHTML = "7.5 Ton";
      break;

    case "102":
      document.getElementById("tonnage").innerHTML = "8.5 Ton";
      break;

    case "120":
      document.getElementById("tonnage").innerHTML = "10 Ton";
      break;

    case "150":
      document.getElementById("tonnage").innerHTML = "12.5 Ton";
      break;

    case "180":
      document.getElementById("tonnage").innerHTML = "15 Ton";
      break;

    case "210":
      document.getElementById("tonnage").innerHTML = "17.5 Ton";
      break;

    case "240":
      document.getElementById("tonnage").innerHTML = "20 Ton";
      break;

    case "300":
      document.getElementById("tonnage").innerHTML = "25 Ton";
      break;
  }
}

// Voltage Selection
function voltage(digitEight) {
  switch (digitEight) {
    case "3":
      document.getElementById("voltage").innerHTML = "208-230/60/3";
      break;

    case "4":
      document.getElementById("voltage").innerHTML = "460/60/3";
      break;

    case "W":
      document.getElementById("voltage").innerHTML = "575/60/3";
      break;
  }
}

// Primary Heat and Secondary Heating  
let primaryHeatingCapacity = document.getElementById("primary-heating-capacity");
let secondaryHeatingCapacity = document.getElementById("secondary-heating-capacity");
let primaryHeatingType = document.getElementById("primary-type");
let primaryHeatingStages = document.getElementById("primary-stages");
let secondaryHeatingSource = document.getElementById("secondary-source");
let secondaryHeatingType = document.getElementById("secondary-type");
let secondaryHeatingStages = document.getElementById("secondary-stages");
let heatPumpType = document.getElementById("heatpump-type");

// Modulating Gas Heat 
function modGas(digitFour, digitFive, digitSix, digitTen, digitEleven) {
  switch (digitFour + digitFive + digitSix) {
    case "072":
      if (digitTen === "B" && digitEleven === "L") {
        document.getElementById("heating-capacity").innerHTML = "80 MBH Low Heat";
        document.getElementById("s-heating-capacity").innerHTML = "80 MBH Low Heat";
      } else if (digitTen === "B" && digitEleven === "H") {
        document.getElementById("heating-capacity").innerHTML = "150 MBH High Heat";
        document.getElementById("s-heating-capacity").innerHTML = "150 MBH High Heat";
      }
      break;

    case "090":
    case "102":
      if (digitTen === "B" && digitEleven === "L") {
        document.getElementById("heating-capacity").innerHTML = "120 MBH Low Heat";
        document.getElementById("s-heating-capacity").innerHTML = "120 MBH Low Heat";
      } else if (digitTen === "B" && digitEleven === "H") {
        document.getElementById("heating-capacity").innerHTML = "200 MBH High Heat";
        document.getElementById("s-heating-capacity").innerHTML = "200 MBH High Heat";
      }
      break;

    case "120":
      if (digitTen === "B" && digitEleven === "H") {
        document.getElementById("heating-capacity").innerHTML = "240 MBH High Heat";
        document.getElementById("s-heating-capacity").innerHTML = "240 MBH High Heat";
      } 
      break;

    case "150":
      if (digitTen === "B" && digitEleven === "L") {
        document.getElementById("heating-capacity").innerHTML = "150 MBH Low Heat";
        document.getElementById("s-heating-capacity").innerHTML = "150 MBH Low Heat";
      } else if (digitTen === "B" && digitEleven === "H") {
        document.getElementById("heating-capacity").innerHTML = "250 MBH High Heat";
        document.getElementById("s-heating-capacity").innerHTML = "250 MBH High Heat";
      }
      break;

    case "180":
    case "210":
    case "240":
    case "300":
      if (digitTen === "B" && digitEleven === "L") {
        document.getElementById("heating-capacity").innerHTML = "250 MBH Low Heat";
        document.getElementById("s-heating-capacity").innerHTML = "250 MBH Low Heat";
      } else if (digitTen === "B" && digitEleven === "H") {
        document.getElementById("heating-capacity").innerHTML = "400 MBH High Heat";
        document.getElementById("s-heating-capacity").innerHTML = "400 MBH High Heat";
      }
      break;
  }
}

// Gas Heat for YSJ & YHJ
// YSJ150A4S0L00C4A0000000C40000000000000B0 - Gas Heat R410  |  YSK150A4S0L00C4A0000000C40000000000000B0 - Gas Heat R454
function gasHeat(digitTen, digitOne, digitThree, digitFour, digitFive, digitSix, digitEleven) {
  if (digitOne === "Y" && digitThree === "J" || digitThree === "K") {
    if (digitTen === "0" || digitTen === "A") {
      primaryHeatingType.style.display == "";
      primaryHeatingStages.style.display = "";
      primaryHeatingCapacity.style.display = "none";
      secondaryHeatingCapacity.style.display = "none";
      secondaryHeatingSource.style.display = "none";
      secondaryHeatingType.style.display = "none";
      secondaryHeatingStages.style.display = "none";
      heatPumpType.style.display = "none";
      document.getElementById("heating-source").innerHTML = "Gas";
      document.getElementById("heating-type").innerHTML = "Staged";
      document.getElementById("heating-stages").innerHTML = "2";
    }
  }

  // Modulating Gas Heat 
  // YSJ210A4SBL00C4A0000000C40000000000000B0 - Low Heat R410  |  YSJ210A4SBH00C4A0000000C40000000000000B0 - High Heat R410
  // YSK210A4SBL00C4A0000000C40000000000000B0 - Low Heat R454  |  YSK210A4SBH00C4A0000000C40000000000000B0 - High Heat R454
  if (digitTen === "B") {
    document.getElementById("heating-source").innerHTML = "Gas";
    document.getElementById("heating-type").innerHTML = "Modulating";
    primaryHeatingCapacity.style.display = "";
    primaryHeatingStages.style.display = "none";
    secondaryHeatingCapacity.style.display = "none";
    secondaryHeatingSource.style.display = "none";
    secondaryHeatingType.style.display = "none";
    secondaryHeatingStages.style.display = "none";
    heatPumpType.style.display = "none";

    modGas(digitFour, digitFive, digitSix, digitTen, digitEleven);
  }
}

// Electric Heat Selection
function electricHeatSeletion(digitOne, digitThree, digitTen, digitEleven) {
  console.log(digitEleven);
  console.log(digitOne);
  switch (digitOne + digitThree + digitTen + digitEleven) {
    case "TJ0B":
    case "TK0B":
    case "TJ0C":
    case "TK0C":
    case "TJ0E":
    case "TK0E":
    case "TJ0G":
    case "TK0G":
      document.getElementById("heating-stages").innerHTML = "1";
      break;

    case "WJ0B":
    case "WK0B":
    case "DJ0B":
    case "DK0B":
    case "WJ0C":
    case "WK0C":
    case "DJ0C":
    case "DK0C":
    case "WJ0E":
    case "WK0E":
    case "DJ0E":
    case "DK0E":
    case "WJ0G":
    case "WK0G":
    case "DJ0G":
    case "DK0G":
      document.getElementById("s-heating-stages").innerHTML = "1";
        break;

    case "TJ0J":
    case "TK0J":
    case "TJ0K":
    case "TK0K":
    case "TJ0N":
    case "TK0N":
    case "TJ0P":
    case "TK0P":
    case "TJ0R":
    case "TK0R":
      document.getElementById("heating-stages").innerHTML = "2";
      break;

    case "WJ0J":
    case "WK0J":
    case "DJ0J":
    case "DK0J":
    case "WJ0K":
    case "WK0K":
    case "DJ0K":
    case "DK0K":
    case "WJ0N":
    case "WK0N":
    case "DJ0N":
    case "DK0N":
    case "WJ0P":
    case "WK0P":
    case "DJ0P":
    case "DK0P":
    case "WJ0R":
    case "WK0R":
    case "DJ0R":
    case "DK0R":
      document.getElementById("s-heating-stages").innerHTML = "2";
        break;
  }
}

// Cooling Only - Electric Heat (TSJ - TSK - THJ - THK)
function electricHeat(digitOne, digitThree, digitTen, digitEleven) {
  
  // No Electic Heat
  // TSJ150A4S0000C1A0000000C40000000000000B0 - No Electric Heat R410  |  TSK150A4S0000C1A0000000C40000000000000B0 - No Electric Heat R454
  switch (digitOne + digitThree + digitTen + digitEleven) {
    case "TJ00":
    case "TK00":
      primaryHeatingCapacity.style.display = "none";
      primaryHeatingType.style.display = "none";
      primaryHeatingStages.style.display = "none";
      secondaryHeatingCapacity.style.display = "none";
      secondaryHeatingSource.style.display = "none";
      secondaryHeatingType.style.display = "none";
      secondaryHeatingStages.style.display = "none";
      heatPumpType.style.display = "none";
      document.getElementById("heating-source").innerHTML = "* Not Installed";
      break;
  }

  // Electric Heat
  // TSJ150A4S0C00C1A0000000C40000000000000B0 Electric Heat R410  |  TSK150A4S0C00C1A0000000C40000000000000B0 Electric Heat R454
  if (digitTen === "0" && digitEleven !== "0") {
    switch (digitOne + digitThree + digitTen) {
      case "TJ0":
      case "TK0":
        electricHeatSeletion(digitOne,  digitThree,  digitTen, digitEleven);
        document.getElementById("heating-source").innerHTML = "Electric";
        document.getElementById("heating-type").innerHTML = "Staged";
        primaryHeatingCapacity.style.display = "none";
        primaryHeatingType.style.display = "";
        primaryHeatingStages.style.display = "";
        secondaryHeatingCapacity.style.display = "none";
        secondaryHeatingSource.style.display = "none";
        secondaryHeatingType.style.display = "none";
        secondaryHeatingStages.style.display = "none";
        heatPumpType.style.display = "none";
        break;
    }
  }
}

// Heat Pump
function heatPumpAndDualFuel(digitOne, digitThree, digitTen, digitEleven) {
  // WSJ150A4S0000C1A0000000C40000000000000B0 HP Only
  if (digitOne === "W" || digitOne === "D") {
    switch (digitOne + digitThree + digitTen + digitEleven) {
      case "WJ00":
      case "WK00":
      case "DJ00":
      case "DK00":
        primaryHeatingCapacity.style.display = "none";
        primaryHeatingType.style.display = "";
        primaryHeatingStages.style.display = "";
        secondaryHeatingCapacity.style.display = "none";
        secondaryHeatingSource.style.display = "";
        secondaryHeatingType.style.display = "none";
        secondaryHeatingStages.style.display = "none";
        heatPumpType.style.display = "";
        document.getElementById("hp-type").innerHTML = "Air Source";
        document.getElementById("heating-source").innerHTML = "Heat Pump";
        document.getElementById("heating-type").innerHTML = "Staged";
        document.getElementById("heating-stages").innerHTML = "Full";
        document.getElementById("s-heating-source").innerHTML = "* Not Installed";
        break;
    }
    // Electric Heat 
    // WSJ150A4S0J00C1A0000000C40000000000000B0 Secondary Electric Heat Installed  |  DSJ150A4S0J00C1A0000000C40000000000000B0 Secondary Electirc Heat Installed
    if (digitTen === "0" && digitEleven !== "0") {
      electricHeatSeletion(digitOne,  digitThree,  digitTen, digitEleven);
      primaryHeatingCapacity.style.display = "none";
      primaryHeatingType.style.display = "";
      primaryHeatingStages.style.display = "";
      secondaryHeatingCapacity.style.display = "none";
      secondaryHeatingSource.style.display = "";
      secondaryHeatingType.style.display = "";
      secondaryHeatingStages.style.display = "";
      heatPumpType.style.display = "";
      document.getElementById("hp-type").innerHTML = "Air Source";
      document.getElementById("heating-source").innerHTML = "Heat Pump";
      document.getElementById("heating-type").innerHTML = "Staged";
      document.getElementById("heating-stages").innerHTML = "Full";
      document.getElementById("s-heating-source").innerHTML = "Electric";
      document.getElementById("s-heating-type").innerHTML = "Staged";
    }

    // Dual Fuel Satged Gas
    // DSJ072A4S0L00C1A0000000C40000000000000B0 Secondary Staged Gas Heat  
    if (digitTen === "0" || digitTen === "A" && digitEleven === "L" || digitEleven === "M" || digitEleven === "H") {
      switch (digitOne + digitThree + digitTen + digitEleven) {
        case "DJ0L":
        case "DK0L":
        case "DJ0M":
        case "DK0M": 
        case "DJ0H":
        case "DK0H": 
        case "DJAL":
        case "DKAL":
        case "DJAM":
        case "DKAM": 
        case "DJAH":
        case "DKAH": 
          primaryHeatingType.style.display == "";
          primaryHeatingStages.style.display = "";
          primaryHeatingCapacity.style.display = "none";
          secondaryHeatingCapacity.style.display = "none";
          secondaryHeatingType.style.display = "";
          secondaryHeatingStages.style.display = "";
          heatPumpType.style.display = "";
          document.getElementById("hp-type").innerHTML = "Air Source";
          document.getElementById("heating-source").innerHTML = "Heat Pump";
          document.getElementById("heating-type").innerHTML = "Staged";
          document.getElementById("heating-stages").innerHTML = "Full";
          document.getElementById("s-heating-source").innerHTML = "Gas";
          document.getElementById("s-heating-type").innerHTML = "Staged";
          document.getElementById("s-heating-stages").innerHTML = "2"; 
          break;
      }
    }

    // Dual Fuel Modulating Gas Heat
    // DSJ072A4SBH00C1A0000000C40000000000000B0 Modulating Gas High Heat  |  DSJ072A4SBL00C1A0000000C40000000000000B0 Modulating Gas Low Heat
    if (digitOne === "D" && digitTen === "B") {
      document.getElementById("hp-type").innerHTML = "Air Source";
      document.getElementById("heating-source").innerHTML = "Heat Pump";
      document.getElementById("heating-type").innerHTML = "Staged";
      document.getElementById("heating-stages").innerHTML = "Full";
      document.getElementById("s-heating-source").innerHTML = "Gas";
      document.getElementById("s-heating-type").innerHTML = "Modulating";
      primaryHeatingCapacity.style.display = "none";
      heatPumpType.style.display = "";
      primaryHeatingStages.style.display = "";
      secondaryHeatingCapacity.style.display = "";
      secondaryHeatingSource.style.display = "";
      secondaryHeatingType.style.display = "";
      secondaryHeatingStages.style.display = "none";

      modGas(digitFour, digitFive, digitSix, digitTen, digitEleven);
    }
  }
}

// Fresh Air - Economizer
// TSJ072A4S000002A0000000C40000000000000B0 Outside Air Not Installed  -  TSJ072A4S0B00C2A0000000C40000000000000B0 Outside Air Installed
function OutsideAir(digitFourteen) {
  
  let economizerType = document.getElementById("economizer");
  let remoteMinPosition = document.getElementById("remote-min-position");
  if (digitFourteen === "0" || digitFourteen === "B") {
    economizerType.style.display = "none";
    remoteMinPosition.style.display = "none";
  } else {
    economizerType.style.display = "";
    remoteMinPosition.style.display = "";
  }
  
  switch (digitFourteen) {

    case "0":
      document.getElementById("outside-air").innerHTML = "* Not Installed";
      document.getElementById("econ-type").innerHTML = "---";
      document.getElementById("remote-position").innerHTML = "---";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;
  
    case "B":
      document.getElementById("outside-air").innerHTML = "0 to 50% Motorized Damper";
      document.getElementById("econ-type").innerHTML = "---";
      document.getElementById("remote-position").innerHTML = "---";
      document.getElementById("space-pressure").innerHTML = "Not Installed";
      break;
    
    case "C":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Dry Bulb";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "Installed";
    break;

    case "D":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Dry Bulb";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;

    case "E":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Reference Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "Installed";
      break;

    case "F":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Reference Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = " * Not Installed";
      break;

    case "G":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Comparative Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "Installed";
      break;

    case "H":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Comparative Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;


    case "K":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Dry Bulb";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;


    case "M":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Reference Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;

    case "P":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Comparative Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;

    case "R":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Differential Dry Bulb";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = " * Not Installed";
      break;
  }
}

// Supply Fan Motor
// YSK102A4S0L00C4A0000000C0000000000000000 VVDA  |  YSK102A4S0L00C2A0000000C0000000000000000 VVZT  |  YSK102A4S0L00C1A0000000C0000000000000000 CVZT
function indoorFanType(digitFifteen, digitFour, digitFive, digitSix, digitEight, digitTen, digitTwelve, digitThirteen, digitTwentyTwo, digitThirtynine) {

 switch (digitFifteen) {
    case "0":
    case "1":
      document.getElementById("system-type").innerHTML = "CVZT";
      document.getElementById("fan-type").innerHTML = "Multi Speed";
      document.getElementById("indoor-fan-vfd").innerHTML = "Ebm Papst";
      break;

    case "2":
    case "3":
      document.getElementById("system-type").innerHTML = "VVZT";
      document.getElementById("fan-type").innerHTML = "Variable Speed";
      document.getElementById("indoor-fan-vfd").innerHTML = "Ebm Papst";
      break;

    case "4":
    case "5":
      document.getElementById("system-type").innerHTML = "VVDA"
      document.getElementById("fan-type").innerHTML = "Variable Speed";
      document.getElementById("indoor-fan-vfd").innerHTML = "Ebm Papst";
      break;
  }

// Supply Fan VFD Mitsubishi Drive - // YSJ072A4S0C04C2A0000000C40000000000000B0 VFD
if (digitThirtynine === "B" || digitThirtynine === "C") {
  if (digitTwelve === "0" && digitThirteen === "4" || digitThirteen === "5" || digitThirteen === "6") {
    if (digitEight ===  "3" || digitEight === "4" && digitEight !== "W" && digitTen !== "B" && digitTwentyTwo !== "A") {
      if (digitFour === "0" && digitFive === "7" && digitSix === "2" || digitFour === "0" && digitFive === "9" && digitSix === "0" || digitFour === "1" && digitFive === "2" && digitSix === "0") {
        document.getElementById("indoor-fan-vfd").innerHTML = "Mitsubishi";
      }
    }
  }
  
}

if (digitFour === "1" && digitFive === "0" && digitSix === "2") {
  if (digitEight === "3" && digitEight !== "4" && digitEight !== "W") {
    if (digitTen !== "B" && digitTwentyTwo !== "A" ) {
      if (digitTwelve === "0" && digitThirteen === "4" || digitThirteen === "5" || digitThirteen === "6" ) {
        document.getElementById("indoor-fan-vfd").innerHTML = "Mitsubishi";
      }
    }
  }
}

if (digitTwelve === "0" && digitThirteen === "9") {
  if (digitThirtynine === "B"  && digitEight !== "3" && digitEight === "4" && digitEight !== "W" && digitTen !== "B" && digitTwentyTwo !== "A") {
    if (digitFour === "0" && digitFive === "7" && digitSix === "2" || digitFour === "0" && digitFive === "9" && digitSix === "0" || digitFour === "1" && digitFive === "0" && digitSix === "2" || digitFour === "1" && digitFive === "2" && digitSix === "0") {
      document.getElementById("indoor-fan-vfd").innerHTML = "Mitsubishi";
    }
  }
}

// Non EBM or VFD Supply Fan
if (digitFour === "0" && digitFive === "3" && digitSix === "6" || digitFour === "0" && digitFive === "4" && digitSix === "8" || digitFour === "0" && digitFive === "6" && digitSix === "0") {
  document.getElementById("indoor-fan-vfd").innerHTML = "---";
}
}


// Space Controller
function spaceController(digitTwentyOne, digitFifteen) {
  if (digitTwentyOne === "0" && digitFifteen === "4" || digitFifteen === "5") {
    document.getElementById("space-controller").innerHTML = "Single Setpoint Zone Sensor";
  }

  if (digitTwentyOne === "0" && digitFifteen === "0" || digitFifteen === "1" || digitFifteen === "2" || digitFifteen === "3") {
    document.getElementById("space-controller").innerHTML = "Conventional Thermostat";
  }

  if (digitTwentyOne === "1") {
    document.getElementById("space-controller").innerHTML = "Single Setpoint Zone Sensor";
  }
}

// Refrigerantion System Option - (Reheat/Dehum)
// YSJ210A4S0L00C4A0000000C4000000000000000 Modulating Reheat Not Installed R410  |  YSJ210A4S0L00C4A00000A0C4000000000000000 Modulating Reheat R410
function hotGasReheatDehum(digitTwentyTwo) {

  let dehumControl = document.getElementById("dehum-cont");
  if (digitTwentyTwo === "0") {
    dehumControl.style.display = "none";
  } else {
    dehumControl.style.display = "";
  }

  switch (digitTwentyTwo) {
    case "0":
      document.getElementById("reheat").innerHTML = "Not Installed";
      document.getElementById("humidistat").innerHTML = "Not Install";
      document.getElementById("humidity-sensor").innerHTML = "Not Installed";
      break;

    case "A":
      document.getElementById("reheat").innerHTML = "Modulating";
      document.getElementById("dehum-control").innerHTML = "Relative Humidity";
      document.getElementById("humidistat").innerHTML = "Not Install";
      document.getElementById("humidity-sensor").innerHTML = "Installed";
      break;
  }
}

// Supply & Return Smoke Detector
// YSK102A4S0L00C4A0000000C4000000000000000 Smoke Detector Installed  |  YSK102A4S0L00C4A000000004000000000000000 Smoke Detector Not Installed
function supplyAndReturnSmokeDetector(digitTwentyFour) {
  switch (digitTwentyFour) {
    case "0":
      document.getElementById("supply-smoke").innerHTML = "Not Installed";
      document.getElementById("return-smoke").innerHTML = "Not Installed";
      break;

    case "A":
      document.getElementById("supply-smoke").innerHTML = "Not Installed";
      document.getElementById("return-smoke").innerHTML = "Installed";
      break;

    case "B":
      document.getElementById("supply-smoke").innerHTML = "Installed";
      document.getElementById("return-smoke").innerHTML = "Not Installed";
      break;

    case "C":
      document.getElementById("supply-smoke").innerHTML = "Installed";
      document.getElementById("return-smoke").innerHTML = "Installed";
      break;
  }
}

// System Monitoring Controls
// YSK102A4S0L00C4A0000000C7000000000000000 Clogged Filter & Condensate Flow Switch Installed  |  YSK102A4S0L00C4A0000000C0000000000000000 Not Installed
function systemMonitorControls(digitTwentyFive) {

  switch (digitTwentyFive) {
    case "0":
      document.getElementById("clogged-filter").innerHTML = "Not Installed";
      document.getElementById("overflow-switch").innerHTML = "Not Installed";
      break;

    case "1":
      document.getElementById("clogged-filter").innerHTML = "Installed";
      document.getElementById("overflow-switch").innerHTML = "Not Installed";
      break;

    case "2":
      document.getElementById("clogged-filter").innerHTML = "Not Installed";
      document.getElementById("overflow-switch").innerHTML = "Installed";
      break;

    case "3":
        document.getElementById("clogged-filter").innerHTML = "Not Installed";
        document.getElementById("overflow-switch").innerHTML = "Not Installed";
        break;

    case "4":
        document.getElementById("clogged-filter").innerHTML = "Installed";
        document.getElementById("overflow-switch").innerHTML = "Installed";
        break;

    case "5":
        document.getElementById("clogged-filter").innerHTML = "Installed";
        document.getElementById("overflow-switch").innerHTML = "Not Installed";
        break;

    case "6":
        document.getElementById("clogged-filter").innerHTML = "Not Installed";
        document.getElementById("overflow-switch").innerHTML = "Installed";
        break;
  
    case "7":
        document.getElementById("clogged-filter").innerHTML = "Installed";
        document.getElementById("overflow-switch").innerHTML = "Installed";
        break;
  }
}

// Low Ambient Cooling
function lowAmbient(digitTwentynine) {
  switch (digitTwentynine) {
    case "0":
      document.getElementById("low-ambient").innerHTML = "Not Installed";
      break;

    case "A":
      document.getElementById("low-ambient").innerHTML = "Installed";
      break;
  }
}


// DAT Sensor
function DATSensor(digitTen, digitFourteen, digitFifteen, digitTwentyTwo, digitTwentyFive) {
  if (digitTen === "B" || digitFourteen === "C" || digitFourteen === "D" || digitFourteen === "E" || digitFourteen === "F"|| 
      digitFourteen === "G" || digitFourteen === "H" || digitFourteen === "K" || digitFourteen === "M" || digitFourteen === "P" || 
      digitFourteen === "R" || digitFifteen === "2" || digitFifteen === "3" || digitFifteen === "4" || digitFifteen === "5" || 
      digitTwentyTwo === "A" || digitTwentyFive === "3" || digitTwentyFive === "5" || digitTwentyFive === "6" || digitTwentyFive === "7") {
        document.getElementById("dat-sensor").innerHTML = "Installed";
  } else {
    document.getElementById("dat-sensor").innerHTML = "Not Installed";
  }
}

// Note for when Economizer or Electric Heat could be field-installed
function notInstalledNote(digitEleven, digitFourteen) {
  
  let note = document.getElementById("note");
  if (digitEleven === "0") {
    note.style.display = "";
  } else if (digitFourteen === "0") {
    note.style.display = "";
  } else {
    note.style.display = "none";
  }
}  

// Reset Value
function resetInputValue(modelInput) {
  const inputElement = document.getElementById(modelInput);
  const value = inputElement.value;
  inputElement.value = ""; 
  modelNumTable.style.display = 'none';
  lengthMessage.style.display = 'none';
  digitMessage.style.display = 'none';
  notInstalledNote()
  return value;
}