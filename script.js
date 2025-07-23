let interface = document.querySelector(".interface")
let warning = document.querySelector(".warning")
let loadingPage = document.querySelector(".loadingPage")
let cursor = document.querySelector(".cursor")
let contextMenu = document.querySelector(".contextMenu")
let btns = document.querySelectorAll("button")
let menuBtns = document.querySelectorAll("#menuBtn")
let angryBtns = document.querySelectorAll(".angry")
let refresh = document.querySelector(".refresh")
let alertTitle = document.querySelector(".alertTitle")
let alertMs = document.querySelector(".alert")
let alertContent = document.querySelector(".error")
let message = document.querySelector(".message")
let okBtn = document.querySelector(".submit")
let closing = document.querySelector(".closing")
let mouth = document.querySelector(".mouth")
let eye = document.querySelectorAll(".puiple")
let glass = document.querySelector(".glass")
let front = document.querySelector(".front")
let capture = document.querySelector(".capture")
let copy = document.querySelector(".copy")
let eyebrows = document.querySelectorAll(".eyebrow")
let paste = document.querySelector(".paste")
let support = document.querySelector(".support")
let events = ["mouseover", "mouseout"]
let menuEvents = ["contextmenu", "touchstart"]
let emotions = [wideEyes, defaultEmotion]
let rotationEye = ["15deg", "-15deg"]
let rotationBrow = ["20deg", "-20deg"]
let back = document.querySelector(".back")
let btnsArray = [paste, refresh, front, back, closing]
let charcPage = document.querySelector(".charactersPage")
let zooming = ["=", "+", "_", "-"]
let shouldLaugh = false;
// Checking if there is selected text to copy
function alertMessage(text) {
  alertContent.innerText = text;
  message.style.display = "flex";
  warningEmote();
  mouth.style.height = "0";
  okBtn.addEventListener("click", () => {
    message.style.display = "none";
    shouldLaugh = !shouldLaugh;
    laughingEmote();
    setTimeout(() => {
      shouldLaugh = !shouldLaugh;
      defaultEmotion();
    }, 2000);
  });
}

// Disabling zoom in and zoom out
document.addEventListener('wheel', function(e) {
  if(e.ctrlKey || e.metaKey) {
    e.preventDefault();
  } 
}, { passive: false});
document.addEventListener('keydown', function(e) {
  zooming.forEach((char) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === char)) {
      e.preventDefault();
    }
  })
});
// My own CONTEXT MENU and deleting the default MENU when clicking right click
function newContextMenu() {
  let btnsFunc = [pasteFunc, refreshPage, forward, backward, closeWindow]
  btnsArray.forEach((mnuBtn, index) => {
    mnuBtn.addEventListener("click", btnsFunc[index])
  })
 // Function of clicking on buttons on context menu
  function checkingCopy() {
    const textSelected = window.getSelection().toString();
    if (textSelected) {
      copy.style.color = "white"
      copy.addEventListener("click", () => {
        copyText()
        defaultEmotion()
      })
    } else {
      copy.style.color = "#8a8a8a"
      copy.addEventListener("click", () => {
        alertMessage("You haven't selected anything. Choose text to copy.")
      })
    }
  }
  function copyText() {
    let textcopied = navigator.clipboard.writeText(textSelected)
    copy.style.color = "white"
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(()=>{shouldLaugh=!shouldLaugh; defaultEmotion()},2000)     
    return textcopied;
  }
  function pasteFunc(input) {
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(()=>{shouldLaugh=!shouldLaugh; defaultEmotion()},2000)
    const text = navigator.clipboard.readText();
    input.value = text;
  }
  function refreshPage() {
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(() => { location.reload(); }, 2000)
  }
  function forward() {
    if(window.navigation && window.navigation.canGoForward) {
      history.go(1)
    } else {
      alertMessage("There's nothing left. Everything behind you has vanished.")
    }
  }
  function backward() {
    if (window.history.length > 1) {
      history.go(-1)
    } else {
      alertMessage("There's nothing left. Everything behind you has vanished.")
    }
  }
  function closeWindow() {
    window.close();
  }
  checkingCopy()
  btns.forEach((btn) => { btn.addEventListener("mouseover", () => { wideEyes()}) })
  angryBtns.forEach((angryBtn) => { angryBtn.addEventListener("mouseover", () => { angryEmote() }) })
  btns.forEach((menuBtn) => { menuBtn.addEventListener("mouseout", () => { defaultEmotion() }) })
  events.forEach((event, index) => {
    support.addEventListener(event, emotions[index])
  })
  document.addEventListener("contextmenu", contextMenuFunc)
  function contextMenuFunc(e) {
    // Deleting the default MENU
    //e.preventDefault();
    // Creating my own CONTEXT MENU
    contextMenu.style.display = "flex"
    let xPos = e.pageX;
    let yPos = e.pageY;
    contextMenu.style.left = `${xPos + 10}px`
    contextMenu.style.top = `${yPos - 25}px`
  }
  document.addEventListener("click", () => {contextMenu.style.display = "none"})
}
// Function to call whenever want to edit on the styles on puiples
function puiples(height, currentY, radius, rotating, radius2, radius3, radius4, block) {
  eye.forEach((puiple, index) => {
    puiple.style.height = `${height}px`
    puiple.style.top = `${currentY}px`
    puiple.style.borderRadius = `${radius} ${radius2} ${radius3}% ${radius4}%`
    puiple.style.display = block
    if (rotating == rotationEye) {
      puiple.style.transform = `rotate(${rotating[index]})`
    } else {
      puiple.style.transform = `rotate(${rotating}deg)`
    }
  })
}
// Cursor Emotions when hover, clicking on the buttons or making action
function contacting() {
  support.addEventListener("click", () => {
    shouldLaugh=!shouldLaugh
    laughingEmote();
    setTimeout(()=>{shouldLaugh=!shouldLaugh; defaultEmotion()},1500)
  })
}
// Wide Eyes Emotion
function wideEyes() {
  puiples(17, 17, "50%", 0, "50%", 50, 50, "block")
  glass.classList.add("non-after")
  mouth.style.height = "0"
}
// Warning Emotion when alert appears to you that is about error
function warningEmote() {
  eye.forEach((pupil) => {
    pupil.style.display = "none"
  })
  warning.style.display = "block"
  cursor.style.backgroundImage = "linear-gradient(to bottom, #D62828, #8B0000)";
  mouth.style.height = "0"
}
// Laughing Emotion when you click on a button who doesn't close or go out of the game
function laughingEmote() {
  if (!shouldLaugh) { 
    return 
  }
  mouth.style.height = "17px"
  glass.classList.add("non-after")
  puiples(4, 20, 0, 0, 0, 0, 0, "block")
}
// Angry Emotion
function angryEmote() {
  cursor.style.backgroundImage = "linear-gradient(to bottom, #D62828, #8B0000)"
  glass.classList.add("non-after")
  puiples(13, 20, "2px", rotationEye, "2px", 50, 50, "block")
  eyebrows.forEach((brow, index) => {
    brow.style.opacity = "1"
    brow.style.transform = `rotate(${rotationBrow[index]})`
  })
}

// Returning to default emotion
function defaultEmotion() {
  if (shouldLaugh) { 
    return 
  }
  puiples(12, 20, "2px", 0, "2px", 50, 50, "block")
  glass.classList.remove("non-after");
  cursor.style.backgroundImage = "linear-gradient(to bottom, #2696e8, #1b65c9)"
  mouth.style.height = "0"
  cursor.style.backgroundColor = "#2696e8"
  eyebrows.forEach((brow) => {
    brow.style.opacity = "0"
  })
  warning.style.display = "none"
}

// My own mouse following cursor
function followingCursor() {
  document.addEventListener("mousemove", (e) => {
    let y = e.clientY;
    let x = e.clientX;
    cursor.style.display = "block"
    cursor.style.opacity = "1"
    cursor.style.setProperty("--top", `${y}px`)
    cursor.style.setProperty("--left", `${x}px`)
    document.addEventListener("mouseout", () => {
      cursor.style.opacity = "0"
    })
  })
}

function interfaceAnimations() {
  // Hovering buttons and showing ball
  function hoveringBtns() {
    let img = document.getElementById("character");
    let btns = document.querySelectorAll("#btn");
    let btn = document.getElementById("btn")
    let mrg = ["37pc 0 0 40pc", "45pc 0 0 37pc", "54.5pc 0 0 32pc"]
    let y = scrollY;
    let x = scrollX;
    function btnsStyle() {
      img.style.opacity = "1"
      img.style.animationName = "Rotating"
    }
    btns.forEach((btna,index) => {
      btna.addEventListener("mouseout", () => {
        btna.style.color = "white";
        img.style.opacity = "0"; 
        defaultEmotion()
      })
      btna.addEventListener("mouseover", () => {
        btna.style.color = "orange"
        wideEyes()
        btnsStyle()
        img.style.margin = mrg[index];
      })
    })
  }
// Eyes following the Mouse
  let eyes = document.querySelectorAll(".eye");
  eyes.forEach(eye => {
  let eyeRect = eye.getBoundingClientRect();
    document.body.addEventListener("mousemove", eyesFollows);
    function eyesFollows(e) {
      requestAnimationFrame(() => {
        let posX = e.pageX;
        let posY = e.pageY;
        let diffX = (eyeRect.x + eyeRect.width / 2) - posX;
        let diffY = (eyeRect.y + eyeRect.height / 2) - posY;
        let angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
        eye.style.setProperty("--eyeAngle", angle.toFixed(2) + "deg");
      });
    }
  })
  hoveringBtns()
}
function loadingBar() {
  let loadingPage = document.querySelector(".loadingPage")
  let percent = document.querySelector(".percent")
  let bar = document.querySelector(".bar");
  let ball = document.querySelector(".loadingImg");
  let load = document.querySelector(".load")
  let num = 0;
  let percentTime = setInterval(precentage, 40)
  function precentage() {
    if (num != 101) {
      percent.innerText = `${num}%`
      bar.style.width = `${num - 3.5}%`
      num++;
    } else {
      setTimeout(() =>{stopLoading()}, 2000)
    }
  }
  
function stopLoading() {
    interfaceAnimations()
    loadingPage.style.display = "none"
    loadingPage.style.zIndex = "1"
    interface.style.zIndex = "100"
    clearInterval(percentTime)
  }
precentage()
}

loadingBar()
followingCursor()
newContextMenu()
contacting()
