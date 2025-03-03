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
    efficiency(modelNumberSplit[0], modelNumberSplit[1], modelNumberSplit[2],);
    refrigerant(modelNumberSplit[2]);
    tonnage(modelNumberSplit[0], modelNumberSplit[1], modelNumberSplit[2], modelNumberSplit[3], modelNumberSplit[4], modelNumberSplit[5]);
    voltage(modelNumberSplit[7]);
    outsideAir(modelNumberSplit[13], modelNumberSplit[9], modelNumberSplit[10])
    indoorFanType(modelNumberSplit[14], modelNumberSplit[0], modelNumberSplit[1], modelNumberSplit[2], modelNumberSplit[3], modelNumberSplit[4], modelNumberSplit[5], modelNumberSplit[7], modelNumberSplit[9], modelNumberSplit[11], modelNumberSplit[12], modelNumberSplit[21], modelNumberSplit[38]);
    spaceController(modelNumberSplit[20], modelNumberSplit[14]);
    hotGasReheatDehum(modelNumberSplit[21]);
    supplyAndReturnSmokeDetector(modelNumberSplit[23]);
    systemMonitorControls(modelNumberSplit[24]);
    lowAmbient(modelNumberSplit[28]);
    datSensor(modelNumberSplit[9], modelNumberSplit[13], modelNumberSplit[14], modelNumberSplit[21], modelNumberSplit[24]);
    notInstalledNote(modelNumberSplit[0]);
    heatSelection(modelNumberSplit[0], modelNumberSplit[1], modelNumberSplit[2], modelNumberSplit[3], modelNumberSplit[4], modelNumberSplit[5],modelNumberSplit[9], modelNumberSplit[10]);
    
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

// Verify
function verifyFirstThreeDigits() {
  primaryHeatingCapacity.style.display = "none";
  primaryHeatingType.style.display = "none";
  primaryHeatingStages.style.display = "none";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "none";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "none";
  document.getElementById("refrig-system").innerHTML = "Verify Digit One";
  document.getElementById("efficiency").innerHTML = "Verify Digit Two";
  document.getElementById("refrig-type").innerHTML = "Verify Digit Three";
  document.getElementById("heating-source").innerHTML = "Verify your model number!";
}

// **********  System Type Selection **********
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

// **********  Efficiency Selection **********
function efficiency(digitOne, digitTwo, digitThree) {
  switch (digitTwo) {
    case "S":
      document.getElementById("efficiency").innerHTML = "Standard Efficiency";
      break;

    case "H":
      document.getElementById("efficiency").innerHTML = "High Efficiency";
      break;

    case "Z":
      switch (digitOne + digitTwo + digitThree) {
        case "TZK":
        case "YZK":
          document.getElementById("efficiency").innerHTML = "Ultra High Efficiency";
          break;
      
        default:
          verifyFirstThreeDigits();
          break;
      }
      break;
      
    default:
      document.getElementById("efficiency").innerHTML = "Verify Digit Two";
      break;
  }
}

// **********  Refrigerant Selection **********
function refrigerant(digitThree) {
  switch (digitThree) {
    case "J":
      document.getElementById("refrig-type").innerHTML = "R410A";
      break;

    case "K":
      document.getElementById("refrig-type").innerHTML = "R454B";
      break;

    default:
      document.getElementById("refrig-type").innerHTML = "Verify Digit Three";
      break;
  }
}

// **********  Tonnage Selection **********
// Verifying Tonnage
function verifyTonnage() {
  primaryHeatingCapacity.style.display = "none";
  primaryHeatingType.style.display = "none";
  primaryHeatingStages.style.display = "none";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "none";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "none";
  document.getElementById("tonnage").innerHTML = "Verify Digit Three, Four, and Five";
  document.getElementById("heating-source").innerHTML = "Verify your model number!";
}

function tonnage(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix) {
  switch (digitFour + digitFive + digitSix) {
    case "036":
      if (digitThree === "K") {
        document.getElementById("tonnage").innerHTML = "3 Ton";
      } else {
        document.getElementById("tonnage").innerHTML = "Verify Digits Four, Five, and Six";
      }
      break;

    case "048":
      if (digitThree === "K") {
        document.getElementById("tonnage").innerHTML = "4 Ton";
      } else {
        document.getElementById("tonnage").innerHTML = "Verify Digits Four, Five, and Six";
      }
      break;

    case "060":
      if (digitThree === "K") {
        document.getElementById("tonnage").innerHTML = "5 Ton";
      } else {
        document.getElementById("tonnage").innerHTML = "Verify Digits Four, Five, and Six";
      }
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
      
    default:
      document.getElementById("tonnage").innerHTML = "Verify Digits Four, Five, and Six";
      break;
  }
}

// **********  Voltage Selection  **********
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

    default:
      document.getElementById("voltage").innerHTML = "Verify Digits Eight";
      break;
  }
}

// **********  Heating and Cooling Section  **********
// Primary Heat and Secondary Heating Selection Elements
let primaryHeatingCapacity = document.getElementById("primary-heating-capacity");
let secondaryHeatingCapacity = document.getElementById("secondary-heating-capacity");
let primaryHeatingType = document.getElementById("primary-type");
let primaryHeatingStages = document.getElementById("primary-stages");
let secondaryHeatingSource = document.getElementById("secondary-source");
let secondaryHeatingType = document.getElementById("secondary-type");
let secondaryHeatingStages = document.getElementById("secondary-stages");
let heatPumpType = document.getElementById("heatpump-type");

// Heat Pump Configuration
function heatPumpConfig() {
  primaryHeatingCapacity.style.display = "none";
  primaryHeatingType.style.display = "";
  primaryHeatingStages.style.display = "";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "";
  document.getElementById("heating-source").innerHTML = "Heat Pump";
  document.getElementById("heating-type").innerHTML = "Staged";
  document.getElementById("heating-stages").innerHTML = "Full";
  document.getElementById("hp-type").innerHTML = "Air Source";
  document.getElementById("s-heating-source").innerHTML = "* Not Installed";
}

// Verifying Heat Pump Primary Heating Selection
function verfiyHPPrimaryHeatingSelection() {
  primaryHeatingCapacity.style.display = "none";
  primaryHeatingType.style.display = "";
  primaryHeatingStages.style.display = "";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "none";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "";
  document.getElementById("hp-type").innerHTML = "Verify your model number!";
  document.getElementById("heating-source").innerHTML = "Verify Digit Ten and Eleven";
  document.getElementById("heating-type").innerHTML = "Verify your model number!";
  document.getElementById("heating-stages").innerHTML = "Verify your model number!";
}

// Verifying Secondary Heating Selection
function verfiySecondaryHeatingSelection() {
  heatPumpConfig();
  document.getElementById("s-heating-source").innerHTML = "Verify Digit Eleven";
}

// Secondary First Stage Electric Heat Configuration
function secondaryFirstStageElectricHeat() {
  secondaryHeatingType.style.display = "";
  secondaryHeatingStages.style.display = "";
  document.getElementById("s-heating-source").innerHTML = "Electric";
  document.getElementById("s-heating-type").innerHTML = "Staged";
  document.getElementById("s-heating-stages").innerHTML = "1";
}

// Secondary Second Stage Electric Heat Configuration
function secondarySecondStageElectricHeat() {
  secondaryHeatingType.style.display = "";
  secondaryHeatingStages.style.display = "";
  document.getElementById("s-heating-source").innerHTML = "Electric";
  document.getElementById("s-heating-type").innerHTML = "Staged";
  document.getElementById("s-heating-stages").innerHTML = "2";
}

// Stage Gas Heat Configuration Selection
function stagedGasHeatSelection() {
  primaryHeatingCapacity.style.display = "none";
  primaryHeatingType.style.display = "";
  primaryHeatingStages.style.display = "";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "none";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "none";
  document.getElementById("heating-source").innerHTML = "Gas";
  document.getElementById("heating-type").innerHTML = "Staged";
  document.getElementById("heating-stages").innerHTML = "2";
}

// Primary Modulating Has Heat Configuration Selection
function modulatingGasHeatSelection() {
  primaryHeatingCapacity.style.display = "";
  primaryHeatingType.style.display = "";
  primaryHeatingStages.style.display = "none";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "none";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "none";
  document.getElementById("heating-source").innerHTML = "Gas";
  document.getElementById("heating-type").innerHTML = "Modulating";
}

// Secondary Stage Gas Heat Configuration
function secondaryStagedGasHeatSelection() {
  secondaryHeatingSource.style.display = "";
  secondaryHeatingType.style.display = "";
  secondaryHeatingStages.style.display = "";
  document.getElementById("s-heating-source").innerHTML = "Gas";
  document.getElementById("s-heating-type").innerHTML = "Staged";
  document.getElementById("s-heating-stages").innerHTML = "2";
}

// Verify Stage Gas Heat Configuration Selection Digit Ten
function verfiyHeatingDigitTen() {
  stagedGasHeatSelection();
  primaryHeatingType.style.display = "none";
  primaryHeatingStages.style.display = "None";
  primaryHeatingCapacity.style.display = "none";
  document.getElementById("heating-source").innerHTML = "Verify Digit Ten";
}

// Verify Stage Gas Heat Configuration Selection Digit Eleven
function verfiyStageGasDigitEleven() {
  stagedGasHeatSelection();
  primaryHeatingType.style.display = "none";
  primaryHeatingStages.style.display = "None";
  primaryHeatingCapacity.style.display = "none";
  document.getElementById("heating-source").innerHTML = "Verify Digit Eleven";
}

// Verifying Secondary Staged Gas Heating Source 
function verifySecondaryHeatDigitTen() {
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingType.style.display = "none";
  document.getElementById("s-heating-source").innerHTML = "Verify Digit Ten";
}

// Verifying Secondary Modulating Gas Heat Source
function verifySecondaryModGasDigitEleven() {
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingType.style.display = "none";
  document.getElementById("s-heating-source").innerHTML = "Verify Digit Eleven";
}

// Secondary Modulating Gas Heat Configuration Selection
function modulatingGasHeatSecondarySelection() {
  secondaryHeatingCapacity.style.display = "";
  secondaryHeatingType.style.display = "";
  document.getElementById("s-heating-source").innerHTML = "Gas";
  document.getElementById("s-heating-type").innerHTML = "Modulating";
}

// Cooling Only Configuration Selection for (TSJ - THJ)
function coolingOnlyConfig() {
  primaryHeatingCapacity.style.display = "none";
  primaryHeatingType.style.display = "none";
  primaryHeatingStages.style.display = "none";
  secondaryHeatingCapacity.style.display = "none";
  secondaryHeatingSource.style.display = "none";
  secondaryHeatingType.style.display = "none";
  secondaryHeatingStages.style.display = "none";
  heatPumpType.style.display = "none";
  document.getElementById("heating-source").innerHTML = "* Not Installed";
}

// Primary Electric Heating Selection for (TSJ - THJ)
function oneStageElectricHeatPrimary() {
  coolingOnlyConfig();
  primaryHeatingType.style.display = "";
  primaryHeatingStages.style.display = "";
  document.getElementById("heating-source").innerHTML = "Electric";
  document.getElementById("heating-type").innerHTML = "Staged";
  document.getElementById("heating-stages").innerHTML = "1";
}

// Two stage Electric Heating Selection for (TSJ - THJ)
function twoStageElecticHeatSecondary() {
  coolingOnlyConfig();
  primaryHeatingType.style.display = "";
  primaryHeatingStages.style.display = "";
  document.getElementById("heating-source").innerHTML = "Electric";
  document.getElementById("heating-type").innerHTML = "Staged";
  document.getElementById("heating-stages").innerHTML = "2";
}

// Primary Electric Heat Verification
function verifyElectricHeatDigitEleven() {
  coolingOnlyConfig();
  document.getElementById("heating-source").innerHTML = "Verify Digit Eleven";
}

// Heat Pump Selection for (WSJ - WHJ - WSK - WHK - DSJ - DHJ - DSK - DHK)
function heatPumpAndDualFuelSelection(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven) {
  // WSJ150A4S0000C1A0000000C40000000000000B0
  switch (digitOne + digitTwo + digitThree) {
    // Heat Pump WSJ and WHJ 12.5-25 Ton and Secondary Electric Heat
    case "WSJ":
    case "WHJ":
      console.log("Me")
      switch (digitFour + digitFive + digitSix) {
        case "150":
        case "180":
        case "240":
        case "300":
          console.log("Me")
          heatPumpConfig();
          switch (digitTen) {
            case "0":
              if (digitEleven !== "0") {
                electricHeatSelectionWSJAndWHJ(digitFour, digitFive, digitSix, digitEleven);
              }
              break;
          
            default:
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
    break;

    // Dual Fuel DSJ and DHJ 12.5-25 Ton
    // DSJ150A4S0L00C1A0000000C40000000000000B0
    case "DSJ":
    case "DHJ":
      switch (digitFour + digitFive + digitSix) {
        case "150":
        case "180":
        case "240":
        case "300":
          heatPumpConfig();
          switch (digitTen) {
            case "0":
            case "A":
              secondaryStagedGasHeat(digitEleven);
              break;

            case "B":
              modulatingGasHeatSecondarySelection();
              modulatingGasHeat(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitEleven);
              break;
          
            default:
              modGasVerification()
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
    break;

    // Heat Pump WSK and WHK 3-25 Ton and Secondary Electric Heat
    // WSk150A4S0P00C1A0000000C40000000000000B0
    case "WSK":
    case "WHK":
      switch (digitFour + digitFive + digitSix) {
        case "036":
        case "048":
        case "060":
        case "072":
        case "090":
        case "102":
        case "120":
        case "150":
        case "180":
        case "210":
        case "240":
        case "300":
          heatPumpConfig();
          switch (digitTen) {
            case "0":
              if (digitEleven !== "0") {
                electricHeatSelectionWSKAndWHK(digitFour, digitFive, digitSix, digitEleven);
              }
              break;
          
            default:
              verfiySecondaryHeatingSelection();
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
      break;
   
    // Dual Fuel DSK and DHK 3-25 Ton
    // DSK150A4S0L00C1A0000000C40000000000000B0
    case "DSK":
    case "DHK":
      switch (digitFour + digitFive + digitSix) {
        case "036":
        case "048":
        case "060":
        case "072":
        case "090":
        case "102":
        case "120":
        case "150":
        case "180":
        case "210":
        case "240":
        case "300":
          heatPumpConfig();
          switch (digitTen) {
            case "0":
            case "A":
              secondaryStagedGasHeat(digitEleven);
              break;
              
            case "B":
              modulatingGasHeatSecondarySelection();
              modulatingGasHeat(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitEleven);
              break;
          
            default:
              verifySecondaryHeatDigitTen();
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
      break;

    default:
      break;
  }  
}

function secondaryStagedGasHeat(digitEleven) {
  switch (digitEleven) {
    case "L":
    case "M":
    case "H":  
    secondaryStagedGasHeatSelection();
      break;
  
    default:
      verifySecondaryModGasDigitEleven();
      break;
  }
}

// Primary Modulating Gas Heat for 6-25 Ton (YSJ - YHJ - YSK - YHK - YZK)
function modulatingGasHeat(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitEleven) {  
  // YSJ150A4SBH00C1A0000000C40000000000000B0
  // YSK150A4SBH00C1A0000000C40000000000000B0
  // YZK300A4SBL00C1A0000000C40000000000000B0
  switch (digitOne + digitTwo + digitThree) {
    case "YSJ":
    case "YHJ":
    case "YSK":
    case "YHK":
    case "YZK":
      // 6 Ton
      switch (digitFour + digitFive + digitSix) {
        case "072":
          switch (digitEleven) {
            case "L":
              document.getElementById("heating-capacity").innerHTML = "80 MBH Low Heat";
              break;

            case "H":
              document.getElementById("heating-capacity").innerHTML = "150 MBH High Heat";
              break;
          
            default:
              verfiyStageGasDigitEleven();
              break;
          }
          break;
          
        // 7.5 Ton
        // 8.5
        case "090":
        case "102":
          switch (digitEleven) {
            case "L":
              document.getElementById("heating-capacity").innerHTML = "120 MBH Low Heat";
              break;

            case "H":
              document.getElementById("heating-capacity").innerHTML = "200 MBH High Heat";
              break;
          
            default:
            verfiyStageGasDigitEleven();
          }
          break;

        // 10 Ton
        case "120":
          switch (digitEleven) {
            case "L":
            if ( digitOne === "Y" && digitTwo === "Z" && digitThree === "K") {
              document.getElementById("heating-capacity").innerHTML = "150 MBH Low Heat";
            } else {
              verfiyStageGasDigitEleven();
            }
            break;

            case "H":
              document.getElementById("heating-capacity").innerHTML = "240 MBH High Heat";
              break;
          
            default:
              verfiyStageGasDigitEleven();
              break;
          }
          break;

        // 12.5 Ton
        case "150":
          switch (digitEleven) {
            case "L":
              if (digitOne === "Y" && digitTwo === "H" && digitThree === "K") {
                verfiyStageGasDigitEleven();
              } else if (digitOne === "Y" && digitTwo === "Z" && digitThree === "K") {
                verfiyStageGasDigitEleven();
              } else {
                document.getElementById("heating-capacity").innerHTML = "150 MBH Low Heat";
              }
              break;

            case "H":
              document.getElementById("heating-capacity").innerHTML = "250 MBH High Heat";
              break;
          
            default:
              verfiyStageGasDigitEleven();
              break;
          }
          break;

        // 15 Ton
        // 17.5 Ton
        // 20 Ton 
        // 25 Ton  
        case "180":
        case "210":
        case "240":
        case "300":
          switch (digitEleven) {
            case "L":
              document.getElementById("heating-capacity").innerHTML = "250 MBH Low Heat";
              break;

            case "H":
              document.getElementById("heating-capacity").innerHTML = "400 MBH High Heat";
              break;
          
            default:
              verfiyStageGasDigitEleven();
              break;
          }
          break;

        default:
          verifyTonnage();
          break;
      }
      break;

    // Secondary Modulating Gas Heat for 12.5-25 Ton (DSJ - DHJ)   
    // DSJ150A4SBH00C1A0000000C40000000000000B0
    case "DSJ":
    case "DHJ":
      switch (digitFour + digitFive + digitSix) {
        // 12.5 Ton
        case "150":
          switch (digitEleven) {
            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "250 MBH High Heat";
              break;
          
            default:
              verfiyStageGasDigitEleven();
              break;
          }
          break;

          // 15 Ton
          // 20 Ton
          // 25 Ton
          case "180":
          case "240":
          case "300":
          switch (digitEleven) {
            case "L":
              document.getElementById("s-heating-capacity").innerHTML = "250 MBH Low Heat";
              break;  

            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "400 MBH High Heat";
              break;
          
            default:
              verfiyStageGasDigitEleven();
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
      break;

    // Secondary Modulating Gas Heat for 3-25 Ton (DSK - DHK)   
    // DSK150A4SBH00C1A0000000C40000000000000B0
    case "DSK":
    case "DHK":
      switch (digitFour + digitFive + digitSix) {
        // 6 Ton
        case "072":
          switch (digitEleven) {
            case "L":
              document.getElementById("s-heating-capacity").innerHTML = "80 MBH Low Heat";
              break;
          
            default:
              verifySecondaryModGasDigitEleven();
              break;
          }
          break;

        // 7.5 Ton
        case "090":
          switch (digitEleven) {
            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "200 MBH High Heat";
              break;
          
            default:
              verifySecondaryModGasDigitEleven();
              break;
          }
          break;

        // 8.5 Ton
        case "102":
          switch (digitEleven) {
            case "L":
              document.getElementById("s-heating-capacity").innerHTML = "120 MBH Low Heat";
              break;

            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "200 MBH High Heat";
              break;
          
            default:
              verifySecondaryModGasDigitEleven();
              break;
          }
          break;

        // 10 Ton
        case "120":
          switch (digitEleven) {
            case "L":
              document.getElementById("s-heating-capacity").innerHTML = "150 MBH Low Heat";
              break;

            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "250 MBH High Heat";
              break;
          
            default:
              verifySecondaryModGasDigitEleven();
              break;
          }
          break;

        // 12.5 Ton
        case "150":
          switch (digitEleven) {
            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "250 MBH High Heat";
              break;
          
            default:
              verifySecondaryModGasDigitEleven();
              break;
          }
          break;

        // 15 Ton
        // 17.5 Ton
        // 20 Ton
        case "180":
        case "210":
        case "240":
          switch (digitEleven) {
            case "L":
              document.getElementById("s-heating-capacity").innerHTML = "250 MBH Low Heat";
              break;

            case "H":
              document.getElementById("s-heating-capacity").innerHTML = "400 MBH High Heat";
              break;
          
            default:
              verifySecondaryModGasDigitEleven();
              break;
          }
          break;

          // 25 Ton
          case "300":
            switch (digitEleven) {
              case "L":
                document.getElementById("s-heating-capacity").innerHTML = "250 MBH Low Heat";
                break;
            
              default:
                verifySecondaryModGasDigitEleven();
                break;
            }
            break;
      
        default:
          verifyTonnage();
          break;
      }        
      break;
  
    default:
      break;
  }
}

// Stage Gas Heat (YSJ - YHJ - YSK - YHK - YZK)
// YSJ240A4S0000C1A0000000C40000000000000B0 
// YHK240A4SAH00C1A0000000C40000000000000B0
// YZK240A4S0L00C1A0000000C40000000000000B0
function stagedOrModGasHeatSelection(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven) {

  switch (digitOne + digitTwo + digitThree) {
    // Primary Staged Gas Heat for 6-25 Ton (YSJ - YHJ)
    case "YSJ":
    case "YHJ":
      switch (digitFour + digitFive + digitSix) {
        case "072":
        case "090":
        case "102":
        case "120":
        case "150":
        case "180":
        case "210":
        case "240":
        case "300":
          switch (digitTen) {
            case "0":
            case "A":
              stagedGasHeat(digitEleven);
              break;

            case "B":
              modulatingGasHeatSelection();
              modulatingGasHeat(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitEleven);
              break
          
            default:
              verfiyHeatingDigitTen();
              break;
          }
            break;
      
        default:
          verifyTonnage();
          break;
      }
      break;

    // Primary Staged Gas Heat for 3-25 Ton (YSK - YHK - YZK) 
    case "YSK":
    case "YHK":
    case "YZK":
      switch (digitFour + digitFive + digitSix) {
        case "036":
        case "048":
        case "060":
        case "072":
        case "090":
        case "102":
        case "120":
        case "150":
        case "180":
        case "210":
        case "240":
        case "300":
            // Staged Gas Heat
        switch (digitTen) {
          case "0":
          case "A":
            stagedGasHeat(digitEleven);
            break;

          case "B":
            modulatingGasHeatSelection();
            modulatingGasHeat(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitEleven);
            break;

            default:
              verfiyHeatingDigitTen();
              break;
        }
          break;
      
        default:
          verifyTonnage();
          break;
      }
      break;

      default:
        break;
  }
}

function stagedGasHeat(digitEleven) {
  switch (digitEleven) {
    case "L":
    case "M":
    case "H":  
      stagedGasHeatSelection();
      break;
  
    default:
      verfiyStageGasDigitEleven();
      break;
  }
}

// Secondary Electric Heat for 12.5-25 Ton (WSJ - WHJ)
// WSJ150A4S0P00C1A0000000C40000000000000B0
// WHJ240A4S0N00C1A0000000C40000000000000B0
function electricHeatSelectionWSJAndWHJ(digitFour, digitFive, digitSix, digitEleven) {

  switch (digitFour + digitFive + digitSix) {
    case "150":
    case "180":
      switch (digitEleven) {
        case "G":
          secondaryFirstStageElectricHeat();
          break;
    
        case "K":
        case "N":
        case "P":
          secondarySecondStageElectricHeat();
          break;
      
        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;
  
    case "240":
    case "300":
      switch (digitEleven) {
        case "K":
        case "N":
        case "P":
        case "R":
          secondarySecondStageElectricHeat();
          break;
      
        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;

    default:
      break;
  }

  
}

// Secondary Electric Heat for 3-25 Ton (WSK and WHK)
// WSK072A4S0C00C1A0000000C40000000000000B0
function electricHeatSelectionWSKAndWHK(digitFour, digitFive, digitSix, digitEleven) {

  switch (digitFour + digitFive + digitSix) {
    case "036":
    case "048":
      switch (digitEleven) {
        case "B":
          secondaryFirstStageElectricHeat();
          break;
      
        case "E":
        case "G":
          secondarySecondStageElectricHeat();
          break;

        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;
  
    case "060":
      switch (digitEleven) {
        case "B":
          secondaryFirstStageElectricHeat();
          break;
      
        case "E":
        case "G":
        case "J":
        case "K":
          secondarySecondStageElectricHeat();
          break;

        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;

    case "072":
    case "090":
    case "102":
      switch (digitEleven) {
        case "C":
          secondaryFirstStageElectricHeat();
          break;
      
        case "G":
        case "K":
        case "N":
          secondarySecondStageElectricHeat();
          break;

        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;

    case "120":
      switch (digitEleven) {
        case "G":
          secondaryFirstStageElectricHeat();
          break;
      
        case "K":
        case "N":
        case "P":
          secondarySecondStageElectricHeat();
          break;

        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;

    case "150":
    case "180":
      switch (digitEleven) {
        case "G":
          secondaryFirstStageElectricHeat();
          break;
      
        case "N":
        case "P":
          secondarySecondStageElectricHeat();
          break;

        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;
      
    case "210":
    case "240":
    case "300":
      switch (digitEleven) { 
        case "N":
        case "P":
        case "R":
          secondarySecondStageElectricHeat();
          break;

        default:
          verfiySecondaryHeatingSelection();
          break;
      }
      break;

    default:
      break;
  }
}

// Primary Electric Heat for 6-25 Ton (TSJ and THJ)
// TSJ150A4S0P00C1A0000000C40000000000000B0
// TSJ150A4S0000C1A0000000C40000000000000B0
function electricHeatForTSJAndTHJ(digitFour, digitFive, digitSix, digitEleven) {

  switch (digitFour + digitFive + digitSix) {
    case "072":
    case "090":
    case "102":
      switch (digitEleven) {
        case "C":
        case "G":
          oneStageElectricHeatPrimary();
          break;
      
        case "K":
        case "N":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    case "120":
    case "150":
      switch (digitEleven) {
        case "G":
          oneStageElectricHeatPrimary();
          break;
      
        case "K":
        case "N":
        case "P":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    case "180":
      switch (digitEleven) {
        case "G":
          oneStageElectricHeatPrimary();
          break;
      
        case "N":
        case "P":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;
      
    case "210":
    case "240":
    case "300":
      switch (digitEleven) { 
        case "N":
        case "P":
        case "R":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    default:

      break;
  }
}

// Primary Electric Heat for 6-25 Ton (TSK and THK)
// TSK150A4S0P00C1A0000000C40000000000000B0
// TSK150A4S0000C1A0000000C40000000000000B0
function electricHeatForTSKAndTHKAndTZK(digitFour, digitFive, digitSix, digitEleven) {
  switch (digitFour + digitFive + digitSix) {
    case "036":
    case "048":
      switch (digitEleven) {
        case "B":
          oneStageElectricHeatPrimary();
          break;
      
        case "E":
        case "G":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;
  
    case "060":
      switch (digitEleven) {
        case "B":
          oneStageElectricHeatPrimary();
          break;
      
        case "E":
        case "G":
        case "J":
        case "K":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    case "072":
    case "090":
    case "102":
      switch (digitEleven) {
        case "C":
          oneStageElectricHeatPrimary();
          break;
      
        case "G":
        case "K":
        case "N":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    case "120":
      switch (digitEleven) {
        case "G":
          if (digitOne === "T" && digitTwo === "S" && digitThree === "K" || digitOne === "T" && digitTwo === "J" && digitThree === "K") {
            twoStageElecticHeatSecondary();
          } else {
            oneStageElectricHeatPrimary();
          }

        case "K":
        case "N":
        case "P":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    case "150":
    case "180":
      switch (digitEleven) {
        case "G":
          oneStageElectricHeatPrimary();
          break;
      
        case "K":
          if (digitOne === "T" && digitTwo === "S" && digitThree === "K" || digitOne === "T" && digitTwo === "J" && digitThree === "K") {
            twoStageElecticHeatSecondary();
          } else {
            verifyElectricHeatDigitEleven();
          }

        case "N":
        case "P":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;
      
    case "210":
    case "240":
    case "300":
      switch (digitEleven) { 
        case "N":
        case "P":
        case "R":
          twoStageElecticHeatSecondary();
          break;

        default:
          verifyElectricHeatDigitEleven();
          break;
      }
      break;

    default:
      break;
  }
}

function coolingWithElectricBackup(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven) {
  switch (digitOne + digitTwo + digitThree) {
    // Heat Pump WSJ and WHJ 12.5-25 Ton and Secondary Electric Heat
    // TSJ240A4S0000C1A0000000C40000000000000B0
    case "TSJ":
    case "THJ":
      switch (digitFour + digitFive + digitSix) {
        case "072":
        case "090":
        case "102":
        case "120":
        case "150":
        case "180":
        case "210":
        case "240":
        case "300":
          coolingOnlyConfig();
          switch (digitTen) {
            case "0":
              if (digitEleven !== "0") {
                electricHeatForTSJAndTHJ(digitFour, digitFive, digitSix, digitEleven);
              }
              break;
          
            default:
              verfiySecondaryHeatingSelection();
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
    break;

    // TSK240A4S0000C1A0000000C40000000000000B0
    // TZK240A4S0000C1A0000000C40000000000000B0
    case "TSK":
    case "THK":
    case "TZK":
      switch (digitFour + digitFive + digitSix) {
        case "036":
        case "048":
        case "060":
        case "072":
        case "090":
        case "102":
        case "120":
        case "150":
        case "180":
        case "210":
        case "240":
        case "300":
          coolingOnlyConfig();
          switch (digitTen) {
            case "0":
              if (digitEleven !== "0") {
                electricHeatForTSKAndTHKAndTZK(digitFour, digitFive, digitSix, digitEleven);
              }
              break;
          
            default:
              verfiySecondaryHeatingSelection();
              break;
          }
          break;
      
        default:
          verifyTonnage();
          break;
      }
    break;

    default:
      break;
    }
}

function heatSelection(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven) {
  heatPumpAndDualFuelSelection(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven);
  stagedOrModGasHeatSelection(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven);
  coolingWithElectricBackup(digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitTen, digitEleven);
}

// **********  Economizer Selection **********
// TSJ072A4S000002A0000000C40000000000000B0 Outside Air Not Installed  -  TSJ072A4S0B00C2A0000000C40000000000000B0 Outside Air Installed
function outsideAir(digitFourteen) {
  
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
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
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
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;

    case "F":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Reference Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
      break;

    case "G":
      document.getElementById("outside-air").innerHTML = "0 to 100% Economizer";
      document.getElementById("econ-type").innerHTML = "Comparative Enthalpy";
      document.getElementById("remote-position").innerHTML = "Not Installed";
      document.getElementById("space-pressure").innerHTML = "* Not Installed";
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

    default:
      document.getElementById("outside-air").innerHTML = "Verify Digit Fourteen";
      document.getElementById("econ-type").innerHTML = "Verify Digit Fourteen";
      document.getElementById("remote-position").innerHTML = "Verify Digit Fourteen";
      document.getElementById("space-pressure").innerHTML = "Verify Digit Fourteen";
      break;
  }
}

// **********  Supply Fan Motor Selection **********
// YSK102A4S0L00C4A0000000C0000000000000000 VVDA  |  YSK102A4S0L00C2A0000000C0000000000000000 VVZT  |  YSK102A4S0L00C1A0000000C0000000000000000 CVZT
function indoorFanType(digitFifteen,digitOne, digitTwo, digitThree, digitFour, digitFive, digitSix, digitEight, digitTen, digitTwelve, digitThirteen, digitTwentyTwo, digitThirtynine) {
 
let indoorFanVFD = document.getElementById("indoor-vfd");

 switch (digitFifteen) {
    case "0":
    case "1":
      document.getElementById("system-type").innerHTML = "CVZT";
      document.getElementById("fan-type").innerHTML = "Multi Speed";
      document.getElementById("indoor-fan-vfd").innerHTML = "Ebm Papst";
      indoorFanVFD.style.display = "";
      break;

    case "2":
    case "3":
      document.getElementById("system-type").innerHTML = "VVZT";
      document.getElementById("fan-type").innerHTML = "Variable Speed";
      document.getElementById("indoor-fan-vfd").innerHTML = "Ebm Papst";
      indoorFanVFD.style.display = "";
      
      break;

    case "4":
    case "5":
      document.getElementById("system-type").innerHTML = "VVDA"
      document.getElementById("fan-type").innerHTML = "Variable Speed";
      document.getElementById("indoor-fan-vfd").innerHTML = "Ebm Papst";
      indoorFanVFD.style.display = "";
      break;
    
    default:
      document.getElementById("system-type").innerHTML = "Verify Digit Fifteen"
      document.getElementById("fan-type").innerHTML = "Verify Digit Fifteen";
      document.getElementById("indoor-fan-vfd").innerHTML = "Verify Digit Fifteen";
      indoorFanVFD.style.display = "";
      break
  }

// Supply Fan VFD Mitsubishi Drive - // YSJ072A4S0C04C2A0000000C40000000000000B0 VFD
switch (digitOne + digitTwo + digitThree) {
  case "YSJ":
  case "YHJ":
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
    break;

  default:
    break;
};


  // Non EBM or VFD Supply Fan
  // 3-5 Ton Supply Fan Selection
  function singleSpeedSelection() {
    document.getElementById("fan-type").innerHTML = "Single Speed";
    indoorFanVFD.style.display = "none";
  }

  function multiSpeedSelection(params) {
    document.getElementById("fan-type").innerHTML = "Multi Speed";
    indoorFanVFD.style.display = "none";
  }
  
  switch (digitOne + digitTwo + digitThree) {
    case "WSK":
    case "DSK":
    case "YSK":
    case "TSK":
      switch (digitFour + digitFive + digitSix) {
        case "036":
        case "048":
        case "060":
          singleSpeedSelection();
          break;
      
        default:
          break;
      }
      break;
  
    case "YHK":
    case "THK":
      switch (digitFour + digitFive + digitSix) {
        case "036":
          multiSpeedSelection();
          break;
      
        default:
          break;
      }
    default:
      break;
  }
}

// **********  Space Controller Selection **********
function spaceController(digitTwentyOne, digitFifteen) {
  switch (digitTwentyOne) {
    case "0":
      if (digitTwentyOne === "0" && digitFifteen === "4" || digitFifteen === "5") {
        document.getElementById("space-controller").innerHTML = "Single Setpoint Zone Sensor";
      } else {
        document.getElementById("space-controller").innerHTML = "Conventional Thermostat";
      }
      break;

    case "1":
    case "2":
    case "3":
      document.getElementById("space-controller").innerHTML = "Single Setpoint Zone Sensor";
      break;
  
    default:
      break;
  }
}

// **********  Refrigerantion System Option - (Reheat/Dehum) Selection  **********
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

    default:
      document.getElementById("reheat").innerHTML = "Verify Digit Twenty-Two";
      document.getElementById("dehum-control").innerHTML = "Verify Digit Twenty-Two";
      document.getElementById("humidistat").innerHTML = "Verify Digit Twenty-Two";
      document.getElementById("humidity-sensor").innerHTML = "Verify Digit Twenty-Two";
      break;
  }
}

// **********  Supply & Return Smoke Detector Selection **********
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

    default:
      document.getElementById("supply-smoke").innerHTML = "Verify Digit Twenty-Four";
      document.getElementById("return-smoke").innerHTML = "Verify Digit Twenty-Four";
      break;
  }
}

// **********  System Monitoring Controls Selection **********
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

    default:
      document.getElementById("clogged-filter").innerHTML = "Verify Digit Twenty-Five";
      document.getElementById("overflow-switch").innerHTML = "Verify Digit Twenty-Five";
      break;
  }
}

// **********  Low Ambient Cooling Selection  **********
function lowAmbient(digitTwentynine) {
  switch (digitTwentynine) {
    case "0":
      document.getElementById("low-ambient").innerHTML = "Not Installed";
      break;

    case "A":
      document.getElementById("low-ambient").innerHTML = "Installed";
      break;

    default:
      document.getElementById("low-ambient").innerHTML = "Verify Digit Twenty-Nine";
      break;
  }
}

// DAT Sensor
function datSensor(digitTen, digitFourteen, digitFifteen, digitTwentyTwo, digitTwentyFive) {
  if (digitTen === "B" || digitFourteen === "C" || digitFourteen === "D" || digitFourteen === "E" || digitFourteen === "F"|| 
      digitFourteen === "G" || digitFourteen === "H" || digitFourteen === "K" || digitFourteen === "M" || digitFourteen === "P" || 
      digitFourteen === "R" || digitFifteen === "2" || digitFifteen === "3" || digitFifteen === "4" || digitFifteen === "5" || 
      digitTwentyTwo === "A" || digitTwentyFive === "3" || digitTwentyFive === "5" || digitTwentyFive === "6" || digitTwentyFive === "7") {
        document.getElementById("dat-sensor").innerHTML = "Installed";
  } else {
    document.getElementById("dat-sensor").innerHTML = "Not Installed";
  }
}

// Note
function notInstalledNote(digitOne) {
  
  let note = document.getElementById("note");
  switch (digitOne) {
    case "W":
    case "Y":
    case "T":
    case "D":
      note.style.display = "";
      break;

    default:
      break;
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
  document.getElementById("note").style.display = 'none';
  return value;
}